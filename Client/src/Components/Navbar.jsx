import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import symbol from '../assets/symbol.jpg';
import { WiCloudUp, WiCloudy } from "react-icons/wi";
import { RiSettingsFill } from "react-icons/ri";

function Navbar({ onFileUpload, onExtractedText }) {
  const fileInputRef = useRef();
  const navigate = useNavigate();
  const [historyOpen, setHistoryOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const handleUploadClick = () => fileInputRef.current.click();

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    onFileUpload(file);
    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem('token');
    if (!token) return toast.warning("🔐 Please login first!");

    try {
      toast.info("Uploading...");
      const res = await fetch('http://localhost:4004/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Upload failed');

      toast.success('✅ Upload successful!');
      if (onExtractedText && data.extractedText) {
        onExtractedText(data.extractedText);
      }
    } catch (err) {
      toast.error('❌ Upload failed');
      console.error(err);
    }
  };

  const fetchChatHistory = async () => {
    try {
      const res = await fetch('http://localhost:4004/api/ai/get-history', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch history');

      setChatHistory(data.chats);
      setHistoryOpen(true);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className='flex items-center w-full bg-black/98 text-white p-3.5 h-[70px] relative'>
      {/* Logo */}
      <div className='flex items-center gap-2'>
        <img src={symbol} className='h-10' alt='Logo' />
        <h2 className='text-xl font-semibold font-mono'>ThinkFast AI</h2>
      </div>

      {/* Upload Button */}
      <div className='absolute left-1/2 transform -translate-x-1/2 flex items-center'>
        <button
          onClick={handleUploadClick}
          className='font-mono text-xl font-semibold flex items-center gap-3 px-8 py-2 bg-white/10 rounded-full hover:bg-white/30 transition-all duration-300'
        >
          <WiCloudUp size={30} /> Upload
        </button>
        <input
          type='file'
          ref={fileInputRef}
          onChange={handleFileUpload}
          className='hidden'
        />
      </div>

      {/* Action Buttons */}
      <div className='absolute right-5 flex items-center gap-3'>
        <button onClick={fetchChatHistory} className='bg-white/10 hover:bg-white/30 p-2 rounded-full'>
          <WiCloudy size={25} />
        </button>
        <button onClick={() => navigate('/settings')} className='bg-white/10 hover:bg-white/30 p-2 rounded-full'>
          <RiSettingsFill size={25} />
        </button>
      </div>

      {/* Chat History Modal */}
      {historyOpen && (
  <div className="absolute top-16 right-5 bg-black border border-white/20 rounded-md p-4 w-[300px] max-h-[400px] overflow-y-auto z-50">
    <div className="flex justify-between items-center mb-3">
      <h3 className="text-lg font-bold">🕓 Chat History</h3>
      <button
        onClick={() => setHistoryOpen(false)}
        className="text-white hover:text-red-400 text-lg"
        title="Close"
      >
        ❌
      </button>
    </div>

    {chatHistory.length === 0 ? (
      <p className='text-gray-400'>No chats found</p>
    ) : (
      <ul className='flex flex-col gap-2'>
        {chatHistory.map(chat => (
          <li
            key={chat._id}
            onClick={() => {
              setHistoryOpen(false);
              navigate(`/chat?id=${chat._id}`);
            }}
            className='cursor-pointer hover:bg-white/10 p-2 rounded'
          >
            🗂️ {chat.title}
          </li>
        ))}
       </ul>
       )}
      </div>
    )}
    </div>
  );
}

export default Navbar;
