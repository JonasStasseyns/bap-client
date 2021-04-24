import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ProductListThumbnail from "../../components/ProductListThumbnail";
import {decodeJWT, verifyJWT} from "../../utils/JWT";

const API_ROOT = process.env.REACT_APP_API_BASE

const Account = () => {

    console.log(verifyJWT())

    const [user, setUser] = useState(false)
    const [search, setSearch] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        console.log(decodeJWT())
        axios.get(`${API_ROOT}/auth/users/`+decodeJWT().userId).then(res => {
            setUser(res.data)
        }).catch(err => console.log(err))
    }, [])

    const searchProducts = () => axios.get(`${API_ROOT}/products/search/${search}`).then(res => {
        console.log(res)
        setUser(res.data)
    }).catch(err => console.log(err))

    const updateUser = () => {
        console.log(user._id)
    }

    useEffect(() => setTimeout(() => {
        if(message!=='') setMessage('')
    }, 5000))

    useEffect(() => axios.put(process.env.REACT_APP_API_BASE+'/auth/users/'+user._id, user).then(res => setMessage('Wijzigingen opgeslagen.')), [user])

    return (
        <div className="generic-wrapper product-list-wrapper">
            <h1>Account</h1>
            {user &&
                <div className="account-data">
                    <div className="account-data-item">
                        {/*<button onClick={() => updateUser()}>ss</button>*/}
                        <input type="text" value={user.firstName} name="firstName" onChange={(e) => setUser(prevUser => ({ ...prevUser, [e.target.name]: e.target.value }))}/>
                    </div>
                    <div className="account-data-item">
                        <input type="text" value={user.lastName} name="lastName" onChange={(e) => setUser(prevUser => ({ ...prevUser, [e.target.name]: e.target.value }))}/>
                    </div>
                    <div className="account-data-item">
                        <input type="text" value={user.email} name="email" onChange={(e) => setUser(prevUser => ({ ...prevUser, [e.target.name]: e.target.value }))}/>
                    </div>
                    <div className="account-data-item">
                        <input type="text" value={user.address} name="address" onChange={(e) => setUser(prevUser => ({ ...prevUser, [e.target.name]: e.target.value }))}/>
                    </div>
                    <div className="account-data-item">
                        <input type="text" value={user.country} name="country" onChange={(e) => setUser(prevUser => ({ ...prevUser, [e.target.name]: e.target.value }))}/>
                    </div>
                    <div className="account-data-item">
                        <input type="text" value={user.phone} name="phone" onChange={(e) => setUser(prevUser => ({ ...prevUser, [e.target.name]: e.target.value }))}/>
                    </div>
                    {message}
                </div>
            }
        </div>
    )
}
export default Account
