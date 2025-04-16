import React from 'react'
import logo from '../assets/Logooo.png'
const Logo = ({ parentHeight }) => {
  return (
    <img 
      src={logo} 
      alt="Logo" 
      style={{  maxHeight: parentHeight, width: 'auto' }} 
    />
  );
}

export default Logo 