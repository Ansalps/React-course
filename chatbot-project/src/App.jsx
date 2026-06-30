import { useState,useEffect } from 'react'
import {Chatbot} from 'supersimpledev'
import { ChatInput } from './components/ChatInput'
import { ChatMessage } from './components/ChatMessage';
import ChatMessages from './components/ChatMessages';
import './App.css'







function App(){
            
            const [chatMessages,setChatMessages]=useState(JSON.parse(localStorage.getItem('messages'))||[])
            //const chatMessages=array[0];
            //const setChatMessages=array[1];
            //const [chatMessages,setChatMessages]=array
            console.log(`chatMessages ${chatMessages}`)
           useEffect(()=>{
                Chatbot.addResponses({
                    'hello':'this will be a new response',
                    'flip a coin':'new flip'
                })
                localStorage.setItem('messages',JSON.stringify(chatMessages))
           })
            return (
                <div className="app-container">
                    
                    <ChatMessages 
                        chatMessages={chatMessages}
                    />

                    <ChatInput 
                        chatMessages={chatMessages}
                        setChatMessages={setChatMessages}
                    />

                </div>
            )
        }

export default App
