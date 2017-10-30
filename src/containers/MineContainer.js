//MineContainer

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import lamu from '../resources/images/lamu.jpg';


class MineContainer extends Component {
  render() {
    return (
      <View style={styles.container}>
      <Image style={{height:200,width:200}} source={lamu} resizeMode="contain" ></Image>
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
export default MineContainer;