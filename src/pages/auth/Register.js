import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie';
import jwt from 'jsonwebtoken'
import openSocket from "socket.io-client";
import QRCode from 'qrcode.react'
import {uploadProfilePicture, uploadTechPicture} from "../../services/firebase";

const cookies = new Cookies();

const API_ROOT = process.env.REACT_APP_API_BASE


const Register = (props) => {
    const [email, setEmail] = useState(false)
    const [password, setPassword] = useState(false)
    const [repeatPassword, setRepeatPassword] = useState(false)
    const [firstName, setFirstName] = useState(false)
    const [lastName, setLastName] = useState(false)
    const [address, setAddress] = useState(false)
    const [country, setCountry] = useState(false)
    const [phone, setPhone] = useState(false)

    const [hourlyRate, setHourlyRate] = useState(false)
    const [company, setCompany] = useState(false)
    const [description, setDescription] = useState(false)
    const [city, setCity] = useState('__DEV__')
    const [image, setImage] = useState('https://media.istockphoto.com/vectors/profile-placeholder-image-gray-silhouette-no-photo-vector-id1016744004?k=6&m=1016744004&s=170667a&w=0&h=dsibM8vNYIJDN1wtB8SWex8M99vl6a9NoDsobZ9dUCo=')

    const [userType, setUserType] = useState('user')
    const [error, setError] = useState('')


    useEffect(() => console.log(userType), [userType])

    const login = () => {
        if(password !== repeatPassword) return setError('Wachtwoorden komen niet overeen')
        axios.post(`${API_ROOT}/auth/register`, {email, password, firstName, lastName, address, country, phone}).then(res => {
            console.log(res.data.data.user._id)
            if(userType === "user" && image) uploadProfilePicture(image).then(res => window.location = '/auth/login')
            if(userType === "tech") axios.post(`${API_ROOT}/techs/create`, {hourlyRate, city, firstName, lastName, company, description, userId: res.data.data.user._id}).then(res => {
                console.log(res)
                if(image) uploadTechPicture(image, res.data._id).then(res => window.location = '/auth/login')
            }).catch(err => console.log(err))
        }).catch(err => console.log(err))
    }

    const selectImage = (image) => setImage(image)

    return (
        <div className="generic-wrapper auth-wrapper">
            <div className="auth-dfdc">
                <h2>Registreer</h2>
                {error}
                <div className="form-fields-container">
                    <input type="text" placeholder='E-mailadres' onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder='wachtwoord' onChange={(e) => setPassword(e.target.value)}/>
                    <input type="password" placeholder='herhaal wachtwoord' onChange={(e) => setRepeatPassword(e.target.value)}/>
                    <input type="text" placeholder='voornaam' onChange={(e) => setFirstName(e.target.value)}/>
                    <input type="text" placeholder='naam' onChange={(e) => setLastName(e.target.value)}/>
                    <input type="text" placeholder='adres' onChange={(e) => setAddress(e.target.value)}/>
                    <input type="text" placeholder='land' onChange={(e) => setCountry(e.target.value)}/>
                    <input type="text" placeholder='0497159463' onChange={(e) => setPhone(e.target.value)}/>
                    <input type="file" onChange={(e) => selectImage(e.target.files[0])} />

                    <select className="user-role-select" onChange={(e) => setUserType(e.target.value)}>
                        <option value="user">Gebruiker</option>
                        <option value="tech">Installateur</option>
                    </select>

                    {userType === 'tech' &&
                    <div className="form-fields-container">
                        <input type="text" placeholder='Prijs per uur' onChange={(e) => setHourlyRate(e.target.value)}/>
                        <input type="text" placeholder='Bedrijfsnaam' onChange={(e) => setCompany(e.target.value)}/>
                        <input type="text" placeholder='Beschrijving' onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                    }

                </div>
                <button onClick={login}>REGISTREER</button>
            </div>
        </div>
    )
}
export default Register
