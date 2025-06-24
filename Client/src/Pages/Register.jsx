import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import bg from '../assets/rocketthree.png';
import symbol from '../assets/symbol.jpg';


function Register() {

  const navigate = useNavigate();
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const res = await fetch('http://localhost:4004/api/auth/register', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({fullName, email, password }),
      });

      const data = await res.json();

      if(res.ok) {
        localStorage.setItem('token', data.token); // Store token in localStorage
        navigate('/chat'); // Redirect to chat page
      } else {
        alert(data.message || 'Registration failed. Please try again.');
      }

      
    } catch (error) {
       console.error('Login error:', error);
      alert('An error occurred. Please try again later.');
      
    }
  }


  return (
    <>
    <div className="min-h-screen flex flex-col md:flex-row">
    
          {/* Left Section: Quote + Login Form */}
          <div className="w-full md:w-1/2 bg-black text-white flex flex-col justify-center px-10 py-16">
      
            {/* Logo and Quote */}
            <div className="mb-10 flex items-center gap-3">
              <img src={symbol} alt="Logo" className="h-10" />
              <h2 className="text-2xl font-semibold font-mono">ThinkFast AI</h2>
            </div>
            <h1 className="text-3xl font-bold mb-2 font-mono">Increase your learning curve</h1>
            <p className="mb-10 font-mono text-white/80 text-lg">with ThinkFast AI.</p>
    
            {/* Login Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
      type='fullName'
      placeholder="Name"
      value={fullName}
      onChange={(e) => setFullName(e.target.value)}
      className="p-3 rounded bg-white/10 text-white focus:outline-none"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-3 rounded bg-white/10 text-white focus:outline-none"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-3 rounded bg-white/10 text-white focus:outline-none"
        required
      />
      <button
        type="submit"
        className="mt-2 cursor-pointer bg-white text-black py-2 rounded font-bold hover:bg-gray-200 transition"
      >
        Register
      </button>
    
      <p className="mt-4 text-sm">
        Already have an account? 
        <button 
           className="underline cursor-pointer" 
           onClick={() => navigate('/')}>
            Login
        </button>
      </p>
    </form>
    
          </div>
    
    
    
    
    
          {/* Right Section: Rocket Image */}
          <div className="w-full md:w-1/2">
            <img
              src={bg}
              alt="Rocket"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
    
    </>
  )
}

export default Register