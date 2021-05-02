import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie';
import jwt from 'jsonwebtoken'
import {verifyJWT, verifyMobile} from "../../utils/JWT";
import {Link} from "react-router-dom";
import QRCode from "qrcode.react";

const cookies = new Cookies();

const API_ROOT = process.env.REACT_APP_API_BASE

const SocketLogin = (props) => {

    const [sid, setSid] = useState(false)
    const [showRP, setShowRP] = useState(false)

    const [responseMessage, setResponseMessage] = useState('')
    const [PWResponse, setPWResponse] = useState('')

    const [email, setEmail] = useState(false)
    const [password, setPassword] = useState(false)
    const [reddy, setReddy] = useState(false)

    useEffect(() => {
        if (verifyMobile()) {
            setResponseMessage('JWT IS VALID')
            axios.post(`${API_ROOT}/auth/login/check`, {
                sid: props.match.params.sid,
                token: localStorage.getItem('jwt')
            }).then(res => {
                setResponseMessage('Automatisch inloggen gelukt')
                setReddy(true)
            }).catch(err => console.log(err))
        }else{
            setResponseMessage('Automatisch inloggen mislukt. Login op dit toestel is verlopen')
        }
    }, [])

    const login = () => {
        axios.post(`${API_ROOT}/auth/login`, {email, password, sid: props.match.params.sid}).then(res => {
            setResponseMessage('Logged In')
            localStorage.setItem('jwt', res.data.token);
        }).catch(err => console.log(err))
    }

    const resetPassword = () => axios.get(process.env.REACT_APP_API_BASE + '/auth/password-reset/start/' + email).then(res => setPWResponse('E-mail met instructies verzonden')).catch(err => setPWResponse('E-mail met instructies verzonden'))

    return (
        <div className="generic-wrapper tech-detail-wrapper">
            {showRP &&
            <div className="auth-dfdc">
                <h2>E-mailadres</h2>
                {PWResponse}
                <input type="text" placeholder="e-mailadres" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <button onClick={resetPassword}>Herstel wachtwoord</button>
            </div>
            }
            {!showRP &&
            <div>
                <div className="auth-dfdc">
                    <h2>Login</h2>
                    {responseMessage}
                    <input type="email" placeholder="e-mailadres" onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder="••••••••" onChange={(e) => setPassword(e.target.value)}/>
                    <button onClick={login}>LOGIN</button>
                    <Link to='/auth/register'>Nog geen account? Registreer</Link>
                    <p onClick={() => setShowRP(true)}>Wachtwoord vergeten?</p>
                </div>
            </div>
            }
        </div>
    )
}
export default SocketLogin
