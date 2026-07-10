import { useState, useEffect } from "react";
import { Chatbot } from "supersimpledev";
import { ChatInput } from "./components/ChatInput";

import ChatMessages from "./components/ChatMessages";
import "./App.css";
import Robot from './assets/robot.png'

function App() {
  const [chatMessages, setChatMessages] = useState(
    JSON.parse(localStorage.getItem("messages") ?? "[]")
  );  
  //const chatMessages=array[0];
  //const setChatMessages=array[1];
  //const [chatMessages,setChatMessages]=array
  console.log(`chatMessages ${chatMessages}`);
  useEffect(() => {
    Chatbot.addResponses({
      hello: "this will be a new response",
      "flip a coin": "new flip",
    });
    localStorage.setItem("messages", JSON.stringify(chatMessages));
  });
  const num = chatMessages.length;
  console.log(`num: ${num}`)
  return (
    <>
      <title>{`${num} Messages`}</title>
      <link rel="icon" type="image/svg+xml" href={Robot} />
      <div className="app-container">
        <ChatMessages chatMessages={chatMessages} />

        <ChatInput
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
        />
      </div>
    </>
  );
}

export default App;
