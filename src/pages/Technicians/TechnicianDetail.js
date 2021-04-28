import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from "react-router-dom";

const API_ROOT = process.env.REACT_APP_API_BASE

const TechnicianDetail = (props) => {

    const [tech, setTech] = useState(false)

    useEffect(() => axios.get(`${API_ROOT}/techs/get/${props.match.params.id}`).then(res => {
        console.log(res)
        setTech(res.data)
    }).catch(err => console.log(err)), [])



    return (
        <div className="generic-wrapper product-detail-wrapper">
            <div className="tech-detail-main-container">
                <h2>{tech && (tech.firstName + ' ' + tech.lastName)}</h2>
                <h4>{tech && tech.category}</h4>
                {/*<img src={image} alt={image}/>*/}
                <h4>Beschrijving</h4>
                {tech && <p className="product-detail-desc" dangerouslySetInnerHTML={{__html: tech.description}}/>}
                <h4>Specificaties</h4>
                {tech && <p className="product-detail-specs" dangerouslySetInnerHTML={{__html: tech.specs}}/>}
            </div>
            <div className="product-detail-sidebar">
                <h3>{tech && tech.price}</h3>
                <ul>
                    <li>Beschikbaar</li>
                    <li>Geen opstart nodig</li>
                    <li>Gratis verzending</li>
                </ul>
                {tech && (tech.firstName + ' ' + tech.lastName)}
                {tech && <Link to={"/messages/"+tech.userId}>
                    <button className="contact-tech">Contacteer {tech.firstName}</button>
                </Link>}
            </div>
        </div>
    )
}
export default TechnicianDetail
