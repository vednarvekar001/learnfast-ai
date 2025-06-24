import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Register from './Pages/Register';
import Login from './Pages/Login';
import Chat from './Pages/Chat';
import Settings from './Pages/Settings'
import HomePage from './Pages/HomePage';
import ProtectRoute from './Utils/ProtectRoute';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/chat" element={ <ProtectRoute><Chat /></ProtectRoute> } />
        <Route path='/settings' element={ <ProtectRoute><Settings /></ProtectRoute> } />
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        theme="dark"
        closeOnClick
        pauseOnHover
        draggable
      />
    </Router>
  )
}

export default App
