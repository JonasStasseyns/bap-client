import React, {useEffect, useState} from 'react'
import {getUrlById} from "../services/firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const CartItem = (props) => {

    const [corr, setCorr] = useState(false)
    const [image, setImage] = useState(false)

    // useEffect(() => getImage(props.product._id), [])
    // const placeholder = "https://firebasestorage.googleapis.com/v0/b/bachelorproef-b2b80.appspot.com/o/placeholder.jpeg?alt=media&token=c6fc3ee2-eb50-4e5c-a57f-4a0042194be4"


    // const getImage = async (id) => setImage(await getUrlById(id))
    const deleteFromCart = () => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        console.log(cart)
        cart.splice(props.index, 1)
        console.log(cart)
        localStorage.setItem('cart', JSON.stringify(cart))
    }

    // TODO FIx reload of sth

    return (
        <div className="cart-product-thumbnail">
            {/*<div className="product-image-container">*/}
            {/*    <img src={image ? image : placeholder} alt={props.product.title}/>*/}
            {/*</div>*/}
            <div className="cart-item-text">
                <FontAwesomeIcon className="fa-delete" icon={faTimes} onClick={() => deleteFromCart()} />
            </div>
            <div className="cart-item-text">
                <h2 className="product-value">{props.product.title}</h2>
            </div>
            <div className="cart-item-text">
                <h2 className="product-value">€{props.product.price}</h2>
            </div>
        </div>
    )
}
export default CartItem
