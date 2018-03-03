import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { withNavigation } from 'react-navigation';

import { appColors, appFontSizes } from '../assets/appStyles.js'

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const styles = StyleSheet.create({
      footer : {
          position: 'absolute',
          backgroundColor: '#ffffff',
          bottom: 8,
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: this.props.isIphoneX ? 10 : 0,
          width: this.props.screenDimensions.width - 16,
          height: this.props.isIphoneX ? 60 : 50,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.12,
          shadowRadius: 12,
          zIndex: 10,
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
          borderBottomRightRadius: this.props.isIphoneX ? 34 : 4,
          borderBottomLeftRadius: this.props.isIphoneX ? 34 : 4
        },
    })
    return (
      <View style={styles.footer}>
        <Icon name="list" size={24} color={appColors.mediumGray}/>
        <Icon name="map-pin" size={24} color={appColors.mediumGray} onPress={() => {this.props.navigation.navigate('Map')}}/>
        <Icon name="alert-circle" size={24} color={appColors.mediumGray}/>
        <Icon name="bell" size={24} color={appColors.mediumGray}/>
      </View>
    );
  }
    
  
}
export default withNavigation(Footer);