import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

//Global Styles
import { appColors, appFontSizes } from '../assets/appStyles.js';


export default class Header extends React.Component {
  render() {
    const styles = StyleSheet.create({
      header: {
        position: 'absolute',
        top: this.props.isIphoneX ? 30 : 20,
        height: 40,
        width: '100%',
        zIndex: 2,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15
      },
      logo : {
          width : 107,
          height: 13
      }
      
    });
    return (
      <View style={styles.header}>
        <Icon name='edit' size={22} color={appColors.white} />
        <Image style={styles.logo} source={require('./logo-white.png')}/>
        <Icon name='user' size={22} color={appColors.white} />
      </View>
    );
  }
}