import axios from 'axios';
import {Dimensions, Platform} from 'react-native';
import { combineReducers } from 'redux';

import { AUTH, PLACE_EXPLORER, TOGGLE_SEARCHQUERIES, NOTI, getAuth, verifyAuth, getNoti, PLACE_CREATOR } from './actions';
import { appColors } from '../assets/appStyles';
const { height, width } = Dimensions.get('window');

export const isIphoneX = () => {
    return (
      Platform.OS === 'ios' &&
      (height === 812 || width === 812)
    );
}

const initialPe = {
    
}

const initialState = {

    
    
    
   
}

const auth = (state = { 
        authenticated : false,
        auth : {},
    }, action) => {
    switch(action.type) {
        case AUTH.GET:
            return Object.assign({}, state, {auth : action.auth});
        case AUTH.VERIFY.TRUE: 
            return Object.assign({}, state, {auth : action.auth});
        case AUTH.VERIFY.FALSE: 
            return Object.assign({}, state, {auth : {}});
        default:
            return state;
    }
        
}

const placeExplorer = (state = {
        peExpand : false,
        peExpandType : null,
        data : []
    } , action) => {
    switch(action.type) {
        case PLACE_EXPLORER.EXPAND.SEARCH:
            return Object.assign({}, state, {peExpand : true, peExpandType : 'search'});
        case PLACE_EXPLORER.EXPAND.NORMAL:
            return Object.assign({}, state, {peExpand : true, peExpandType : 'normal'});
        case PLACE_EXPLORER.SHRINK:
            return Object.assign({}, state, {peExpand : false, peExpandType : null});
        case PLACE_EXPLORER.GET:
            return Object.assign({}, state, {gettingPeContent : true});
        case PLACE_EXPLORER.RECIEVE.OVERWRITE:
            return Object.assign({}, state, {gettingPeContent : false, data : action.data});
        case PLACE_EXPLORER.RECIEVE.ADD:
            return Object.assign({}, state, {gettingPeContent : false, data : [...state.data, ...action.data]});
        default:
            return state;
    }
}

const placeCreator = (state = initialState, action) => {
    switch(action.type) {
        case PLACE_CREATOR.OPEN:
            return Object.assign({}, state, {pcOpen : true});
        case PLACE_CREATOR.SEND:
            return Object.assign({}, state, {pcSending : true});
        case PLACE_CREATOR.CLOSE:
            return Object.assign({}, state, {pcOpen : false});
        default:
            return state;
    }
}

const search = (state = {
        searchResults : [],
    }, action) => {
    switch(action.type) {
        case TOGGLE_SEARCHQUERIES.MAP.EXPAND:
            return Object.assign({}, state, {mapQueryOpen : true, searchResults : action.searchResults});
        default:
            return state;
    }
}

const notifications = (state = {
    notifications : [
        {
            key: 0,
            type: 'LIKE',
            icon: 'thumbs-up',
            color: appColors.blueHighlight,
            text: `King's Somtam now has 77 likes!`
        },
        {
            key: 1,
            type: 'COMMENT',
            icon: 'message-circle',
            color: appColors.blueHighlight,
            text: `Someone reviewed your store: Kelly's Pizza Shop`
        },
        {
            key: 2,
            type: 'UPDATE',
            icon: 'book',
            color: appColors.pinkHighlight,
            text: `Check out the new features in update v.0.1.2`
        },
    ],
    }, action) => {
    switch(action.type) {
        case NOTI.GET:
            return Object.assign({}, state, {notifications : action.notifications});
        default:
            return state;
    }
}

const dimensions = (state = {
        isIphoneX : isIphoneX(),
        screenDimensions : { height : height, width : width},
    }, action) => {
    switch(action.type) {
        default:
            return state;
    }
}


const app = combineReducers({
    auth,
    placeExplorer,
    placeCreator,
    search,
    notifications,
    dimensions
  })

export default app;