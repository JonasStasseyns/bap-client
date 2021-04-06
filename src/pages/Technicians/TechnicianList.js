import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ProductListThumbnail from "../../components/ProductListThumbnail";

const API_ROOT = process.env.REACT_APP_API_BASE

const TechnicianList = () => {

    const [products, setProducts] = useState(false)
    const [search, setSearch] = useState(false)

    useEffect(() => axios.get(`${API_ROOT}/products`).then(res => {
        console.log(res.data)
        setProducts(res.data)
    }).catch(err => console.log(err)), [])

    const searchProducts = () => axios.get(`${API_ROOT}/products/search/${search}`).then(res => {
        console.log(res)
        setProducts(res.data)
    }).catch(err => console.log(err))

    return (
        <div className="generic-wrapper product-list-wrapper">
            <h1>Products</h1>
            <div className="product-list-filter-container">
                <input type="text" className="product-list-filter-search-input" onChange={(e) => setSearch(e.target.value)}/>
                <button onClick={searchProducts}>Zoeken</button>
            </div>
            <div className="product-list-actual">
                {products && products.map((product, key) => <ProductListThumbnail product={product} key={key}/>)}
            </div>
        </div>
    )
}
export default TechnicianList
