import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import Navbar from '../Components/Navbar';
import LeftPanel from '../Components/LeftPanel';
import RightPanel from '../Components/RightPanel';

function Chat() {
  const navigate = useNavigate();
  const location = useLocation();
  const chatIdFromURL = new URLSearchParams(location.search).get('id');

  const [userInput, setUserInput] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showRightPanel, setShowRightPanel] = useState(false);
  const [chatId, setChatId] = useState(null);
  const [chatLog, setChatLog] = useState([]);
  const [extractedText, setExtractedText] = useState('');

  const userEndRef = useRef(null);
  const assistantEndRef = useRef(null);
  const rightPanelRef = useRef(null);

  // const userMessageCount = chatLog.filter((msg) => msg.role === 'user').length;
  // const assistantMessageCount = chatLog.filter((msg) => msg.role === 'assistant').length;

  // Auto-scroll into View
  useEffect(() => {
    userEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLog.length]);

    // Auto-scroll AI
  useEffect(() => {
    assistantEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [loading]);

  // // Auto-scroll When loading
  // useEffect(() => {
  //   if (loading && rightPanelRef.current) {
  //     rightPanelRef.current.scrollTop = rightPanelRef.current.scrollHeight;
  //   }
  // }, [loading]);


  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Session expired. Please login again.');
      navigate('/login');
    }
  }, [navigate]);



   // Load chat from URL
   useEffect(() => {
    const loadChat = async () => {
      if (!chatIdFromURL) return;
      try {
        const res = await fetch(`http://localhost:4004/api/chat/${chatIdFromURL}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to load chat');

        setChatLog(data.chat.messages);
        setChatId(data.chat._id);
        setShowRightPanel(true);
      } catch (err) {
        console.error('Error loading chat:', err);
        toast.error(err.message || 'Error loading chat');
      }
    };

    loadChat();
  }, [chatIdFromURL]);



  const handleSend = async () => {
    if (!userInput.trim() && !uploadedFile && !extractedText.trim()) return;
    setLoading(true);
    setShowRightPanel(true);

    if (userInput.trim()) {
      setChatLog((prev) => [...prev, { role: 'user', content: userInput }]);
    } else if (uploadedFile) {
      setChatLog((prev) => [...prev, { role: 'user', content: `📄 ${uploadedFile.name}` }]);
    }

    try {
      const payload = {
        userPrompt: userInput,
        chatId,
        extractedText,
        fileInfo: uploadedFile ? { name: uploadedFile.name } : null,
      };

      const res = await fetch('http://localhost:4004/api/ai/get-response', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Request failed');

      setChatLog((prev) => [...prev, { role: 'assistant', content: data.response }]);
      setChatId(data.chatId);
      setUserInput('');
      setLoading(false)
    } catch (err) {
      console.error('API Error:', err);
      toast.error(err.message || 'Error getting response');
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <Navbar
        onFileUpload={(file) => setUploadedFile(file)}
        onExtractedText={(text) => setExtractedText(text)}
        setChatLog={setChatLog}
        setChatId={setChatId}
        setShowRightPanel={setShowRightPanel}
      />

      <div className="flex flex-1 overflow-hidden">
        <LeftPanel
          userInput={userInput}
          setUserInput={setUserInput}
          uploadedFile={uploadedFile}
          setUploadedFile={setUploadedFile}
          handleSend={handleSend}
          loading={loading}
          chatLog={chatLog}
          showRightPanel={showRightPanel}
          userEndRef={userEndRef}
        />

        <RightPanel
          showRightPanel={showRightPanel}
          chatLog={chatLog}
          loading={loading}
          assistantEndRef={assistantEndRef}
          rightPanelRef={rightPanelRef}
        />
      </div>
    </div>
  );
}

export default Chat;
