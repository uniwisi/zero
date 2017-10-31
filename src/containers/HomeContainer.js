
  //HomeContainer

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import utils from '../constants/utils';
import leimu from '../resources/images/leimu.jpg';



class HomeContainer extends Component {
 
  render() {
   
    return (
     
      <View style={styles.container}>
     <Image style={{height:200,width:200}} source={leimu} resizeMode="contain"></Image>
     <TouchableOpacity style={{width:100,height:100,backgroundColor:'#91bef0',justifyContent:'center'}}
     onPress={() => utils.viewTo('HomeContainer')}>
     <Text style={styles.instructions}>
     雷姆
    </Text>
     </TouchableOpacity>
    
{/**   <Image source={leimu}   style={{width:200,height:200}}resizeMode="cover"></Image>*/} 
     <TouchableOpacity style={{width:100,height:100,backgroundColor:'#f8aec0',justifyContent:'center'}}
     onPress={() => utils.viewTo('MineContainer')}>
     <Text style={styles.instructions}>
     拉姆
    </Text>
    </TouchableOpacity>
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
export default HomeContainer;