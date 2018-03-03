import React from 'react';
import { StatusBar, StyleSheet, ScrollView, Text, TextInput, View, Image, Button, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { TabNavigator } from 'react-navigation';
import { appColors, appFontSizes } from '../assets/appStyles.js'
import { connect } from 'react-redux';

class Promotion extends React.Component {
    render() {
        let styles = {
            promoBox : {
                width : this.props.screenDimensions.width - 16,
                height :  this.props.screenDimensions.height/3 - 24,
                backgroundColor : 'white',
                margin: 8,
                marginTop : 14,
                borderRadius: 6,
                shadowColor: '#000',
                 shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.12,
                    shadowRadius: 12,
                
            },
            promoArea : {
                zIndex : 2,
                position: 'absolute',
                top : this.props.isIphoneX ? 55 : 45,
                flex : 1,
                flexDirection : 'row',
                height: this.props.screenDimensions.height/3,
                
            }
        }
        let testArray = ['hey', 'hoo', 2, 3];
        let pages = testArray.map((page) => 
            <View key={page} style={styles.promoBox}></View>
        );
        return(
            <ScrollView style={styles.promoArea} pagingEnabled={true} horizontal={true}>{pages}</ScrollView>
        )
    }
}

const PromoTabs = TabNavigator({
    Hero : {
        screen : Promotion
    },
    Second : {
        screen : Promotion
    },
},
{
    initialRouteName: 'Hero',
})


export default Promotion