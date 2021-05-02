import React, {useEffect, useState} from 'react'
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import {uploadProductImage} from "../../services/firebase";
import {post} from "axios";
import {adminJWT} from "../../utils/JWT";

const AddProduct = () => {
    const [title, setTitle] = useState(false)
    const [description, setDescription] = useState(false)
    const [specs, setSpecs] = useState([{name: '', value: ''}])
    const [image, setImage] = useState()
    const [imageUploadMessage, setimageUploadMessage] = useState()
    const [cpMessage, setCpMessage] = useState()
    const [category, setCategory] = useState('mobile')
    const [price, setPrice] = useState()
    const [controlHook, render] = useState(false)

    const imageSelection = (e) => setImage(e.target.files[0])
    const createProduct = () => {
        post(process.env.REACT_APP_API_BASE+'/products/create', {title, category, description, specs: JSON.stringify(specs), price}).then(res => {
            console.log(res)
            uploadProductImage(image, res.data._id).then(res => setCpMessage('Product aangemaakt')).catch(err => setCpMessage('Oeps! Er ging iets mis.'))
        })
    }

    const updateSpecs = (index, arg, value) => {
        let arr = specs
        arr[index][arg] = value
        setSpecs(arr)
        render(!controlHook)
    }

    useEffect(() => console.log(specs), [specs])

    return (
        <div className="generic-wrapper auth-wrapper">
            <h1 className="add-product-title">Nieuw product</h1>
            <div className="auth-dfdc add-product-container">
                <input type="text" placeholder='Product titel' onChange={(e) => setTitle(e.target.value)}/>
                <h3>Beschrijving</h3>
                <CKEditor
                    editor={ ClassicEditor }
                    data=""
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

                <input type="number" placeholder='Prijs in euro' onChange={(e) => setPrice(e.target.value)}/>

                <select onChange={(e) => setCategory(e.target.value)}>
                    <option value="mobile">Mobiele Airco</option>
                    <option value="monoblock">Monoblock</option>
                    <option value="monosplit">Monosplit</option>
                    <option value="multisplit">Multisplit</option>
                    <option value="heatpump">Warmtepomp</option>
                </select>

                <input type='file' className="file-input file-input-pdf" onChange={(e) => imageSelection(e)} />

                <button className='edit-home-save' onClick={createProduct}>{cpMessage ? cpMessage : 'Product aanmaken'}</button>
            </div>
        </div>
    )
}
export default AddProduct;
