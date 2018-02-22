import { AUTH, getAuth, verifyAuth } from '../actions/webapp';
import axios from 'axios';

const initialState = {
    authenticated : false,
    auth : {}
}

const webapp = (state = initialState, action) => {
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

export default webapp;