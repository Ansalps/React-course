import { useState} from 'react'
import {Chatbot} from 'supersimpledev'
import './ChatInput.css'

export function ChatInput({chatMessages,setChatMessages}){
    
    const [inputText,setInputText]= useState('');
    const [isLoading, setIsLoading] = useState(false);

    function saveInputText(event){
        setInputText(event.target.value);
    }

    function handleKeyDown(event){
        if (event.key==='Enter'){
            sendMessage();
        }
        if (event.key==='Escape'){
            setInputText('');
        }
    }

    

    async function sendMessage(){
        const message1= (
            <img
                src="../assets/loading-spinner.gif"
                alt="Loading..."
                width="30"
                className="loading-image"
            />
        )
        if (isLoading || inputText === '') {
            return;
        }

        setIsLoading(true)

        setInputText('');

        const newChatMessages=[
            ...chatMessages,
            {
                message:inputText,
                sender:'user',
                id:crypto.randomUUID()
            }
        ]
        
        setChatMessages([
            ...newChatMessages,
            {
                message:message1,
                sender:'robot',
                id:crypto.randomUUID()    
            }
        ])
        

        const response=await Chatbot.getResponseAsync(inputText);

        setChatMessages([
            ...newChatMessages,
            {
                message:response,
                sender:'robot',
                id:crypto.randomUUID()    
            }
        ])

        setIsLoading(false)

    }

    return (
        <div className="chat-input-container">
            <input 
                placeholder="Send a message to Chatbot" 
                size="30"
                onChange={saveInputText}
                value={inputText}
                onKeyDown={handleKeyDown}
                className="chat-input"
            />
            <button 
                onClick={sendMessage}
                className="send-button"
            >Send</button>
        </div>
    );
}