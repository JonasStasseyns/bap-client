import React, {useState, useEffect} from 'react'
import axios from 'axios'

const API_ROOT = process.env.REACT_APP_API_BASE

const Home = () => {

    const [techs, setTechs] = useState(false)
    const [products, setProducts] = useState(false)

    useEffect(() => axios.get(`${API_ROOT}/products`).then(res => setProducts(res.data)).catch(err => console.log(err)), [])
    useEffect(() => axios.get(`${API_ROOT}/techs`).then(res => setTechs(res.data)).catch(err => console.log(err)), [])

    return (
        <div className="home-wrapper">
            <h1>HomePage</h1>
        </div>
    )
}
export default Home
