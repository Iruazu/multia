import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartLine, faSyncAlt, faCheckCircle, faClock, faBullseye,
  faArrowRight, faCalendarCheck, 
  faBell, faMoon, faSync, faCalendarCheck as faCalCheck,
  faPlusCircle, faStickyNote, faCalendarPlus, faShareAlt
} from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from '../../context/AppContext';
import useSystemTime from '../../hooks/useSystemTime';
import './Dashboard.css';

const Dashboard = () => {
  const { 
    darkMode, 
    toggleDarkMode, 
    notifications, 
    toggleNotifications, 
    autoSync, 
    toggleAutoSync, 
    reminders, 
    toggleReminders 
  } = useAppContext();
  
  const { formattedTime, formattedDate } = useSystemTime();

  return (
    <div className="dashboard">
      <div className="dashboard-grid">
        <div className="left-column">
          <div className="card overview-card">
            <div className="card-header">
              <div className="card-title">
                <FontAwesomeIcon icon={faChartLine} />
                ダッシュボード概要
              </div>
              <div className="card-actions">
                <div className="live-badge">リアルタイム</div>
                <div className="refresh-btn">
                  <FontAwesomeIcon icon={faSyncAlt} />
                </div>
              </div>
            </div>
            
            <div className="metrics-container">
              <div className="metric-card">
                <div className="metric-icon">
                  <FontAwesomeIcon icon={faCheckCircle} />
                </div>
                <div className="metric-value">24</div>
                <div className="metric-label">完了タスク</div>
                <div className="metric-details">本日: 3 | 週間: 24</div>
              </div>
              
              <div className="metric-card">
                <div className="metric-icon">
                  <FontAwesomeIcon icon={faClock} />
                </div>
                <div className="metric-value">12h</div>
                <div className="metric-label">活動時間</div>
                <div className="metric-details">本日: 4h | 平均: 5h</div>
              </div>
              
              <div className="metric-card">
                <div className="metric-icon">
                  <FontAwesomeIcon icon={faBullseye} />
                </div>
                <div className="metric-value">75%</div>
                <div className="metric-label">目標達成率</div>
                <div className="metric-details">先週: 62% | 改善: +13%</div>
              </div>
            </div>
            
            <div className="chart-tabs">
              <div className="chart-tab active">パフォーマンス</div>
              <div className="chart-tab">タスク分析</div>
              <div className="chart-tab">時間配分</div>
            </div>
            
            <div className="projects-section">
              <h3 className="section-subtitle">進行中のプロジェクト</h3>
              <div className="dashboard-projects-grid">
                {/* プロジェクトカード 1 */}
                <div className="dashboard-project-card">
                  <div className="dashboard-project-header">
                    <div className="dashboard-project-status">進行中</div>
                    <div className="dashboard-project-options">
                      <FontAwesomeIcon icon={faSyncAlt} />
                    </div>
                  </div>
                  <h4 className="dashboard-project-title">ウェブサイトリニュ</h4>
                  <div className="dashboard-project-progress">
                    <div className="progress-label">
                      <span>進捗</span>
                      <span>65%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill blue" style={{width: "65%"}}></div>
                    </div>
                  </div>
                  <div className="dashboard-project-info">
                    <div className="dashboard-project-date">
                      <FontAwesomeIcon icon={faCalendarCheck} /> 期限: 2023/05/30
                    </div>
                    <div className="dashboard-project-team">
                      <div className="team-member">田</div>
                      <div className="team-member">佐</div>
                      <div className="team-member more">+3</div>
                    </div>
                  </div>
                </div>
                
                {/* プロジェクトカード 2 */}
                <div className="dashboard-project-card">
                  <div className="dashboard-project-header">
                    <div className="dashboard-project-status">進行中</div>
                    <div className="dashboard-project-options">
                      <FontAwesomeIcon icon={faSyncAlt} />
                    </div>
                  </div>
                  <h4 className="dashboard-project-title">モバイルアプリ開発</h4>
                  <div className="dashboard-project-progress">
                    <div className="progress-label">
                      <span>進捗</span>
                      <span>25%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill blue" style={{width: "25%"}}></div>
                    </div>
                  </div>
                  <div className="dashboard-project-info">
                    <div className="dashboard-project-date">
                      <FontAwesomeIcon icon={faCalendarCheck} /> 期限: 2023/07/15
                    </div>
                    <div className="dashboard-project-team">
                      <div className="team-member">高</div>
                      <div className="team-member">佐</div>
                      <div className="team-member more">+1</div>
                    </div>
                  </div>
                </div>
                
                {/* プロジェクトカード 3 */}
                <div className="dashboard-project-card">
                  <div className="dashboard-project-header">
                    <div className="dashboard-project-status">進行中</div>
                    <div className="dashboard-project-options">
                      <FontAwesomeIcon icon={faSyncAlt} />
                    </div>
                  </div>
                  <h4 className="dashboard-project-title">データ分析システム</h4>
                  <div className="dashboard-project-progress">
                    <div className="progress-label">
                      <span>進捗</span>
                      <span>40%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill blue" style={{width: "40%"}}></div>
                    </div>
                  </div>
                  <div className="dashboard-project-info">
                    <div className="dashboard-project-date">
                      <FontAwesomeIcon icon={faCalendarCheck} /> 期限: 2023/06/15
                    </div>
                    <div className="dashboard-project-team">
                      <div className="team-member">藤</div>
                      <div className="team-member">田</div>
                      <div className="team-member more">+2</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="view-all-projects">
                <Link to="/projects">すべてのプロジェクトを表示 <FontAwesomeIcon icon={faArrowRight} /></Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="right-column">
          <div className="card time-card">
            <div className="card-header">
              <div className="card-title small">現在日時</div>
            </div>
            
            <div className="system-time">{formattedTime}</div>
            <div className="system-date">{formattedDate}</div>
            
            <div className="system-info-grid">
              <div className="system-info-item">
                <div className="info-label">作業時間</div>
                <div className="info-value">4時間22分</div>
              </div>
              <div className="system-info-item">
                <div className="info-label">残りタスク</div>
                <div className="info-value">7</div>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="card-header">
              <div className="card-title">クイックアクション</div>
            </div>
            
            <div className="quick-actions-grid">
              <div className="action-button" data-action="new-task">
                <FontAwesomeIcon icon={faPlusCircle} />
                <span className="action-name">新規タスク</span>
              </div>
              
              <div className="action-button" data-action="new-note">
                <FontAwesomeIcon icon={faStickyNote} />
                <span className="action-name">メモ作成</span>
              </div>
              
              <div className="action-button" data-action="add-schedule">
                <FontAwesomeIcon icon={faCalendarPlus} />
                <span className="action-name">予定追加</span>
              </div>
              
              <div className="action-button" data-action="share">
                <FontAwesomeIcon icon={faShareAlt} />
                <span className="action-name">共有</span>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="card-header">
              <div className="card-title">アプリ設定</div>
            </div>
            
            <div className="control-item">
              <div className="control-name">
                <FontAwesomeIcon icon={faBell} />
                通知
              </div>
              <div 
                className={`toggle-switch ${notifications ? 'active' : ''}`} 
                onClick={toggleNotifications}
              >
                <div className="toggle-thumb"></div>
              </div>
            </div>
            
            <div className="control-item">
              <div className="control-name">
                <FontAwesomeIcon icon={faMoon} />
                ダークモード
              </div>
              <div 
                className={`toggle-switch ${darkMode ? 'active' : ''}`} 
                onClick={toggleDarkMode}
              >
                <div className="toggle-thumb"></div>
              </div>
            </div>
            
            <div className="control-item">
              <div className="control-name">
                <FontAwesomeIcon icon={faSync} />
                自動同期
              </div>
              <div 
                className={`toggle-switch ${autoSync ? 'active' : ''}`} 
                onClick={toggleAutoSync}
              >
                <div className="toggle-thumb"></div>
              </div>
            </div>
            
            <div className="control-item">
              <div className="control-name">
                <FontAwesomeIcon icon={faCalCheck} />
                リマインダー
              </div>
              <div 
                className={`toggle-switch ${reminders ? 'active' : ''}`} 
                onClick={toggleReminders}
              >
                <div className="toggle-thumb"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;