import React, { useState,useEffect } from 'react';
import {ScrollView, Text, View} from 'react-native';
import {SingleMatch} from './singleMatch';

const MatchList = props => {
    const URLMatches =  ("http://192.168.1.30:5000/api/israel/matches/get/");
    const URLTeams =  ("http://192.168.1.30:5000/api/israel/teams/get/");
    const [matches,setMatches] = useState([]);
    const matchContainer = {
        width:"100%",
        paddingRight: 10,
        paddingLeft: 10
    }
    const setMatchFunc = () =>{
        getMatches(URLTeams,URLMatches,setMatches);
    }
    useEffect(() => {
        try{ setMatchFunc() } catch(e) { console.error(e); } 
    }, [])
    return (
        <ScrollView style={matchContainer}>{matches}</ScrollView> 
        );
};

const getMatches = (URLTeams,URLMatches,setMatches) => {
    fetch(URLTeams)
        .then(response => {
            return response.json()
        })
        .then(dataJson => {
            if (dataJson.status == "OK"){
                let teamsNames = dataJson.data;
                let teamArr = [];
                let teamArrImg = [];
                for (let index = 0; index < teamsNames.length; index++) {
                    const element = teamsNames[index];
                    teamArr[teamsNames[index].id] = teamsNames[index].nameHebrew
                    teamArrImg[teamsNames[index].id] = teamsNames[index].imgUrl
                }
                renderMatches(URLMatches,teamArr,teamArrImg,setMatches);

            }
        })
        .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            console.log(error);
        })
}
const renderMatches = (URLMatches,teamsNames,teamsImg,setMatches) => {
    fetch(URLMatches)
            .then(response => {
                return response.json()
            })
            .then(dataJson => {
                if (dataJson.status=="OK"){
                    var tempMatches = [];
                    for (let index = 0; index < dataJson.data.length; index++) {
                        tempMatches.push(
                            <SingleMatch
                            key = {index}
                            matchDate = {dataJson.data[index].match_date}
                            homeTeamName = {teamsNames[dataJson.data[index].home_team_id]}
                            homeTeamImg = {teamsImg[dataJson.data[index].home_team_id]}
                            awayTeamName = {teamsNames[dataJson.data[index].away_team_id]}
                            awayTeamImg = {teamsImg[dataJson.data[index].away_team_id]}
                            homeTeamScore = {dataJson.data[index].home_team_score}
                            awayTeamScore = {dataJson.data[index].away_team_score}
                            />
                        );
                    }
                    setMatches(tempMatches);
                }
            })
            .catch(function(error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                console.log(error);
            })
}
export {MatchList};