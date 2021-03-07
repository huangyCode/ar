/**
 * Created by huangyi
 */
'use strict';
//const moment = require('moment');
import valid from '../utils/validator';
import cache from 'memory-cache';

const request = require('../utils/_request');

const SMSClient = require('@alicloud/sms-sdk')

const jwt = require('jsonwebtoken');
const md5 = require('../utils/md5');

const smsConf = require('../config/sms');
const sign = require('../utils/sign');
const {customer} = require('../db');
const wxConf = require('../config/wxConf');

//获取短信
async function sendSms(ctx) {
    let param = ctx.request.body;
    param = valid(param, {
        phone: {type: 'string', empty: false, regex: 'phone'},
    });
    let smsClient = new SMSClient({accessKeyId: smsConf.AccessKeyId, secretAccessKey: smsConf.AccessKeySecret});
    let smsCode = '';
    //生成6位码
    for (let i = 0; i < 6; i++) {
        smsCode += Math.floor(Math.random() * 10);
    }
    // 发送至手机
    let smsRes = await smsClient.sendSMS({
        PhoneNumbers: param.phone,
        SignName: 'ar看房',
        TemplateCode: 'SMS_153605021',
        TemplateParam: '{"code":"' + smsCode + '"}'
    });
    //服务器缓存6位码
    if (smsRes.Code === 'OK') {
        //处理返回参数
        cache.put(param.phone, smsCode, 120 * 1000);
    }

    ctx.body = {msg: '验证码发送成功', result: true, code: 200};
}


async function regist(ctx) {
    let params = valid(ctx.request.body, {
        phone: {type: 'string', empty: false, regex: 'phone'},
        validCode: {type: 'string', empty: false},
        pwd: {type: 'string', empty: false},
    });

    let user = await customer.findOne({where: {phone: params.phone}})
    if (user && user.dataValues) {
        ctx.body = {result: false, msg: '该手机号码已被注册', code: 400}
    } else {
        let code = cache.get(params.phone);
        //if (code !== params.validCode) return ctx.body = {result: false, msg: '验证码有误', code: 400}
        let res = await customer.create({
            userName: params.phone,
            password: params.pwd,
            phone: params.phone,
        })
        let result = res.dataValues
        result.token = jwt.sign({data: result}, 'P@s$w0rd', {expiresIn: '24h'});
        return ctx.body = {result: true, code: 200, data: result};
    }
}

async function login(ctx) {
    let param = valid(ctx.request.body, {
        phone: {type: 'string', empty: false, regex: 'phone'},
        validCode: {type: 'string', empty: true},
        pwd: {type: 'string', empty: true},
    });

    if (param.pwd) {
        //密码登录
        let user = await customer.findOne({where: {phone: param.phone}});
        if (md5.md5(param.pwd) === user.password) {
            let result = user.dataValues;
            result.token = jwt.sign({data: result}, 'P@s$w0rd', {expiresIn: '24h'});
            return ctx.body = {result: true, code: 200, data: result};
        } else {
            ctx.response.statusCode = 402;
            ctx.body = {result: false, msg: '密码或手机号错误', code: 402}
        }

    } else {
        //验证码登录
        //获取缓存code
        let code = cache.get(param.phone);
        if (code !== param.validCode) {
            ctx.response.statusCode = 401;
            ctx.body = {result: false, msg: '校验码验证失败', code: 401}
        } else {
            let user = await customer.findOne({where: {phone: param.phone}});
            let result = user.dataValues;
            result.token = jwt.sign({data: result}, 'P@s$w0rd', {expiresIn: '24h'});
            return ctx.body = {result: true, code: 200, data: result};
        }

    }
}

