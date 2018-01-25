//GameThreeContainer


import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import Swiper from 'react-native-swiper';

import lamu from '../resources/images/lamu.jpg';
import background1 from '../resources/images/aimiliya.jpg';
import background2 from '../resources/images/hello.jpg';
import background3 from '../resources/images/lamu.jpg';
import background4 from '../resources/images/leimu.jpg';
import background5 from '../resources/images/hello.jpg';
import background6 from '../resources/images/lamu.jpg';


const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  swpirBox: {
    height: 200,
    width,
  },
  flex1: {
    flex: 1,
  },
  container: {
    height: height / 2,
    width,
  },
  title: {
    height: 20,
    marginTop:24,
    justifyContent:'center',
    alignItems:'center',
  },
  titleText: {
    fontSize: 16,
    color:'rgb(239,29,29)'
  },
  button: {
    backgroundColor:'#CCEEFF',
    paddingHorizontal:20,
    paddingVertical:10,
    justifyContent:'center',
    alignItems:'center',
  },
  paper:{
    width:60,
    height:100,
    backgroundColor:'rgb(255,255,255)',
    margin: 20,
    alignItems:'center',
    justifyContent:'center',
  },
  papers:{
    padding: 20,
    flexDirection:'row',
    flexWrap:'wrap',
  },
});

class GameThreeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: ['村民','村民','村民','村民',
                 '狼人','狼人','狼人','狼人', 
                 '先知','女巫','猎人','白痴',
                ],
      show: false,
    };
  }


  componentDidMount() {
  
  }

  random=(min, max) =>{
    if (max == null) {
    max = min;
    min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
    }
   shuffle=(arr)=> {
    var length = arr.length,
    shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
    rand = this.random(0, index);
    if (rand !== index) shuffled[index] = shuffled[rand];
    shuffled[rand] = arr[index];
    }
    return shuffled;
    }

range=()=>{
    const arr =this.state.dataList;
for ( i = 0; i < 10; i++){
    this.setState({dataList:this.shuffle(arr)});
}
}


  render() {
    const {
      dataList,
      show,
    }=this.state;
    return (
      <ScrollView style={[styles.flex1,{flexDirection:'column'}]}>
      <View style={styles.title}>
        <Text style={styles.titleText}>狼人杀--鱼塘争霸赛</Text>
      </View>
      <TouchableOpacity  style={styles.button}
      onPress={() => this.range()}>
      <Text style={styles.instructions}>发牌</Text></TouchableOpacity>
      <TouchableOpacity  style={styles.button}
      onPress={() =>this.setState({show:!show})}>
      <Text style={styles.instructions}>上帝视角</Text></TouchableOpacity>
      <View style={styles.papers}> 
      {dataList.map((item,i)=>(
            <TouchableOpacity 
            key={i+1} 
            style={styles.paper}
            onPress={() =>alert(item)}
            ><Text>{show?item:i+1}</Text></TouchableOpacity>
        ))}
        </View> 
      </ScrollView>
    );
  }
}


export default GameThreeContainer;