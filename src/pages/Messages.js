import React, {useState,useEffect, useRef} from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {decodeJWT} from "../utils/JWT";
import axios from "axios";
import {useParams} from "react-router-dom";
import ConversationThumb from "../components/ConversationThumb";

const Messages = (props) => {

    const messageEl = useRef(null);

    const [newMessageText, setNewMessageText] = useState(false)
    const [JWT, setJWT] = useState({})
    const [conversations, setConversations] = useState(false)
    const [activeChatCorr, setActiveChatCorr] = useState({})
    const [activeChat, setActiveChat] = useState(false)

    const { correspondant } = useParams()

    props.socket.on('receive-message', data => loadMessages())

    useEffect(() => {
        scroller()
        setJWT(decodeJWT())
    }, [])



    useEffect(() => loadMessages(), [JWT])

    const loadMessages = () => {

        console.log(JWT)
        if (correspondant) {
            axios.get(process.env.REACT_APP_API_BASE+'/auth/users/'+correspondant).then(res => setActiveChatCorr(res.data))
            axios.get(process.env.REACT_APP_API_BASE+'/messages/conversation/'+JWT.userId+'/'+correspondant).then(res => {
                setActiveChat(res.data)
                console.log(res.data)
            })
        }
        setConversations([])
        axios.get(process.env.REACT_APP_API_BASE+'/messages/'+JWT.userId).then(res => {
            console.log(res.data)
            setConversations(res.data)
        })
    }

    useEffect(() => console.log(conversations), [conversations])

    const sendMessage = () => {
        axios.post(process.env.REACT_APP_API_BASE+'/messages/create',
            {
                sender_id: JWT.userId,
                receiver_id: correspondant,
                message: newMessageText,
                userAlphaName: JWT.fullName,
                userBetaName: `${activeChatCorr.firstName} ${activeChatCorr.lastName}`
        }).then(res => {
            props.socket.emit('message-sorter', {id: correspondant, message: newMessageText})
            loadMessages()
        })
    }

    const scroller = () => {
        if (messageEl) {
            messageEl.current.addEventListener('DOMNodeInserted', event => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            });
        }
    }

    return(
        <div className="messages-wrapper">
            <div className="conversations-section">
                <div className="conversation-list">
                    {conversations && conversations.map((conversation, key) => <ConversationThumb data={conversation} me={JWT.userId} key={key} />)}
                </div>
            </div>
            <div className="chat-section">
                <div className="chat-title-bar">{activeChatCorr && `${activeChatCorr.firstName} ${activeChatCorr.lastName}`}</div>
                <div className="chat-messages-container" ref={messageEl}>
                    {activeChat && activeChat.map((message, key) => (
                        <div key={key} className={"active-chat-message "+(message.sender_id==JWT.userId?'acm-me':'acm-other')}>
                            <p dangerouslySetInnerHTML={{__html: message.message}}/>
                        </div>
                    ))}
                </div>
                <div className="chat-send-message-bar">
                    <CKEditor
                        editor={ ClassicEditor }
                        data=""
                        onChange={(event, editor) => setNewMessageText(editor.getData())}
                    />
                    <button className='messages-send-button' onClick={sendMessage}>Verstuur</button>
                </div>
            </div>
        </div>
    )
}
export default Messages
