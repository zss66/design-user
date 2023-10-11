const express = require('express');
const path = require('path');
const router = express.Router();

// 定义一个 GET 路由
router.get('/', (req, res) => {
    res.send('kjasj')
});
module.exports = router;
//定义一个新的路由后需要在app.js里引用，例如

