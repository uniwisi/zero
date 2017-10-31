//WelcomeContainer

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import utils from '../constants/utils';


class WelcomeContainer extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to 从零开始!
                </Text>
                <TouchableOpacity
                    style={{height:100,width:100,borderRadius:50,backgroundColor:'#91bef0',justifyContent:'center',alignItems:'center'}}
                    onPress={() => utils.viewTo('HomeContainer')}
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },

});
export default WelcomeContainer;