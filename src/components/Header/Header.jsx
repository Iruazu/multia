import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from '../../context/AppContext';
import useSystemTime from '../../hooks/useSystemTime';
import './Header.css';

const Header = () => {
  const { darkMode, toggleDarkMode } = useAppContext();
  const { formattedTime } = useSystemTime();

  return (
    <header className={`header ${darkMode ? 'dark' : 'light'}`}>
      <div className="header-left">
        <div className="search-bar">
          <FontAwesomeIcon icon={faSearch} />
          <input type="text" placeholder="検索..." />
        </div>
      </div>
      
      <div className="header-right">
        <div className="current-time">{formattedTime}</div>
        <div className="header-actions">
          <div className="action-icon">
            <FontAwesomeIcon icon={faBell} />
          </div>
          <div className="action-icon" onClick={toggleDarkMode}>
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
          </div>
          <div className="user-profile">
            <img src="https://cdn.pixabay.com/user/2017/11/29/18-01-36-377_250x250.jpg" alt="ユーザープロフィール" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;