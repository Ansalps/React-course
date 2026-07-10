import { useRef,useEffect } from 'react'
import { ChatMessage } from './ChatMessage';
import './ChatMessages.css'

type ChatMessagesProps = {
  id: string;
  message: string;
  sender: "user" | "robot";
  time: number;
  loading?: boolean;
};

function useAutoScroll(dependencies:ChatMessagesProps[]){

    const chatMessagesRef=useRef<HTMLDivElement>(null);

    useEffect(()=>{
        const containerElem= chatMessagesRef.current;
        if (containerElem){
        containerElem.scrollTop=containerElem.scrollHeight;
        }
    },[dependencies]);
    return chatMessagesRef;
}
function ChatMessages({chatMessages}:{
    chatMessages: ChatMessagesProps[];
}){

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
                            loading={chatMessage.loading}
                            key={chatMessage.id} 
                        />
                    );
                })
            }
        </div>
    );
}

export default ChatMessages;