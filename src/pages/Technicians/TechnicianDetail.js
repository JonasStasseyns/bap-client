import React, {useState, useEffect} from 'react'
import axios from 'axios'

const API_ROOT = process.env.REACT_APP_API_BASE

const TechnicianDetail = (props) => {

    const [tech, setTech] = useState(false)

    useEffect(() => axios.get(`${API_ROOT}/techs/get/${props.match.params.id}`).then(res => setTech(res.data)).catch(err => console.log(err)), [])

    return (
        <div className="generic-wrapper tech-detail-wrapper">
            {tech && tech.firstName}
        </div>
    )
}
export default TechnicianDetail
