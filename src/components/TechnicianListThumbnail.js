import React, {useState, useEffect} from 'react'


const TechnicianListThumbnail = (props) => {
    const tech = props.tech
    console.log(tech)
    return (
        <a href={"/techs/" + tech._id}>
            <div className="product-list-thumbnail">
                <img className="product-list-thumbnail-image" src={tech.image} alt={tech.image} />
                <div className="product-list-thumbnail-content">
                    <h3 className="product-list-thumbnail-title">{tech.lastName}</h3>
                    <p className="product-list-thumbnail-excerpt">{tech.description}</p>
                    <h4 className="product-list-thumbnail-price">&euro; {tech.hourlyRate}</h4>
                </div>
            </div>
        </a>
    )
}
export default TechnicianListThumbnail
