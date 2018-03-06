import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image, Button, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import FaIcon from 'react-native-vector-icons/FontAwesome';

import { appColors, appFontSizes } from '../assets/appStyles.js'

export default class PlaceExplorer extends React.Component {
    render(){
        let styles = StyleSheet.create({
            placeExplorer : {
                width: '100%',
                height: '100%',
                zIndex: 3,
            },
        });
        console.log(this.props.data);
        let placeArray = this.props.data.map((place, index) => 
            <Place
                name={place.name}
                thumb={place.photos[0].srcThumb}
                description={place.description}
                subcategory={place.subcategory}
                expenseLevel={place.expenseLevel}
                rating={place.rating}
                likes={place.likes}
                reviewCount={place.reviewCount}
                key={index}
            />
        )
        return (
            <ScrollView style={styles.placeExplorer}>
                {placeArray}
            </ScrollView>
            
        )
    }
}

class Place extends React.Component {
    render() {
        let styles = StyleSheet.create({
            place : {
                width: '100%',
                height: 110,
                overflow: 'hidden',
                borderBottomWidth: 1,
                borderColor: appColors.lightGray,
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexDirection: 'row'
            },
            image : {
                height: '100%',
                width: '35%'
            },
            peInfo : {
                height: '100%',
                flex: 1,
                padding: 5
            },
            title : {
                fontSize: appFontSizes.title,
                fontWeight: '500',
            },
            subcategory : {
                color : appColors.mediumGray,
                fontWeight: '100',
                fontSize : appFontSizes.description
            },
            description : {
                color : appColors.darkGray,
                fontWeight: '300',
                fontSize : appFontSizes.description
            },
            stars : {
                
            },
            rightBox : {
                marginRight: 8,
                marginTop: 8,
                
            },
            rateArea : {
                height: 20,
                width: 40,
                backgroundColor: this.props.rating >= 7 ? appColors.pinkHighlight : appColors.mediumGray,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 6,
                marginBottom: 5
            },
            rateText : {
                fontSize : 14,
                color: 'white',
                fontWeight: '700'
            },
            expenseLevel : {
                fontSize: 13,
                color: appColors.darkGray
            },
            expenseInverse : {
                color: appColors.lmGray
            },
            distance : {
                color: appColors.mediumGray,
                fontSize: 12,
                textAlign: 'center'
            },
            buttonArea : {
                position: 'absolute',
                bottom: 5,
                left: 5
            }
        });
        let expenseLevel = '';
        let expenseInverse = '$$$$';
        for (let x = 0; x < this.props.expenseLevel; x++) {
            expenseLevel += '$';
            expenseInverse = expenseInverse.slice(0, -1);
        }
        return (
            <View style={styles.place}>
                <Image 
                    style={styles.image}
                    source={{uri: this.props.thumb}} 
                />
                <View style={styles.peInfo}>
                    <Text style={styles.title}>{this.props.name}</Text>
                    <Text style={styles.description}>{this.props.description}</Text>
                    <Text style={styles.subcategory}>{this.props.subcategory}</Text>
                    <Text style={styles.expenseLevel}>
                        {expenseLevel}
                        <Text style={styles.expenseInverse}>
                            {expenseInverse}
                        </Text>
                    </Text>
                    <View style={styles.buttonArea}>
                        <Icon name='message-circle' size={22} color={appColors.mediumGray}/>
                    </View>
                </View>
                <View style={styles.rightBox}>
                    <View style={styles.rateArea}>
                        <Text style={styles.rateText} >{this.props.rating}</Text>
                    </View>
                    <Text style={styles.distance}>
                        800m
                    </Text>
                </View>
            </View>
        )
    }
}