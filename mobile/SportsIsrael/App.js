import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {MatchList} from './components/matchList'

export default function App() {
  const mainView = {
    width:"100%",
    display:"block"
  }
  return (
    <View style={mainView}>
      <MatchList />
      <StatusBar style="auto" />
    </View>
  );
}


