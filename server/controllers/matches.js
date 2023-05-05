const dnsConnect = require('./../services/dnsConnect');
matches = [];
var DNS_mysql = dnsConnect.DNS_mysql;
matches.get = (callback) => {
    const sqlQuery = "SELECT id,match_date,home_team_id,away_team_id,home_team_score,away_team_score,league_id FROM `matches` ORDER BY match_date desc LIMIT 1000;"
    DNS_mysql.makeQuery(sqlQuery,callback);
}

matches.post = (insertJson,callback) => {
    insertJson = JSON.parse(insertJson);
    var sqlQuery = "INSERT INTO `matches` (match_date,home_team_id,away_team_id,home_team_score,away_team_score,league_id) VALUES ("
    sqlQuery += "'" + insertJson.dateTime +"'";
    sqlQuery += ",'" + insertJson.teamHomeId +"'";
    sqlQuery += ",'" + insertJson.teamAwayId +"'";
    sqlQuery += ",'" + insertJson.teamHomeScore +"'";
    sqlQuery += ",'" + insertJson.teamAwayScore +"'";
    sqlQuery += ",'" + insertJson.leagueId +"'";
    sqlQuery += ");"    
    DNS_mysql.makeQuery(sqlQuery,callback);
}

module.exports = {matches};
