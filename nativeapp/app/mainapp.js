import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Dashboard from './dashboard/dashboard.js';
import Header from './header/header.js';
import Footer from './footer/footer.js';

export default class MainApp extends React.Component {
  render() {
    return (
      <View style={styles.mainApp}>
        <Header />
        <Dashboard />
        <Image
            style={styles.bg_top}
            source={require('./background/bg-top.png')} />
        <Footer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainApp: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bg_top : {
      width: '100%',
      height: '30%',
      position: 'absolute',
      top: 0,
      zIndex: 0
  }
});