const leumitLeague = require("./leumitLeague");
const leagues = require("./leagues");
const matches = require("./matches");
const teams = require("./teams");

soccerIsrael = [];
soccerIsrael.leumitLeague = leumitLeague.leumitLeague;
soccerIsrael.leagues = leagues.leagues;
soccerIsrael.matches = matches.matches;
soccerIsrael.teams = teams.teams;


module.exports = {soccerIsrael};