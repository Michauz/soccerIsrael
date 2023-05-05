
const express = require('express');
const cors = require('cors');
const app = express();
const soccer = require("./controllers")
app.use(cors());
var soccerIsrael = soccer.soccerIsrael;
app.get("/api/israel/leumit-league/results/", async (req,res) =>{
  res.setHeader('Content-Type', 'application/json');
  res.send (await soccerIsrael.leumitLeague.results());
});

app.get("/api/israel/leumit-league/insertResults/", async (req,res) =>{
  res.setHeader('Content-Type', 'application/json');
  (await soccerIsrael.leumitLeague.insertResults((result)=>{
    res.send(result);
  }));
});

app.get("/api/israel/leagues/get/", async (req,res) =>{
  res.setHeader('Content-Type', 'application/json');
  soccerIsrael.leagues.get((results)=>{
    res.send ( results);
  })
});

app.get("/api/israel/matches/get/", async (req,res) =>{
  res.setHeader('Content-Type', 'application/json');
  soccerIsrael.matches.get((results)=>{

    res.send ( {"status":"OK","data":results});
  })
});

app.get("/api/israel/teams/get/", async (req,res) =>{
  res.setHeader('Content-Type', 'application/json');
  soccerIsrael.teams.get((results)=>{
    res.send ( {"status":"OK","data":results});
  })
});


app.listen(5000,()=>{console.log("")});

