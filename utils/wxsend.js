const request = require('../utils/_request');
const wxConf = require('../config/wxConf');
const fetch = require('../utils/fetch')
const code = {
    R: {
        0: 'V6C9I4X2XDzg6W7TlZVuGvMm35XIw4CPeR_Eo8BQypY',
        2: 'lqPHoUoMX_PNiuUzkwEY7R88UC6AJHe_k7n1guGNlTM',
        4: 'Sl19nJnjPBVBsvG9woG_116fc5cbrVe_KmFoxVklEjg',
        5: 'dujk_KT5wTKoenVXnZKJV505FwNhB-Ep1_xAjz66E5c'
    },
    Q: {
        0: 'Ggm1s5gMcssB1zkM0rxfWkqWkNkJrS3vuqBKez6aziA',
        1: 'vhzYjCJBKxnjwD8_Sqw9JqGWf9UTnDleXqAYGECe9vQ',
        2: 'DwpTdXYonUNscBzT4rj9GsbT_zm0gamMthnxtwzw54Y',
        3: 'AAwD1DCXGozZPnbGcYFLmPEFYKWiMCq1ngdMp7W-5yw'
    }
}
//0未付款 1 买家已付款 2 订单已确认汇款 3预约验车中 4已预约验车  5车辆已入库
//0未付款 1 已付款 2 取车完成 3 已取消 4退款中  5退款完成
const title = {
    R: {
        0: '预约车单提交成功',
        2: '预约车单付款成功',
        4: '预约车单已上板',
        5: '预约车单已入库'
    },
    Q: {
        0: '取车订单已提交',
        1: '取车订单已付款',
        2: '取车订单已完成',
        3: '取车订单已取消'
    }
}

