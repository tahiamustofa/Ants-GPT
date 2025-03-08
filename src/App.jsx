import React, { useState } from 'react';
import axios from 'axios';
import Name from './components/Name/Name';
import { FiMenu } from 'react-icons/fi';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSendMessage = async () => {
    if (inputText.trim()) {
      const userMessage = { text: inputText, sender: 'user' };
      setMessages([...messages, userMessage]);
      setInputText('');

      try {
        const response = await axios.post(
          'https://api.echogpt.live/v1/chat/completions',
          { message: inputText },
          {
            headers: {
              Authorization: `Bearer YOUR_API_KEY`,
              'Content-Type': 'application/json',
            },
          }
        );

        const botMessage = { text: response.data.response, sender: 'bot' };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error('Error calling EchoGPT API:', error);
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-r from-[#171717] via-[#44013e] to-[#080000] relative">
      {/* Sidebar for Chat History */}
      <div
        className={`absolute md:relative top-0 left-0  ${
          isSidebarOpen ? 'h-[50%] md:h-full w-full md:w-64 bg-gradient-to-b from-black via-[#2a0227] to-[#44013e] p-4 border-b-2 md:border-r-2 border-amber-500 shadow-orange-300 shadow-2xl transition-all duration-300 overflow-hidden z-20' : 'h-0 md:h-full overflow-hidden'
        }`}
      >
        {isSidebarOpen && (
          <>
            <Name />
            <ul className="overflow-y-auto max-h-48 md:max-h-full">
              {messages.map((msg, index) => (
                <li key={index} className="mb-2 text-white truncate">
                  {msg.text}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* Toggle Button */}
      <button
        className="absolute top-4 right-4 text-white p-2 bg-gradient-to-bl from-orange-900  via-orange-500  to-yellow-400 rounded-full shadow-lg hover:bg-gray-700 z-30"
        onClick={toggleSidebar}
      >
        <FiMenu size={24} />
      </button>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col p-4 h-full bg-gradient-to-r from-[#42023d] via-[#44013e] to-[#080000] mt-16 md:mt-0">
        <div className="flex-1 overflow-y-auto mb-4 space-y-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 shadow-2xl shadow-[#42023d] rounded-lg max-w-[80%]  lg:max-w-[85%] mx-auto ${
                msg.sender === 'user'
                  ? ' bg-gradient-to-bl from-yellow-400 via-orange-600 to-orange-400 text-white ml-auto'
                  : 'bg-gradient-to-bl from-yellow-400 via-orange-600 to-orange-400 text-white mr-auto'
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="flex">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-rose-500 text-white placeholder:text-amber-300"
            placeholder="Type a message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="text-white p-2 rounded-r-lg hover:bg-pink-500 bg-gradient-to-b from-yellow-400 via-orange-600 to-orange-400 transition-colors transform shadow-xl duration-300 hover:translate-y-2"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
