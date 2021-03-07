
#### 注册
```
//前端自己调用获取openid 并且自己获取用户信息
url：/customer/add
method:post
param:{ 
        "userName":"aaa" //用户名
        "gender": 1, //0无性别 1.女性 2.男性
        "city": "南京", 
        "province": "江苏省",
        "country": "中国",
        "openid": "11232323231aaa",
        "avatar": "http://aaasd.wwa.com" //头像
      }     
```
#### 获取banner
```
//前端自己调用获取openid 并且自己获取用户信息
url：/data/banner
method:get
param:{ 
        
        createPerson: null
        createTime: "2019-12-20T02:28:49.000Z"
        desc: "/pages/share/index" //跳转的小程序的路径
        id: 8 
        imgUrl: "http://catsay.oss-cn-shanghai.aliyuncs.com/%E5%8F%8C%E6%97%A6banner.jpg" //图片路径
        name: "双旦节日会" // 跳转到页面的标题
        sort: 0 // 排序权重 越大越前
        status: 1 // 1显示 0不显示
        type: 5 // 表示banner类型数据
        updatePerson: null // 修改人
        updateTime: null // 修改时间
      }     
```

#### 修改用户
```
url：/customer/update
method:post
param:{ 
        "userName":"aaa" //用户名
        "id":2 //用户id
        "gender": 1, //0无性别 1.女性 2.男性
        "city": "南京", 
        "province": "江苏省",
        "country": "中国",
        "openid": "11232323231aaa",
        "avatar": "http://aaasd.wwa.com" //头像
      }     
```

#### 根据uid查询用户信息
```
url：/customer/getByOpenid?uid=1
method:get
res:{ 
        "gender": 1, //0无性别 1.女性 2.男性
        "city": "南京", 
        "province": "江苏省",
        "country": "中国",
        "openid": "11232323231aaa",
        "avatar": "http://aaasd.wwa.com" //头像
      }     
```
#### 根据openId查询用户信息
```
url：/customer/getByOpenid?openid=1
method:get
res:{ 
        "gender": 1, //0无性别 1.女性 2.男性
        "city": "南京", 
        "province": "江苏省",
        "country": "中国",
        "openid": "11232323231aaa",
        "avatar": "http://aaasd.wwa.com" //头像
      }     
```
#### 获取用户的小鱼干数量
```
url：/customer/getReward?uid=6
method:get
res:{
        "result": true,
        "data": {
            "reward": 0,//小鱼干数量
            "experience": 0 //用户经验值
        },
        "code": 200
    }
```
#### 新增标签
```
url：/tag/add
method:post
param:{
    name:'',//标签名
    color:'#ccc',//标签背景颜色
    img:''//标签图片（不填）
    desc:''//标签描述（不填）
}
```
#### 修改标签
```
url：/tag/update
method:post
param:{
    id:1,//标签id
    name:'',//标签名
    color:'标签背景颜色',
    img:''//标签图片（不填）
    desc:''//标签描述（不填）
}
```
#### 随机获取5个标签让用户选择
```
url：/tag/random
method:get
res: [
            {
                "id": 3,
                "name": "不听话",
                "img": null,
                "color": "#000",
                "status": 0,
                "desc": null,
                "createTime": null,
                "updateTime": null,
                "createPerson": null,
                "updatePerson": null
            },
            {
                "id": 2,
                "name": "高冷",
                "img": null,
                "color": "#000",
                "status": 0,
                "desc": null,
                "createTime": null,
                "updateTime": null,
                "createPerson": null,
                "updatePerson": null
            },
            {
                "id": 4,
                "name": "皮！",
                "img": null,
                "color": "#000",
                "status": 0,
                "desc": null,
                "createTime": null,
                "updateTime": null,
                "createPerson": null,
                "updatePerson": null
            },
            {
                "id": 6,
                "name": "飞檐走壁",
                "img": null,
                "color": "#000",
                "status": 0,
                "desc": null,
                "createTime": null,
                "updateTime": null,
                "createPerson": null,
                "updatePerson": null
            },
            {
                "id": 1,
                "name": "活蹦乱跳",
                "img": null,
                "color": "#ccc",
                "status": 0,
                "desc": null,
                "createTime": null,
                "updateTime": null,
                "createPerson": null,
                "updatePerson": null
            }
        ]
```
#### 新增猫咪
```
url：/customerCat/add
method:post
param:{
   "uid":6,//用户id
   "name":"柚子",//猫咪姓名
   "birthday":"2017-05-06",//生日
   "homeTime":"2017-05-08",//到家日期
   "avatar":"wwwwww",//头像url
   "variety":"英短",//品种
   "gender":1,//性别 0被阉割 1母猫 2公猫
   "tagIds":[1,2] //选择的标签id
   }
```

