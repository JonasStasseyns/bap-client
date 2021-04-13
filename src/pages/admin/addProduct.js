import React, { useState } from 'react'
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import {uploadProductImage} from "../../services/firebase";

const AddProduct = () => {
    const [title, setTitle] = useState(false)
    const [description, setDescription] = useState(false)
    const [specs, setSpecs] = useState(false)
    const [image, setImage] = useState()
    const [imageUploadMessage, setimageUploadMessage] = useState()
    const [category, setCategory] = useState()
    const [price, setPrice] = useState()

    const pdfSelection = (e) => setImage(e.target.files[0])
    const pdfUpload = () => {
        uploadProductImage(image).then(res => setimageUploadMessage('Afbeelding opgeslagen')).catch(err => setimageUploadMessage('Oeps! Er ging iets mis.'))
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
        </div>
    )
}
export default AddProduct;
