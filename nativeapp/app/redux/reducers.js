import axios from 'axios';
import {Dimensions, Platform} from 'react-native';

import { AUTH, PLACE_EXPLORER, TOGGLE_SEARCHQUERIES, NOTI, getAuth, verifyAuth, getNoti, PLACE_CREATOR } from './actions';
import { appColors } from '../assets/appStyles';
const { height, width } = Dimensions.get('window');

export const isIphoneX = () => {
    return (
      Platform.OS === 'ios' &&
      (height === 812 || width === 812)
    );
}
const initialState = {
    authenticated : false,
    auth : {},
    isIphoneX : isIphoneX(),
    screenDimensions : { height : height, width : width},
    peExpand : false,
    peExpandType : null,
    searchResults : [],
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
}

const app = (state = initialState, action) => {
    switch(action.type) {
        case AUTH.GET:
            return Object.assign({}, state, {auth : action.auth});
        case AUTH.VERIFY.TRUE: 
            return Object.assign({}, state, {auth : action.auth});
        case AUTH.VERIFY.FALSE: 
            return Object.assign({}, state, {auth : {}});
        case PLACE_EXPLORER.EXPAND.SEARCH:
            return Object.assign({}, state, {peExpand : true, peExpandType : 'search'});
        case PLACE_EXPLORER.EXPAND.NORMAL:
            return Object.assign({}, state, {peExpand : true, peExpandType : 'normal'});
        case PLACE_EXPLORER.SHRINK:
            return Object.assign({}, state, {peExpand : false, peExpandType : null});
        case TOGGLE_SEARCHQUERIES.MAP.EXPAND:
            return Object.assign({}, state, {mapQueryOpen : true, searchResults : action.searchResults});
        case NOTI.GET:
            return Object.assign({}, state, {notifications : action.notifications});
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
export default app;