#### 修改猫咪信息
```
url：/customerCat/update
method:post
param:{
    "id":2//猫咪id
   "name":"柚子",//猫咪姓名
   "birthday":"2017-05-06",//生日
   "homeTime":"2017-05-08",//到家日期
   "avatar":"wwwwww",//头像url
   "variety":"英短",//品种
   "gender":1,//性别 0被阉割 1母猫 2公猫
   }
```

#### 查询用户所注册的猫咪信息
```angular2html
url：customerCat/getByUid?uid=6
method:get
res:{
          "result": true,
          "data": [
              {
                  "id": 2,
                  "uid": 6,
                  "name": "柚子",
                  "birthday": "2017-05-06",
                  "age": "3岁",
                  "homeTime": "2017-05-08",
                  "gender": 0,
                  "avatar": "wwwwww",
                  "variety": "英短",
                  "createTime": "2019-07-17T08:58:39.000Z",
                  "updateTime": null,
                  "createPerson": null,
                  "updatePerson": null,
                  "tags": [
                      {
                          "catId": 2,
                          "tagId": 1,
                          "name": "活蹦乱跳",
                          "color": "#ccc",
                          "desc": null,
                          "img": null
                      },
                      {
                          "catId": 2,
                          "tagId": 2,
                          "name": "高冷",
                          "color": "#000",
                          "desc": null,
                          "img": null
                      }
                  ]
              }
          ],
          "code": 200
      }
```
#### 根据猫咪id查询猫咪信息
```angular2html
url：customerCat/getByUid?uid=6
method:get
res:{
          "result": true,
          "data": [
              {
                  "id": 2,
                  "uid": 6,
                  "name": "柚子",
                  "birthday": "2017-05-06",
                  "age": "3岁",
                  "homeTime": "2017-05-08",
                  "gender": 0,
                  "avatar": "wwwwww",
                  "variety": "英短",
                  "createTime": "2019-07-17T08:58:39.000Z",
                  "updateTime": null,
                  "createPerson": null,
                  "updatePerson": null,
                  "tags": [
                      {
                          "catId": 2,
                          "tagId": 1,
                          "name": "活蹦乱跳",
                          "color": "#ccc",
                          "desc": null,
                          "img": null
                      },
                      {
                          "catId": 2,
                          "tagId": 2,
                          "name": "高冷",
                          "color": "#000",
                          "desc": null,
                          "img": null
                      }
                  ]
              }
          ],
          "code": 200
      }
```
#### 根据猫咪id获取猫咪信息
```angular2html
url：/customerCat/getById?id=2
method:get
res:{
    "result": true,
    "data": {
        "id": 2,
        "uid": 6,
        "name": "柚子",
        "birthday": "2017-05-06",
        "age": "3岁",
        "homeTime": "2017-05-08",
        "gender": 0,
        "avatar": "wwwwww",
        "variety": "英短",
        "createTime": "2019-07-17T08:58:39.000Z",
        "updateTime": null,
        "createPerson": null,
        "updatePerson": null,
        "tags": [
            {
                "id": 1,
                "name": "活蹦乱跳",
                "color": "#ccc",
                "desc": null,
                "img": null
            },
            {
                "id": 2,
                "name": "高冷",
                "color": "#000",
                "desc": null,
                "img": null
            }
        ],
        "reward": 0,
        "charm": 0,
        "experience": 0
    },
    "code": 200
}
```

