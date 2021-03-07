/**
 * Created by huangyi
 */
'use strict';
//const moment = require('moment');
import valid from '../utils/validator';
import cache from 'memory-cache';

const request = require('../utils/_request');

const smsConf = require('../config/sms');
const sign = require('../utils/sign');
const {estate, building, newsFeed, buildHouseLink, house} = require('../db');

//查询列表轮播列表
async function queryEstate(ctx) {
    let result = await estate.findAll();
    return ctx.body = {result: true, code: 200, data: result};
}


//查询小区详情
async function queryEstateDetail(ctx) {
    let params = valid(ctx.request.body, {
        id: {type: 'number', empty: false},
    });
    let res = await estate.findById(params.id)
    let build = await building.findAll({where: {estateId: params.id}})
    let result = res.dataValues;
    result.build = build.dataValues
    return ctx.body = {result: true, code: 200, data: result};
}

//查询楼栋想
async function queryBuildDetail(ctx) {
    let params = valid(ctx.request.body, {
        buildId: {type: 'number', empty: false},
    });
    let res = await building.findById(params.buildId)
    let result = res.dataValues;
    let links = await buildHouseLink.findAll({where: {buildId: params.buildId}})
    let news = await newsFeed.findAll({where: {buildId: params.buildId}})
    if (links.length) {
        let houseIds = [];
        for (let item of links) {
            houseIds.push(item.houseId)
        }
        let houseList = await house.findAll({where: {id: houseIds}});
        result.houseList = houseList
    }
    if (news.length)
        result.news = news;
    return ctx.body = {result: true, code: 200, data: result};
}

//创建单元
async function addBuilding(ctx) {
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



module.exports = {
    queryEstate,
    queryEstateDetail,
    queryBuildDetail,
};