let tokenKey = 'TOKEN';

export const  setToken = (token) =>{
    return sessionStorage.setItem(tokenKey,token)
}

export const getToken = () => {
    return sessionStorage.getItem(tokenKey)
}

export const removeToken = () => {
    return sessionStorage.removeItem(tokenKey)
}