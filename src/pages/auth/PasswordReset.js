import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie';
import jwt from 'jsonwebtoken'
import openSocket from "socket.io-client";
import QRCode from 'qrcode.react'
import {Link} from "react-router-dom";
import {decodeJWT} from "../../utils/JWT";

const cookies = new Cookies();

const API_ROOT = process.env.REACT_APP_API_BASE

// TODO JWT stays on the SocketLogin but not here, fix dis


const PasswordReset = (props) => {

    const [token, setToken] = useState(false)

    const [password, setPassword] = useState(false)
    const [passwordRepeat, setPasswordRepeat] = useState(false)
    const [error, setError] = useState('false')


    useEffect(() => {
        setToken(decodeJWT(props.match.params.token))
        console.log(decodeJWT(props.match.params.token))
    }, [])


    const resetPassword = () => {
        if(passwordRepeat === password){
            axios.post(`${API_ROOT}/auth/password-reset/finish`, {password, token: token.userId}).then(res => {
                window.location = '/'
            }).catch(err => setError('Er ging iets mis, probeer later opnieuw'))
        }else{
            setError('Wachtwoorden komen niet overeen.')
        }
    }


    return (
        <div className="generic-wrapper auth-wrapper">
            <div className="auth-dfdc">
                <h2>Wachtwoord herstellen</h2>
                {error}
                <input type="password" placeholder="Nieuw wachtwoord" onChange={(e) => setPassword(e.target.value)}/>
                <input type="password" placeholder="Herhaal wachtwoord" onChange={(e) => setPasswordRepeat(e.target.value)}/>
                <button onClick={resetPassword}>Update wachtwoord</button>
            </div>
        </div>
    )
}
export default PasswordReset
