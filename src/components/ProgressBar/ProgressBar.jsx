import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ progress, color = 'blue', height = '6px' }) => {
  return (
    <div className="progress-bar" style={{ height }}>
      <div 
        className={`progress-fill ${color}`} 
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;