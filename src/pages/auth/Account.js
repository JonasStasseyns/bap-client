import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {decodeJWT, verifyJWT} from "../../utils/JWT";
import {Link} from "react-router-dom";

const API_ROOT = process.env.REACT_APP_API_BASE

const Account = () => {

    console.log(verifyJWT())

    const [init, setInit] = useState(true)
    const [user, setUser] = useState()
    const [search, setSearch] = useState(false)

    const [message, setMessage] = useState('')
    const [passwordResetMessage, setPasswordResetMessage] = useState('')
    const [showChangePassword, setShowChangePassword] = useState(false)
    const [newPassword, setNewPassword] = useState(false)
    const [newPasswordRepeat, setNewPasswordRepeat] = useState(false)

    const [orders, setOrders] = useState(false);

    useEffect(() => {
        console.log(decodeJWT())
        axios.get(`${API_ROOT}/auth/users/` + decodeJWT().userId).then(res => {
            setUser(res.data)
        }).catch(err => console.log(err))
        axios.get(`${API_ROOT}/payments/order-history/` + decodeJWT().userId).then(res => {
            setOrders(res.data)
            console.log(res.data)
        }).catch(err => console.log(err))
    }, [])


    const updateUser = () => {
        console.log(user._id)
    }

    useEffect(() => setTimeout(() => {
        if (message !== '') setMessage('')
    }, 5000), [message])

    useEffect(() => {
        console.log("#### TAKE")
        if(!init) axios.put(process.env.REACT_APP_API_BASE + '/auth/users/' + user._id, user).then(res => setMessage('Wijzigingen opgeslagen.'))
        if(user) setInit(false)
    }, [user])

    const updatePassword = () => {
        if (newPassword !== newPasswordRepeat) return setPasswordResetMessage('Wachtwoorden komen niet overeen')
        axios.post(process.env.REACT_APP_API_BASE + '/auth/password-reset/finish', {
            token: user._id,
            password: newPassword
        }).then(res => setShowChangePassword(false))
    }

    return (
        <div className="generic-wrapper product-list-wrapper">
            <h1>Account</h1>
            {user &&
            <div className="account-data">
                {/*<button onClick={() => updateUser()}>ss</button>*/}
                <input type="text" value={user.firstName} name="firstName"
                       onChange={(e) => setUser(prevUser => ({...prevUser, [e.target.name]: e.target.value}))}/>
                <input type="text" value={user.lastName} name="lastName"
                       onChange={(e) => setUser(prevUser => ({...prevUser, [e.target.name]: e.target.value}))}/>
                <input type="text" value={user.email} name="email"
                       onChange={(e) => setUser(prevUser => ({...prevUser, [e.target.name]: e.target.value}))}/>
                <input type="text" value={user.address} name="address"
                       onChange={(e) => setUser(prevUser => ({...prevUser, [e.target.name]: e.target.value}))}/>
                <input type="text" value={user.country} name="country"
                       onChange={(e) => setUser(prevUser => ({...prevUser, [e.target.name]: e.target.value}))}/>
                <input type="text" value={user.phone} name="phone"
                       onChange={(e) => setUser(prevUser => ({...prevUser, [e.target.name]: e.target.value}))}/>
                <p>{message}</p>
                <div className="change-password-div">
                    <button onClick={() => setShowChangePassword(true)}>Wijzig wachtwoord</button>
                    {showChangePassword &&
                    <div className="advice-modal-overlay">
                        <div className="advice-modal">
                            <div className="change-password-modal account-pw-reset">
                                <h1>Kies een nieuw wachtwoord</h1>
                                {passwordResetMessage}
                                <input type="password" placeholder="wachtwoord"
                                       onChange={(e) => setNewPassword(e.target.value)}/>
                                <input type="password" placeholder="wachtwoord herhaling"
                                       onChange={(e) => setNewPasswordRepeat(e.target.value)}/>
                                <button onClick={() => updatePassword()}>Wijzig wachtwoord</button>
                            </div>
                        </div>
                    </div>
                    }
                </div>
                <div className="last-advice">
                    <h1>Uw laatste advies</h1>
                    <Link to="/products/advice">
                        <button>Persoonlijke toestelselectie</button>
                    </Link>
                </div>
                <div className="order-history-container">
                    <h1>Bestelhistoriek</h1>
                    <div className="order-history-list">
                        {orders && orders.map((order, key) => (
                            <div className="account-order" key={key}>
                                <h2 className="order-history-item-title">Bestelling #{order.paymentId}</h2>
                                <h2 className="order-history-item-title-products">producten</h2>
                                {JSON.parse(order.products).map((product, pKey) => <h3 key={pKey}>{product.title}</h3>)}
                                <h2 className="order-history-total">
                                    Totaal € {order.total}
                                </h2>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            }
        </div>
    )
}
export default Account
