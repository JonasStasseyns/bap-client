import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie';
import jwt from 'jsonwebtoken'
import openSocket from "socket.io-client";
import QRCode from 'qrcode.react'

const cookies = new Cookies();

const API_ROOT = process.env.REACT_APP_API_BASE




const Login = () => {

    const [sid, setSid] = useState(false)

    useEffect(() => {
        const socket = openSocket('https://ad141a8d1e5e.ngrok.io')
        socket.on('connect', () => {
            setSid(socket.json.id)
            socket.on('token-event', data => {
                console.log(data)
                cookies.set('jwt', data.token, {path:'/'});
                console.log(cookies.get('jwt'));
                window.location = '/account'
            })
        })
    }, [])

    const [email, setEmail] = useState(false)
    const [password, setPassword] = useState(false)

    const login = () => axios.post(`${API_ROOT}/auth/login`, {email, password}).then(res => {
        cookies.set('jwt', res.data.token, {path:'/'});
        console.log(cookies.get('jwt')); // Pacman
    }).catch(err => console.log(err))


    return (
        <div className="generic-wrapper tech-detail-wrapper">
            {sid && <QRCode className="qr-login" value={`https://bachelorproef-b2b80.web.app/auth/socket-login/${sid}`} size={256} />}
            <input type="text" onChange={(e) => setEmail(e.target.value)}/>
            <input type="text" onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={login}>LOGIN</button>
            {/*<button onClick={test}>test</button>*/}
        </div>
    )
}
export default Login
