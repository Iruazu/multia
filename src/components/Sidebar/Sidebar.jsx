import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faThLarge, faProjectDiagram, faStickyNote, faTasks, 
  faRobot, faCalendarAlt, faChartPie, faCog, faBars 
} from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from '../../context/AppContext';
import './Sidebar.css';

const Sidebar = () => {
  const { darkMode, sidebarCollapsed, toggleSidebar } = useAppContext();

  return (
    <div className={`sidebar ${darkMode ? 'dark' : 'light'} ${sidebarCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <img 
            src="https://cdn.pixabay.com/photo/2016/10/11/21/43/geometric-1732847_150.jpg" 
            alt="アプリロゴ" 
          />
          {!sidebarCollapsed && <span>MULTITASK APP</span>}
        </div>
        <div className="sidebar-toggle" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
      
      <nav className="sidebar-nav">
        <ul className="nav-items">
          <li className="nav-item">
            <NavLink to="/" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
              <FontAwesomeIcon icon={faThLarge} />
              {!sidebarCollapsed && <span>ダッシュボード</span>}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/projects" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
              <FontAwesomeIcon icon={faProjectDiagram} />
              {!sidebarCollapsed && <span>プロジェクト管理</span>}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/notes" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
              <FontAwesomeIcon icon={faStickyNote} />
              {!sidebarCollapsed && <span>ノート</span>}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/tasks" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
              <FontAwesomeIcon icon={faTasks} />
              {!sidebarCollapsed && <span>タスク</span>}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/ai-mentor" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
              <FontAwesomeIcon icon={faRobot} />
              {!sidebarCollapsed && <span>AIメンター</span>}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/calendar" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
              <FontAwesomeIcon icon={faCalendarAlt} />
              {!sidebarCollapsed && <span>カレンダー</span>}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/analytics" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
              <FontAwesomeIcon icon={faChartPie} />
              {!sidebarCollapsed && <span>分析</span>}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/settings" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
              <FontAwesomeIcon icon={faCog} />
              {!sidebarCollapsed && <span>設定</span>}
            </NavLink>
          </li>
        </ul>
      </nav>
      
      <div className="nav-divider"></div>
      
      {!sidebarCollapsed && (
        <div className="system-status">
          <h4>タスクステータス</h4>
          
          <div className="status-item">
            <div className="status-item-label">
              <span>完了タスク</span>
              <span>68%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill blue" style={{ width: '68%' }}></div>
            </div>
          </div>
          
          <div className="status-item">
            <div className="status-item-label">
              <span>プロジェクト進捗</span>
              <span>45%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill green" style={{ width: '45%' }}></div>
            </div>
          </div>
          
          <div className="status-item">
            <div className="status-item-label">
              <span>目標達成</span>
              <span>75%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill blue" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;