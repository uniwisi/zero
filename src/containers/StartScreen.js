

//MineContainer

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Animated
} from 'react-native';
import hello from '../resources/images/hello.jpg';

class StartScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          fadeAnim: new Animated.Value(0), // init opacity 0
        };
      }
      componentDidMount() {
        Animated.timing(          // Uses easing functions
          this.state.fadeAnim,    // The value to drive
          {toValue: 1},           // Configuration
        ).start();                // Don't forget start!
      }
    render() {
        this._animatedValue = new Animated.Value(0);
        let interpolatedColorAnimation = this._animatedValue.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, 1]
                });
        return (
            <View style={styles.container}>
                <Animated.Image
                    onLoadEnd={() => {
                        Animated.timing(this._animatedValue, {
                            toValue: 100,
                            duration: 1000
                        }).start()
                    }}
                    source={hello} style={[styles.img, { opacity: interpolatedColorAnimation} ]}/>

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