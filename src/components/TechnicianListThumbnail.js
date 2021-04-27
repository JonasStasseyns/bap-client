import React, {useState, useEffect} from 'react'
import {getUrlById} from "../services/firebase";


const TechnicianListThumbnail = (props) => {
    const [image, setImage] = useState()
    const tech = props.tech
    console.log(tech)

    const placeholder = "https://firebasestorage.googleapis.com/v0/b/bachelorproef-b2b80.appspot.com/o/placeholder.jpeg?alt=media&token=c6fc3ee2-eb50-4e5c-a57f-4a0042194be4"

    useEffect( () => fetchImage(), [])

    const fetchImage = async () => {
        const response = await getUrlById(tech._id);
        setImage(response);
    }

    return (
        <a href={"/products/" + tech._id} className="product-list-thumbnail-link">
            <div className="product-list-thumbnail tech-thumb">

                <img className="product-list-thumbnail-image" src={image ? image : placeholder} alt={image} />

                <div className="product-list-thumbnail-content">
                    <h3 className="product-list-thumbnail-title">{tech.firstName+' '+tech.lastName}</h3>
                    <p className="product-list-thumbnail-excerpt" dangerouslySetInnerHTML={{__html: tech.description.substring(0, 200)+"..."}}/>
                    <h4 className="product-list-thumbnail-price">&euro;{tech.hourlyRate}/uur</h4>
                </div>

            </div>
        </a>
    )
}
export default TechnicianListThumbnail
