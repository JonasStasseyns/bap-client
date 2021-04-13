import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {getUrlById} from "../../services/firebase";

const API_ROOT = process.env.REACT_APP_API_BASE

const ProductDetail = (props) => {

    const [product, setProduct] = useState(false)
    const [image, setImage] = useState()

    const placeholder = "https://firebasestorage.googleapis.com/v0/b/bachelorproef-b2b80.appspot.com/o/placeholder.jpeg?alt=media&token=c6fc3ee2-eb50-4e5c-a57f-4a0042194be4"

    useEffect( () => fetchImage(), [])

    const fetchImage = async () => {
        const response = await getUrlById(product._id);
        setImage(response);
    }

    useEffect(() => axios.get(`${API_ROOT}/products/get/${props.match.params.id}`).then(res => setProduct(res.data)).catch(err => console.log(err)), [])

    return (
        <div className="generic-wrapper product-detail-wrapper">
            {product && product.title}
            <p className="product-detail-specs" dangerouslySetInnerHTML={{__html: product.specs}}/>
        </div>
    )
}
export default ProductDetail
