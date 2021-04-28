import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from "react-router-dom";
import ProductListThumbnail from "../components/ProductListThumbnail";

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
            <div className="banner generic-wrapper">
                <div className="left">
                    <h1>AC Assistant</h1>
                    <h3>Uw airconditioning assistent</h3>
                </div>
                {/*<div className="right">*/}
                {/*    <Link to='/wizard'>*/}
                {/*        <button>Persoonlijk advies</button>*/}
                {/*    </Link>*/}
                {/*</div>*/}
            </div>
            <div className="home-main-content">
                <div className="home-text">
                    <div>
                        <h1>Airconditioning aanschaffen?</h1>
                        <h2>Graag! Maar hoe begin ik daar aan?</h2>
                        <p>U denkt er reeds een hele tijd over na om een airconditioningsysteem aan te schaffen, of de extreem hete zomers hebben u overtuigd een airco te kopen. We kennen het allemaal, maar hoe begin je daar nu aan?</p>
                        <p>Voor particulieren is het een pak minder evident om een airco aan te schaffen.</p>

                        <p>U denkt er reeds een hele tijd over na om een airconditioningsysteem aan te schaffen, of de extreem hete zomers hebben u overtuigd een airco te kopen. We kennen het allemaal, maar hoe begin je daar nu aan?</p>
                        <p>Voor particulieren is het een pak minder evident om een airco aan te schaffen.</p>

                        <p>U denkt er reeds een hele tijd over na om een airconditioningsysteem aan te schaffen, of de extreem hete zomers hebben u overtuigd een airco te kopen. We kennen het allemaal, maar hoe begin je daar nu aan?</p>
                        <p>Voor particulieren is het een pak minder evident om een airco aan te schaffen.</p>
                    </div>
                    <div>
                        {/*piep*/}
                    </div>
                </div>
                <div className="home-product-list-container">
                    <h1>Populaire toestellen</h1>
                    <div className="home-product-list">
                        {products && products.slice(0, 3).map((product, key) => <ProductListThumbnail product={product} key={key} isHome="home-plt"/>)}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home
