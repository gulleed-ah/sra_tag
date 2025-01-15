import React, { useState, useRef, useEffect } from 'react';

// Commented out MicIcon component
/*
const MicIcon = () => (
  <svg 
    className="w-5 h-5 text-white" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" 
    />
  </svg>
);
*/

const ChatSim = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom whenever messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initial message effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages([{
        text: "Hi there, I'm SR_Ai. Ask me anything about your engineered garment, the inspiration behind the collection, and even unlock a new version of your piece.. Just say Unlock.",
        sender: 'bot'
      }]);
    }, 1000); // Delay for smooth appearance

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      // Add user message
      setMessages(prev => [...prev, { text: inputMessage, sender: 'user' }]);
      setInputMessage('');

      // Bot response after a short delay
      setTimeout(() => {
        setMessages(prev => [...prev, {
          text: "Sorry, I'll need your tag details to continue.",
          sender: 'bot'
        }]);
        setIsInputDisabled(true);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Updated Input Area */}
      <form 
        onSubmit={handleSubmit}
        className="px-2 py-4 pb-6"
      >
        <div className="relative flex items-center gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
            disabled={isInputDisabled}
            className="w-full px-4 py-2 rounded-lg bg-white/50 backdrop-blur-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit"
            disabled={isInputDisabled}
            className="px-2 py-1.5 md:px-4 md:py-2 text-sm md:text-base bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatSim;