#### 发帖
```angular2html
url:/topicContent/sendTopicContent
method:post
param:{
        "topicId":1,//话题id 【选填】
      	"title": "title",//标题 【选填】
        "imgs": ["imgs1","imgs2","imgs3"],//图片url列表
        "content":"content",//内容
        "uid": 6//用户id
      }
```
#### 查询发帖列表
```angular2html
url:/topicContent/topicContentList
method:post
param:{       
    "page": 1,
    "size": 10,
    "topicId": 0,//话题id
    "uid":6,
    "type": 0 // 0:用户发帖 1，官方帖
}
res:{
        "result": true,
        "data": [
            {   //用户帖
                "id": 9,
                "topicTitle":"话题名称"
                "title": "title",//标题
                "topicId": null,//话题id
                "content": "title",//内容
                "reward": null,//奖励的小鱼干数量
                "uid": 6,//发帖用户id
                "catId": 2,//发帖猫咪id
                "status": 1,//发帖状态1为显示0不显示
                "createTime": "2019-07-17T13:23:19.000Z",
                "updateTime": null,
                "createPerson": null,
                "updatePerson": null,
                "catInfo": {
                    "name": "柚子",//猫咪名字
                    "avatar": "wwwwww"//猫咪头像
                },
                "rewardMark": false,//当前用户点赞标记
                "img": "imgs1111"//帖子首张图url
            },
            {   //官方帖
                "id": 10,
                "url":'/aa/xxx' ,//跳转url目前支持跳转至话题页面 
                "sort":3 ,//排序在总列的第几个位置
                "cornerImg"：'http://,,,,'//角标
                "title": "title",
                "topicId": null,
                "content": "title",
                "reward": null,
                "uid": 0,
                "catId": 0,
                "status": 1,
                "createTime": "2019-07-17T13:36:05.000Z",
                "updateTime": null,
                "createPerson": null,
                "updatePerson": null,
                "rewardMark": false,
                "img": "imgs1222"
            },
            {
                "id": 11,
                "title": "title",
                "topicId": null,
                "content": "content",
                "reward": null,
                "uid": 6,
                "catId": 2,
                "status": 1,
                "createTime": "2019-07-17T13:39:05.000Z",
                "updateTime": null,
                "createPerson": null,
                "updatePerson": null,
                "catInfo": {
                    "name": "柚子",
                    "avatar": "wwwwww"
                },
                "rewardMark": false,
                "img": "imgs13333"
            }
        ],
        "code": 200
    }  
```
#### 点赞
```angular2html
url:/topicContent/toReward
method:post
param:{        "contentUid": 6,
              "uid": 6,
              "contentId": 9 ,
              "contentCatId": 2}
```

#### 发起评论
```angular2html
url:/topicContent/toReplies
method:post
param: {
              "uid": 6,当前用户id
              "catId":0,//当前用户猫咪id [选填]
              "contentId": 9,//当前贴id
              "content":"你好哈",//回复内容
              "repliedUid": 7,//被回复者的用户id [选填]
              "repliedCatId": 3,//被回复者的猫咪id [选填]
              "fatherId": 1 //上一级回复的id [选填]
          }
desc:回复分为一级回复（回复当前贴的第一层级回复） 和二级回复（跟评一级回复的评论），                     
    用户回复的是一级回复是没有repliedUid，repliedCatId，fatherId，这三个参数可以不用穿
    用户回复当前的一级评论则repliedUid，repliedCatId，这2个参数不传fatherId为当前的一级回复id
    用户回复二级回复的评论repliedUid，repliedCatId，fatherId，这三个参数必传
```

