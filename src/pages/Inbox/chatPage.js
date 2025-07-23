import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

export default function ChatPage() {
  const { sender } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { chatData } = location.state || {};
  
  const [message, setMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: chatData?.text || 'Well received.',
      sender: 'other',
      timestamp: '14:30'
    },
    {
      id: 2,
      text: 'Thank you for the update!',
      sender: 'me',
      timestamp: '14:32'
    },
    {
      id: 3,
      text: 'You\'re welcome. Is there anything else you need help with?',
      sender: 'other',
      timestamp: '14:35'
    }
  ]);

  const handleSendMessage = () => {
    if (message.trim() || selectedImage) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: 'me',
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        }),
        image: selectedImage
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      setSelectedImage(null);
    }
  };

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
  };

  const handleBack = () => {
    navigate('/inbox');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="w-full max-w-full bg-white min-h-screen flex flex-col" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>

      {/* Chat Header */}
      <div className="flex items-center px-4 md:px-6 py-3 border-b border-gray-200 bg-white shadow-sm">
        <button 
          onClick={handleBack}
          className="mr-3 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div className="flex items-center space-x-3 flex-1">
          <div className={`w-10 h-10 rounded-full ${chatData?.bgColor || 'bg-black'} ${chatData?.textColor || 'text-white'} flex items-center justify-center font-semibold text-lg`}>
            {chatData?.avatar || 'A'}
          </div>
          <div>
            <h2 className="font-semibold text-black text-lg">{chatData?.sender || 'Atlasia'}</h2>
            <p className="text-sm text-green-600">Online</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 px-4 md:px-6 py-4 overflow-y-auto bg-gray-50" style={{ paddingBottom: '80px' }}>
        {messages.map((msg) => (
          <div key={msg.id} className={`flex mb-4 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl ${
              msg.sender === 'me' 
                ? 'bg-green-600 text-white rounded-br-md' 
                : 'bg-white text-black rounded-bl-md border'
            }`}>
              {msg.image && (
                <img 
                  src={msg.image} 
                  alt="Shared image" 
                  className="w-full h-auto rounded-lg mb-2 max-w-xs"
                />
              )}
              {msg.text && <p className="text-sm">{msg.text}</p>}
              <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-green-100' : 'text-gray-500'}`}>
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 px-4 md:px-6 py-3 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-4xl mx-auto">
          {/* Image Preview */}
          {selectedImage && (
            <div className="mb-3 relative inline-block">
              <img 
                src={selectedImage} 
                alt="Selected" 
                className="w-20 h-20 object-cover rounded-lg border"
              />
              <button
                onClick={removeSelectedImage}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold hover:bg-red-600"
              >
                ×
              </button>
            </div>
          )}
          
          <div className="flex items-end space-x-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
              id="image-upload"
            />
            <label 
              htmlFor="image-upload"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer mb-1"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </label>
            
            <div className="flex-1 relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
                rows="1"
                style={{ 
                  minHeight: '44px', 
                  maxHeight: '120px',
                  fontSize: '16px' // Prevents zoom on iOS
                }}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                }}
              />
            </div>
            
            <button 
              onClick={handleSendMessage}
              disabled={!message.trim() && !selectedImage}
              className={`p-3 rounded-full transition-colors mb-1 ${
                (message.trim() || selectedImage)
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}