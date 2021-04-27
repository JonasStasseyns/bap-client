import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {getUrlById} from "../../services/firebase";
import CartItem from "../../components/CartItem";
import {authPolice, decodeJWT} from "../../utils/JWT";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'


const API_ROOT = process.env.REACT_APP_API_BASE

const Cart = (props) => {

    const [products, setProducts] = useState(false)
    const [images, setImages] = useState([])
    const [JWT, setJWT] = useState(false)
    const [user, setUser] = useState(false)

    const [email, setEmail] = useState(false)
    const [password, setPassword] = useState(false)
    const [firstName, setFirstName] = useState(false)
    const [city, setCity] = useState(false)
    const [postal, setPostal] = useState(false)
    const [country, setCountry] = useState(false)
    const [streetAndNum, setStreetAndNum] = useState(false)
    const [total, setTotal] = useState(0)

    useEffect( () => {
        authPolice()
        setProducts(JSON.parse(localStorage.getItem('cart')))
        setJWT(decodeJWT())
    }, [])

    useEffect( () => {
        JWT && axios.get(process.env.REACT_APP_API_BASE+'/auth/users/'+JWT.userId).then(res => setUser(res.data))
    }, [JWT])

    useEffect(() => {
        if(products){
            let localTotal = 0
            products.forEach(product => localTotal += product.price)
            setTotal(localTotal)
        }
    }, [products])

    useEffect(() => console.log(total), [total])

    const createPayment = () => {
        axios.post(process.env.REACT_APP_API_BASE+'/payments/create', {
            total,
            products: JSON.stringify(products),
            uid: JWT.userId,
            status: "pending",
            address: (streetAndNum && postal && city && country ? streetAndNum+', '+postal+' '+city+', '+country:false)
        }).then(res => {
            console.log(res)
            console.log(res.data._links.checkout)
            window.location = res.data._links.checkout.href
        })
    }

    const deleteFromCart = (index) => {
        console.log(products[index])
    }

    return (
        <div className="generic-wrapper cart-wrapper">
            <div className="product-list-container">
                <h1>Winkelwagen</h1>
                <div className="cart-product-list">
                    {products && products.map((product, key) => <CartItem product={product} key={key} index={key} deleteFromCart={deleteFromCart()} />)}
                    <div className="cart-total-row">
                        <div className="cart-total-price">Totaal {total && '€'+total}</div>
                    </div>
                </div>
            </div>
            <div className="address-details">
                <h1>Levering</h1>
                <p>Standaard leveren wij op het adres dat u invoerde bij het registreren. Wil u aan ander leveringsadres opgeven? Dan kan dit hieronder.</p>
                <h2>Huidig adres</h2>
                <h3 className="current-address">{user && user.address}</h3>
                <h4>Aangepast leveringsadres (optioneel)</h4>
                <div className="address-fields">
                    <input type="text" placeholder='Straat + huisnummer' onChange={(e) => setStreetAndNum(e.target.value)}/>
                    <input type="text" placeholder='Postcode' onChange={(e) => setPostal(e.target.value)}/>
                    <input type="text" placeholder='Plaats' onChange={(e) => setCity(e.target.value)}/>
                    <input type="text" placeholder='Land' onChange={(e) => setCountry(e.target.value)}/>
                </div>
                <button onClick={createPayment}>
                    <FontAwesomeIcon icon={faLock}/>
                    <p>Bestelling afronden</p>
                </button>
            </div>
        </div>
    )
}
export default Cart
