import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ProductListThumbnail from "../../components/ProductListThumbnail";

const API_ROOT = process.env.REACT_APP_API_BASE

const ProductList = () => {

    const [products, setProducts] = useState(false)
    const [query, setQuery] = useState({
        search: false,
        filter: false,
        sort: false
    })

    const sortOptions = [
        false,
        {price: 1},
        {price: -1},
        {title: 1},
        {title: -1}
    ]

    useEffect(() => axios.get(`${API_ROOT}/products`).then(res => {
        setProducts(res.data)
    }).catch(err => console.log(err)), [])

    const searchProducts = () => axios.post(`${API_ROOT}/products/query`, query).then(res => {
        setProducts(res.data)
    }).catch(err => console.log(err))

    useEffect(() => searchProducts(), [query])

    return (
        <div className="generic-wrapper product-list-wrapper">
            <h1>Airconditioning toestellen</h1>
            <div className="product-list-filter-container">
                <input type="text" placeholder="Zoekterm..." className="product-list-filter-search-input" onChange={(e) => setQuery({...query, search: e.target.value})}/>
                {/*<button onClick={searchProducts}>Zoeken</button>*/}
                <select onChange={(e) => setQuery({...query, filter: e.target.value})}>
                    <option value={false}>Alle types</option>
                    <option value="mobile">Mobiele Airco</option>
                    <option value="monoblock">Monoblock</option>
                    <option value="monosplit">Monosplit</option>
                    <option value="multisplit">Multisplit</option>
                    <option value="heatpump">Warmtepomp</option>
                </select>
                <select onChange={(e) => setQuery({...query, sort: sortOptions[e.target.value]})}>
                    <option value={0}>Relevantie</option>
                    <option value={1}>Prijs laag - hoog</option>
                    <option value={2}>Prijs hoog - laag</option>
                    <option value={3}>Alfabetisch A - Z</option>
                    <option value={4}>Alfabetisch Z - A</option>
                </select>
            </div>
            <div className="product-list-actual">
                {products && products.map((product, key) => <ProductListThumbnail product={product} key={key}/>)}
            </div>
        </div>
    )
}
export default ProductList
