const mysql = require("mysql");
let connection = mysql.createConnection({
    host: "127.0.0.1",
    user: 'root',
    password: '123455',
    database: 'my_db'
});
module.exports = connection;
