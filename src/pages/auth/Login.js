import React, {useState, useEffect} from 'react'
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

    useEffect(() => {
        const socket = openSocket(process.env.REACT_APP_SOCKET)
        socket.on('connect', () => {
            setSid(socket.json.id)
            socket.on('token-event', data => {
                console.log(data)
                cookies.set('jwt', data.token, {path:'/', maxAge: 2592000});
                console.log(cookies.get('jwt'));
                window.location = props.destination
            })
        })
    }, [])

    const [email, setEmail] = useState(false)
    const [password, setPassword] = useState(false)

    const login = () => axios.post(`${API_ROOT}/auth/login`, {email, password}).then(res => {
        cookies.set('jwt', res.data.token, {path:'/'});
        console.log(cookies.get('jwt')); // Pacman
        window.location = '/'
    }).catch(err => console.log(err))


    return (
        <div className="generic-wrapper tech-detail-wrapper">
            {sid && <QRCode className="qr-login" value={`https://bachelorproef-b2b80.web.app/auth/socket-login/${sid}`} size={256} />}
            <input type="text" onChange={(e) => setEmail(e.target.value)}/>
            <input type="text" onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={login}>LOGIN</button>
            <Link to='/auth/register'>Nog geen account? Registreer</Link>
        </div>
    )
}
export default Login
