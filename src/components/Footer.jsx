import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer 
  >
      <div>
         {new Date().getFullYear()} &copy; Knotebook &middot; By Ammad Iftikhar
      </div>
    </footer>
  );
}

export default Footer