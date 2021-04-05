import React, {useState, useEffect} from 'react'
import axios from 'axios'


const ProductListThumbnail = (props) => {
    const product = props.product
    console.log(product)
    return (
        <a href={"/products/" + product._id}>
            <div className="product-list-thumbnail">
                <img className="product-list-thumbnail-image" src={product.image} alt={product.image} />
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
