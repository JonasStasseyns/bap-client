import React, {useEffect, useState} from 'react'
import axios from "axios";
import {decodeJWT} from "../../utils/JWT";
import {getUrlById} from "../../services/firebase";

const Advice = () => {

    const [products, setProducts] = useState(false)
    const [images, setImages] = useState([])

    useEffect(() => axios.get(process.env.REACT_APP_API_BASE+'/advice/'+decodeJWT().userId).then(res => {
        loadImages(res.data)
        setProducts(res.data)
    }), [])

    const loadImages = async (data) => {
        const arr = []
        await data.forEach(product => getUrlById(product._id).then(image => arr.push(image)))
        console.log(arr)
    }

    return (
        <div className="generic-wrapper">
            <h1>Uw persoonlijk advies</h1>
            <div className="personal-advice-row">
                <h2>Deze toestellen passen het best bij uw voorkeuren</h2>
                <div className="personal-advice-row-device-list">
                    {products && products.map((product, key) => (
                        <div key={key}>
                            <h2>{product.title}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Advice
