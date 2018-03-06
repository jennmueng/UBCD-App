import React from 'react';
import { Dimensions, Platform, Animated, StyleSheet, Text, View, Image, StatusBar, TextInput } from 'react-native';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';

import PlaceCreator from '../place-creator/creator.js';

//Styles
import { appColors, appFontSizes } from '../assets/appStyles.js';
import { toggleSearchQuery, openPC } from '../redux/actions';



class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullscreen : false,
            width : '100%',
            height : this.props.screenDimensions.height,
            zIndex : 4
        }
    }
    componentWillUpdate() {
                  console.log(this.props)
        
    }
    openPlaceCreator = () => {
      this.props.openPC();
    }
    updateSearchQuery = (query) => {
      this.setState({
        searchQuery : query.searchQuery
      }, () => {
        console.log(this.state.searchQuery);
        this.props.toggleSearchQuery('MAP', this.state.searchQuery);
      })
    }
  render() {
    let { height, width, fullscreen, zIndex} = this.state;
    if (fullscreen) {
        
    } 
    const styles = {
        map: {
          position: 'absolute',
          flex: 1,
          borderRadius: 6,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: appColors.white,
          
          overflow: 'hidden',
          bottom: 0
        },
        map_searchBar: {
          height: 50,
          width: this.props.screenDimensions.width - 16,
          position: 'absolute',
          top: this.props.isIphoneX? 40 : 30,
          backgroundColor: '#ffffff',
          zIndex: 6,
          borderRadius: 4,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.12,
          shadowRadius: 12,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        },
        map_searchBarMore : {
          marginRight : 14,
          position: 'relative',
        },
        map_searchBarEdit : {
          position: 'relative',
          marginLeft : 14,
          top: -1
        },
        map_searchBarInput : {
          fontSize: 18,
          width: '74%',
          height: '75%',
          paddingLeft: 10,
          paddingRight: 10,
          borderLeftWidth : 1,
          borderRightWidth : 1,
          borderColor : appColors.lightGray
        },
        searchPlaceholder : {
          position : 'absolute',
          left : 58
        },
        
      };
    return (
      <Animated.View style={{...styles.map, width : width, height: height, zIndex : zIndex}} >
        <StatusBar barStyle='dark-content'>
          </StatusBar>
          <View style={styles.map_searchBar}>
             <Icon 
                style={styles.map_searchBarEdit} 
                name={this.state.searchFocused ? 'x' : 'edit'} 
                size={20} color={appColors.mediumGray} 
                onPress={this.state.searchFocused ? (() => this.searchBar.blur()) : this.openPlaceCreator} 
            />
            {!this.state.searchQuery ? 
              <Icon 
                style={styles.searchPlaceholder} 
                name='search' 
                size={18} 
                color={appColors.mediumGray}
              /> 
            : null }
            <TextInput 
              style={styles.map_searchBarInput}
              placeholder='Search' clearButtonMode='always'
              ref={sb => this.searchBar = sb}
              onFocus={() => this.setState({searchFocused : true})}
              onBlur={() => this.setState({searchFocused : false})}
              onChangeText={(searchQuery) => this.updateSearchQuery({searchQuery})}
              placeholder='      Search'
              editable = {true}
              returnKeyType='search'
            />
            <Icon 
              style={styles.map_searchBarMore} 
              name='more-horizontal' 
              size={20} 
              color={appColors.mediumGray} 
              filled={true}
            />
          </View>
          {this.state.searchQuery && this.state.searchFocused
          ? <SearchQueries 
              screenDimensions={this.props.screenDimensions}
              isIphoneX={this.props.isIphoneX}
              searchResults={this.props.searchResults}
            />
          : null}
        <MapView
        style={{ flex: 1, height: '100%', width: '100%'}}
        initialRegion={{
          latitude: 15.219376, 
          longitude: 104.845761,
          latitudeDelta: .15,
          longitudeDelta: .15
        }}
      />
      {this.props.pcOpen ? <PlaceCreator /> : null}
      </Animated.View>
    );
  }
}

class SearchQueries extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      windowHeight : new Animated.Value(0),
    }
  }
  componentWillUpdate() {
    //Animate the ~opening~ animation.
    Animated.spring(                  
      this.state.windowHeight,            
      {
        toValue: this.props.searchResults.length > 7 ? 315 : (this.props.searchResults.length * 45) + 5,                
        duration: 400,           
      }
    ).start();
  }
  componentWillUnmount () {

  }
  render(){
    let styles = {
      searchQueries : {
        width: this.props.screenDimensions.width - 16,
        height: this.state.windowHeight,
        overflow: 'hidden',
        backgroundColor: 'white',
        borderBottomRightRadius : 4,
        borderBottomLeftRadius : 4,
        position: 'absolute',
        top: this.props.isIphoneX ? 85 : 75,
        paddingTop : 5,
        zIndex : 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
        alignItems: 'flex-start',
        justifyContent: 'center',
        flex: 1,
      },
      resultWrap : {
        borderTopWidth : 1,
        borderTopColor : appColors.lightGray,
        width: '100%',
        height: 45,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start'

      },
      searchIcon : {
        paddingLeft: 15
      },
      result : {
        width: '80%',
        height: 45,
        padding: 5,
        paddingLeft: 15,
        lineHeight: 35,
        fontSize: 15
      }
    }

    //Map the results array
    
    let viewResults = this.props.searchResults.map((result) => (
      <View style={styles.resultWrap} key={result.key}>
        <Icon 
          style={styles.searchIcon} 
          name='search' 
          size={18} 
          color={appColors.mediumGray}
        /> 
        <Text style={styles.result} >{result.text}</Text>
      </View>
    ))
   return(
    <Animated.View style={styles.searchQueries}>
            {viewResults}
            </Animated.View>
   )
 }}

const mapStateToProps = (state, ownProps) => {
  return {
    isIphoneX : state.dimensions.isIphoneX,
    screenDimensions : state.dimensions.screenDimensions,
    searchResults : state.search.searchResults,
    pcOpen : state.placeCreator.pcOpen
  }
}
 
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleSearchQuery : (location, query) => {
      dispatch(toggleSearchQuery(location, query))
    },
    openPC : () => {
      dispatch(openPC())
    }
  }
}

let MapExport = connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);

export default MapExport;