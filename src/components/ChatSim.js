import React, { useState, useRef, useEffect } from 'react';

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

      {/* Input Area */}
      <form 
        onSubmit={handleSubmit}
        className="p-4 pb-6"
      >
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
            disabled={isInputDisabled}
            className={`flex-1 rounded-full px-4 py-3 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isInputDisabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          />
          <button
            type="submit"
            disabled={isInputDisabled}
            className={`w-10 h-10 md:w-auto md:h-auto md:px-6 md:py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center ${
              isInputDisabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <span className="hidden md:inline">Send</span>
            <span className="md:hidden text-xl">→</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatSim;