#### 评论列表
```angular2html
url:/topicContent/getReplieList
method:post
param:{
      	"contentId":9,
      	"page":1,
      	"size":10,
      	"fatherId":0//父类id[选填]
      }
res:{
        "result": true,
        "data": [ //一级回复内容
            {
                "id": 1,
                "contentId": 9,
                "fatherId": 0,
                "content": "你好哈",
                "uid": 6,//当前一级评论者的用户id
                "catId": 2, //当前一级评论者的猫咪id
                "content":"你好哈",//回复内容
                "repliedUid": 7,//被回复者的用户id
                "repliedCatId": 3,//被回复者的猫咪id 
                "fatherId": 0 //上一级回复的id 
                "createTime": "2019-07-22T14:33:44.000Z",
                "updateTime": null,
                "createPerson": null,
                "updatePerson": null,
                "catInfo": {
                    "name": "柚子",//当前一级评论者的猫咪姓名
                    "gender": 0,//当前一级评论者的猫咪性别 0 公公 1 母猫 2公猫
                    "avatar": "wwwwww",//当前一级评论者的猫咪头像
                    "variety": "英短" //当前一级评论者的猫咪性别品类
                },
                "child": [//二级回复内容
                    {
                        "id": 3,
                        "contentId": 9,
                        "fatherId": 1,
                        "content": "你好哈",
                        "uid": 6,
                        "catId": 2,
                        "repliedUid": 7,
                        "repliedCatId": 3,
                        "createTime": "2019-07-22T15:07:37.000Z",
                        "updateTime": null,
                        "createPerson": null,
                        "updatePerson": null,
                        "catInfo": {
                            "name": "柚子",
                            "gender": 0,
                            "avatar": "wwwwww",
                            "variety": "英短"
                        },
                        "repliedCatInfo": {
                            "name": "柚子2号",
                            "gender": 0,
                            "avatar": "wwwwww",
                            "variety": "暹罗"
                        }
                    },
                    {
                        "id": 2,
                        "contentId": 9,
                        "fatherId": 1,
                        "content": "你好哈",
                        "uid": 7,
                        "catId": 3,
                        "repliedUid": 0,
                        "repliedCatId": 0,
                        "createTime": "2019-07-22T15:06:49.000Z",
                        "updateTime": null,
                        "createPerson": null,
                        "updatePerson": null,
                        "catInfo": {
                            "name": "柚子2号",
                            "gender": 0,
                            "avatar": "wwwwww",
                            "variety": "暹罗"
                        }
                    }
                ]
            }
        ],
        "code": 200
    }
```
#### 文件上传
```angular2html
uri:/file/upload
method:post
param:file
res:{
    data:'图片url'
    }
```
#### 查询猫品种列表
```angular2html
uri:/data/variety
method:get
res:[{
    name:'品种'
    }]
```
#### 查询猫咪排名
```angular2html
uri:/rank/list
method:get
param:{
    page:1
    size:3//前3名
}
res:[{
    uid:1,
    catId:1
    beforeReward:0，//上周获得的小鱼干
    nowReward: 1，//本周获得的小鱼干
    catInfo:{
        name:猫咪姓名
        avatar:猫咪头像
    }  
    }]
```

#### 所有可使用的标签列表
```angular2html
uri：/tag/getTags
method: get
param: 无
res："data": [
            {
                "id": 1,
                "name": "活蹦乱跳",
                "img": null,
                "color": "#ccc",
                "status": 1,
                "desc": "aaa",
                "createTime": null,
                "updateTime": null,
                "createPerson": null,
                "updatePerson": null
            },]

```


#### 兑换卡片列表
```angular2html
uri: /goods/getCards?uid=12
param: uid //用户id
method:get
res:{
    "result": true,
    "data": [
        {
            "buyFlag": true, //购买标记
            "id": 1,
            "goodsId": 1,
            "price": 10,//鱼干价格
            "activePrice": 10,//活动价格
            "unit": 0,
            "createTime": "2019-10-01T12:55:40.000Z",
            "updateTime": null,
            "createPerson": null,
            "updatePerson": null,
            "name": "主题1",
            "imgUrl": "http://img0.imgtn.bdimg.com/it/u=2898784471,2954769225&fm=26&gp=0.jpg",
            "typeId": 1 //商品类型1为卡片
        }
    ],
    "code": 200
}
```


#### 用户卡片列表
```angular2html
uri: /goods/getCustomerCards?uid=12
method: get
param:{
   uid
}
res:{
        "result": true,
        "data": [
            {
                "id": 1, //用户拥有的卡片id
                "name": "主题1", //卡片名称
                "imgUrl": "http://img0.imgtn.bdimg.com/it/u=2898784471,2954769225&fm=26&gp=0.jpg",
                "typeId": 1, 
                "createTime": "2019-10-01T12:59:04.000Z",
                "updateTime": "2019-10-01T12:59:04.000Z",
                "createPerson": null,
                "updatePerson": null,
                "uid": 12,
                "goodsId": 1, //商品id
                "goodsType": 1,// 商品类型1是卡片
                "useType": 0 //使用状态0未使用 1已使用
            }
        ],
        "code": 200
    }
```


#### 选择卡片
```angular2html
uri: /goods/chooseCard
method:post
param:{
   uid,
   id //用户拥有卡片id
}
```

#### 购买卡片
```angular2html
uri: /goods/buyCard
method:post
param:{
   uid
   goodsId
}
```

#### 查询当前使用卡片背景
```angular2html
uri: /goods/getUsedCard?uid=12
method:get
param:{
   uid
},
res:{
        "result": true,
        "data": "http://img0.imgtn.bdimg.com/it/u=2898784471,2954769225&fm=26&gp=0.jpg",
        "code": 200
    }
```
#### 修改发帖内容
```angularjs2html
uri: /topicContent/updateContent
method:post
param:{
   id:1 //帖子id
   imgs:[] //图片数组
   content:'asdasd' //发帖内容
   topicId: ''// 主题内容
},
```


