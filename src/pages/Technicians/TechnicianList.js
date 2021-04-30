import React, {useEffect, useState} from 'react'
import axios from 'axios'
import TechnicianListThumbnail from "../../components/TechnicianListThumbnail";
import TechnicianDetail from "./TechnicianDetail";

const API_ROOT = process.env.REACT_APP_API_BASE

const TechnicianList = () => {

    const [techs, setTechs] = useState(false)
    const [detailTech, setDetailTech] = useState(false)
    const [query, setQuery] = useState({
        search: false,
        filter: false,
        sort: false
    })

    const sortOptions = [
        false,
        {price: 1},
        {price: -1},
        {title: 1},
        {title: -1}
    ]

    useEffect(() => axios.get(`${API_ROOT}/techs`).then(res => {
        console.log(res.data)
        setTechs(res.data)
    }).catch(err => console.log(err)), [])

    const loadTechs = () => axios.post(`${API_ROOT}/techs/query`, query).then(res => {
        console.log(res)
        setTechs(res.data)
    }).catch(err => console.log(err))

    useEffect(() => {
        console.log(query)
        loadTechs()
    }, [query])

    const selectTech = (t) => {
        setDetailTech(t)
        console.log('selection')
    }

    return (
        <div className="generic-wrapper product-list-wrapper">
            <h1>Installateurs & koeltechniekers</h1>
            <div className="tech-list-main">
                <div className="product-list-actual">
                    {techs && techs.map((tech, key) => <TechnicianListThumbnail selecter={selectTech} tech={tech} key={key}/>)}
                </div>
                {detailTech && <TechnicianDetail tech={detailTech}/>}
            </div>

        </div>
    )
}
export default TechnicianList
