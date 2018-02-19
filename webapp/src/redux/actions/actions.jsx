
//Redux

export const SET_LANG = 'SET_LANG'

export const TOKEN = {
    SET : 'TOKEN_SET',
    DELETE : 'TOKEN_DELETE'
}

//Set the token to the value specified
export const tokenSet = (token) => {
    return{
        type : TOKEN.SET,
        token : token
    }
}

export const setLang = (lang) => {
    return{
        type : SET_LANG,
        lang : lang
    }
}

