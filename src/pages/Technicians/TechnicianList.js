import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ProductListThumbnail from "../../components/ProductListThumbnail";
import TechnicianListThumbnail from "../../components/TechnicianListThumbnail";

const API_ROOT = process.env.REACT_APP_API_BASE

const TechnicianList = () => {

    const [techs, setTechs] = useState(false)
    const [search, setSearch] = useState(false)

    useEffect(() => axios.get(`${API_ROOT}/techs`).then(res => {
        console.log(res.data)
        setTechs(res.data)
    }).catch(err => console.log(err)), [])

    const searchProducts = () => axios.get(`${API_ROOT}/techs/search/${search}`).then(res => {
        console.log(res)
        setTechs(res.data)
    }).catch(err => console.log(err))

    return (
        <div className="generic-wrapper product-list-wrapper">
            <h1>Products</h1>
            <div className="product-list-filter-container">
                <input type="text" className="product-list-filter-search-input" onChange={(e) => setSearch(e.target.value)}/>
                <button onClick={searchProducts}>Zoeken</button>
            </div>
            <div className="product-list-actual">
                {techs && techs.map((tech, key) => <TechnicianListThumbnail tech={tech} key={key}/>)}
            </div>
        </div>
    )
}
export default TechnicianList
