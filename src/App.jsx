import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Name from './components/Name/Name';
import { FiMenu } from 'react-icons/fi';
import { FaSearch } from 'react-icons/fa'; // Import search icon

function App() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Track search popup state
  const [searchQuery, setSearchQuery] = useState(''); // Track search input

  const messagesEndRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen); // Toggle the search popup visibility
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query
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

  // Scroll to the bottom of the chat messages when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-r from-[#171717] via-[#44013e] to-[#080000] relative">
      {/* Sidebar for Chat History */}


      <div className={`fixed md:relative top-0 left-0 sidebar-scroll ${isSidebarOpen
          ? 'h-[50%] md:h-full w-full md:w-64 bg-gradient-to-b from-black via-[#2a0227] to-[#44013e] p-4 border-b-2 md:border-r-2 border-amber-500 shadow-orange-300 shadow-2xl transition-all duration-300 z-20'
          : 'h-0 md:h-full w-0 md:w-0 overflow-hidden transition-all duration-300'
        }`}>
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
        className="fixed top-4 right-4 transition-colors transform duration-300 hover:translate-y-2 text-white p-2 bg-gradient-to-bl from-orange-900 via-orange-500 to-yellow-400 rounded-full shadow-lg hover:bg-gray-700 z-30"
        onClick={toggleSidebar}
      >
        <FiMenu size={19} className="animate-pulse" />
      </button>

      {/* Search Icon - Popup */}
      <div className="fixed top-18 right-4 z-30">
        <button
          className="text-white mb-2 md:p-2 p-1 rounded-full bg-gradient-to-b from-yellow-400 via-orange-400 to-amber-400 shadow-xl"
          onClick={toggleSearch}
        >
          <FaSearch size={15} className="hover:animate-ping" />
        </button>

        {isSearchOpen && (
          <div className="absolute top-10 right-0 w-[300px] bg-white p-4 rounded-lg shadow-lg z-40">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <button
              onClick={() => setIsSearchOpen(false)} // Close the search popup
              className="mt-2 text-white p-2 bg-gradient-to-b from-yellow-400 via-orange-600 to-orange-400 rounded-lg hover:bg-pink-500"
            >
              Close
            </button>
          </div>
        )}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col p-4 h-full bg-gradient-to-r from-[#42023d] via-[#44013e] to-[#080000] mt-16 md:mt-0">
        <div className="flex-1 overflow-y-auto mb-4 space-y-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 shadow-2xl shadow-[#42023d] rounded-lg max-w-[80%] lg:max-w-[85%] mx-auto overflow-x-hidden ${msg.sender === 'user'
                  ? 'bg-gradient-to-bl from-yellow-400 via-orange-600 to-orange-400 text-white ml-auto'
                  : 'bg-gradient-to-bl from-yellow-400 via-orange-600 to-orange-400 text-white mr-auto'
                }`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex sticky bottom-0 bg-gradient-to-r from-[#42023d] via-[#44013e] to-[#080000] p-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-rose-500 text-white placeholder:text-amber-300"
            placeholder="Type a message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button onClick={handleSendMessage} className="">
            <a
              href="#_"
              className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-orange-600 rounded-xl group"
            >
              <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-yellow-400 rounded group-hover:-mr-4 group-hover:-mt-4">
                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
              </span>
              <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-orange-400 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
              <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                Send
              </span>
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;