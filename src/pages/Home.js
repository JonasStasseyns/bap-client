import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Home = () => {

    useEffect(() => axios.get("https://0c1dd13a7ecb.ngrok.io/api/v1/products").then(res => console.log(res)), [])

    return (
        <div className="home-wrapper">
            <h1>HomePage</h1>
        </div>
    )
}
export default Home
