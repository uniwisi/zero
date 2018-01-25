//GameTwoContainer


import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
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
});

class GameTwoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [{},
      {},
      {},
      {},
      {},
      {},
      ],
    };
  }


  componentDidMount() {
    // this.getList();
  }
  render() {
    const {
      dataList
    }=this.state;
    return (
      <View style={styles.flex1}>
      <Swiper
      loop
      autoplay
      showsPagination={false}
      style={styles.container}
      autoplayTimeout={5}
    >
      {
        dataList.map((data, index) => {
          let background = background1;
          switch (index) {
            case 0: background = background1; break;
            case 1: background = background2; break;
            case 2: background = background3; break;
            case 3: background = background4; break;
            case 4: background = background5; break;
            default: background = background6;
          }
          return (
            <View style={{ flex: 1 }} key={index}>
              <Image
                style={styles.swpirBox}
                resizeMode="cover"
                source={background}
              >
                <View
                  style={styles.flex1}
                >
                <Text>hello</Text>
                </View>
              </Image>
            </View>
          );
        })
      }
    </Swiper>
      </View>
    );
  }
}


export default GameTwoContainer;