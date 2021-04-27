import React, {useEffect, useState} from 'react'
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import {uploadProductImage} from "../../services/firebase";
import axios, {post} from "axios";
import {useParams} from "react-router-dom";

const EditProduct = (props) => {
    const [title, setTitle] = useState(false)
    const [description, setDescription] = useState(false)
    const [specs, setSpecs] = useState([{name: '', value: ''}])
    const [image, setImage] = useState()
    const [imageUploadMessage, setimageUploadMessage] = useState()
    const [cpMessage, setCpMessage] = useState()
    const [category, setCategory] = useState('mobile')
    const [price, setPrice] = useState()
    const [controlHook, render] = useState(false)

    const { id } = useParams()

    const imageSelection = (e) => setImage(e.target.files[0])

    const updateProduct = () => { // CREATE UPDATE
        post(process.env.REACT_APP_API_BASE+'/products/update', {title, category, description, specs: JSON.stringify(specs), price, id}).then(res => {
            console.log(res)
            uploadProductImage(image, id).then(res => setCpMessage('Product aangepast')).catch(err => setCpMessage('Oeps! Er ging iets mis.'))
        })
    }

    useEffect(() => axios.get(process.env.REACT_APP_API_BASE+'/products/get/'+ id).then(res => {
        const data = res.data
        setTitle(data.title)
        setDescription(data.description)
        setSpecs(JSON.parse(data.specs))
        setPrice(data.price)
        setCategory(data.category)
    }), [])

    const updateSpecs = (index, arg, value) => {
        let arr = specs
        arr[index][arg] = value
        setSpecs(arr)
        render(!controlHook)
    }

    useEffect(() => console.log(specs), [specs])

    return (
        <div className="generic-wrapper auth-wrapper">
            <h1 className="add-product-title">Product bewerken</h1>
            <div className="auth-dfdc add-product-container">
                <input type="text" placeholder='Product titel' value={title} onChange={(e) => setTitle(e.target.value)}/>
                <h3>Beschrijving</h3>
                <CKEditor
                    editor={ ClassicEditor }
                    data={description}
                    onChange={(event, editor) => setDescription(editor.getData())}
                />
                <h3>Specificaties</h3>
                <div className="add-product-specs-container">
                    {specs && specs.map((spec, key) => (
                        <div className="specs-add-row" key={key}>
                            <input type="text" placeholder="Eigenschap" onChange={(e) => updateSpecs(key, 'name', e.target.value)} value={spec.name}/>
                            <input type="text" placeholder="Waarde" onChange={(e) => updateSpecs(key, 'value', e.target.value)} value={spec.value}/>
                        </div>
                    ))}
                    <button onClick={() => setSpecs(oldSpecs => [...oldSpecs, {name:'', value:''}])}>Nieuwe eigenschap</button>
                </div>

                {/*TODO POST Request and wait for resp to get in and fix image upload*/}

                <input type="number" value={price} placeholder='Prijs in euro' onChange={(e) => setPrice(e.target.value)}/>

                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="mobile">Mobiele Airco</option>
                    <option value="monoblock">Monoblock</option>
                    <option value="monosplit">Monosplit</option>
                    <option value="multisplit">Multisplit</option>
                    <option value="heatpump">Warmtepomp</option>
                </select>

                <input type='file' className="file-input file-input-pdf" onChange={(e) => imageSelection(e)} />

                <button className='edit-home-save' onClick={updateProduct}>{cpMessage ? cpMessage : 'Product opslaan'}</button>
            </div>
        </div>
    )
}
export default EditProduct;
