var express = require('express');
const UniSMS = require('unisms').default
const app = express()
const jwt = require('jsonwebtoken')
//引入数据库模块  ---引入模块的三种方法：
/*
1.    引入vscode自带的模块，直接require（）这种方式的优先级比较高
2.    引入自义定的模块，在引入时需要有./或者../作为标识符
3.    引入第三方模块，是在第一步搜索过后再进行引入

*/
//token秘钥，加密时候混淆
const secret = '123bingjspoiuytrewqlkjhgfdsa';
const user = {
  id: 10,
  name: "Bing",
  age: 18,
}

//生成token
//info也就是payload是需要存入token的信息
function createToken(info) {
  let token = jwt.sign(info, secret, {
    //Token有效时间 单位s
    expiresIn: '1d'
  })
  return token
}

//验证Token
function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}
// 初始化
var client = new UniSMS({
  accessKeyId: 'QWdd7U4cJZT5oS9F8AnAVtwKjDFibBefrsxdkx5Pf9zip7HPw',
  //accessKeySecret: 'your access key secret',  // 若使用简易验签模式请删除此行
})

var connection = require('../db/sql');
var router = express.Router();
var userconnect = require('../db/usersql')
//获取到短信验证码后，将此刻的验证码进行储存
var msgcode = undefined
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
//查询商品数据
router.get('/api/goods/shoplist', function (req, res, next) {
  connection.query('select * from goods_list where name like"%' + req.query.name + '%"', function (error, results) {
    res.send({
      code: 0,
      data: results,
      error: error
    })
  })

  console.log(req.query.name);
});
//获取首页数据
router.get('/api/data', function (req, res, next) {
  connection.query("select * from goods_list ", function (error, results) {
    res.send({
      code: 0,
      data: {
        topBar: [
          { id: 0, label: "推荐" },
          { id: 1, label: "大红袍" },
          { id: 2, label: "铁观音" },
          { id: 3, label: "绿茶" },
          { id: 4, label: "普洱" },
          { id: 5, label: "茶具" },
          { id: 6, label: "花茶" },
        ],

        //这是swiper
        swiper: {
          id: 0,
          type: "swiperList",
          data: [
            { id: 0, imgUrl: "./images/swiper1.jpeg" },
            { id: 1, imgUrl: "./images/swiper2.jpeg" },
            { id: 3, imgUrl: "./images/swiper3.jpeg" },
          ],
        },
        //这是icons
        icon: {
          id: 1,
          type: "iconsList",
          data: [
            {
              id: 1,
              title: "自饮茶",
              imgUrl: "./images/icons1.png",
            },
            {
              id: 2,
              title: "茶具",
              imgUrl: "./images/icons2.png",
            },
            {
              id: 3,
              title: "茶礼盒",
              imgUrl: "./images/icons3.png",
            },
            {
              id: 4,
              title: "领福利",
              imgUrl: "./images/icons4.png",
            },
            {
              id: 5,
              title: "官方验证",
              imgUrl: "./images/icons5.png",
            },
          ],
        },
        //爆款推荐
        recomnd: {
          id: 3,
          type: "recommendList",
          data: [
            {
              id: 1,
              name: "龙井1號铁罐250g",
              content: "鲜爽甘醇 口粮首选",
              price: "68",
              imgUrl: "./images/recommend.jpeg",
            },
            {
              id: 2,
              name: "龙井1號铁罐250g",
              content: "鲜爽甘醇 口粮首选",
              price: "68",
              imgUrl: "./images/recommend.jpeg",
            },
          ],
        },
        //猜你喜欢
        like: {
          id: 4,
          type: "likeList",
          data: [
            {
              id: 1,
              imgUrl: "./images/like.jpeg",
              name: "建盏茶具套装 红色芝麻毫 12件套",
              price: 299,
            },
            {
              id: 2,
              imgUrl: "./images/like.jpeg",
              name: "建盏茶具套装 红色芝麻毫 12件套",
              price: 299,
            },
            {
              id: 3,
              imgUrl: "./images/like.jpeg",
              name: "建盏茶具套装 红色芝麻毫 12件套",
              price: 299,
            },
          ],

        },

      },
    });
  })
});
//获取商品详情页
router.get("/api/shopdetail", function (req, res, next) {
  res.send('哈哈哈')
})
//登录请求
router.post('/api/login', function (req, res, next) {

  let user = req.body.data.username;
  let pwd = req.body.data.userpass;
  let code = req.body.data.code;
  console.log(user);
  connection.query(userconnect.userts(user), function (err, results) {

    if (results.length === 0) {
      res.send({
        error: err,
        code: 304,
        data: '查询不到此用户，请重试。',
        results

      })
    }
    else {
      //判断是否是短信验证方式
      if (code) {
        console.log(code);
        console.log(msgcode);
        if (code != msgcode) {
          res.send({
            error: err,
            code: 302,
            data: '验证码错误，请重试。'
          })
        }
        else {
          let info = {
            user
          }
          let token = createToken(info)
          results[0].token = token
          connection.query(userconnect.newtoken(user, token))
          res.send({
            error: err,
            code: 200,
            token,
            data: results[0]
          })
        }
      }
      //密码登录方案
      else connection.query(userconnect.pedts(user, pwd), function (err, results) {
        console.log(results);
        console.log(err);
        if (results.length === 0) {
          res.send({
            error: err,
            code: 302,
            data: '密码错误，请重试。'
          })
        }
        else {
          let info = {
            user
          }
          let token = createToken(info)
          results[0].token = token
          connection.query(userconnect.newtoken(user, token))
          res.send({
            error: err,
            code: 200,
            token,
            data: results[0]
          })

        }
      })
    }

  })

}
)
//获取短信验证码
router.get('/api/getcode', function (req, res, next) {
  console.log(req.query);
  //查询数据库中是否有该用户，基于此进行操作
  connection.query('select * from user where tel like"%' + req.query.phone + '%"', function (err, results) {
    if (results) {
      let randomNumber = Math.floor(Math.random() * 9000) + 1000;
      msgcode = randomNumber
      console.log(randomNumber);

      // client.send({
      //   to: req.query.phone,
      //   signature: 'zss数码',
      //   templateId: 'pub_verif_ttl3',
      //   templateData: {
      //     code: randomNumber,
      //     ttl: 3
      //   },
      // })
      //   .then(ret => {
      //     msgcode = randomNumber
      //     console.info('Result:', ret)
      //   })
      //   .catch(e => {
      //     console.error(e)
      //   })

    }
    else console.log(err);
  })
})
//注册操作
router.post('/api/zhuce', function (req, res, next) {
  console.log(req.body);
  let msg = req.body;
  connection.query(userconnect.userts(msg.phone), function (err, results) {
    if (err) throw err;
    if (results.length > 0) {
      //说明存在该用户
      res.send({
        message: '当前用户已存在，请直接登录',
        status: 304
      })
    }
    else {
      connection.query(userconnect.adduser(msg), function (err, results) {
        res.send({
          code: '注册成功',
          state: 200
        })
      })
    }
  })
});
//更换密码
router.post('/api/newpsd', function (req, res, next) {
  console.log(req.body);
  let code = req.body.sms
  let phone = req.body.phone
  let psd = req.body.psd
  if (code == msgcode) {
    connection.query(userconnect.newpsd(phone, psd), function (err, results) {
      if (err) { res.send(err) }
      else {
        console.log(results);
      }
    })
  }
  else {
    res.send({
      code: "<empty>",
      stast: 400
    })
  }
})

// });

module.exports = router;
