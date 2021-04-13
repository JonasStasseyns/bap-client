import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {getUrlById} from "../services/firebase";


const ProductListThumbnail = (props) => {

    const [image, setImage] = useState()
    const product = props.product

    useEffect( () => fetchImage(), [])

    const fetchImage = async () => {
        const response = await getUrlById(product._id);
        setImage(response);
    }

    console.log(product)
    return (
        <a href={"/products/" + product._id}>
            <div className="product-list-thumbnail">
                <img className="product-list-thumbnail-image" src={image} alt={image} />
                <div className="product-list-thumbnail-content">
                    <h3 className="product-list-thumbnail-title">{product.title}</h3>
                    <p className="product-list-thumbnail-excerpt">{product.excerpt}</p>
                    <h4 className="product-list-thumbnail-price">&euro; {product.price}</h4>
                </div>
            </div>
        </a>
    )
}
export default ProductListThumbnail
