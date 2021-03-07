const SMSClient = require('@alicloud/sms-sdk')

const tpl = {
    R: {
        0: "SMS_157447373",
        2: "SMS_157447491"
    },
    Q: {
        0: "SMS_157452408",
        1: "SMS_157452448"
    }
}
const smsConf = require('../config/sms');

async function sms(type, status, info) {
    let tplCode = tpl[type][status]

    if (!tplCode)
        return;
    let smsClient = new SMSClient({accessKeyId: smsConf.AccessKeyId, secretAccessKey: smsConf.AccessKeySecret});
    let param = '';
    if (type === 'R' && status === 0) {
        if(info.totalRePrice != 0)
            info.totalRePrice = info.totalRePrice + '万元';
        else
            info.totalRePrice = '电议';
        param = '{"reprice":"' + info.totalRePrice + '"}'
    } else if (type === 'R' && status === 2) {
        param = '{"code":"' + info.code + '","salename":"' + info.saleName + '","salephone":"' + info.salePhone + '"}'
    } else if (type === 'Q' && status === 0) {
        param = '{"verifytime":"' + info.verifyTime + '"}'
    } else if (type === 'Q' && status === 1) {
        param = '{"code":"' + info.code + '","salename":"' + info.saleName + '","salephone":"' + info.salePhone + '"}'
    }
    if (!param)
        return;
    return await smsClient.sendSMS({
        PhoneNumbers: info.phone,
        SignName: '米粒车',
        TemplateCode: tplCode,
        TemplateParam: param
    });
}

module.exports = sms;