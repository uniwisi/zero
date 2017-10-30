import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';

class LoadingView extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator
          animating
          style={{ height: 80 }}
          size="large"
        />
      </View>
    );
  }
}

export default LoadingView;