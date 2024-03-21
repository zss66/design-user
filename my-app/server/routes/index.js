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
        return false
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
//刷新token
router.post('/api/refreshtoken', function (req, res) {
  let token = req.headers.token;
  if (verifyToken(token)) {
    let tokenObj = jwt.decode(token);
    let user = tokenObj.user
    let info = {
      user: user
    }
    let newtoken = createToken(info)
    connection.query(userconnect.newtoken(user, newtoken), function (err, results) {
      if (!err) {
        res.send({
          error: err,
          code: 200,
          newtoken,
        })
      }
    })


  }
})
//删除收货地址
router.post("/api/deleteAddress", function (req, res, next) {
  let id = req.body.id;
  connection.query(
    `delete from address where id = ${id}`,
    function (error, results) {
      res.send({
        data: {
          code: 200,
          success: true,
          msg: "删除成功",
        },
      });
    }
  );
});

//修改收货地址
router.post("/api/updateAddress", function (req, res, next) {
  //token
  let token = req.headers.token;
  let tokenObj = jwt.decode(token);
  //拿到前端给后端传入的数据
  let body = req.body;
  let [
    id,
    name,
    tel,
    province,
    city,
    county,
    addressDetail,
    isDefault,
    areaCode,
  ] = [
      body.id,
      body.name,
      body.tel,
      body.province,
      body.city,
      body.county,
      body.addressDetail,
      body.isDefault,
      body.areaCode,
    ];
  //查询用户
  connection.query(
    `select * from user where tel = ${tokenObj.tel}`,
    function (error, results) {
      //用户id
      let uId = results[0].id;
      //对应查询到0 或者 1 有没有默认收货地址
      connection.query(
        `select * from address where uId = ${uId} and isDefault=1`,
        function (err, result) {
          if (isDefault == 1) {
            if (result.length == 0) {
              let updateSql = `update address set uId = ? , name = ? , tel = ? , province = ? , city = ? ,county = ? , addressDetail = ? , isDefault = ? , areaCode = ? where id = ${id}`;
              connection.query(
                updateSql,
                [
                  uId,
                  name,
                  tel,
                  province,
                  city,
                  county,
                  addressDetail,
                  isDefault,
                  areaCode,
                ],
                function (errors, datas) {
                  res.send({
                    data: {
                      code: 200,
                      success: true,
                      msg: "修改成功",
                    },
                  });
                }
              );
            } else {
              let uIdd = result[0].id;
              connection.query(
                `update address set isDefault = replace(isDefault,'1','0') where id = ${uIdd}`,
                function (e, r) {
                  let updateSql = `update address set uId = ? , name = ? , tel = ? , province = ? , city = ? ,county = ? , addressDetail = ? , isDefault = ? , areaCode = ? where id = ${id}`;
                  connection.query(
                    updateSql,
                    [
                      uId,
                      name,
                      tel,
                      province,
                      city,
                      county,
                      addressDetail,
                      isDefault,
                      areaCode,
                    ],
                    function (errors, datas) {
                      res.send({
                        data: {
                          code: 200,
                          success: true,
                          msg: "修改成功",
                        },
                      });
                    }
                  );
                }
              );
            }
          } else {
            let updateSql = `update address set uId = ? , name = ? , tel = ? , province = ? , city = ? ,county = ? , addressDetail = ? , isDefault = ? , areaCode = ? where id = ${id}`;
            connection.query(
              updateSql,
              [
                uId,
                name,
                tel,
                province,
                city,
                county,
                addressDetail,
                isDefault,
                areaCode,
              ],
              function (errors, datas) {
                res.send({
                  data: {
                    code: 200,
                    success: true,
                    msg: "修改成功",
                  },
                });
              }
            );
          }
        }
      );
    }
  );
});
//增加地址
router.post("/api/addAddress", function (req, res, next) {
  //token
  let token = req.headers.token;
  let tokenObj = jwt.decode(token);
  let body = req.body;
  let [name, tel, province, city, county, addressDetail, isDefault, areaCode] =
    [
      body.name,
      body.tel,
      body.province,
      body.city,
      body.county,
      body.addressDetail,
      body.isDefault,
      body.areaCode,
    ];
  //查询用户
  connection.query(
    `select * from user where tel = ${tokenObj.tel}`,
    function (error, results) {
      //用户id
      let uId = results[0].id;

      //增加一条收货地址
      if (isDefault != 1) {
        connection.query(
          `insert into address (uId,name,tel,province,city,county,addressDetail,isDefault,areaCode) values (${uId},"${name}","${tel}","${province}","${city}","${county}","${addressDetail}","${isDefault}","${areaCode}")`,
          function (err, result) {
            res.send({
              data: {
                code: 200,
                success: true,
                msg: "收货地址添加成功",
              },
            });
          }
        );
      } else {
        connection.query(
          `select * from address where uId = ${uId} and isDefault=1`,
          function (err, result) {
            if (result.length == 0) {
              connection.query(
                `insert into address (uId,name,tel,province,city,county,addressDetail,isDefault,areaCode) values (${uId},"${name}","${tel}","${province}","${city}","${county}","${addressDetail}","${isDefault}","${areaCode}")`,
                function (e, r) {
                  res.send({
                    data: {
                      code: 200,
                      success: true,
                      msg: "收货地址添加成功",
                    },
                  });
                }
              );
            } else {
              connection.query(
                `select * from address where  isDefault = 1`,
                function (err, result) {
                  let addressId = result[0].id;
                  connection.query(
                    `update address set isDefault = replace(isDefault,'1','0') where id = ${addressId}`,
                    function () {
                      connection.query(
                        `insert into address (uId,name,tel,province,city,county,addressDetail,isDefault,areaCode) values (${uId},"${name}","${tel}","${province}","${city}","${county}","${addressDetail}","${isDefault}","${areaCode}")`,
                        function (e, r) {
                          res.send({
                            data: {
                              code: 200,
                              success: true,
                              msg: "收货地址添加成功",
                            },
                          });
                        }
                      );
                    }
                  );
                }
              );
            }
          }
        );
      }
    }
  );
});
//查询地址
router.post('/api/path', function (req, res, next) {
  let token = req.headers.token;
  let tokenObj = jwt.decode(token);
  //查询用户
  connection.query(
    `select * from user where tel=${tokenObj.tel}`,
    function (error, results) {
      //用户id
      let uId = results[0].id;
      connection.query(
        `select * from address where uId=${uId} order by isDefault desc`,
        function (err, result) {
          res.send({
            data: {
              code: 200,
              success: true,
              msg: "查询成功",
              data: result,
            },
          });
        }
      );
    }
  );

});
//商品选中状态改变
router.post("/api/checked", function (req, res, next) {
  let id = req.body.id;
  let checked = req.body.checked;
  connection.query(
    `update goods_cart set checked=${checked} where id=${id}`,
    function (err, result) {
      res.send({
        data: {
          code: 200,
          success: true,
        },
      });
    }
  );
});
//修改购物车数量
router.post("/api/updateNum", function (req, res, next) {
  let id = req.body.id;
  let changeNum = req.body.num;
  connection.query(
    `select * from goods_cart where id=${id}`,
    function (error, results) {
      //原来的数量
      let num = results[0].goods_num;
      connection.query(
        `update goods_cart set goods_num=replace(goods_num,${num},${changeNum}) where id=${id}`,
        function (err, result) {
          res.send({
            data: {
              code: 200,
              success: true,
            },
          });
        }
      );
    }
  );
});
//删除购物车数据
router.post("/api/deleteCart", function (req, res) {
  let arrId = req.body.arrId;
  console.log(arrId);
  for (let i = 0; i < arrId.length; i++) {
    connection.query(
      `delete from goods_cart where id = ${arrId[i]}`,
      function (error, results) {
        console.log(results);
      }
    );
  }
  res.send({
    data: {
      code: 200,
      success: true,
      data: "删除成功",
    },
  });
});
//查询购物车信息
router.post("/api/selectCart", function (req, res, next) {
  //token
  if (!req.headers.token) {
    res.send({
      code: 500,
      success: false,
      msg: '当前无用户登录',
    })
  }
  else {
    let token = req.headers.token;
    console.log(token);
    let tokenObj = jwt.decode(token);
    connection.query(
      `select * from user where tel = ${tokenObj.user}`,
      function (error, results) {
        //用户id
        let uId = results[0].id;
        //查询购物车
        connection.query(
          `select * from goods_cart where uId=${uId}`,
          function (err, result) {
            res.send({
              data: {
                code: 200,
                success: true,
                data: result,
              },
            });
          }
        );
      }
    );
  }

});
//加入购物车操作
router.post('/api/addcart', function (req, res, next) {
  console.log(req.body);
  let token = req.headers.token;
  let goodsId = req.body.data.id;
  let tokenObj = jwt.decode(token);
  if (verifyToken(token)) {
    connection.query(
      `select * from user where tel = ${tokenObj.user}`,
      function (error, results) {
        //用户id
        let uId = results[0].id;
        //查询商品
        connection.query(
          `select * from goods_list where id=${goodsId}`,
          function (err, result) {
            let goodsName = result[0].name;
            let goodsPrice = result[0].price;
            let goodsImgUrl = result[0].imgUrl;
            //查询当前用户在之前是否添加过本商品
            console.log(uId, goodsId);
            connection.query(
              `select * from goods_cart where uId=${uId} and goods_id=${goodsId}`,
              function (e, r) {
                if (r.length > 0) {
                  let num = r[0].goods_num;
                  connection.query(
                    `update goods_cart set goods_num = replace(goods_num,${num},${parseInt(num) + 1
                    }) where id = ${r[0].id}`,
                    function (e, datas) {
                      res.send({
                        data: {
                          code: 200,
                          success: true,
                          msg: "添加成功",
                        },
                      });
                    }
                  );
                } else {
                  //没有
                  connection.query(
                    `insert into goods_cart (uId,goods_id,goods_name,goods_price,goods_num,goods_imgUrl) values ("${uId}","${goodsId}","${goodsName}","${goodsPrice}","1","${goodsImgUrl}")`,
                    function () {
                      res.send({
                        data: {
                          code: 200,
                          success: true,
                          msg: "添加成功",
                        },
                      });
                    }
                  );
                }
              }
            );
          }
        );
      }
    );

  }
})
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
          data: results
        },

      },
    });
  })
});
//获取商品详情页
router.get('/api/shopdetail', function (req, res, next) {
  connection.query('select * from goods_list where id like"%' + req.query.id + '%"', function (error, results) {
    res.send({
      code: 0,
      data: results,
      error: error
    })
  })

});
//登录请求
router.post('/api/login', function (req, res, next) {

  let user = req.body.data.username;
  let pwd = req.body.data.userpass;
  let code = req.body.data.code;
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
