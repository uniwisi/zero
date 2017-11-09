
//WelcomeContainer

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  TextInput
} from 'react-native';
import forge from 'node-forge';
import utils from '../constants/utils';
import ly from '../resources/images/aimiliya.jpg';
import hello from '../resources/images/hello.jpg';



class WelcomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '', // init 
      dataSource:'',
    };
  }
  componentDidMount() {
  //  this.fetchData();
    // this.md5();

  }

  md5 = (str) => {
    var md = forge.md.md5.create();
    md.update(str);
    return (md.digest().toHex());
  }
  fetchData() {
    fetch('http://crm.ctsec.com:10001/DLSC/nomarlUpdate.json')
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
         // debugger;
          // this.setState({

          //   : this.state.dataSource.cloneWithRows(responseJson.data)
          // })
        })
        .catch((error) => {
          console.error(error);
        });
  }
  



  render() {
    this._animatedValue = new Animated.Value(0);
    let interpolatedColorAnimation = this._animatedValue.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1]
    });
    // var md = forge.md.md5.create();
    // md.update('87336836');
    // console.log(md.digest().toHex());
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
        <Text style={{ fontSize: 20, margin: 10 }}>Welcome to Re:World</Text>
        <TextInput
        style={{width:100,height: 40, }}
        multiline = {false}
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}>
        </TextInput>
        <Text>{this.md5(this.state.text)}</Text>
        <Image style={{ height: 200, width: 300, margin: 10 }} source={ly} resizeMode="contain"></Image>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={{ width: 100, height: 100, borderRadius: 50, margin: 10, backgroundColor: '#91bef0', justifyContent: 'center' }}
            onPress={() => utils.viewTo('HomeContainer')}>
            <Text style={styles.instructions}>
              雷姆
      </Text>
          </TouchableOpacity>

          {/**   <Image source={leimu}   style={{width:200,height:200}}resizeMode="cover"></Image>*/}
          <TouchableOpacity style={{ width: 100, height: 100, borderRadius: 50, margin: 10, backgroundColor: '#f8aec0', justifyContent: 'center' }}
            onPress={() => utils.viewTo('MineContainer')}>
            <Text style={styles.instructions}>
              拉姆
      </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity  style={{backgroundColor:'#CCEEFF',paddingHorizontal:20,paddingVertical:10}}
        onPress={() => utils.viewTo('TestContainer')}>
        <Text style={styles.instructions}>game-->1</Text></TouchableOpacity>
        <TouchableOpacity  style={{backgroundColor:'#CCEEFF',paddingHorizontal:20,paddingVertical:10}}
        onPress={() => utils.viewTo('GameTwoContainer')}>
        <Text style={styles.instructions}>game-->2</Text></TouchableOpacity>
        
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