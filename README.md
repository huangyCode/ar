
#### 注册
```
url：/login/regist
method:post
param:{ 
          phone: string, //手机号
          validCode:string, //验证码
          pwd: string, // 密码
      }     
```

#### 发送验证码
```$xslt
url: /login/sendSms
method:post
param:{ 
          phone: string, //手机号
         
      }    

```

#### 登录
```
url：/login/login
method:post
param:{ 
          phone: string, //手机号
          validCode:string, //验证码 选填
          pwd: string, // 密码 选填
      }     
```

#### 获取轮播列表
```
url：/build/queryEstate
method:post
param:{ 
       
      }     
      
res ：{
             "result": true,
             "code": 200,
             "data": 【{
                 "id": 1,
                 "name": "xxx小区", //小区名
                 "address": "江东中路13号", //地址
                 "city": "南京市", // 市
                 "district": "建邺区", //区
                 "province": "江苏省", // 省
                 "contact": "52289786", //联系方式
                 "desc": "位于江东中路的一个地理位置极好的楼盘", //描述
                 "tag": "['学区房','地段好','有增值空间']", //标签 
                 "createTime": null
             }】
         }       
```

#### 获取小区详情
```
url：/build/queryEstateDetail
method:post
param:{ 
       id: number // 小区id
      }     
res:{
        "result": true,
        "code": 200,
        "data": {
            "id": 1,
            "name": "xxx小区", //小区名
            "address": "江东中路13号", //地址
            "city": "南京市", // 市
            "district": "建邺区", //区
            "province": "江苏省", // 省
            "contact": "52289786", //联系方式
            "desc": "位于江东中路的一个地理位置极好的楼盘", //描述
            "tag": "['学区房','地段好','有增值空间']", //标签 
            "createTime": null
        }
    }      
```


#### 获取楼栋详情
```
url：/build/queryBuildDetail
method:post
param:{ 
       buildId: number // 楼栋id
      }     
res: {
         "result": true,
         "code": 200,
         "data": {
             "id": 1,
             "estateId": 1,
             "number": "一栋", // 楼栋编号
             "openTime": "", //开盘时间
             "contact": "52277098", //联系方式
             "priceFrom": "200万元", //最低价格
             "priceTo": "350万", //最高价格
             "createTime": null, //创建时间
             "houseList": [
                 {
                     "id": 1, // 户型编号
                     "img": "xxxxx.com", //户型图
                     "desc": "两室1厅1卫", // 户型图描述
                     "area": "89", // 占地平方
                     "price": "24000.00", // 价格
                     "createTime": null
                 }
             ],
             "news": [
                 {
                     "id": 1,
                     "buildId": 1, 
                     "desc": "在售状态很不错", //动态信息
                     "createTime": null,
                     "updateTime": null
                 }
             ]
         }
     }      
```
