const mysql = require('mysql');
const error = require('./errorHandle')
var DNS_mysql = [];
var errorHandle = error.errorHandle;
DNS_mysql.con = mysql.createConnection({
    host: "localhost",
    user: "user1",
    password: "password1",
    database: "soccer",
    timezone: 'utc'
});

DNS_mysql.con.connect(function(err) {
    if (err) {errorHandle (err)}
    else{}
});

DNS_mysql.makeQuery = async (sqlQuery,callback) => {
    DNS_mysql.con.query(sqlQuery, function(err, results){
        if (err){ 
            errorHandle(err);
        }
        return callback(results);
    })
}

module.exports = {DNS_mysql};