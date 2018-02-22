import $Cookie from 'js-cookie';
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
export const getAuth = () => {
    return{
        type : AUTH.GET,
        auth : JSON.parse($Cookie.get('auth'))
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