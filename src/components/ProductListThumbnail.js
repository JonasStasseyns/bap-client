import React, {useState, useEffect} from 'react'
import axios from 'axios'


const ProductListThumbnail = (props) => {
    const product = props.product
    return (
        <div className="product-list-thumbnail">
            <img className="product-list-thumbnail-image" src={product.image} alt={product.image} />
            <h3 className="product-list-thumbnail-title">{product.title}</h3>
            <p className="product-list-thumbnail-excerpt">{product.excerpt}</p>
            <h4 className="product-list-thumbnail-price">{product.price}</h4>
        </div>
    )
}
export default ProductListThumbnail
