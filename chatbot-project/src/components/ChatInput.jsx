import { useState} from 'react'
import {Chatbot} from 'supersimpledev'
import dayjs from 'dayjs';
import './ChatInput.css'
import LoadingSpinner from '../assets/loading-spinner.gif';


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
                src={LoadingSpinner}
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
                id:crypto.randomUUID(),
                time: dayjs().valueOf()
            }
        ]
        
        setChatMessages([
            ...newChatMessages,
            {
                message:message1,
                sender:'robot',
                id:crypto.randomUUID(),
                time: dayjs().valueOf()    
            }
        ])
        

        const response=await Chatbot.getResponseAsync(inputText);

        setChatMessages([
            ...newChatMessages,
            {
                message:response,
                sender:'robot',
                id:crypto.randomUUID(),
                time: dayjs().valueOf()    
            }
        ])

        setIsLoading(false)

    }

    function clearMessages(){
        setChatMessages([]);
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
            <button
                onClick={clearMessages}
            >Clear</button>
        </div>
    );
}