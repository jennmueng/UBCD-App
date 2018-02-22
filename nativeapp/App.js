import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Font } from 'expo';

import MainApp from './app/mainapp.js'

export default class App extends React.Component {
  componentDidMount() {
    Font.loadAsync({
      'FontAwesome': require('./app/assets/FontAwesome.ttf'),
    });
  }
  render() {
    return (
      <View style={styles.container}>
      <MainApp />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
    width: '100%'
  }
});
