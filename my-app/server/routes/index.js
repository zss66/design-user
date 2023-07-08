var express = require('express');
//引入数据库模块  ---引入模块的三种方法：
/*
1.    引入vscode自带的模块，直接require（）这种方式的优先级比较高
2.    引入自义定的模块，在引入时需要有./或者../作为标识符
3.    引入第三方模块，是在第一步搜索过后再进行引入

*/
var connection = require('../db/sql');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/api/goods/shoplist', function (req, res, next) {
  connection.query('select * from goods_list where name like"%' + req.query.name + '%"', function (error, results) {
    res.send({
      code: 0,
      data: results
    })
  })

  console.log(req.query.name);
});
router.get('/api/data', function (req, res, next) {
  // connection.query("select * from goods_list ", function (error, results) {
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
        data: "results",
      },

    },
  });
});
// });

module.exports = router;
