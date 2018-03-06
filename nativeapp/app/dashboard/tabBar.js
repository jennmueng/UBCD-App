import React from 'react';
import { Animated, View, TouchableHighlight, Text} from 'react-native';

import { appColors, appFontSizes } from '../assets/appStyles.js'

export default class TabBar extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        left : new Animated.Value(0),
        selectedHeight : new Animated.Value(0),
        currentPage : 'Hot',
        scrollLevel : 0
      }
      Animated.timing(                  
        this.state.selectedHeight,            
        {
          toValue: 4,                
          duration: 200,             
        }
      ).start();
    }
    goToPage = (page) => {
      this.setState({
        currentPage : page,
        scrollLevel : 0,
      }, () => {
        this.state.selectedHeight.setValue(0);
        Animated.timing(                  
          this.state.selectedHeight,            
          {
            toValue: 4,                
            duration: 200,             
          }
        ).start();
        this.props.fetchPlaces(this.state.currentPage, this.state.scrollLevel);
      })
    }
    scrollLoad = () => {
      this.setState(prevState => ({
        scrollLevel : ++prevState.scrollLevel
      }), () => {
        this.props.fetchPlaces(this.state.currentPage, this.state.scrollLevel);
      });
    }
    render () {
      let styles = {
        tabBar : {
          width: '100%',
          height : 45,
          alignItems : 'center',
          justifyContent : 'flex-start',
          flexDirection : 'row',
          borderBottomWidth : 1,
          borderBottomColor : appColors.lightGray
        },
        tab : {
          height : 45,
          alignItems: 'center',
          justifyContent: 'center',
          paddingLeft: '6.15%',
          paddingRight: '6.15%',
          
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
          width: '100%',
          backgroundColor: appColors.blueHighlight
        },
        containerView : {
          height : 45,
        }
      }
      let filterChoices = [
        {
          title : 'Hot',
          selected : this.state.currentPage === 'Hot' ? true : false
        }, 
        {
          title : 'Food',
          selected : this.state.currentPage === 'Food' ? true : false
        },
        {
          title : 'Attractions',
          selected : this.state.currentPage === 'Attractions' ? true : false
        },
        {
          title : 'Hotels',
          selected : this.state.currentPage === 'Hotels' ? true : false
        },
      ]
      let Test = filterChoices.map((nav, index) => (
        <View key={index} style={styles.containerView}>
          <TouchableHighlight  style={styles.tab} underlayColor={appColors.lightGray} onPress={() => {this.goToPage(nav.title)}}>
            <Text style={styles.tabText}>{nav.title}</Text>
          </TouchableHighlight>
          {nav.selected ? <Animated.View style={{...styles.selectedBar, height : this.state.selectedHeight}}></Animated.View> : null }
        </View>
        
      ));
      return (
        <View style={styles.tabBar}>
          {Test}
        </View>
      )
    }
  }