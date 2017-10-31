
  //WelcomeContainer

  import React, { Component } from 'react';
  import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Animated
  } from 'react-native';
  import utils from '../constants/utils';
  import ly from '../resources/images/aimiliya.jpg';
  import hello from '../resources/images/hello.jpg';
  
  
  
  class WelcomeContainer extends Component {
   
    render() {
        this._animatedValue = new Animated.Value(0);
        let interpolatedColorAnimation = this._animatedValue.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, 1]
                });
      return (
       
        <View style={styles.container}>
       {/** <Animated.Image
                    onLoadEnd={() => {
                        Animated.timing(this._animatedValue, {
                            toValue: 100,
                            duration: 500
                        }).start()
                    }}
                source={hello} style={[styles.img, { opacity: interpolatedColorAnimation} ]}/>}*/}
        <Text style={{fontSize:20,margin:10}}>Welcome to Re:World</Text>
       <Image style={{height:200,width:300,margin:10}} source={ly} resizeMode="contain"></Image>
     <View style={{flexDirection:'row'}}>
       <TouchableOpacity style={{width:100,height:100,borderRadius:50,margin:10,backgroundColor:'#91bef0',justifyContent:'center'}}
       onPress={() => utils.viewTo('HomeContainer')}>
       <Text style={styles.instructions}>
       雷姆
      </Text>
       </TouchableOpacity>
      
  {/**   <Image source={leimu}   style={{width:200,height:200}}resizeMode="cover"></Image>*/} 
       <TouchableOpacity style={{width:100,height:100,borderRadius:50,margin:10,backgroundColor:'#f8aec0',justifyContent:'center'}}
       onPress={() => utils.viewTo('MineContainer')}>
       <Text style={styles.instructions}>
       拉姆
      </Text>
      </TouchableOpacity>
      </View>
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
    img: {
        flex: 1,
        resizeMode: 'contain'
    },
  });
  export default WelcomeContainer;