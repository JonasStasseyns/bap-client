import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {getUrlById} from "../../services/firebase";

const API_ROOT = process.env.REACT_APP_API_BASE

const ProductDetail = (props) => {

    const [product, setProduct] = useState(false)
    const [image, setImage] = useState()
    const [cart, setCart] = useState([])
    const [atcText, setAtcText] = useState("Toevoegen aan winkelwagen")

    const placeholder = "https://firebasestorage.googleapis.com/v0/b/bachelorproef-b2b80.appspot.com/o/placeholder.jpeg?alt=media&token=c6fc3ee2-eb50-4e5c-a57f-4a0042194be4"

    useEffect( () => fetchImage(), [product])
    useEffect( () => {
        console.log(cart)
        cart && cart.length && localStorage.setItem('cart', JSON.stringify(cart))
        console.log(cart)
    }, [cart])

    const fetchImage = async () => {
        console.log(product._id)
        const response = await getUrlById(product._id);
        setImage(response);
    }

    useEffect(() => {
        console.log(JSON.parse(localStorage.getItem('cart')))
        setCart(JSON.parse(localStorage.getItem('cart')) || [])
    }, [])

    const addToCart = () => {
        console.log(cart)
        setCart([...cart, product])
        setAtcText('Toegevoegd!')
        setTimeout(() => setAtcText("Toevoegen aan winkelwagen"), 5000)
    }

    useEffect(() => axios.get(`${API_ROOT}/products/get/${props.match.params.id}`).then(res => setProduct(res.data)).catch(err => console.log(err)), [])

    return (
        <div className="generic-wrapper product-detail-wrapper">
            <div className="product-detail-main-container">
                <h2>{product && product.title}</h2>
                <h4>{product && product.category}</h4>
                <img src={image} alt={image}/>
                <h4>Beschrijving</h4>
                <p className="product-detail-desc" dangerouslySetInnerHTML={{__html: product.description}}/>
            </div>
            <div className="product-detail-sidebar">
                <div className="sidebar-order-info">
                    <h2>Bestellen</h2>
                    <h3>€{product && product.price} <span>incl. BTW</span></h3>
                    <ul>
                        <li>Beschikbaar</li>
                        {product && (product.category === "mobile" ? <li>Geen opstart nodig</li>:"")}
                        <li>Gratis verzending</li>
                        <li></li>
                    </ul>
                    <button onClick={addToCart}>{atcText}</button>
                </div>
                <div className="specs">
                    <h4>Specificaties</h4>
                    <div className="specs-value-container">
                        {product && JSON.parse(product.specs).map((spec, key) => (
                            <div className="spec-row" key={key}>
                                <div>{spec.name}</div>
                                <div>{spec.value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}
export default ProductDetail