//自动登录
async function auto(ctx) {
    let param = valid(ctx.request.body, {
        token: {type: 'string', empty: false}
    });
    //是否有openId 有则比较 token解析后的值生成新的token返回，
    // 没有根据wxCode返回openId去数据查取用户信息比较 没有用户跳转登录 有则生成新的token登录
    let wxResult = await request('https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + wxConf.AppID + '&secret=' + wxConf.AppSecret +
        '&grant_type=authorization_code&code=' + param.wxCode);
    let result = {};
    //跳转注册页面
    let token = await request('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + wxConf.AppID + '&secret=' + wxConf.AppSecret);
    let wxUser = await request('https://api.weixin.qq.com/cgi-bin/user/info?access_token=' + token["access_token"] + '&openid=' + wxResult.openid + '&lang=zh_CN');
    // 如果没有用户则注册新用户
    let user = await customer.findOne({where: {openId: wxResult.openid}});
    if (user && user.phone) {
        if (!user.careStatus && wxUser.subscribe === 1) {
            await customer.update({
                careStatus: 1,
                openId: wxResult.openid,
                nickName: wxUser.nickname,
                sex: wxUser.sex,
                city: wxUser.city,
                province: wxUser.province,
                country: wxUser.country,
                avatar: wxUser.headimgurl
            }, {where: {id: user.id}});
        } else if (user.careStatus && wxUser.subscribe === 0) {
            await customer.update({
                careStatus: 0
            }, {where: {id: user.id}});
        }
        result.eeStatus = user.eeStatus;
        result.userStatus = user.userStatus;
        result.uid = user.id;
        result.openId = wxResult.openid;

    } else {
        if (wxUser.subscribe === 1 && !(user && user.id)) {
            await customer.create({
                careStatus: 1,
                openId: wxResult.openid,
                nickName: wxUser.nickname,
                sex: wxUser.sex,
                city: wxUser.city,
                province: wxUser.province,
                country: wxUser.country,
                avatar: wxUser.headimgurl
            })
        } else {
            if (wxResult.openid && !(user && user.id)) {
                await customer.create({careStatus: 0, openId: wxResult.openid})
            }
            if (wxUser.subscribe !== 1) {
                return ctx.body = {result: false, msg: '未关注用户', data: {openId: wxResult.openid}, code: 302}
            }
        }
        return ctx.body = {result: false, msg: '用户未注册', data: {openId: wxResult.openid}, code: 402}
    }
    let newUser = await customer.findOne({where: {openId: wxResult.openid}});
    if (!(newUser && newUser.careStatus === 1)) {
        return ctx.body = {result: false, msg: '未关注用户', data: {openId: wxResult.openid}, code: 302}
    }
    result.token = jwt.sign({data: result}, 'P@s$w0rd', {expiresIn: '24h'});
    return ctx.body = {result: true, code: 200, data: result};
}


async function checkPassport(ctx, next) {
    try {
        let token = ctx.request.headers.token;
        let decoded = await jwt.verify(token, 'P@s$w0rd');
        if (ctx.method === 'GET') {
            ctx.request.query.uid = decoded.data && decoded.data.uid;
        } else {
            ctx.request.body.uid = decoded.data && decoded.data.uid;
        }
        await next();
    } catch (e) {
        ctx.response.statusCode = 400;
        ctx.body = {result: false, msg: '授权失败', code: "400"}
    }
}

async function checkSingle(ctx) {
    let param = valid(ctx.request.query, {
        url: {type: 'string', empty: false},
    });

    let token = await request('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + wxConf.AppID + '&secret=' + wxConf.AppSecret);

    let res = await request('https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token=' + token["access_token"])
    let signature
    if (res.errmsg === 'ok')
        signature = await sign(res['ticket'], param.url);
    else
        return ctx.body = {result: false, msg: '验证失败', code: 503}
    // let a =  await request('http://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=='+  signature.signature)
    // console.log('========== sign =========')
    // console.log(a);

    ctx.body = {result: true, data: signature, code: 200}
}


module.exports = {
    regist,
    sendSms,
    login,
    checkPassport,
    auto,
    checkSingle
};
