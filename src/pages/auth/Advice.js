import React, {useEffect, useState} from 'react'
import axios from "axios";
import {decodeJWT, verifyJWT} from "../../utils/JWT";
import {getUrlById} from "../../services/firebase";
import {Link} from "react-router-dom";

const Advice = () => {

    const [products, setProducts] = useState(false)
    const [images, setImages] = useState([])

    useEffect(() => {

    }, [])

    return (
        <div className="advice-modal-overlay">
            <div className="advice-modal">
                <h1>Uw persoonlijk advies</h1>
                <Link to="/products/advice">
                    <button>Persoonlijke toestelselectie</button>
                </Link>
                {/*<Link to="/products/advice">*/}
                {/*    <button>Persoonlijke toestelselectie</button>*/}
                {/*</Link>*/}
            </div>
        </div>
    )
}
export default Advice
