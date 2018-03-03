import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar, Dimensions, Platform } from 'react-native';
import { StackNavigator, TabNavigator, addNavigationHelpers } from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';
import { appColors, appFontSizes } from './assets/appStyles.js';
import PropTypes from 'prop-types';

//Redux
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import reducers from './redux/reducers.js';
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';



//Components
import Dashboard from './dashboard/dashboard.js';

const { height, width } = Dimensions.get('window');

const screenDimensions = {height : height, width : width};

export const isIphoneX = () => {
    return (
      Platform.OS === 'ios' &&
      (height === 812 || width === 812)
    );
}


const Navigator = TabNavigator(
  {
    Home: {
      screen: props => <Dashboard expandPE={props.navigation.dispatch.expandPE} shrinkPE={props.shrinkPE} isIphoneX={props.isIphoneX}
      screenDimensions={props.screenDimensions} {...props}/>,
    },
    Map : {
      screen: Map
    },
    Police : {
      screen: 'Police'
    },
    Notifications : {
      screen: 'Noti'
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
        } else if (routeName === 'Police') {
          iconName = `alert-circle`;
        } else if (routeName === 'Notifications') {
          iconName = `bell`;
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
        paddingTop: isIphoneX() ? 20 : 0,
        width:  screenDimensions.width - 16,
        height:  isIphoneX() ? 30 : 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
        zIndex: 10,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderBottomRightRadius:  isIphoneX() ? 34 : 4,
        borderBottomLeftRadius:  isIphoneX() ? 34 : 4,
        borderTopWidth: 0
    }
    }
  },
  {
    initialRouteName : 'Home'
  }
);

const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);
const addListener = createReduxBoundAddListener("root");

const initialState = Navigator.router.getStateForAction(Navigator.router.getActionForPathAndParams('Home'));

const navReducer = (state = initialState, action) => {
  const nextState = Navigator.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};

const mapStateToProps = (state, ownProps) => {
  return {
    isIphoneX : state.isIphoneX,
    screenDimensions : state.screenDimensions,
    nav: state.nav
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
class TestApp extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
  };
  render() {
    return (
      <Navigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
        addListener,
      })} />
    );
  }
}

const appReducer = combineReducers({
  nav: navReducer,
  other : reducers
});

const LinkedMainApp = connect(
  mapStateToProps
)(TestApp);

const store = createStore(appReducer, applyMiddleware(middleware));

const MainAppExport  = () => {
  return(
    <Provider store={store}>
      <LinkedMainApp />
    </Provider>
  )
}

export default MainAppExport