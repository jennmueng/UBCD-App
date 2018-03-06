import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar, Dimensions, Platform } from 'react-native';
import { StackNavigator, TabNavigator, addNavigationHelpers } from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';
import thunk from 'redux-thunk'
import { appColors, appFontSizes } from './assets/appStyles.js';
import PropTypes from 'prop-types';

//Redux
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './redux/reducers.js';
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';


//Components
import Dashboard from './dashboard/dashboard.js';
import Map from './map/map.js';
import Notifications from './notifications/notifications.js';
import Numbers from './numbers/numbers.js';

const store = createStore(reducers, applyMiddleware(thunk));

console.log(store.getState().dimensions);
const Navigator = TabNavigator(
  {
    Home: {
      screen: Dashboard,
    },
    Map : {
      screen: Map
    },
    Notifications : {
      screen: Notifications
    },
    Numbers : {
      screen: Numbers
    }
  },
  {
      navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `list`;
        } else if (routeName === 'Map') {
          iconName = `map-pin`;
        } else if (routeName === 'Notifications') {
          iconName = `bell`;
        } else if (routeName === 'Numbers') {
          iconName = `phone`;
        }
        
        return <Icon name={iconName} size={24} color={focused ? appColors.mainText : appColors.mediumGray}/>;
      },
    }),
    tabBarOptions : {
      showLabel : false,
      activeTintColor: 'red',
      style : {
        position: 'absolute',
        backgroundColor: '#ffffff',
        bottom: 8,
        left: 8,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: store.getState().dimensions.isIphoneX ? 20 : 0,
        width:  store.getState().dimensions.screenDimensions.width - 16,
        height:  store.getState().dimensions.isIphoneX ? 30 : 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
        zIndex: 10,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderBottomRightRadius:  store.getState().dimensions.isIphoneX ? 34 : 4,
        borderBottomLeftRadius:  store.getState().dimensions.isIphoneX ? 34 : 4,
        borderTopWidth: 0
    }
    }
  },
  {
    initialRouteName : 'Home'
  }
);

const mapStateToProps = (state, ownProps) => {
  return {
    isIphoneX : state.isIphoneX,
    screenDimensions : state.screenDimensions,
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

const LinkedMainApp = connect(
  mapStateToProps,
  mapDispatchToProps
)((props) => <Navigator screenProps={{
    screenDimensions : store.getState().dimensions.screenDimensions
}} />);



const MainAppExport  = () => {
  return(
    <Provider store={store}>
      <LinkedMainApp />
    </Provider>
  )
}

export default MainAppExport