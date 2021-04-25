import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from "react-router-dom";

const API_ROOT = process.env.REACT_APP_API_BASE

const Home = () => {

    const [techs, setTechs] = useState(false)
    const [products, setProducts] = useState(false)

    useEffect(() => axios.get(`${API_ROOT}/products`).then(res => setProducts(res.data)).catch(err => console.log(err)), [])
    useEffect(() => axios.get(`${API_ROOT}/techs`).then(res => setTechs(res.data)).catch(err => console.log(err)), [])

    const test = () => {
        let array = [
            {
                id: "12345",
                value: "Alpha"
            },
            {
                id: "678910",
                value: "Beta"
            },
            {
                id: "11121314",
                value: "Charlie"
            }
        ]
        console.log(array)
        const socketTargets = array.filter(obj => {
            return (obj.id !== '678910') ? obj : false
        })
        array = socketTargets
        console.log(array)
    }

    return (
        <div className="generic-wrapper home-wrapper">
            <div className="banner">
                <div className="left">
                    <h1>AC Assistant</h1>
                    <h3>Uw airconditioning assistent!</h3>
                </div>
                <div className="right">
                    <Link to='/wizard'>
                        <button>Persoonlijk advies</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Home
