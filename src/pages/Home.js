import React, {useState, useEffect} from 'react'
import axios from 'axios'

const API_ROOT = process.env.REACT_APP_API_BASE

const Home = () => {

    useEffect(() => axios.get(`${API_ROOT}/products`).then(res => console.log(res)), [])

    return (
        <div className="home-wrapper">
            <h1>HomePage</h1>
        </div>
    )
}
export default Home
