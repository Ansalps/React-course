import { useState} from 'react'
import {Chatbot} from 'supersimpledev'
import dayjs from 'dayjs';
import './ChatInput.css'




type ChatMessagesProps = {
  id: string;
  message: string;
  sender: "user" | "robot";
  time: number;
  loading?: boolean;
};
type ChatInputProps={
    chatMessages: ChatMessagesProps[];
    setChatMessages: (chatMessages:ChatMessagesProps[])=>void;
}
export function ChatInput({chatMessages,setChatMessages}:ChatInputProps){
    
    const [inputText,setInputText]= useState('');
    const [isLoading, setIsLoading] = useState(false);

    function saveInputText(event:{
        target:{
            value:string;
        };
    }){
        setInputText(event.target.value);
    }

    function handleKeyDown(event:{
        key:string;
    }){
        if (event.key==='Enter'){
            sendMessage();
        }
        if (event.key==='Escape'){
            setInputText('');
        }
    }

    

    async function sendMessage(){
        
        if (isLoading || inputText === '') {
            return;
        }

        setIsLoading(true)

        setInputText('');

        const newChatMessages: ChatMessagesProps[] = [
  ...chatMessages,
  {
    message: inputText,
    sender: "user",
    id: crypto.randomUUID(),
    time: dayjs().valueOf(),
  },
];
        
        setChatMessages([
            ...newChatMessages,
            {
                message:"",
                sender:"robot",
                id:crypto.randomUUID(),
                time: dayjs().valueOf(), 
                loading:true   
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
                size={30}
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