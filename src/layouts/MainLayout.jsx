// src/layouts/MainLayout.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../styles/global.css'; 
import Footer from '../components/Footer';

export default function MainLayout({ children }) {
  return (
     <div className="page-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header className="navbar">
        <Navbar />
      </header>

      <div className="main-layout" style={{ display: 'flex', flex: 1 }}>
        <aside className="sidebar">
          <Sidebar />
        </aside>

        <main className="main-content" style={{ flex: 1, minHeight: '100vh' }}>
          {children}
        </main>
      </div>


      <footer className='footer'>
        <Footer/>
      </footer>
    </div>
  );
}
