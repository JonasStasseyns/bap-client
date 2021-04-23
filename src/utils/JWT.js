import Cookies from 'universal-cookie';
import jwt from 'jsonwebtoken'

const cookies = new Cookies();

export const verifyJWT = () => {
    let token = cookies.get('jwt')
    if (token) {
        try {
            return !!jwt.verify(token, process.env.REACT_APP_SECRET)
        } catch (err) {
            return null;
        }
    }
    return null;
}

export const decodeJWT = (param) => {
    let token = param ? param : cookies.get('jwt')
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
    let token = cookies.get('jwt')
    try {
        const decoded = jwt.verify(token, process.env.REACT_APP_SECRET);
        console.log(decoded)
    } catch(err) {
        console.log('Not logged in')
        window.location = '/auth/login'
    }
}
