import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ProductListThumbnail from "../components/ProductListThumbnail";

const API_ROOT = process.env.REACT_APP_API_BASE

const ProductList = () => {

    const [products, setProducts] = useState(false)

    useEffect(() => axios.get(`${API_ROOT}/products`).then(res => {
        console.log(res.data)
        setProducts(res.data)
    }).catch(err => console.log(err)), [])

    return (
        <div className="generic-wrapper product-list-wrapper">
            <h1>Products</h1>
            <div className="product-list-actual">
                {products && products.map((product, key) => <ProductListThumbnail product={product} key={key}/>)}
            </div>
        </div>
    )
}
export default ProductList
