import React from 'react';
import './ProjectCard.css';
import ProgressBar from '../ProgressBar/ProgressBar';

const ProjectCard = ({ project, onView, onEdit, onContextMenu, getStatusLabel, formatDate }) => {
  // プログレスバーのカラー
  const getProgressColor = () => {
    if (project.progress >= 100) {
      return 'green';
    } else if (project.status === 'planning') {
      return 'orange';
    }
    return 'blue';
  };
  
  // メンバー表示用コンポーネント
  const renderMembers = () => {
    const maxDisplay = 3;
    const displayedMembers = project.members.slice(0, maxDisplay).map((member, index) => (
      <div key={index} className="team-member">{member.charAt(0)}</div>
    ));
    
    const extraMembers = project.members.length > maxDisplay ? (
      <div className="team-member more">+{project.members.length - maxDisplay}</div>
    ) : null;
    
    return (
      <div className="team-members">
        {displayedMembers}
        {extraMembers}
      </div>
    );
  };
  
  return (
    <div 
      className="project-card" 
      data-id={project.id}
      data-category={project.category}
      data-status={project.status}
    >
      <div className="project-header">
        <div className={`project-status ${project.status}`}>
          {getStatusLabel(project.status)}
        </div>
        <div 
          className="project-options" 
          onClick={(e) => onContextMenu(e)}
        >
          <i className="fas fa-ellipsis-v"></i>
        </div>
      </div>
      <h3 className="project-title">{project.title}</h3>
      <div className="project-progress">
        <div className="progress-label">
          <span>進捗</span>
          <span>{project.progress}%</span>
        </div>
        <ProgressBar 
          progress={project.progress} 
          color={getProgressColor()} 
        />
      </div>
      <div className="project-dates">
        <div className="project-date">
          <i className="far fa-calendar-alt"></i>
          <span>開始: {formatDate(project.startDate)}</span>
        </div>
        <div className="project-date">
          <i className="far fa-calendar-check"></i>
          <span>
            {project.status === 'completed' ? '完了: ' : '期限: '}
            {formatDate(project.endDate)}
          </span>
        </div>
      </div>
      <div className="project-team">
        {renderMembers()}
      </div>
      <div className="project-actions">
        <button 
          className="project-action-btn" 
          onClick={onView}
        >
          <i className="fas fa-eye"></i> 詳細
        </button>
        <button 
          className="project-action-btn" 
          onClick={onEdit}
        >
          <i className="fas fa-edit"></i> 編集
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;