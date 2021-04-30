import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie';
import jwt from 'jsonwebtoken'
import openSocket from "socket.io-client";
import QRCode from 'qrcode.react'
import {Link} from "react-router-dom";

const cookies = new Cookies();

const API_ROOT = process.env.REACT_APP_API_BASE

// TODO JWT stays on the SocketLogin but not here, fix dis


const Login = (props) => {

    const [sid, setSid] = useState(false)
    const [showRP, setShowRP] = useState(false)

    const [responseMessage, setResponseMessage] = useState('')
    const [PWResponse, setPWResponse] = useState('')

    const [email, setEmail] = useState(false)
    const [password, setPassword] = useState(false)


    useEffect(() => {
        const socket = openSocket(process.env.REACT_APP_SOCKET)
        socket.on('connect', () => {
            setSid(socket.json.id)
            socket.on('token-event', data => {
                console.log(data)
                cookies.set('jwt', data.token, {path: '/', maxAge: 2592000});
                console.log(cookies.get('jwt'));
                window.location = props.destination ? props.destination : '/'
            })
        })
    }, [])


    const login = () => axios.post(`${API_ROOT}/auth/login`, {email: email.toLowerCase(), password}).then(res => {
        cookies.set('jwt', res.data.token, {path: '/'});
        console.log(cookies.get('jwt')); // Pacman
        window.location = '/'
    }).catch(err => setResponseMessage('E-mail en/of wachtwoord onjuist'))

    const resetPassword = () => axios.get(process.env.REACT_APP_API_BASE + '/auth/password-reset/start/' + email).then(res => setPWResponse('E-mail met instructies verzonden')).catch(err => setPWResponse('E-mail met instructies verzonden'))

    return (
        <div className="generic-wrapper auth-wrapper">
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
                <div className="login-qr-text-container">
                    {sid &&
                    <QRCode className="qr-login" value={`https://bachelorproef-b2b80.web.app/auth/socket-login/${sid}`}
                            size={256}/>}
                    <div className="login-qr-text">
                        <h2>Reeds ingelogd op je smartphone?</h2>
                        <h2>Scan dan deze QR-code</h2>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}
export default Login
