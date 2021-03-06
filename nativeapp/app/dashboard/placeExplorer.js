import React from 'react';
import { StatusBar, ActivityIndicator,ScrollView, TextInput, StyleSheet, Text, View, Image, Button, TouchableHighlight, Animated, FlatList, TouchableOpacity } from 'react-native';
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
            
            loading: {
            flex: 1,
            height: 120,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center'
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
            {this.props.loading && <View style={styles.loading}><ActivityIndicator size="large" color={appColors.mediumGray} /></View>}
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
            titleBorderRadius: new Animated.Value(6),
            titleWidth : new Animated.Value(this.props.screenDimensions.width - 14),
            titleHeight : new Animated.Value(120),
            titleLeft : new Animated.Value(7),
            coverLoaded : false,
            bottomMarginControl : new Animated.Value(this.props.isIphoneX ? 95 : 85),
            backOpacity : new Animated.Value(0),
        }
        this.handleScroll = this.handleScroll.bind(this);
    }
    loadCover = () => {
        axios.post('http://192.168.0.101:8850/api/get-image', {src : this.props.src})
        .then((res) => {
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
    addReviewFocus = () => {
        this.state.bottomMarginControl.setValue(290)
        setTimeout(() => {
            this.scrollBox.scrollToEnd({animated: true});
        }, 10)
    }
    addReviewFocusOut = () => {
        this.state.bottomMarginControl.setValue(this.props.isIphoneX ? 95 : 85)
        setTimeout(() => {
            this.scrollBox.scrollToEnd({animated: true});
        }, 10)
    }
    handleScroll(event) {
        if(event.nativeEvent.contentOffset.y > 30 && !this.state.attachMode) {
             //Scroll down and attach
             Animated.parallel([
                Animated.timing(
                    this.state.attach,
                    {
                        toValue: 0,
                        duration: 200
                    }
                ),
                Animated.timing(
                    this.state.titleLeft,
                    {
                        toValue: 0,
                        duration: 200
                    }
                ),
                Animated.timing(
                    this.state.titleWidth,
                    {
                        toValue: this.props.screenDimensions.width,
                        duration: 100
                    }
                ),
                Animated.timing(
                    this.state.titleHeight,
                    {
                        toValue: this.props.isIphoneX ? 180 : 170,
                        duration: 100
                    }
                ),
                Animated.timing(
                    this.state.titleBorderRadius,
                    {
                        toValue: 0,
                        duration: 200
                    }
                ),
                Animated.timing(
                    this.state.backOpacity,
                    {
                        toValue: 1,
                        duration: 200
                    }
                ),
            ]).start();
            this.setState({
                attachMode : true
            }, () => {
               
            })
        } else if (event.nativeEvent.contentOffset.y <= 30 && this.state.attachMode) {
            this.setState({
                attachMode : false
            }, () => {
                Animated.parallel([
                    Animated.timing(
                        this.state.attach,
                        {
                            toValue: 180,
                            duration: 200
                        }
                    ),
                    Animated.timing(
                        this.state.titleLeft,
                        {
                            toValue: 7,
                            duration: 200
                        }
                    ),
                    Animated.timing(
                        this.state.titleWidth,
                        {
                            toValue: this.props.screenDimensions.width - 14,
                            duration: 200
                        }
                    ),
                    Animated.timing(
                        this.state.titleHeight,
                        {
                            toValue: 120,
                            duration: 200
                        }
                    ),
                    Animated.timing(
                        this.state.titleBorderRadius,
                        {
                            toValue: 6,
                            duration: 200
                        }
                    ),
                    Animated.timing(
                        this.state.backOpacity,
                        {
                            toValue: 0,
                            duration: 200
                        }
                    ),
                ]).start();
            })
        }
    }
    imageFull = (src) => {
        axios.post('http://192.168.0.101:8850/api/get-image', {src : src})
        .then((res) => {
            if (!res.data.err) {
                this.setState({
                    showImage: true,
                    showImageUri : res.data.uri
                })
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }
    closeImage = () => {
        this.setState({
            showImage: false,
            showImageUri : null
        })
    }
    render() {
        let styles = {
            expandedBacking : {
                width: '100%',
                height: '100%',
                backgroundColor: 'white',
                position: 'absolute',
                zIndex: 20,
                overflow: 'hidden',
                elevation: 12,
            },
            cover : {
                width: '100%',
                height: 240
            },
            topView : {
                width: '100%',
                height: 60,
                backgroundColor: 'white',
                position: 'absolute',
                top: 0,
                zIndex: 5
            },
            scrollBox : {
                width: '100%',
                height: this.state.attachMode ? this.props.screenDimensions.height - (this.props.isIphoneX ? 180 : 170) : this.props.screenDimensions.height - 240,
                position: 'absolute',
                bottom: 0,
                paddingTop: 15,
                zIndex: 3
            },
            contentContainer: {
                justifyContent: 'flex-start',
                alignItems: 'center'
            },
            titleBoxShadow : {
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.12,
                shadowRadius: 12,
                shadowColor: '#000',
                position: 'absolute',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                zIndex: 4,
                elevation: 15,
            },
            titleBox : {
                height: 120,
                backgroundColor: 'white',
                zIndex: 4,
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
                height: 40,
                position: 'absolute',
                bottom: 0,
                flexDirection: 'row',
                borderTopWidth: 1.5,
                borderColor: appColors.lightGray,
            },
            photoBoxShadow : {
                width: this.props.screenDimensions.width - 26,
                height: 240,
                zIndex: 4,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.12,
                shadowRadius: 12,
                shadowColor: '#000',
                marginLeft: 14,
                borderRadius: 6,
                elevation: 14,
            },
            photoBox : {
                
                backgroundColor: 'white',
                width: '100%',
                height: '100%',
                borderRadius: 6,
                flexDirection: 'row',
                flexWrap: 'wrap',
                flex: 1,
                overflow: 'hidden',
            },
            gal1Cover : {
                height: '50%',
                width: '50%',
                borderWidth: 3,
                borderColor: 'white',
                borderRadius: 6,
            },
            gal2Cover : {
                height: '50%',
                width: '50%',
                borderWidth: 3,
                borderColor: 'white',
                borderRadius: 6,
            },
            gal1 : {
                height: '100%',
                width: '100%',
                borderRadius: 4,
            },
            gal2 : {
                height: '100%',
                width: '100%',
                borderRadius: 4,
            },
            gal3 : {
                height: '50%',
                width: '100%',
                borderWidth: 3,
                borderColor: 'white',
                borderRadius: 6,
            },
            reviewArea : {
                width: '100%',
                paddingTop: 15,
                paddingLeft: 15
            },
            extraReview : {
                height: this.props.isIphoneX ? 85 : 70
            },
            reviewShadow: {
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.12,
                shadowRadius: 12,
                shadowColor: '#000',
                borderRadius: 6,
                marginBottom: 15,
                width: this.props.screenDimensions.width - 26,
                height: 120,
                zIndex: 4,
                elevation: 14
            },
            review : {
                width: this.props.screenDimensions.width - 26,
                height: '100%',
                backgroundColor: 'white',
                borderRadius: 6,
                padding: 10,
                overflow: 'hidden',
                flexDirection: 'row',
                alignItems:'center',
                justifyContent: 'space-between'
            },
            reviewTextArea : {
                flex: 1
            },
            reviewText : {
                flex: 1,
                fontSize: 16,
                maxWidth: this.props.screenDimensions.width - 66,
                color: appColors.mainText,
            },
            reviewRateArea : {
                position: 'absolute',
                right: 0,
                height: 120,
                width: 40,
                justifyContent: 'center',
                alignItems: 'center',
            },
            reviewRateText : {
                fontSize: 20,
                color: 'white',
                fontWeight: '700'
            },
            reviewProf : {
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
            },
            reviewProfPic : {
                width: 30,
                height: 30,
                marginRight: 5,
                borderRadius: 15,
            },
            reviewProfText : {
                fontSize: 14,
                color: appColors.mainText
            },
            addButtonArea : {
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center'
            },
            addReview : {
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.12,
                shadowRadius: 12,
                shadowColor: '#000',
                borderRadius: 6,
                width: this.props.screenDimensions.width - 26,
                minHeight: 60,
                padding: 10,
                elevation: 14
                
            },
            addReviewText : {
                fontSize: 16,
                marginBottom: 5,
            },
            postButton : {
                height: 34,
                width: 80,
                backgroundColor: appColors.blueHighlight,
                borderRadius: 17,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
            },
            post : {
                color: 'white',
                fontSize: 16,
                fontWeight: '500'
            },
            back : {
                position: 'absolute',
                top: this.props.isIphoneX ? 30 : 20,
                left: 0,
                zIndex: 5,
                flexDirection: 'row',
                alignItems: 'center'
            },
            backText : {
                fontSize: 18
            },
            freeBox : {
                height: 60
            }
        }
        return (
            <Animated.View style={{...styles.expandedBacking, transform:([{scale : this.state.scale}]), opacity: this.state.opacity}}>
            {this.state.showImage && <ImageFullScreen close={this.closeImage} uri={this.state.showImageUri} />}
                 {this.state.attachMode ?< StatusBar barStyle='dark-content' /> : <StatusBar barStyle='light-content' />}
                { this.state.attachMode ? null :<Image 
                    style={styles.cover}
                    source={this.state.coverLoaded ? {uri: this.state.coverUri} : require('../assets/tempimage.jpg')}
                />}
                <TouchableOpacity style={styles.back} onPress={() => this.closeProcess()}>
                        <Icon name='chevron-left' size={34} color={this.state.attachMode ? 'black' : 'white'} />
                        <Text style={{...styles.backText, color: this.state.attachMode ? 'black' : 'white' }}>Back</Text>
                </TouchableOpacity>
                <Animated.View style={{...styles.titleBoxShadow, 
                    top: this.state.attach,
                    height: this.state.titleHeight,
                    borderRadius: this.state.titleBorderRadius,
                    left: this.state.titleLeft
                    }}>
                    <Animated.View style={{...styles.titleBox, 
                        borderRadius: this.state.titleBorderRadius, 
                        width: this.state.titleWidth
                        }}> 
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
                        <Animated.View style={{...styles.buttonArea,
                            width: this.state.titleWidth
                        }} >
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
                        </Animated.View>
                    </Animated.View>
                </Animated.View>
                <ScrollView style={styles.scrollBox} ref={(scrollBox) => this.scrollBox = scrollBox}onScroll={this.handleScroll} scrollEventThrottle={16}>
                    <View style={styles.freeBox}>
                        </View>
                    <View style={styles.photoBoxShadow}>
                        <View style={styles.photoBox}>
                            {this.props.photos.length >= 2 && <TouchableOpacity style={styles.gal1Cover} onPress={() => this.imageFull(this.props.photos[1].srcLarge)}><Image style={styles.gal1} source={{uri: this.props.photos[1].thumbUri}} /></TouchableOpacity>}
                            {this.props.photos.length >= 3 && <TouchableOpacity style={styles.gal2Cover} onPress={() => this.imageFull(this.props.photos[2].srcLarge)}><Image style={styles.gal2} source={{uri: this.props.photos[2].thumbUri}} /></TouchableOpacity>}
                            {this.props.photos.length >= 4 && <Image style={styles.gal3} source={{uri: this.props.photos[3].thumbUri}} />}
                        </View>
                    </View>
                        <FlatList style={styles.reviewArea} 
                            data={this.props.reviews}
                            keyExtractor={( item ) => item._id}
                            renderItem={({ item }) =>
                            <View style={styles.reviewShadow}>
                                <View style={styles.review}>
                                    <View>
                                        <Text style={styles.reviewText}>{item.text}</Text>
                                        <View style={styles.reviewProf}>
                                            <Image style={styles.reviewProfPic} source={{uri : item.author.photo.thumbUri}}/>
                                            <Text style={styles.reviewProfText}>{item.author.name.first + ' ' + item.author.name.last}</Text>
                                        </View>
                                        
                                    </View>
                                    
                                    <View style={{...styles.reviewRateArea, backgroundColor: item.rate >= 8 ? appColors.blueHighlight : appColors.mediumGray,}}>
                                        <Text style={styles.reviewRateText}>{item.rate}</Text>
                                    </View>
                                    
                                </View>
                            </View>
                            } ListFooterComponent={
                            <Animated.View style={{...styles.addReview, marginBottom: this.state.bottomMarginControl}}>
                                <TextInput style={styles.addReviewText} onFocus={() => this.addReviewFocus()} onBlur={() => this.addReviewFocusOut()} placeholder='Review this place...' autoGrow={true} multiline={true}/>
                                <View style={styles.addButtonArea}>
                                <TouchableOpacity style={styles.photoButton}onPress={() => {}}>
                                        <Icon name='image' size={24} color={appColors.mediumGray}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.postButton}onPress={() => {}}>
                                        <Text style={styles.post}>Post</Text>
                                </TouchableOpacity>
                                </View>
                                
                            </Animated.View>
                        }/>
                </ScrollView>
                
            </Animated.View>
        )
    }
}

class ImageFullScreen extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            scale : new Animated.Value(.7),
            opacity : new Animated.Value(0)
        }
    }
    componentDidMount() {
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
    close = () => {
        Animated.parallel([
            Animated.spring(
                this.state.scale,
                {
                    toValue: 0,
                    bounciness: 10,
                    duration: 350
                }
            ),
            Animated.timing(
                this.state.opacity,
                {
                    toValue: 0,
                    duration: 60
                }
            )
        ]).start();
        setTimeout(() => {
            this.props.close();
        }, 350)
    }
    render() {
        let styles = {
            view : {
                width: '100%',
                height: '100%',
                backgroundColor: 'black',
                zIndex: 15,
                alignItems: 'center',
                justifyContent: 'center'
            },
            image : {
                width:'100%',
                height:'80%',
            },
            close : {
                position: 'absolute',
                top: 20,
                right: 10,
            }
        }
        return(
            <Animated.View style={{...styles.view, transform : ([{ scale : this.state.scale}]), opacity : this.state.opacity}}>
                <TouchableOpacity style={styles.close}onPress={this.props.close}>
                    <Icon name='x' size={30} color='white' />
                    </TouchableOpacity>
                <Image style={styles.image} source={{uri : this.props.uri}}/>
            </Animated.View>
        )
    }
}