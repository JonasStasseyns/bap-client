import React, {useState, useEffect} from 'react'
import axios from 'axios'

const API_ROOT = process.env.REACT_APP_API_BASE

const ProductDetail = (props) => {

    const [product, setProduct] = useState(false)

    useEffect(() => axios.get(`${API_ROOT}/products/get/${props.match.params.id}`).then(res => setProduct(res.data)).catch(err => console.log(err)), [])

    return (
        <div className="generic-wrapper product-detail-wrapper">
            {product && product.title}
        </div>
    )
}
export default ProductDetail
