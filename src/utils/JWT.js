import Cookies from 'universal-cookie';
import jwt from 'jsonwebtoken'

const cookies = new Cookies();

export const verifyJWT = () => {
    let token = localStorage.getItem('jwt')
    if (token) {
        try {
            return !!jwt.verify(token, process.env.REACT_APP_SECRET)
        } catch (err) {
            return null;
        }
    }
    return null;
}

export const verifyMobile = () => {
    let token = localStorage.getItem('jwt')
    if (token) {
        try {
            return !!jwt.verify(token, process.env.REACT_APP_SECRET)
        } catch (err) {
            return null;
        }
    }
    return null;
}

export const adminJWT = () => {
    let token = localStorage.getItem('jwt')
    if (token) {
        try {
            return jwt.verify(token, process.env.REACT_APP_SECRET).email === "stasseynsjonas@gmail.com";
        } catch (err) {
            return null;
        }
    }
    return null;
}

export const decodeJWT = (param) => {
    let token = param ? param : localStorage.getItem('jwt')
    if (token) {
        try {
            return jwt.verify(token, process.env.REACT_APP_SECRET)
        } catch (err) {
            return null;
        }
    }
    return null;
}

export const authPolice = () => {
    let token = localStorage.getItem('jwt')
    try {
        const decoded = jwt.verify(token, process.env.REACT_APP_SECRET);
        console.log(decoded)
    } catch(err) {
        console.log('Not logged in')
        window.location = '/auth/login'
    }
}
