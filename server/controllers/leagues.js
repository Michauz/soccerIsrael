const dnsConnect = require('./../services/dnsConnect');
leagues = [];
var DNS_mysql = dnsConnect.DNS_mysql;
leagues.get = (callback) => {
    const sqlQuery = "SELECT id,nameEnglish,country,nameHebrew FROM `leagues` ORDER BY id ASC LIMIT 100;"
    DNS_mysql.makeQuery(sqlQuery,callback);
}

module.exports = {leagues};