#### 修改评价内容
```angularjs2html
uri: /topicContent/updateReplie
method:post
param:{
   id:1 //评价id
   content:'asdasd' //评价内容
},
```

#### 删除发帖内容
```angularjs2html
uri: /topicContent/delContent?id=1
method:get
param:{
   id:1 //帖子id
},
```

#### 删除评价内容
```angularjs2html
uri: /topicContent/delReplie?id=1
method:get
param:{
   id:1 //评价id
},
```

#### 内容列表
```
uri: /content/contentList
method:post
param:{
    page:1
    size: 10
    uid:2
}
res:【{
    id:1,
    title:'给猫猫洗澡' //string 标题,
    desc: '今天来交大家洗澡' //string 描述,
    content: [{msg:'xxxxxxxxx',type:0},{img: 'xxxxx',type:1}] //array 正文内容,
    coverImg: ''//string 背景图片url,
    like: 10 //number 点赞数量,
    read: 10 // number 已读数量,
    repliesCount:10 // number 评论数量,
    createTime: data//创建时间,
    status:1 // 1为展示0位隐藏
    likeFlag: true// 当前用户是否点赞过
}】
```
#### 提交评论
```
uri: /content/toReplies
method:post
param:{
       uid: 2,
       contentId: 1//内容id,
       content: ''// 评论内容,
       repliedUid: 2//被回复用户uid,
       fatherId: 0// 上一级评论id
       （规则和帖子详情页评论一致）
}
```
#### 评论列表
```
uri: /content/repliesList
method:post
param:{
         contentId:1,
         page: 1,
         size: 10,
         fatherId: 2
       （规则和帖子详情页评论一致）
}
res:{
        "result": true,
        "data": [ //一级回复内容
            {
                "id": 1,
                "contentId": 9,
                "fatherId": 0,
                "content": "你好哈",
                "uid": 6,//当前一级评论者的用户id
                "content":"你好哈",//回复内容
                "repliedUid": 7,//被回复者的用户id
                "fatherId": 0 //上一级回复的id 
                "createTime": "2019-07-22T14:33:44.000Z",
                "updateTime": null,
                "createPerson": null,
                "updatePerson": null,
                "userInfo": {
                    "userName": "XXX",//当前一级评论者姓名
                     "gender": 0,
                    "avatar": "wwwwww",//当前一级评论者头像                   
                },
                "child": [//二级回复内容
                    {
                        "id": 3,
                        "contentId": 9,
                        "fatherId": 1,
                        "content": "你好哈",
                        "uid": 6,
                        "repliedUid": 7,
                        "createTime": "2019-07-22T15:07:37.000Z",
                        "updateTime": null,
                        "createPerson": null,
                        "updatePerson": null,
                        "userInfo": {
                            "userName": "xxx",
                            "gender": 0,
                            "avatar": "wwwwww",
                        },
                        "repliedUserInfo": {
                            "name": "xxx",
                            "gender": 0,
                            "avatar": "wwwwww",
                        }
                    },
                    {
                        "id": 2,
                        "contentId": 9,
                        "fatherId": 1,
                        "content": "你好哈",
                        "uid": 7,
                        "repliedUid": 0,
                        "createTime": "2019-07-22T15:06:49.000Z",
                        "updateTime": null,
                        "createPerson": null,
                        "updatePerson": null,
                        "userInfo": {
                            "userName": "XX",
                            "gender": 0,
                            "avatar": "wwwwww",
                        }
                    }
                ]
            }
        ],
        "code": 200
    }
```

#### 内容详情
```
uri: /content/contentDetail
method:post
param:{
    contentId: 1  //内容id,
    uid: 当前用户用户uid,
}
res: {
    id:1,
    title:'给猫猫洗澡' //string 标题,
    desc: '今天来交大家洗澡' //string 描述,
    content: [{msg:'xxxxxxxxx',type:0},{img: 'xxxxx',type:1}] //array 正文内容,
    coverImg: ''//string 背景图片url,
    like: 10 //number 点赞数量,
    read: 10 // number 已读数量,
    repliesCount:10 // number 评论数量,
    createTime: data//创建时间,
    status:1 // 1为展示0位隐藏
    likeFlag: true// 当前用户是否点赞过
}
```
#### 内容点赞
```
uri: /content/toLike
method:post
param:{
    contentId: 1  //内容id,
    uid: 当前用户用户uid,
}
```