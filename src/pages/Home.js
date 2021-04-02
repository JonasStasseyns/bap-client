import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Home = () => {

    useEffect(() => axios.get("https://bachelorproef.stasseynsjonas.be/api/v1/").then(res => console.log(res)), [])

    return (
        <div className="home-wrapper">
            <h1>HomePage</h1>
        </div>
    )
}
export default Home
