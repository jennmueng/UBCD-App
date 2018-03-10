import React from 'react';
import { StatusBar,  StyleSheet, Text, TextInput, View, Image, Button, Animated, Easing, TouchableOpacity, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { TabNavigator } from 'react-navigation';

import Map from '../map/map.js';
import Header from '../header/header.js';
import Promotions from './promotions.js';
import PlaceExplorer from './placeExplorer.js';
import { PlaceExpanded } from './placeExplorer.js';
import TabBar from './tabBar.js'

import { appColors, appFontSizes } from '../assets/appStyles.js'
import { expandPE, shrinkPE, fetchPlaces, fetchPlace, closePlace } from '../redux/actions';
import { connect } from 'react-redux';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text : '',
      height : new Animated.Value(this.props.screenDimensions.height*.6),
      peZIndex : new Animated.Value(3),
      toggleIconRotate : new Animated.Value(0),
      peExpand : false
    }
    this.props.dispatch(fetchPlaces('Hot', 0))
  }
  componentDidMount() {
  }
  componentDidUpdate() {
    if(this.state.peExpand) {
      this.state.peZIndex.setValue(4);
      Animated.parallel([
        Animated.spring(                  
          this.state.height,            
          {
            toValue: this.props.isIphoneX ? this.props.screenDimensions.height - 69 : this.props.screenDimensions.height - 59,                
            duration: 200,           
          }
        ),
        Animated.timing(                  
          this.state.toggleIconRotate,            
          {
            toValue: 1,                
            duration: 300,             
          }
        )
      ]).start();
      
    } else {
      Animated.spring(                  
        this.state.height,            
        {
          toValue: this.props.screenDimensions.height*.6,                
          duration: 200,             
        }
      ).start();  
      Animated.timing(                  
        this.state.peZIndex,            
        {
          toValue: 3,                
          duration: 0, 
          delay: 200            
        }
      ).start(); 
      Animated.timing(                  
        this.state.toggleIconRotate,            
        {
          toValue: 0,                
          duration: 300,             
        }
      ).start(); 
    }
    
  }
  togglePE = () => {
    this.setState(prevState => ({
      peExpand : !prevState.peExpand
    }),() => {
      if (!this.state.peExpand) {
        this.searchBar.blur();
      }
    });
    
  }
  render() {
    
    let styles = {
      home : {
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      dashboard: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
        overflow: 'hidden',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        zIndex: 3,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      shadowBox : {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
        width: '100%',
        position: 'absolute',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        bottom: 0,
      },
      dash_header : {
        width: '100%',
        height: 50
      },
      dash_headerTop : {
        justifyContent : 'space-between',
        paddingLeft : 12,
        paddingRight : 12,
        alignItems : 'center',
        flexDirection : 'row',
        height: 50,

        width: '100%',

      },
      dash_searchBar : {
        width: '80%',
        height: 40,
        backgroundColor: appColors.lightGray,
        borderRadius: 4,
        paddingLeft : 8,
        fontSize: 16
      },
      searchPlaceholder : {
        position: 'absolute',
        left: 55,
        top: 15,
        zIndex: 4
      },
      peArea :{
        width: 400,
        height: 400,
        bottom: 0,
        backgroundColor: 'red',
        zIndex: 20
      },
      bg_top : {
        width: '100%',
        height: '30%',
        position: 'absolute',
        top: 0,
        zIndex: 0
    }
    };
    let toggleIconRotate = this.state.toggleIconRotate.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '-180deg']
    })
    return (
      <View style={styles.home}>
      <StatusBar barStyle='light-content' />
        <Header 
          isIphoneX={this.props.isIphoneX}
          screenDimensions={this.props.screenDimensions}
        />
        <Promotions
          screenDimensions={this.props.screenDimensions}
          isIphoneX={this.props.isIphoneX}
        />
        <Animated.View style={{...styles.shadowBox, height: this.state.height, zIndex : this.state.peZIndex}}>
          <Animated.View style={styles.dashboard}>
            <View style={styles.dash_header}>
              <View style={styles.dash_headerTop}>
                <Animated.View style={{transform : ([{ rotate : toggleIconRotate }])}}> 
                <TouchableOpacity onPress={() => this.togglePE()}>
                    <Icon
                      name='chevron-up'
                      size={24}
                      color={appColors.darkGray}
                    />
                </TouchableOpacity>
                </Animated.View>
                {!this.state.searchQuery ? 
                <Icon 
                  style={styles.searchPlaceholder}
                  name='search'
                  size={18}
                  color={appColors.mediumGray}/>
                  : null }
                <TextInput 
                  style={styles.dash_searchBar}
                  ref={sb => this.searchBar = sb}
                  onFocus={() => this.togglePE()}
                  onChangeText={(searchQuery) => this.setState({searchQuery})}
                  placeholder='      Search'
                  editable = {true}
                  returnKeyType='search'
                  clearButtonMode='always'
                />
                <Icon name='menu' size={24} color={appColors.darkGray}/>
              </View>
            </View>
              <TabBar fetchPlaces={(filter, scrollLevel) => this.props.dispatch(fetchPlaces(filter, scrollLevel))}/>
              
              <PlaceExplorer loading={this.props.placeExplorer.loading} data={this.props.placeExplorer.data} fetchPlace={(id) => this.props.dispatch(fetchPlace(id))} plExpanded={this.props.plExpanded} screenDimensions={this.props.screenDimensions}/>
            </Animated.View>
                  
        </Animated.View>
        {this.props.plExpanded && this.props.placeData &&<PlaceExpanded
          screenDimensions={this.props.screenDimensions}
          isIphoneX={this.props.isIphoneX}
          name={this.props.placeData.name}
          subcategory={this.props.placeData.subcategory}
          description={this.props.placeData.description}
          rating={this.props.placeData.rating}
          photos={this.props.placeData.photos}
          reviews={this.props.placeData.reviews}
          src={this.props.placeData.photos[0].srcLarge}
          close={() => this.props.dispatch(closePlace())}
          />}
        <Image
          style={styles.bg_top}
          source={require('../background/bg-top.png')}
        />
      </View>
    );
  }
  
}

const mapStateToProps = (state, ownProps) => {
  return {
    screenDimensions : state.dimensions.screenDimensions,
    placeExplorer : state.placeExplorer,
    peExpand : state.placeExplorer.peExpand,
    isIphoneX : state.dimensions.isIphoneX,
    image: state.image.data,
    imageLoading: state.image.loading,
    plExpanded : state.place.expand,
    plLoading : state.place.getting,
    placeData : state.place.data
  }
}
 
const mapDispatchToProps = (dispatch, ownProps) => {
  return { dispatch
    }
  
}

const DashboardLinked= connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

export default DashboardLinked;

