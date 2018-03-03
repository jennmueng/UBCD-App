import React from 'react';
import { StatusBar, StyleSheet, Text, TextInput, View, Image, Button, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { TabNavigator } from 'react-navigation';

import Map from '../map/map.js';
import Header from '../header/header.js';
import Promotions from './promotions.js';

import { appColors, appFontSizes } from '../assets/appStyles.js'
import { expandPE, shrinkPE } from '../redux/actions';
import { connect } from 'react-redux';

class TabBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      left : new Animated.Value(0)
    }
  }
  componentDidUpdate() {
    let value = () => {
      switch(this.props.navigation.state.index) {
        case 0:
          return 0;
        case 1:
          return 75;
        case 2:
          return 177;
        case 3:
          return 287;
        default: 
          return 0;
    }};              
    Animated.timing(                  
      this.state.left,            
      {
        toValue: value(),
        duration: 120,        
      }
    ).start();
  }
  render () {
    let styles = {
      tabBar : {
        width: '100%',
        height : 45,
        alignItems : 'center',
        justifyContent : 'space-around',
        flexDirection : 'row',
        borderBottomWidth : 1,
        borderBottomColor : appColors.lightGray
      },
      tab : {
        height : 40,
        alignItems: 'center',
        justifyContent: 'center',
        
      },
      tabText : {
        fontSize : 16,
        fontWeight : '500',
        color : appColors.darkGray,
        paddingBottom: 5
      },
      selectedBar : {
        position: 'absolute',
        bottom: -1,
        width: 80,
        backgroundColor: appColors.blueHighlight
      }
    }
    let Test = this.props.navigation.state.routes.map((nav, index) => (
      <View key={nav.key} style={styles.tab} >
        <Text style={styles.tabText} onPress={() => this.props.navigation.navigate(nav.key)}>{nav.routeName}</Text>
        
      </View>
      
    ));
    return (
      <View style={styles.tabBar}>
        {Test}
        <Animated.View style={{...styles.selectedBar, height : 5, left : this.state.left }}></Animated.View>
      </View>
    )
  }
}


const Scrollable = new TabNavigator({
  Hot : {
    screen : Header
  },
  Food : {
    screen : Header
  },
  Attractions : {
    screen : Header
  },
  Hotels : {
    screen : Header
  }
},
  {
    tabBarOptions : {
      style : {
        backgroundColor: 'none',
        borderTopWidth: 0,
        borderBottomWidth: 1,
        height: 40,
        padding: 0,
        margin: 0,
        alignContent: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
      },
      tabStyle : {
        height: 40,
        alignContent: 'center',
        borderWidth: 1,
        flex: 1,
        alignSelf: 'flex-start',
        padding: 0,
        margin: 0,
      }
    },
    tabBarComponent: props => (
      <TabBar {...props} />
      ),
    tabBarPosition: 'top',
    initialRouteName: 'Hot',
  })

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text : '',
      height : new Animated.Value(this.props.screenDimensions.height*.6),
      peZIndex : new Animated.Value(3),
      toggleIconRotate : new Animated.Value(0)
    }
  }
  getTest = () => {
    console.log('hey');
    fetch('http://192.168.1.15:8850/api/getTest')
    .then((response) => {
      return response.text();
    })
    .then((text) => {
      this.setState({
        text : text
      })
    })
  }
  componentDidUpdate() {
    if(this.props.peExpand) {
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
    this.props.peExpand ? this.props.shrinkPE() : this.props.expandPE();
    this.searchBar.blur();
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
        position: 'relative',
        width: '100%',
        top: 0
      },
      dash_searchBar : {
        width: '80%',
        height: 40,
        backgroundColor: appColors.lightGray,
        borderRadius: 4,
        paddingLeft : 8
      },
      searchPlaceholder : {
        position: 'absolute',
        left: 55,
        top: 15,
        zIndex: 4
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
                  <Icon
                    name='chevron-up'
                    size={24}
                    color={appColors.darkGray}
                    onPress={() => {this.togglePE()}}
                  />
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
                  onFocus={() => {this.props.expandPE('SEARCH')}}
                  onChangeText={(searchQuery) => this.setState({searchQuery})}
                  placeholder='      Search'
                  editable = {true}
                  returnKeyType='search'
                  clearButtonMode='always'
                />
                <Icon name='menu' size={24} color={appColors.darkGray}/>
              </View>
            </View>
            <Scrollable />
          </Animated.View>
        </Animated.View>
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
    isIphoneX : state.isIphoneX,
    screenDimensions : state.screenDimensions,
    peExpand : state.peExpand,
    peExpandType : state.peExpandType
  }
}
 
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    expandPE : (type) => {
      dispatch(expandPE(type))
    },
    shrinkPE : () => {
      dispatch(shrinkPE())
    }
  }
}

const DashboardLinked= connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

export default DashboardLinked;