async function sendTpl({type, status, order, openid}) {
    let tplCode = code[type][status];
    if (!tplCode)
        return {result: false, code: 203}

    let tplTitle = title[type][status];
    let token = await request('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + wxConf.AppID + '&secret=' + wxConf.AppSecret);
    let access_token = token['access_token'];
    const url = `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${access_token}`; //发送模板消息的接口
    let toUrl;
    if (type === 'R') {
        toUrl = 'https://mobile.qinhemili.com/#/order?id=' + order.code
    } else {
        toUrl = 'https://mobile.qinhemili.com/#/over?id=' + order.code
    }
    let data;
    if (type === 'R' && status === 0) {
        data = {
            first: {
                value: '您的申请垫资订车车单已提交成功，请等待业务员与您联系',
                color: "#1d1d1d"
            },
            keyword1: {
                value: order.realName,
                color: '#1d1d1d'
            },
            keyword2: {
                value: order.phone,
                color: '#1d1d1d'
            },
            keyword3: {
                value: order.carStr,
                color: '#1d1d1d'
            },
            keyword4: {
                value: order.createTime,
                color: '#1d1d1d'
            },
            remark: {
                value: '点击下方查看详情！',
                color: '#173177'
            }
        };
        if (order.saleOpenId)
            await fetch.form(url, JSON.stringify({
                touser: order.saleOpenId,
                template_id: 'HfQbiVbLniocKGfyZqsY6M3Qb9sTDhnabPSKdUEi12U',
                url: 'http://sale.qinhemili.com',
                data: {first: {
                        value: '有新的订车订单',
                        color: "#1d1d1d"
                    },
                    keyword1: {
                        value: order.carStr,
                        color: '#1d1d1d'
                    },
                    keyword2: {
                        value: order.carNum,
                        color: '#1d1d1d'
                    },
                    keyword3: {
                        value: order.totalRePrice,
                        color: '#1d1d1d'
                    },
                    keyword4: {
                        value: order.createTime,
                        color: '#1d1d1d'
                    },
                    keyword5: {
                        value: '业务员：'+order.saleName,
                        color: '#1d1d1d'
                    },
                    remark: {
                        value: '请及时处理订单',
                        color: '#173177'
                    }}
            }));
    } else if (type === 'R' && status === 2) {
        data = {
            first: {
                value: '我们已收到您的汇款，正在安排业务员为你订车',
                color: "#1d1d1d"
            },
            keyword1: {//支付金额
                value: order.totalRePrice,
                color: '#1d1d1d'
            },
            keyword2: {//商品信息
                value: order.carStr,
                color: '#1d1d1d'
            },
            remark: {
                value: '相关订车信息及物时效请联系您的专属业务进行沟通',
                color: '#173177'
            }
        };
    } else if (type === 'R' && status === 4) {
        data = {
            first: {
                value: '您的预订车单已经上板，正在运输途中，车辆到达指定地点业务员将联系您验车',
                color: "#1d1d1d"
            },
            keyword1: {
                value: order.code,
                color: '#1d1d1d'
            },
            keyword2: {
                value: '车辆正在运输途中',
                color: '#1d1d1d'
            },
            remark: {
                value: '点击查看订单详情获取更多车辆物流信息',
                color: '#173177'
            }
        };
    } else if (type === 'R' && status === 5) {
        data = {
            first: {
                value: '验车已完成，车辆送入米粒仓库保管等待取车。',
                color: "#1d1d1d"
            },
            keyword1: {
                value: order.code,
                color: '#1d1d1d'
            },
            keyword2: {
                value: '车辆已入库',
                color: '#1d1d1d'
            },
            remark: {
                value: '点击查看订单详情获取更多车辆物流信息',
                color: '#173177'
            }
        }
    } else if (type === 'Q' && status === 0) {
        data = {
            first: {
                value: '您好！您的取车订单已提交成功！请向指定账户汇款，以保证取车进度。',
                color: "#1d1d1d"
            },
            keyword1: {
                value: order.verifyTime,
                color: '#1d1d1d'
            },
            keyword2: {
                value: '米粒好车有限公司',
                color: '#1d1d1d'
            },
            keyword3: {
                value: '米粒好车有限公司',
                color: '#1d1d1d'
            },
            remark: {
                value: '请您准备好相关资料，点击可查看专属业务员联系方式。',
                color: '#173177'
            }
        }
        if (order.saleOpenId)
            await fetch.form(url, JSON.stringify({
                touser: order.saleOpenId,
                template_id: 'HfQbiVbLniocKGfyZqsY6M3Qb9sTDhnabPSKdUEi12U',
                url: 'http://sale.qinhemili.com',
                data: {first: {
                        value: '有新的取车订单',
                        color: "#1d1d1d"
                    },
                    keyword1: {
                        value: order.carStr,
                        color: '#1d1d1d'
                    },
                    keyword2: {
                        value: order.carNum,
                        color: '#1d1d1d'
                    },
                    keyword3: {
                        value: order.totalCutPrice,
                        color: '#1d1d1d'
                    },
                    keyword4: {
                        value: order.createTime,
                        color: '#1d1d1d'
                    },
                    keyword5: {
                        value: '业务员：'+order.saleName,
                        color: '#1d1d1d'
                    },
                    remark: {
                        value: '请及时处理订单',
                        color: '#173177'
                    }}
            }));
    } else if (type === 'Q' && status === 1) {
        data = {
            first: {
                value: '您的取车订单已汇款成功，专属业务员将于您联系确认取车时间与取车地点。',
                color: "#1d1d1d"
            },
            keyword1: {
                value: order.carStr,
                color: '#1d1d1d'
            },
            keyword2: {
                value: order.code,
                color: '#1d1d1d'
            },
            keyword3: {
                value: order.totalCutPrice + "万元",
                color: '#1d1d1d'
            },
            keyword4: {
                value: order.updateTime,
                color: '#1d1d1d'
            },
            remark: {
                value: '点击查看取车进度。',
                color: '#173177'
            }
        }
    } else if (type === 'Q' && status === 2) {
        data = {
            first: {
                value: '您的取车订单已交车完毕，感谢您对米粒车的信任',
                color: "#1d1d1d"
            },
            keyword1: {
                value: order.code,
                color: '#1d1d1d'
            },
            keyword2: {
                value: order.saleName,
                color: '#1d1d1d'
            },
            keyword3: {
                value: order.salePhone,
                color: '#1d1d1d'
            },
            keyword4: {
                value: order.verifyTime,
                color: '#1d1d1d'
            },
            remark: {
                value: '点击查看取车订单详情。',
                color: '#173177'
            }
        }
    } else if (type === 'Q' && status === 3) {
        data = {
            first: {
                value: "您的取车订单已取消。",
                color: "#1d1d1d"
            },
            keyword1: {
                value: order.code,
                color: '#1d1d1d'
            },
            keyword2: {
                value: '业务员将于您电话沟通',
                color: '#1d1d1d'
            },
            remark: {
                value: '感谢使用米粒车服务。',
                color: '#173177'
            }
        }
    }
    let param = {
        touser: openid,
        template_id: tplCode,
        url: toUrl,
        data
    }
    return fetch.form(url, JSON.stringify(param));

}

module.exports = sendTpl;