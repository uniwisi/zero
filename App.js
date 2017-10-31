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
  View,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import utils from './src/constants/utils';
import leimu from './src/resources/images/leimu.jpg';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
// const { navigate } = this.props.navigation;

export default class reactNative extends Component {
  // 设定navigator为全局可引用的变量
  setNavGlobal = (nav) => {
    this.navigator = nav;
    global.navigation = nav;
  }

  render() {
    return (
      <View style={styles.container}>
     
        <View style={{flex:1}}>
        <AppNavigator
        ref={this.setNavGlobal}
        onNavigationStateChange={utils.doWithRouteChange}
        />
        </View> 
     
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('hhjDiary', () => reactNative);
