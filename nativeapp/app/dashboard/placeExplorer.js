import React from 'react';
import { StatusBar, ScrollView, StyleSheet, Text, View, Image, Button, TouchableHighlight, Animated, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import FaIcon from 'react-native-vector-icons/FontAwesome';

import axios from 'axios';

import { appColors, appFontSizes } from '../assets/appStyles.js'

export default class PlaceExplorer extends React.Component {
    render(){
        let styles = StyleSheet.create({
            placeExplorer : {
                width: '100%',
                height: '100%',
                zIndex: 2,
            },
            contentContainer: {
                justifyContent: 'center',
                alignItems: 'center'
            },
            extra : {
                height: 60
            }
        });
        let placeArray = this.props.data.map((place, index) => 
            <Place
                name={place.name}
                thumbUri={place.photos[0].thumbUri}
                description={place.description}
                subcategory={place.subcategory}
                expenseLevel={place.expenseLevel}
                rating={place.rating}
                likes={place.likes}
                reviewCount={place.reviewCount}
                id={place._id}
                key={index}
                fetchPlace={this.props.fetchPlace}
                screenDimensions={this.props.screenDimensions}
            />
        )
        return (
            <ScrollView contentContainerStyle={styles.contentContainer} style={styles.placeExplorer}>
                {placeArray}
                <View style={styles.extra}></View>
                
            </ScrollView>
            
        )
    }
}

class Place extends React.Component {
    constructor(props) {
        super(props);

    }
   
    render() {
        let styles = {
            place : {
                width: '100%',
                height: 110,
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
            },
            image : {
                height: 90,
                marginLeft: 10,
                width: 90,
                borderRadius: 10
            },
            peInfo : {
                height: '100%',
                flex: 1,
                paddingTop: 10,
                justifyContent: 'flex-start',
                paddingLeft: 10
            },
            title : {
                fontSize: appFontSizes.title,
                fontWeight: '500',
                color: appColors.mainText
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
                height: 32,
                width: 32,
                backgroundColor: this.props.rating >= 8 ? appColors.blueHighlight : appColors.mediumGray,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
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
                bottom: 18,
                left: 5,
                flexDirection: 'row',
                alignItems: 'center'
            },
            reviewCount : {
                fontSize: 10,
                color: appColors.mediumGray
            },
            touch : {
                
            }
        };
        let expenseLevel = '';
        let expenseInverse = '$$$$';
        for (let x = 0; x < this.props.expenseLevel; x++) {
            expenseLevel += '$';
            expenseInverse = expenseInverse.slice(0, -1);
        }
        return (
            <TouchableHighlight style={styles.touch} onPress={() => this.props.fetchPlace(this.props.id)} underlayColor={appColors.lightGray}>
                <View style={styles.place}>
                    <Image 
                        style={styles.image}
                        source={{uri: this.props.thumbUri}} 
                    />                    
                    <View style={styles.peInfo}>
                        <Text style={styles.title}>{this.props.name}</Text>
                        <Text style={styles.subcategory}>{this.props.subcategory}</Text>
                        <Text style={styles.expenseLevel}>
                            {expenseLevel}
                            <Text style={styles.expenseInverse}>
                                {expenseInverse}
                            </Text>
                        </Text>
                        <View style={styles.buttonArea}>
                            <Icon name='message-circle' size={22} color={appColors.mediumGray}/>
                            <Text style={styles.reviewCount}>22</Text>
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
            </TouchableHighlight>
        )
    }
}

export class PlaceExpanded extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scale : new Animated.Value(0.6),
            opacity: new Animated.Value(0),
            attachMode : false,
            attach : new Animated.Value(180),
            coverLoaded : false,
        }
    }
    loadCover = () => {
        axios.post('http://localhost:8850/api/get-image', {src : this.props.src})
        .then((res) => {
            console.log(res)
            if (!res.data.err) {
                this.setState({
                    coverLoaded: true,
                    coverUri : res.data.uri
                })
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }
    closeProcess = () => {
        Animated.parallel([
            Animated.spring(
                this.state.scale,
                {
                    toValue: .7,
                    duration: 200
                }
            ),
            Animated.timing(
                this.state.opacity,
                {
                    toValue: 0,
                    delay: 20,
                    duration: 120
                }
            )
        ]).start();
        setTimeout(() => {
            this.props.close()
        }, 200);
        
        
        
    }
    componentDidMount() {
        this.loadCover();
        Animated.parallel([
            Animated.spring(
                this.state.scale,
                {
                    toValue: 1,
                    bounciness: 10,
                    duration: 350
                }
            ),
            Animated.timing(
                this.state.opacity,
                {
                    toValue: 1,
                    duration: 60
                }
            )
        ]).start();
        
    }
    render() {
        let styles = {
            expandedBacking : {
                width: '100%',
                height: '100%',
                backgroundColor: 'white',
                position: 'absolute',
                zIndex: 20,
                overflow: 'hidden'
            },
            cover : {
                width: '100%',
                height: 240
            },
            scrollBox : {
                width: '100%',
                height: this.props.screenDimensions.height - 240,
                position: 'absolute',
                bottom: 0,
                paddingTop: 15,
                paddingLeft: 15,
                zIndex: 3
            },
            contentContainer: {
                justifyContent: 'flex-start',
                alignItems: 'center'
            },
            titleBoxShadow : {
                borderRadius: 6,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.12,
                shadowRadius: 12,
                shadowColor: '#000',
                position: 'absolute',
                top: 180,
                left: 7,
                zIndex: 4,
            },
            titleBox : {
                width: this.props.screenDimensions.width - 14,
                height: 120,
                backgroundColor: 'white',
                zIndex: 4,
                borderRadius: 6,
                padding: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                overflow: 'hidden'
            },
            info : {
                flexDirection: 'column',
                justifyContent: 'flex-start',
                height: '100%'
            },
            name : {
                fontSize: 24,
                color: appColors.mainText
            },
            subcategory : {
                color : appColors.mediumGray
            },
            description : {
                color : appColors.darkGray
            },
            rightBox : {
                marginTop: 5,
                justifyContent: 'center',
                alignItems: 'center',
            },
            rateArea : {
                height: 32,
                width: 32,
                backgroundColor: this.props.rating >= 8 ? appColors.blueHighlight : appColors.mediumGray,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                marginBottom: 5
            },
            rateText : {
                fontSize : 14,
                color: 'white',
                fontWeight: '700'
            },
            distance : {
                color: appColors.mediumGray,
                fontSize: 12,
                textAlign: 'center'
            },
            callButtonCover: {
                width: '50%',
                height: '100%'
            },
            callButton : {
                borderRightWidth: 1.5,
                borderRadius: 0,
                borderColor: appColors.lightGray,
                width: '100%',
                height: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            },
            mapButtonCover: {
                width: '50%',
                height: '100%'
            },
            mapButton : {
                width: '100%',
                height: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            },
            buttonText: {
                color: appColors.blueHighlight,
                fontSize: 16,
                marginLeft: 8
            },
            buttonArea : {
                width: this.props.screenDimensions.width - 14,
                height: 40,
                position: 'absolute',
                bottom: 0,
                flexDirection: 'row',
                borderTopWidth: 1.5,
                borderColor: appColors.lightGray,
            },
            photoBox : {
                width: this.props.screenDimensions.width - 26,
                height: 240,
                backgroundColor: 'white',
                zIndex: 4,
                shadowColor: '#000',
                borderRadius: 6,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.12,
                shadowRadius: 12,
                marginBottom: 15,
            },
            reviewBox : {
                width: this.props.screenDimensions.width - 26,
                height: 500,
                backgroundColor: 'white',
                zIndex: 4,
                shadowColor: '#000',
                borderRadius: 6,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.12,
                shadowRadius: 12,
            },
            back : {
                position: 'absolute',
                top: this.props.isIphoneX ? 30 : 20,
                left: 0,
                flexDirection: 'row',
                alignItems: 'center'
            },
            backText : {
                color: 'white',
                fontSize: 18
            },
            freeBox : {
                height: 60
            }
        }
        return (
            <Animated.View style={{...styles.expandedBacking, transform:([{scale : this.state.scale}]), opacity: this.state.opacity}}>
                 <StatusBar barStyle='light-content' />
                <Image 
                    style={styles.cover}
                    source={this.state.coverLoaded ? {uri: this.state.coverUri} : require('../assets/tempimage.jpg')}
                />
                <TouchableOpacity style={styles.back} onPress={() => this.closeProcess()}>
                    <Icon name='chevron-left' size={34} color={'white'} />
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
                <View style={styles.titleBoxShadow}>
                    <View style={styles.titleBox}> 
                        <View style={styles.info}>
                            <Text style={styles.name}>{this.props.name}</Text>
                            <Text style={styles.subcategory}>{this.props.subcategory}</Text>
                            <Text style={styles.description}>{this.props.description}</Text>
                        </View>
                        <View style={styles.rightBox}>
                            <View style={styles.rateArea}>
                                <Text style={styles.rateText} >{this.props.rating}</Text>
                            </View>
                            <Text style={styles.distance}>
                                800m
                            </Text>
                        </View>
                        <View style={styles.buttonArea} >
                            <TouchableHighlight style={styles.callButtonCover} onPress={() => {}} underlayColor={appColors.lightGray}>
                                <View style={styles.callButton}>
                                    <Icon name='phone' size={20} color={appColors.blueHighlight}/>
                                    <Text style={styles.buttonText}>Call</Text>
                                </View>   
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.mapButtonCover} onPress={() => {}} underlayColor={appColors.lightGray}>
                                <View style={styles.mapButton}>
                                    <Icon name='map' size={20} color={appColors.blueHighlight}/>
                                    <Text style={styles.buttonText}>Map</Text>
                                </View>   
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
                <ScrollView style={styles.scrollBox}>
                    <View style={styles.freeBox}>
                        </View>
                    <View style={styles.photoBox}>
                        {this.props.photos.length >= 2 && <Image source={{uri: this.props.photos[1].thumbUri}} />}
                        {this.props.photos.length >= 3 && <Image source={{}} />}
                        {this.props.photos.length >= 4 && <Image source={{}} />}
                    </View>
                    <FlatList />
                </ScrollView>
                
            </Animated.View>
        )
    }
}