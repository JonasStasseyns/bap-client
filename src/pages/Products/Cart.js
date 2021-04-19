import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {getUrlById} from "../../services/firebase";
import CartItem from "../../components/CartItem";
import {authPolice, decodeJWT} from "../../utils/JWT";



const API_ROOT = process.env.REACT_APP_API_BASE

const Cart = (props) => {

    const [products, setProducts] = useState(false)
    const [images, setImages] = useState([])
    const [JWT, setJWT] = useState(false)
    const [user, setUser] = useState(false)

    const [email, setEmail] = useState(false)
    const [password, setPassword] = useState(false)
    const [firstName, setFirstName] = useState(false)
    const [lastName, setLastName] = useState(false)
    const [address, setAddress] = useState(false)
    const [country, setCountry] = useState(false)
    const [phone, setPhone] = useState(false)
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
            status: "pending"
        }).then(res => {
            console.log(res)
            console.log(res.data._links.checkout)
            window.location = res.data._links.checkout.href
        })
    }

    return (
        <div className="generic-wrapper cart-wrapper">
            <h1>Winkelwagen</h1>
            <div className="cart-product-list">
                {products && products.map((product, key) => <CartItem product={product} key={key} />)}
                <div className="cart-total-row">
                    <div className="cart-total-price">{total && '€'+total}</div>
                </div>
            </div>
            <div className="address-details">
                <h2 className="current-address">{user && user.address}</h2>
                <div className="address-fields">
                    <input type="text" placeholder='Straat + huisnummer' onChange={(e) => setFirstName(e.target.value)}/>
                    <input type="text" placeholder='Postcode' onChange={(e) => setLastName(e.target.value)}/>
                    <input type="text" placeholder='Plaats' onChange={(e) => setAddress(e.target.value)}/>
                    <input type="text" placeholder='Land' onChange={(e) => setCountry(e.target.value)}/>
                </div>
                <button onClick={createPayment}>Betalen</button>
            </div>
        </div>
    )
}
export default Cart
