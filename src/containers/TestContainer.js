//TestContainer

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions
} from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';

import lamu from '../resources/images/lamu.jpg';


class TestContainer extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>no game no life</Text>
                <View style={{ width: 200, height: 400 }}>
                    <ScrollableTabView
                        renderTabBar={() => <DefaultTabBar
                            // {...this.panResponderTabBar.panHandlers} 
                            style={{ height: 44, borderBottomWidth: 0.5 }} />}
                        tabBarUnderlineStyle={{ backgroundColor: '#1473EF', width: 20, height: 2, marginLeft: 40 }}
                        tabBarBackgroundColor="#FFFFFF"
                        tabBarActiveTextColor="#1473EF"
                        tabBarInactiveTextColor="#999"
                        tabBarTextStyle={{
                            fontSize: 13,
                            paddingTop: 10,
                            fontWeight: 'normal',
                            fontFamily: 'PingFangSC-Medium',
                        }}
                        initialPage={0}
                        locked
                        scrollWithoutAnimation
                    // onChangeTab={this.onChangeTab}
                    >
                        <View tabLabel="LOL" style={{ backgroundColor: '#FFFFFF', flex: 1, justifyContent: 'center' }}>
                            <Text style={{ color: '#91bef0', textAlign: 'center', justifyContent: 'center' }}>Welcome to LOL!</Text>
                        </View>
                        <View tabLabel="DOTA" style={{ backgroundColor: '#FFFFFF', flex: 1, justifyContent: 'center' }}>
                            <Text style={{ color: '#f8aec0', textAlign: 'center' }}>Welcome to DOTA!</Text>
                        </View>
                    </ScrollableTabView>
                </View>
                <View style={{ flexDirection: 'column' ,height: 120,alignItems:'center' }}>
                    <View style={{ flexDirection: 'row',justifyContent:'space-between',width: 200 }}>
                        <View style={styles.directionButton}><Text style={styles.buttonText}>↑</Text></View>
                        <View style={[styles.featuresButton,{backgroundColor:'yellow'}]}><Text style={styles.buttonText}>Y</Text></View>
                    </View>
                    <View style={{ flexDirection: 'row',alignItems: 'center' }}>
                        <View style={[styles.directionButton,{marginRight:50}]}><Text style={styles.buttonText}>←</Text></View>
                        <View style={styles.directionButton}><Text style={styles.buttonText}>→</Text></View>
                        <View style={[styles.featuresButton,{backgroundColor:'blue'}]}><Text style={styles.buttonText}>X</Text></View>
                        <View style={[styles.featuresButton,{backgroundColor:'red',marginLeft:50}]}><Text style={styles.buttonText}>B</Text></View>
                    </View>
                    <View style={{ flexDirection: 'row',justifyContent:'space-between',width: 200  }}>
                        <View style={styles.directionButton}><Text style={styles.buttonText}>↓</Text></View>
                        <View style={[styles.featuresButton,{backgroundColor:'green'}]}><Text style={styles.buttonText}>A</Text></View>
                    </View>

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
        backgroundColor: '#FAFAFA',
    },
    directionButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
         margin: 15, 
         backgroundColor: 'black',
         alignItems:'center',
         justifyContent:'center',
    },
    featuresButton:{
        width: 30,
        height: 30,
        borderRadius: 15,
         margin: 15, 
        alignItems:'center',
        justifyContent:'center',
    },
    buttonText:{
        textAlign:'center',
        color:'#fff',
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
export default TestContainer;
// <ScrollableTabView
// renderTabBar={() => <DefaultTabBar 
//  // {...this.panResponderTabBar.panHandlers} 
//   style={{ height: 44, borderBottomWidth: 0.5 }} />}
// tabBarUnderlineStyle={{ backgroundColor: '#1473EF', width: 22, height: 2, marginLeft: (Dimensions.get('window').width / 4) - 11 }}
// tabBarBackgroundColor="#FFFFFF"
// tabBarActiveTextColor="#1473EF"
// tabBarInactiveTextColor="#999"
// tabBarTextStyle={{
//   fontSize: 13,
//   paddingTop: 10,
//   fontWeight: 'normal',
//   fontFamily: 'PingFangSC-Medium',
// }}
// initialPage={0}
// locked
// scrollWithoutAnimation
// onChangeTab={this.onChangeTab}
// >
// <View tabLabel="LOL" style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
//       <Text style={{color:'red'}}>Welcome to LOL!</Text>
// </View>
// <View tabLabel="DOTA" style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
//       <Text style={{color:'red'}}>Welcome to DOTA!</Text>
// </View>
// </ScrollableTabView>