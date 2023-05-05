const dnsConnect = require('./../services/dnsConnect');
teams = [];
var DNS_mysql = dnsConnect.DNS_mysql;
teams.get = (callback) => {
    const sqlQuery = "SELECT id,nameEnglish,nameHebrew,imgUrl FROM `teams` ORDER BY id ASC LIMIT 1000;"
    DNS_mysql.makeQuery(sqlQuery,callback);
}

teams.post = (insertJson,callback) => {
    insertJson = JSON.parse(insertJson);
    var sqlQuery = "INSERT INTO `teams` (nameEnglish,nameHebrew) VALUES ("
    sqlQuery += "'" + insertJson.nameEnglish +"'";
    sqlQuery += ",'" + insertJson.nameHebrew +"'";
    sqlQuery += ");"    
    
    DNS_mysql.makeQuery(sqlQuery,callback);
}
teams.updateImage = (insertJson,callback) => {
    insertJson = JSON.parse(insertJson);
    var sqlQuery = "UPDATE `teams` SET "
    sqlQuery += " imgURL='" + insertJson.imgUrl +"'" 
    sqlQuery += " WHERE ID='" + insertJson.id + "'"     
    DNS_mysql.makeQuery(sqlQuery,callback);
}
module.exports = {teams};
