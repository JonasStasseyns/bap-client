import React, { useState } from 'react'
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import {uploadProductImage} from "../../services/firebase";
import {post} from "axios";

const AddProduct = () => {
    const [title, setTitle] = useState(false)
    const [description, setDescription] = useState(false)
    const [specs, setSpecs] = useState(false)
    const [image, setImage] = useState()
    const [imageUploadMessage, setimageUploadMessage] = useState()
    const [cpMessage, setCpMessage] = useState()
    const [category, setCategory] = useState('mobile')
    const [price, setPrice] = useState()

    const imageSelection = (e) => setImage(e.target.files[0])
    const createProduct = () => {
        post(process.env.REACT_APP_API_BASE+'/products/create', {title, category, description, specs, price}).then(res => {
            console.log(res)
            uploadProductImage(image, res.data._id).then(res => setCpMessage('Product aangemaakt')).catch(err => setCpMessage('Oeps! Er ging iets mis.'))
        })
    }

    return (
        <div className="form-fields-container">
            <input type="text" placeholder='Product titel' onChange={(e) => setTitle(e.target.value)}/>
            <CKEditor
                editor={ ClassicEditor }
                data=""
                onChange={(event, editor) => setDescription(editor.getData())}
            />
            <CKEditor
                editor={ ClassicEditor }
                data=""
                onChange={(event, editor) => setSpecs(editor.getData())}
            />

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

            <div className=''>
                <button className='edit-home-save' onClick={createProduct}>{cpMessage ? cpMessage : 'Product aanmaken'}</button>
            </div>
        </div>
    )
}
export default AddProduct;
