import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {getUrlById} from "../services/firebase";


const ProductListThumbnail = (props) => {

    const [image, setImage] = useState()
    const product = props.product

    const placeholder = "https://firebasestorage.googleapis.com/v0/b/bachelorproef-b2b80.appspot.com/o/placeholder.jpeg?alt=media&token=c6fc3ee2-eb50-4e5c-a57f-4a0042194be4"

    useEffect( () => fetchImage(), [])

    const fetchImage = async () => {
        const response = await getUrlById(product._id);
        setImage(response);
    }

    console.log(product)
    return (
        <a href={"/products/" + product._id} className="product-list-thumbnail-link">
            <div className="product-list-thumbnail">
                <img className="product-list-thumbnail-image" src={image ? image : placeholder} alt={image} />
                <div className="product-list-thumbnail-content">
                    <h3 className="product-list-thumbnail-title">{product.title}</h3>
                    <p className="product-list-thumbnail-excerpt" dangerouslySetInnerHTML={{__html: product.description.substring(0, 200)+"..."}}/>
                    <h4 className="product-list-thumbnail-price">&euro; {product.price}</h4>
                </div>
            </div>
        </a>
    )
}
export default ProductListThumbnail
