import React, {useEffect, useState} from 'react'
import {getUrlById} from "../services/firebase";

const CartItem = (props) => {

    const [corr, setCorr] = useState(false)
    const [image, setImage] = useState(false)

    useEffect(() => getImage(props.product._id), [])
    const placeholder = "https://firebasestorage.googleapis.com/v0/b/bachelorproef-b2b80.appspot.com/o/placeholder.jpeg?alt=media&token=c6fc3ee2-eb50-4e5c-a57f-4a0042194be4"


    const getImage = async (id) => setImage(await getUrlById(id))

    return (
        <div className="cart-product-thumbnail">
            <div className="product-image-container">
                <img src={image ? image : placeholder} alt={props.product.title}/>
            </div>
            <h2 className="product-value">{props.product.title}</h2>
            <h2 className="product-value">€{props.product.price}</h2>
        </div>
    )
}
export default CartItem
