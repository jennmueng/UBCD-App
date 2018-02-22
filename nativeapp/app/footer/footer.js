import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Icon from 'react-native-fa-icons';
import { appColors, appFontSizes } from '../assets/appStyles.js'

export default class Footer extends React.Component {
  render() {
    return (
      <View style={styles.footer}>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    footer : {
        position: 'absolute',
        backgroundColor: '#ffffff',
        bottom: 0,
        width: '100%',
        height: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
        zIndex: 10,
      },
});