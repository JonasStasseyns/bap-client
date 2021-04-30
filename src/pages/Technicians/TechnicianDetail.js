import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from "react-router-dom";
import {getTechUrlById, getUrlById} from "../../services/firebase";

const API_ROOT = process.env.REACT_APP_API_BASE

const TechnicianDetail = (props) => {

    const [allows, setAllows] = useState([])

    const tech = props.tech


    useEffect(() => {
        const jobs = JSON.parse(tech.allowedJobs)
        Object.entries(jobs).forEach(([key,value])=>{
            console.log(typeof value)
            if(key === 'start' && value) setAllows(allows => [...allows, 'Opstart'])
            if(key === 'install' && value) setAllows(allows => [...allows, 'Installatie'])
            if(key === 'start' && value) setAllows(allows => [...allows, 'Volledig traject'])
        })
    }, []);

    return (
        <div className="tech-detail-sidebar">
            <div className="tech-detail-main-container">
                <h2>{tech && (tech.firstName + ' ' + tech.lastName)}</h2>
                <h3>Aanvaarde klussen:</h3>
                <div className="allowed-jobs">
                    {(allows && allows.length > 0) ? allows.map((job, key) => <h4 key={key}>{job}</h4>) : ''}
                </div>
                {/*<img src={image} alt={image}/>*/}
                <h3>Beschrijving</h3>
                {tech && <p className="tech-detail-desc" dangerouslySetInnerHTML={{__html: tech.description}}/>}
                <h3>Prijs per uur</h3>
                {tech && <p className="product-detail-specs">€ {tech.hourlyRate}</p>}
                {tech && <Link to={"/messages/"+tech.userId}>
                    <button className="contact-tech">Contacteer {tech.firstName}</button>
                </Link>}
            </div>
        </div>
    )
}
export default TechnicianDetail
