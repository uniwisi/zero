

//MineContainer

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Animated,
    Easing
} from 'react-native';
import utils from '../constants/utils';
import hello from '../resources/images/hello.jpg';

class StartScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          fadeAnim: new Animated.Value(0), // init opacity 0
        };
      }
    componentDidMount() {
        this.startAnimation();
     
    }
    startAnimation() {
      
        this.state.fadeAnim.setValue(1);
        console.log( this.state.fadeAnim);
        Animated.timing(this.state.fadeAnim, {
            toValue: 0,
            duration: 2000,
            easing: Easing.linear,// 线性的渐变函数
        }).start();
        this.timer = setTimeout(() => {
        utils.viewTo('WelcomeContainer');},2000);
    }
    render() {
        return (
            <View style={styles.container}>
                <Animated.Image
                    source={hello} style={[styles.img, { opacity: this.state.fadeAnim} ]}/>

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
export default StartScreen;