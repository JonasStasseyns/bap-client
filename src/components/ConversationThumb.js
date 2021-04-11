import React, {useEffect, useState} from 'react'

const ConversationThumb = (props) => {

    const [corr, setCorr] = useState(false)


    useEffect(() => {
        let obj = {}
        console.log(props.data.userBeta)
        if (props.data.userAlpha == props.me) {
            obj.id = props.data.userBeta
            obj.name = props.data.userBetaName
        } else {
            obj.id = props.data.userAlpha
            obj.name = props.data.userAlphaName
        }
        setCorr(obj)
    }, [])

    const openConversation = () => window.location = '/messages/'+corr.id

    return (
        <button className='conversation-thumb-button' onClick={openConversation}>
            <div className="conversation-thumb-container">
                <h3>{corr && corr.name}</h3>
                <p dangerouslySetInnerHTML={{__html: props.data.lastMessage}}/>
            </div>
        </button>
    )
}
export default ConversationThumb
