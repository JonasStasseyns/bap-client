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

export const decodeJWT = () => {
    let token = cookies.get('jwt')
    if (token) {
        try {
            return jwt.verify(token, process.env.REACT_APP_SECRET)
        } catch (err) {
            return null;
        }
    }
    return null;
}
