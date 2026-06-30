import { useRef,useEffect } from 'react'
import { ChatMessage } from './ChatMessage';
import './ChatMessages.css'

function useAutoScroll(dependencies){

    const chatMessagesRef=useRef(null);

    useEffect(()=>{
        const containerElem= chatMessagesRef.current;
        if (containerElem){
        containerElem.scrollTop=containerElem.scrollHeight;
        }
    },[dependencies]);
    return chatMessagesRef;
}
function ChatMessages({chatMessages}){

    const chatMessagesRef=useAutoScroll(chatMessages);
    
    return (
        <div className="chat-messages-container" ref={chatMessagesRef}>
            { (chatMessages.length==0) ?
                (
                    <p className="welcome-message">Welcom to the chatbot project!
                          Send a message using textbox  below.</p>
                )
                :
                chatMessages.map((chatMessage)=>{
                    return (
                        <ChatMessage 
                            message={chatMessage.message} 
                            sender={chatMessage.sender}
                            time={chatMessage.time}
                            key={chatMessage.id} 
                        />
                    );
                })
            }
        </div>
    );
}

export default ChatMessages;