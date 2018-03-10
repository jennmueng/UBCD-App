import { AsyncStorage } from 'react-native';
import axios from 'axios';

export const SET_LANG = 'SET_LANG'

export const TOKEN = {
    SET : 'TOKEN_SET',
    DELETE : 'TOKEN_DELETE'
}

export const AUTH = {
    GET : 'AUTH_GET',
    VERIFY : {
        BEGIN : 'AUTH_BEGIN',
        TRUE : 'AUTH_TRUE',
        FALSE : 'AUTH_FALSE'
    },
    DELETE : 'AUTH_DELETE'
}

export const PLACE_EXPLORER = {
    EXPAND : {
        NORMAL : 'PE_EXPAND_NORMAL',
        SEARCH : 'PE_EXPAND_SEARCH'
    },
    SHRINK : 'PE_SHRINK',
    GET : 'PE_GET',
    RECIEVE : {
        OVERWRITE : 'PE_RECIEVE_OVERWRITE',
        ADD : 'PE_RECIEVE_ADD'
    }
}

export const PLACE = {
    GET : 'PLACE_GET',
    RECIEVE : 'PLACE_RECIEVE',
    CLOSE : 'PLACE_CLOSE'
}

export const IMAGE = {
    GET : 'IMAGE_GET',
    RECIEVE : 'IMAGE_RECIEVE',
    CLOSE : 'IMAGE_CLOSE'
}

export const TOGGLE_SEARCHQUERIES = {
    MAP : {
        EXPAND : 'TOGGLE_SQ_EXPAND',
        SHRINK : 'TOGGLE_SQ_CLOSE'
    },
    DASH : {
        EXPAND : 'TOGGLE_SQ_EXPAND',
        SHRINK : 'TOGGLE_SQ_CLOSE'
    }
}

export const NOTI = {
    GET : 'NOTI_GET',
    GETTING : 'NOTI_GETTING',
    RECIEVE : 'NOTI_RECIEVE',
    RECIEVE_PUSH : 'NOTI_RECIEVE_PUSH'
}

export const PLACE_CREATOR = {
    OPEN : 'PC_OPEN',
    CLOSE : 'PC_CLOSE'
}

//Set the token to the value specified
export const tokenSet = (token) => {
    return{
        type : TOKEN.SET,
        token : token
    }
}

//Set the language to the specified language
export const setLang = (lang) => {
    return{
        type : SET_LANG,
        lang : lang
    }
}

//get initial auth object from cookies
export const getAuth = async () => {
    try {
        const authObject = await AsyncStorage.getItem('@auth');
        if (authObject !== null){
            return{
                type : AUTH.GET,
                auth : JSON.parse(authObject),
                err : null
            }
        }
    } catch (error) {
        //You should atleast know the error
        console.error(error)
        return{
            type : AUTH.GET,
            err : error
        }
    }
    
}

//verify Auth
export const verifyAuth = (auth) => {
    axios.post('/api/cred/auth-verify', auth)
    .then((res) => {
        if (res.data.success) {
            return{
                type : AUTH.VERIFY.TRUE,
                auth : auth
            }
        } else {
            return{
                type :  AUTH.VERIFY.FALSE
            }
        }
    });
}

export const toggleSearchQuery = (type, searchQuery) => {
    let results = [
        {
            key : 0,
            text : 'Ubon Downtown'
        },
        {
            key : 1,
            text : 'Area Restaurant'
        },
        {
            key : 2,
            text : 'Somtam Shop'
        },
        {
            key : 3,
            text : 'A very very large OTOP store'
        },
        {
            key : 4,
            text : 'Our HQ'
        },
    ];
    return {
        type : (type === 'MAP') ? TOGGLE_SEARCHQUERIES.MAP.EXPAND : TOGGLE_SEARCHQUERIES.DASH.EXPAND,
        searchResults : results
    }
}

//Expand mode, define what type of expand.
export const expandPE = (type) => {
    console.log('expand')
    return {
        type : (type === 'SEARCH') ? PLACE_EXPLORER.EXPAND.SEARCH : PLACE_EXPLORER.EXPAND.NORMAL,
    }
}
//Shrink the Place Explorer
export const shrinkPE = () => {
    return {
        type : PLACE_EXPLORER.SHRINK
    }
}

export const getPlaces = (filter, scrollLevel) => {
    return {
        type: PLACE_EXPLORER.GET,
        filter: filter,
        scrollLevel: scrollLevel
    }
}

export const recievePlacesOverWrite = (data) => {
    return {
        type : PLACE_EXPLORER.RECIEVE.OVERWRITE,
        data : data
    }
}

export const fetchPlaces = (filter, scrollLevel) => {
    return dispatch => {
        dispatch(getPlaces(filter));
        return axios.get('http://localhost:8850/api/pe-content', filter, scrollLevel)
        .then((res) => {
            dispatch(recievePlacesOverWrite(res.data));
        })
        .catch((err) => {
            console.log(err)
            dispatch(recievePlaces(null))
        })
    }
    
}



export const getPlace = (index) => {
    return {
        type: PLACE.GET,
    }
}

export const recievePlace = (data) => {
    return {
        type: PLACE.RECIEVE,
        data: data
    }
}

export const closePlace = () => {
    return {
        type: PLACE.CLOSE
    }
}

export const fetchPlace = (id) => {
    return dispatch => {
        dispatch(getPlace(id));
        return axios.get('http://localhost:8850/api/pe-place', id)
        .then((res) => {
            dispatch(recievePlace(res.data));
        })
        .catch((err) => {
            console.log(err)
            dispatch(recievePlace(null))
        })
    }
}

export const getImage = (src) => {
    return {
        type: IMAGE.GET,
    }
}

export const recieveImage = (src, data) => {
    return {
        type: IMAGE.RECIEVE,
        data: {src, data}
    }
}


export const fetchImage = (src) => {
    return dispatch => {
        dispatch(getImage(src));
        return axios.get('http://localhost:8850/api/get-image', src)
        .then((res) => {
            dispatch(recieveImage(src, res.data));
        })
        .catch((err) => {
            console.log(err)
            dispatch(recieveImage(null, null))
        })
    }
}



export const getNoti = () => {
    let testArray = [
        {
            key: 0,
            text: 'John liked your store'
        },
        {
            key: 1,
            text: 'Your store now has 3 views!'
        },
        {
            key: 2,
            text: 'Amazing.'
        },
    ]
    return {
        type: NOTI.GET,
        notifications : testArray
    }
}

export const openPC = () => {
    return {
        type: PLACE_CREATOR.OPEN
    }
}

