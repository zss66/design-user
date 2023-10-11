//验证数据库中的用户信息
const userconnect = {
    userts(user) {
        return 'select * from user where Tel=' + user + '';
    },
    pedts(user, pwd) {
        return `select * from user where (Tel=${user})and pwd = '${pwd}';`
    },
    adduser(msg) {
        return 'INSERT INTO user (tel, pwd,nickname) VALUES ("' + msg.phone + '","' + msg.password + '","' + msg.nicheng + '");'
    },
    newpsd(phone, psd) {
        return `UPDATE user SET pwd = '${psd}'  WHERE tel = '${phone}'; `;
    },
    newtoken(phone, token) {
        return `UPDATE user SET token = '${token}'  WHERE tel = '${phone}'; `;
    }
};
module.exports = userconnect;