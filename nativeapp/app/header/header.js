import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Icon from 'react-native-fa-icons';
import { appColors, appFontSizes } from '../assets/appStyles.js'

export default class Header extends React.Component {
  render() {
    return (
      <View style={styles.header}>
        <Icon name='map-marker-alt' style={{ fontSize: 24, color: appColors.white }} />
        <Image style={styles.logo} source={require('./logo-white.png')}/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 20,
    height: 40,
    width: '100%',
    zIndex: 2,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo : {
      width : 107,
      height: 13
  }
});