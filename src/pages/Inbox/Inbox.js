import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const notifications = [
  {
    id: 1,
    sender: 'Atlasia',
    text: 'Well received.',
    timestamp: 'Feb 15, 2023',
    avatar: 'A',
    bgColor: 'bg-black',
    textColor: 'text-white'
  },
  {
    id: 2,
    sender: 'Craig',
    text: 'Update: Reservation canceled',
    timestamp: 'Feb 13 - 14, 2023',
    avatar: 'C',
    bgColor: 'bg-gray-600',
    textColor: 'text-white'
  },
  {
    id: 3,
    sender: 'Erin',
    text: 'New date and time request',
    status: 'Request pending',
    timestamp: 'Feb 16, 2023',
    avatar: 'E',
    bgColor: 'bg-gray-500',
    textColor: 'text-white'
  },
];

export default function Inbox() {
  const navigate = useNavigate();

  const handleNotificationClick = (notificationId) => {
    // Navigate to notification center and optionally pass the notification ID
    navigate('/notifications', { state: { selectedNotification: notificationId } });
  };

  const handleChatClick = (notification) => {
    // Navigate to chat page with the sender parameter and chat data
    navigate(`/chat/${notification.sender}`, { state: { chatData: notification } });
  };

  return (
    <div className="max-w-sm mx-auto bg-white min-h-screen" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>

      {/* Header */}
      <div className="px-6 py-4">
        <h1 className="text-2xl font-semibold text-black">Inbox</h1>
        
        {/* Tab Navigation */}
        <div className="flex mt-4 border-b border-gray-200">
          <button className="flex items-center space-x-2 pb-2 border-b-2" style={{ borderColor: '#005D20' }}>
            <span className="text-black font-medium">Messages</span>
            <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: '#005D20' }}>
              3
            </div>
          </button>
          <Link to="/notifications" className="ml-8 pb-2 text-gray-500 hover:text-black transition-colors">
            Notifications
          </Link>
        </div>
      </div>

      {/* Messages List */}
      <div className="px-6 space-y-4">
        {notifications.map((notification) => (
          <div 
            key={notification.id} 
            onClick={() => handleChatClick(notification)}
            className="flex items-start space-x-3 py-2 cursor-pointer hover:bg-gray-50 rounded-lg px-2 transition-colors duration-200"
          >
            {/* Avatar */}
            <div className={`w-12 h-12 rounded-full ${notification.bgColor} ${notification.textColor} flex items-center justify-center font-semibold text-lg flex-shrink-0`}>
              {notification.avatar}
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-black text-base">{notification.sender}</h3>
                <span className="text-gray-400 text-sm whitespace-nowrap ml-2">{notification.timestamp}</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{notification.text}</p>
              {notification.status && (
                <p className="text-gray-500 text-xs mt-1">{notification.status}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}