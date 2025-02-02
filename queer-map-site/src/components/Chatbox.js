import React, { useState } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import '../styles/Chatbox.css'; // Ensure this is the correct path

const ChatBox = () => {
  const [messages, setMessages] = useState([
    { text: "Hey there! How can I help you find LGBTQ+ friendly spaces today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    
    setTimeout(() => {
      const response = getBotResponse(input);
      setMessages([...newMessages, { text: response, sender: "bot" }]);
    }, 1000);
  };

  const getBotResponse = (input) => {
    input = input.toLowerCase();
    if (input.includes("post event")) return "You can post a queer event here: [Post Event Page]";
    if (input.includes("queer friendly spaces")) return "Check out these inclusive spaces: [Filter Spaces Page]";
    if (input.includes("sustainability") || input.includes("women owned") || input.includes("bipoc")) 
      return "Here are spaces that match your preferences: [Filtered Spaces Page]";
    if (input.includes("map")) return "Find queer-friendly places near you on our map: [Map Page]";
    return "I’d love to help! Try asking about posting events, finding queer-friendly spaces, or filtering by sustainability, women-owned, and more.";
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox">
        <div className="chatbox-messages">
          {messages.map((msg, index) => (
            <motion.div 
              key={index} 
              className={`message ${msg.sender === "bot" ? "bot" : "user"}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {msg.text}
            </motion.div>
          ))}
        </div>

        <div className="chatbox-input">
          <input 
            type="text" 
            className="input-field" 
            placeholder="Ask me anything..." 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend} className="send-button">
            <Send className="icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
