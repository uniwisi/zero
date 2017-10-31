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
  StatusBar,
  TouchableOpacity
} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import utils from './src/constants/utils';


  // 设定navigator为全局可引用的变量
  setNavGlobal = (nav) => {
    this.navigator = nav;
    global.navigation = nav;
  }


export default class reactNative extends Component {
 
  render() {
    return (
      <View style={styles.container}>
      <StatusBar backgroundColor="#91bef0" translucent barStyle={'light-content'} />
      <View style={{flex:1,width:200,height:300}}>
        <AppNavigator
        ref={this.setNavGlobal}
        onNavigationStateChange={utils.doWithRouteChange}
        />
        </View>
        <TouchableOpacity
        style={{height:100,width:100,borderRadius:50,backgroundColor:'#91bef0',justifyContent:'center',alignItems:'center'}}
        onPress={() => utils.viewTo('MineContainer')}
    >
        <Text>开始冒险</Text>
    </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent('hhjDiary', () => reactNative);
