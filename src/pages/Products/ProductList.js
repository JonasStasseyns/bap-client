import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ProductListThumbnail from "../../components/ProductListThumbnail";

const API_ROOT = process.env.REACT_APP_API_BASE

const ProductList = () => {

    const [products, setProducts] = useState(false)
    const [search, setSearch] = useState(false)
    const [catFilter, setCatFilter] = useState(false)

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
                <select onChange={(e) => setCatFilter(e.target.value)}>
                    <option value="false">Alle types</option>
                    <option value="mobile">Mobiele Airco</option>
                    <option value="monoblock">Monoblock</option>
                    <option value="monosplit">Monosplit</option>
                    <option value="multisplit">Multisplit</option>
                    <option value="heatpump">Warmtepomp</option>
                </select>
            </div>
            <div className="product-list-actual">
                {products && products.map((product, key) => <ProductListThumbnail product={product} key={key}/>)}
            </div>
        </div>
    )
}
export default ProductList
