const cheerio = require('cheerio');
const puppeteer = require('puppeteer')
const ajax = require("./../services/ajax")
const te = require("./teams");
const ma = require("./matches");
const teams = te.teams;
const matches = ma.matches;
leumitLeague = [];

leumitLeague.results = async () => {
  const URL = 'https://www.livesport.com/en/soccer/israel/leumit-league/results/';
  const element = ".sportName.soccer";
  var getVisualResult = await getVisual(URL,element);
  var leumitLeagueJson =  leumitLeague.results.getJson(getVisualResult);
  return leumitLeagueJson;
}

leumitLeague.results.getJson = (getVisualResult) => {
  var jsonResult = {};
  jsonResult.status = "OK";
  const $ = cheerio.load(getVisualResult);
  $("img").each(function (index, element) {
    $(element).attr("src","https://www.livesport.com" + $(element).attr("src"));
  });
  jsonResult.leagueName = "Leumit League";
  
  var matchArray = [];
  $(".event__match").each(function  (index, element) {
    var singleMatch = {};
    singleMatch.dateTime = getFullData ($(element).find(".event__time").text());
    singleMatch.teamHomeName = getFullTeamName ($(element).find(".event__participant--home").text());
    singleMatch.teamHomeLogo = $(element).find(".event__logo--home").attr("src");
    singleMatch.teamHomeScore = $(element).find(".event__score--home").text();
    singleMatch.teamHomeScoreHalf = $(element).find(".event__part--home").text();
    singleMatch.teamAwayName = getFullTeamName($(element).find(".event__participant--away").text());
    singleMatch.teamAwayLogo = $(element).find(".event__logo--away").attr("src");
    singleMatch.teamAwayScore = $(element).find(".event__score--away").text();
    singleMatch.teamAwayScoreHalf = $(element).find(".event__part--away").text();
    matchArray.push(singleMatch);
  });
  jsonResult.data = matchArray;
  return JSON.stringify(jsonResult);
}


leumitLeague.insertResults = async (send) => {
  let leumitLeagueRes = JSON.parse ( await leumitLeague.results());
  if (leumitLeagueRes.status != "OK"){
    return {"status" : "ERROR"};
  }
  for (let i = 0; i < leumitLeagueRes.data.length; i++) {
    await leumitLeague.insertResults.insertTeams(leumitLeagueRes.data[i].teamHomeName.toLowerCase(),leumitLeagueRes.data[i].teamHomeLogo,i);
  }
  for (let i = 0; i < leumitLeagueRes.data.length; i++) {
    await leumitLeague.insertResults.insertMatches(leumitLeagueRes.data[i]);
  }
  send({"status":"OK"});
}

leumitLeague.insertResults.insertTeams = async (teamName,teamLogo,ind) => {
  teams.get((res) => {
    let teamsList = res;
    var selectedTeam = 0;
    var updateImage = false
    for (let j = 0; j < teamsList.length; j++) {
      if (teamsList[j].nameEnglish.toLowerCase() == teamName){
        selectedTeam = teamsList[j].id;
        if (teamsList[j].imgUrl == null || 1===1){
          updateImage = true;
        }
      }
    }
    if (selectedTeam == 0){
      insertJson = {
        nameEnglish:teamName
        ,nameHebrew:""
      };
      teams.post(JSON.stringify(insertJson),(res)=>{
        
      })
    }
    if (updateImage){
      
      insertJson = {
        id:selectedTeam
        ,imgUrl:teamLogo
      };
      teams.updateImage(JSON.stringify(insertJson),(res)=>{

      })
    }
  });
}



leumitLeague.insertResults.insertMatches = async (matchResult) => {
  teams.get((res) => {
    let teamsList = res;
    let selectedTeamHome = 0;
    let selectedTeamAway = 0;
    for (let j = 0; j < teamsList.length; j++) {
      if (teamsList[j].nameEnglish.toLowerCase() == matchResult.teamHomeName.toLowerCase()){
        selectedTeamHome = teamsList[j].id;
      }
      if (teamsList[j].nameEnglish.toLowerCase() == matchResult.teamAwayName.toLowerCase()){
        selectedTeamAway = teamsList[j].id;
      }
    }
    matches.get((res) => {
      let matchesList = res;
      let matchsExists = false;
      for (let j = 0; j < matchesList.length; j++) {
        var d1 = new Date(matchesList[j].match_date.toISOString().replace("T"," ").replace("Z",""));
        var d2 = new Date(matchResult.dateTime);
        if (d1.getTime() == d2.getTime()
            && matchesList[j].home_team_id.toString() == selectedTeamHome.toString()
            && matchesList[j].away_team_id.toString() == selectedTeamAway.toString()
            && matchesList[j].home_team_score.toString() == matchResult.teamHomeScore.toString()
            && matchesList[j].away_team_score.toString() == matchResult.teamAwayScore.toString()
            && matchesList[j].league_id == 1
          ){
            matchsExists = true;
        }
      }
      if (!matchsExists){

        insertJson = {
          dateTime:matchResult.dateTime
          ,teamHomeId:selectedTeamHome
          ,teamAwayId:selectedTeamAway
          ,teamHomeScore:matchResult.teamHomeScore
          ,teamAwayScore:matchResult.teamAwayScore
          ,leagueId:1
        };
        matches.post(JSON.stringify(insertJson),(res) => {

        });
      } 
    });
  });
}

var getVisual = async (URL,elementName) =>{
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(URL);
  //await page.click('.event__more');
  const element = await page.$(elementName);
  let value = await page.evaluate(el => el.innerHTML, element)
  return new Promise(function(resolve, reject) {
    resolve(value);
  })
}

var getFullTeamName = (teamName) =>{
  return(teamName.replace("H.","Hapoel")
          .replace("Hap." , "Hapoel")
          .replace("M." , "Maccabi")
  );
}
var getFullData = (matchDate) => {
  let tempTime= matchDate.replace(" ", "2023.")
  let parts = tempTime.split(".");
  return (parts[2] + "-" + parts[1] + "-" + parts[0] + " " + parts[3].substring(0,5));
}

module.exports = {leumitLeague};