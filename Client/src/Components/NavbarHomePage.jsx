import React from 'react'
import symbol from '../assets/symbol.jpg';

function NavbarHomePage() {
  return (
    <div className='flex items-center w-full bg-black/98 text-white p-3.5 h-[70px]'>
      {/* Logo */}
      <div className='flex items-center gap-2 ml-10'>
        <img src={symbol} className='h-10' alt='Logo' />
        <h2 className='text-xl font-semibold font-mono'>ThinkFast AI</h2>
      </div>
    </div>
  )
}

export default NavbarHomePage