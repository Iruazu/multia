import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import { useAppContext } from '../context/AppContext';
import './MainLayout.css';

const MainLayout = () => {
  const { darkMode, sidebarCollapsed } = useAppContext();

  return (
    <div className={`app-container ${darkMode ? 'dark' : 'light'}`}>
      <Sidebar />
      <div className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Header />
        <div className="page-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;