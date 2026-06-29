import { useState } from 'react'

import './App.css'


function ChatInput({chatMessages,setChatMessages}){
    
    const [inputText,setInputText]= React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

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
                src="./images/loading-spinner.gif"
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
        

        const response=await chatbot.getResponseAsync(inputText);

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
function ChatMessage({message,sender}){
    //const message=props.message;
    //const sender=props.sender;
    //const {message,sender}=props; 

    /*
    if (sender==='robot'){
        return(
            <div>
                <img src="./images/robot.png" alt="" width="50"/>
                {message}
            </div>
        )
    }
    */

    return(
        <div className={
            sender==='user'
            ?'chat-message-user'
            :'chat-message-robot'
        }>
            {sender==='robot' && (
                <img src="./images/robot.png" alt="" className="chat-message-profile"/>
            )}

            <div className="chat-message-text">
                {message}
            </div>
            
            {sender==='user' && (
                <img src="./images/user.png" alt="" className="chat-message-profile"/>
            )}
        </div>
    )
}
function useAutoScroll(dependencies){

    const chatMessagesRef=React.useRef(null);

    React.useEffect(()=>{
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
                            key={chatMessage.id} 
                        />
                    );
                })
            }
        </div>
    );
}


function App(){
            
            const [chatMessages,setChatMessages]=useState([])
            //const chatMessages=array[0];
            //const setChatMessages=array[1];
            //const [chatMessages,setChatMessages]=array
           
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
