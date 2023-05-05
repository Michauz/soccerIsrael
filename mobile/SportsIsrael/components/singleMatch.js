import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
const SingleMatch = props => {
    const matchDate = new Date (props.matchDate);
    const dateStr = matchDate.toLocaleDateString('en-GB',{hour24: true}) + " " + matchDate.toLocaleTimeString('IL',{hour24: true})
    
    const styles = StyleSheet.create({
        
        tinyLogo: {
          width: 20,
          height: 20,
          
        },
        singleMatch : {
            alignItems: "center",
            backgroundColor : "#b3b3b3",
            borderRadius: "10px",
            margin: "auto",
            marginTop: 25,
            
        },
        teamName : {
            display:"flex",
            flexDirection: "row",
        },
         flexGrow : {
            flexGrow: 1,
            padding: 10
        },
         dateDiv : {
            borderBottomWidth: 1,
            width: "100%",
            alignItems:  "center",
            padding: 10,
            borderStyle: "solid",
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            backgroundColor: "#342828",
        },
         dateText : {
            color: "white"
        },
         teamScore : {
            alignItems: "center"
        },
         teamImg : {
            alignSelf: "center",
            resizeMode: 'center'
        }

      });

    return (
        <View style={styles.singleMatch}>
            <View style={styles.dateDiv}> 
                <Text style={styles.dateText} > { dateStr } </Text> 
            </View>
            <View style={styles.teamName}>
                <View style={styles.teamImg}>
                    <Image style={styles.tinyLogo} source={{uri:props.homeTeamImg}} />
                </View>
                <View style={styles.teamScore} >
                    <Text style={styles.flexGrow}> {props.homeTeamName} </Text>
                    <Text style={styles.flexGrow}> {props.homeTeamScore} </Text>
                </View>
                <View style={styles.teamScore} >
                    <Text style={styles.flexGrow}>  vs </Text>
                    <Text style={styles.flexGrow}> : </Text>
                </View>
                <View  style={styles.teamScore} >
                    <Text style={styles.flexGrow}> {props.awayTeamName} </Text>
                    <Text style={styles.flexGrow}> {props.awayTeamScore} </Text>
                </View>
                <View style={styles.teamImg}>
                    <Image style={styles.tinyLogo} source={{uri:props.awayTeamImg}} />
                </View>
            </View>
            
        </View>
    );
};

export {SingleMatch};