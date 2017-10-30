/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  AppRegistry,
  Text,
  View
} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import utils from './src/constants/utils';



const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
// const { navigate } = this.props.navigation;

export default class reactNative extends Component {
 
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to 从零开始!
        </Text>
     
        <View style={{width:100,height:100,backgroundColor:'#91bef0'}}>
        <AppNavigator
        ref={this.setNavGlobal}
        onNavigationStateChange={utils.doWithRouteChange}
        />
        </View> 
        <Text style={styles.instructions}>
       雷姆
      </Text>
        <View style={{width:100,height:100,backgroundColor:'#91bef0'}}/>
        <Text style={styles.instructions}>
        拉姆
       </Text>
        <View style={{width:100,height:100,backgroundColor:'#f8aec0'}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('hhjDiary', () => reactNative);
