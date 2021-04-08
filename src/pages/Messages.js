import React, {useState,useEffect} from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {decodeJWT} from "../utils/JWT";

const Messages = () => {

    decodeJWT()
    const [newMessageText, setNewMessageText] = useState(false)

    return(
        <div className="messages-wrapper">
            <div className="conversations-section">
                <div className="conversation-list">

                </div>
            </div>
            <div className="chat-section">
                <div className="chat-title-bar">Someone's Name</div>
                <div className="chat-messages-container">text</div>
                <div className="chat-send-message-bar">
                    <CKEditor
                        editor={ ClassicEditor }
                        data="<p>Hello from CKEditor 5!</p>"
                        onChange={(event, editor) => setNewMessageText(editor.getData())}/>
                </div>
            </div>
        </div>
    )
}
export default Messages
