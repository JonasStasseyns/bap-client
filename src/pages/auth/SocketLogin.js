import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie';
import jwt from 'jsonwebtoken'
import {verifyJWT} from "../../utils/JWT";

const cookies = new Cookies();

const API_ROOT = process.env.REACT_APP_API_BASE

const SocketLogin = (props) => {

    const [email, setEmail] = useState(false)
    const [password, setPassword] = useState(false)
    const [disp, setDisp] = useState('disp')
    const [reddy, setReddy] = useState(false)

    useEffect(() => {
        if (verifyJWT()) {
            setDisp('I WORK')
            axios.post(`${API_ROOT}/auth/login/check`, {
                sid: props.match.params.sid,
                token: cookies.get('jwt')
            }).then(res => {
                setDisp('THIS DOES')
                setReddy(true)
            }).catch(err => console.log(err))
        }
    }, [])

    const login = () => {
        axios.post(`${API_ROOT}/auth/login`, {email, password, sid: props.match.params.sid}).then(res => {
            setDisp('Logged In')
            cookies.set('jwt', res.data.token, {path: '/'});
            console.log(cookies.get('jwt')); // Pacman
        }).catch(err => console.log(err))
    }


    return (
        <div className="generic-wrapper tech-detail-wrapper">
            {reddy ? <h1>Logged in successfully</h1> : <div>
                <input type="text" onChange={(e) => setEmail(e.target.value)}/>
                <input type="text" onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={login}>LOGIN</button>
                </div>}
            {disp}
            {/*<button onClick={test}>test</button>*/}
        </div>
    )
}
export default SocketLogin
