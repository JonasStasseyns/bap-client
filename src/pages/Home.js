import React, {useState, useEffect} from 'react'
import axios from 'axios'

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
        <div className="home-wrapper">
            <h1>HomePage</h1>
            <button onClick={test}>DDDDDD</button>
        </div>
    )
}
export default Home
