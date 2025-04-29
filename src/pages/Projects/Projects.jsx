import React, { useState, useEffect, useRef, useContext } from 'react';
import './Projects.css';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import { useAppContext } from '../../context/AppContext';
import { formatDate } from '../../utils/dateFormatter';

const Projects = () => {
  const { darkMode } = useAppContext();
  
  // ステート定義
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [currentCategory, setCurrentCategory] = useState('all');
  const [modalData, setModalData] = useState({
    isOpen: false,
    isEditMode: false,
    projectId: null,
    title: '',
    category: 'web',
    status: 'planning',
    progress: 0,
    startDate: '',
    endDate: '',
    description: '',
    members: ''
  });
  const [detailsModalData, setDetailsModalData] = useState({
    isOpen: false,
    project: null
  });
  const [deleteModalData, setDeleteModalData] = useState({
    isOpen: false,
    projectId: null
  });
  const [contextMenuData, setContextMenuData] = useState({
    isOpen: false,
    x: 0,
    y: 0,
    projectId: null
  });

  // フォームの参照
  const formRef = useRef(null);

  // サンプルプロジェクトデータ
  const sampleProjects = [
    {
      id: 1,
      title: "ウェブサイトリニューアル",
      category: "web",
      status: "in-progress",
      progress: 65,
      startDate: "2023-04-01",
      endDate: "2023-05-30",
      description: "企業ウェブサイトの全面的なリニューアルプロジェクト",
      members: ["田中", "佐藤", "鈴木", "山田", "高橋"]
    },
    {
      id: 2,
      title: "モバイルアプリ開発",
      category: "app",
      status: "planning",
      progress: 25,
      startDate: "2023-04-15",
      endDate: "2023-07-15",
      description: "新しいモバイルアプリの開発プロジェクト",
      members: ["高橋", "佐藤", "渡辺"]
    },
    {
      id: 3,
      title: "マーケティングキャンペーン",
      category: "marketing",
      status: "completed",
      progress: 100,
      startDate: "2023-03-01",
      endDate: "2023-04-10",
      description: "四半期マーケティングキャンペーンの企画と実施",
      members: ["佐藤", "田中", "山本"]
    },
    {
      id: 4,
      title: "UI/UXデザイン改善",
      category: "design",
      status: "in-progress",
      progress: 40,
      startDate: "2023-04-10",
      endDate: "2023-05-15",
      description: "製品のユーザーインターフェースとユーザーエクスペリエンスの見直しと改善",
      members: ["伊藤", "中村", "小林"]
    },
    {
      id: 5,
      title: "市場調査プロジェクト",
      category: "research",
      status: "planning",
      progress: 15,
      startDate: "2023-04-20",
      endDate: "2023-06-30",
      description: "新市場への参入可能性に関する詳細な調査",
      members: ["斉藤", "加藤"]
    }
  ];

  // 初期化関数
  useEffect(() => {
    let storedProjects = JSON.parse(localStorage.getItem('projects')) || sampleProjects;
    
    // 初回のみローカルストレージに保存
    if (!localStorage.getItem('projects')) {
      localStorage.setItem('projects', JSON.stringify(sampleProjects));
    }
    
    setProjects(storedProjects);
    setFilteredProjects(storedProjects);
    
    // クリックイベントでコンテキストメニューを閉じる
    const handleClickOutside = (e) => {
      if (!e.target.closest('.project-options') && !e.target.closest('.context-menu')) {
        setContextMenuData((prev) => ({ ...prev, isOpen: false }));
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [sampleProjects]);

  // プロジェクトフィルタリング
  useEffect(() => {
    filterProjects();
  }, [projects, currentFilter, currentCategory]);

  // プロジェクトフィルタリング関数
  const filterProjects = () => {
    let filtered = [...projects];
    
    // ステータスでフィルタリング
    if (currentFilter !== 'all') {
      filtered = filtered.filter(project => project.status === currentFilter);
    }
    
    // カテゴリーでフィルタリング
    if (currentCategory !== 'all') {
      filtered = filtered.filter(project => project.category === currentCategory);
    }
    
    setFilteredProjects(filtered);
  };

  // フィルターボタンクリック処理
  const handleFilterClick = (filterType) => {
    setCurrentFilter(filterType);
  };

  // カテゴリー選択変更処理
  const handleCategoryChange = (e) => {
    setCurrentCategory(e.target.value);
  };

  // プロジェクト保存処理
  const handleProjectSave = (e) => {
    e.preventDefault();
    
    if (!formRef.current) return;
    
    const formData = new FormData(formRef.current);
    const projectId = formData.get('project-id') ? parseInt(formData.get('project-id')) : null;
    const title = formData.get('project-title');
    const category = formData.get('project-category');
    const status = formData.get('project-status');
    const progress = parseInt(formData.get('project-progress'));
    const startDate = formData.get('project-start-date');
    const endDate = formData.get('project-end-date');
    const description = formData.get('project-description');
    const membersInput = formData.get('project-members');
    
    // メンバーリスト作成
    const members = membersInput.split(',')
      .map(member => member.trim())
      .filter(member => member !== '');
    
    let updatedProjects = [...projects];
    
    if (projectId) {
      // 既存プロジェクトの編集
      const index = updatedProjects.findIndex(p => p.id === projectId);
      if (index !== -1) {
        updatedProjects[index] = {
          ...updatedProjects[index],
          title,
          category,
          status,
          progress,
          startDate,
          endDate,
          description,
          members
        };
      }
    } else {
      // 新規プロジェクト作成
      const newId = updatedProjects.length > 0 
        ? Math.max(...updatedProjects.map(p => p.id)) + 1 
        : 1;
        
      updatedProjects.push({
        id: newId,
        title,
        category,
        status,
        progress,
        startDate,
        endDate,
        description,
        members
      });
    }
    
    // ローカルストレージとステート更新
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    setProjects(updatedProjects);
    
    // モーダルを閉じる
    setModalData({ ...modalData, isOpen: false });
  };

  // プロジェクト削除処理
  const handleProjectDelete = () => {
    if (!deleteModalData.projectId) return;
    
    const updatedProjects = projects.filter(p => p.id !== deleteModalData.projectId);
    
    // ローカルストレージとステート更新
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    setProjects(updatedProjects);
    
    // モーダルを閉じる
    setDeleteModalData({ isOpen: false, projectId: null });
  };

  // 新規プロジェクト/編集モーダルを開く
  const openProjectModal = (projectId = null) => {
    const today = new Date().toISOString().split('T')[0];
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    const nextWeekFormatted = nextWeek.toISOString().split('T')[0];
    
    if (projectId) {
      // 編集モード
      const project = projects.find(p => p.id === parseInt(projectId));
      if (!project) return;
      
      setModalData({ 
        isOpen: true, 
        isEditMode: true,
        projectId,
        title: project.title,
        category: project.category,
        status: project.status,
        progress: project.progress,
        startDate: project.startDate,
        endDate: project.endDate,
        description: project.description || '',
        members: project.members.join(', ')
      });
    } else {
      // 新規作成モード
      setModalData({
        isOpen: true,
        isEditMode: false,
        projectId: null,
        title: '',
        category: 'web',
        status: 'planning',
        progress: 0,
        startDate: today,
        endDate: nextWeekFormatted,
        description: '',
        members: ''
      });
    }
  };

  // プロジェクト詳細モーダルを開く
  const openProjectDetails = (projectId) => {
    const project = projects.find(p => p.id === parseInt(projectId));
    if (!project) return;
    
    setDetailsModalData({
      isOpen: true,
      project
    });
  };

  // 削除確認モーダルを開く
  const openDeleteConfirmation = (projectId) => {
    setDeleteModalData({ 
      isOpen: true, 
      projectId: parseInt(projectId)
    });
  };

  // コンテキストメニュー表示
  const showContextMenu = (e, projectId) => {
    e.preventDefault();
    e.stopPropagation();
    
    // 画面からはみ出ないように位置調整
    const x = Math.min(e.clientX, window.innerWidth - 150);
    const y = Math.min(e.clientY, window.innerHeight - 120);
    
    setContextMenuData({
      isOpen: true,
      x,
      y,
      projectId: parseInt(projectId)
    });
  };

  // ステータスに応じたラベルテキスト取得
  const getStatusLabel = (status) => {
    switch(status) {
      case 'planning': return '計画中';
      case 'in-progress': return '進行中';
      case 'completed': return '完了';
      default: return status;
    }
  };

  // カテゴリーに応じたラベルテキスト取得
  const getCategoryLabel = (category) => {
    switch(category) {
      case 'web': return 'ウェブ開発';
      case 'app': return 'アプリ開発';
      case 'marketing': return 'マーケティング';
      case 'research': return 'リサーチ';
      case 'design': return 'デザイン';
      default: return category;
    }
  };

  return (
    <div className="projects-page page-content">
      <h2 className="page-title"><i className="fas fa-project-diagram"></i> プロジェクト管理</h2>
      
      <div className="projects-container">
        <div className="projects-header">
          <div className="projects-filter">
            <button 
              className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`} 
              onClick={() => handleFilterClick('all')}
            >
              すべて
            </button>
            <button 
              className={`filter-btn ${currentFilter === 'in-progress' ? 'active' : ''}`} 
              onClick={() => handleFilterClick('in-progress')}
            >
              進行中
            </button>
            <button 
              className={`filter-btn ${currentFilter === 'planning' ? 'active' : ''}`} 
              onClick={() => handleFilterClick('planning')}
            >
              計画中
            </button>
            <button 
              className={`filter-btn ${currentFilter === 'completed' ? 'active' : ''}`} 
              onClick={() => handleFilterClick('completed')}
            >
              完了
            </button>
          </div>
          <div className="projects-category-filter">
            <select 
              id="category-filter" 
              value={currentCategory}
              onChange={handleCategoryChange}
            >
              <option value="all">すべてのカテゴリー</option>
              <option value="web">ウェブ開発</option>
              <option value="app">アプリ開発</option>
              <option value="marketing">マーケティング</option>
              <option value="research">リサーチ</option>
              <option value="design">デザイン</option>
            </select>
          </div>
          <button 
            className="new-project-btn" 
            onClick={() => openProjectModal()}
          >
            <i className="fas fa-plus"></i> 新規プロジェクト
          </button>
        </div>
        
        <div className="projects-grid">
          {filteredProjects.length === 0 ? (
            <div className="no-projects">プロジェクトはありません。新規プロジェクトを作成してください。</div>
          ) : (
            filteredProjects.map(project => (
              <ProjectCard 
                key={project.id}
                project={project}
                onView={() => openProjectDetails(project.id)}
                onEdit={() => openProjectModal(project.id)}
                onContextMenu={(e) => showContextMenu(e, project.id)}
                getStatusLabel={getStatusLabel}
                formatDate={formatDate}
              />
            ))
          )}
        </div>
      </div>
      
      {/* 新規プロジェクト/編集モーダル */}
      {modalData.isOpen && (
        <div className="modal" style={{ display: 'flex' }}>
          <div className="modal-content">
            <div className="modal-header">
              <h3 id="project-modal-title">
                {modalData.isEditMode ? 'プロジェクト編集' : '新規プロジェクト'}
              </h3>
              <span 
                className="close-modal" 
                onClick={() => setModalData({ ...modalData, isOpen: false })}
              >
                &times;
              </span>
            </div>
            <div className="modal-body">
              <form ref={formRef} onSubmit={handleProjectSave} id="project-form">
                <input 
                  type="hidden" 
                  name="project-id" 
                  value={modalData.projectId || ''} 
                />
                <div className="form-group">
                  <label htmlFor="project-title">プロジェクト名</label>
                  <input 
                    type="text" 
                    id="project-title" 
                    name="project-title" 
                    required 
                    defaultValue={modalData.title} 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="project-category">カテゴリー</label>
                  <select 
                    id="project-category" 
                    name="project-category" 
                    required 
                    defaultValue={modalData.category}
                  >
                    <option value="web">ウェブ開発</option>
                    <option value="app">アプリ開発</option>
                    <option value="marketing">マーケティング</option>
                    <option value="research">リサーチ</option>
                    <option value="design">デザイン</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="project-status">ステータス</label>
                  <select 
                    id="project-status" 
                    name="project-status" 
                    required 
                    defaultValue={modalData.status}
                  >
                    <option value="planning">計画中</option>
                    <option value="in-progress">進行中</option>
                    <option value="completed">完了</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="project-progress">進捗率 (%)</label>
                  <input 
                    type="number" 
                    id="project-progress" 
                    name="project-progress" 
                    min="0" 
                    max="100" 
                    required 
                    defaultValue={modalData.progress} 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="project-start-date">開始日</label>
                  <input 
                    type="date" 
                    id="project-start-date" 
                    name="project-start-date" 
                    required 
                    defaultValue={modalData.startDate} 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="project-end-date">期限日</label>
                  <input 
                    type="date" 
                    id="project-end-date" 
                    name="project-end-date" 
                    required 
                    defaultValue={modalData.endDate} 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="project-description">説明</label>
                  <textarea 
                    id="project-description" 
                    name="project-description" 
                    rows="3" 
                    defaultValue={modalData.description} 
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="project-members">メンバー (カンマ区切り)</label>
                  <input 
                    type="text" 
                    id="project-members" 
                    name="project-members" 
                    placeholder="例: 田中, 佐藤, 鈴木" 
                    defaultValue={modalData.members} 
                  />
                </div>
                <div className="modal-actions">
                  <button 
                    type="button" 
                    className="cancel-btn" 
                    onClick={() => setModalData({ ...modalData, isOpen: false })}
                  >
                    キャンセル
                  </button>
                  <button type="submit" className="save-btn">
                    保存
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* プロジェクト詳細モーダル */}
      {detailsModalData.isOpen && detailsModalData.project && (
        <div className="modal" style={{ display: 'flex' }}>
          <div className="modal-content modal-large">
            <div className="modal-header">
              <h3 id="details-project-title">
                {detailsModalData.project.title}
              </h3>
              <span 
                className="close-modal" 
                onClick={() => setDetailsModalData({ ...detailsModalData, isOpen: false })}
              >
                &times;
              </span>
            </div>
            <div className="modal-body">
              <div className="project-details-content">
                <div className="detail-row">
                  <div className="detail-label">ステータス:</div>
                  <div className="detail-value">
                    <span className={`status-badge ${detailsModalData.project.status}`}>
                      {getStatusLabel(detailsModalData.project.status)}
                    </span>
                  </div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">進捗率:</div>
                  <div className="detail-value">
                    {detailsModalData.project.progress}%
                  </div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">カテゴリー:</div>
                  <div className="detail-value">
                    {getCategoryLabel(detailsModalData.project.category)}
                  </div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">開始日:</div>
                  <div className="detail-value">
                    {formatDate(detailsModalData.project.startDate)}
                  </div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">期限日:</div>
                  <div className="detail-value">
                    {formatDate(detailsModalData.project.endDate)}
                  </div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">説明:</div>
                  <div className="detail-value">
                    {detailsModalData.project.description || '説明はありません'}
                  </div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">メンバー:</div>
                  <div className="detail-value">
                    {detailsModalData.project.members.join(', ') || 'メンバーは割り当てられていません'}
                  </div>
                </div>
              </div>
              <div className="modal-actions detail-actions">
                <button 
                  type="button" 
                  className="edit-btn" 
                  onClick={() => {
                    openProjectModal(detailsModalData.project.id);
                    setDetailsModalData({ ...detailsModalData, isOpen: false });
                  }}
                >
                  <i className="fas fa-edit"></i> 編集
                </button>
                <button 
                  type="button" 
                  className="delete-btn" 
                  onClick={() => {
                    openDeleteConfirmation(detailsModalData.project.id);
                    setDetailsModalData({ ...detailsModalData, isOpen: false });
                  }}
                >
                  <i className="fas fa-trash"></i> 削除
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* プロジェクト削除確認モーダル */}
      {deleteModalData.isOpen && (
        <div className="modal" style={{ display: 'flex' }}>
          <div className="modal-content">
            <div className="modal-header">
              <h3>プロジェクト削除</h3>
              <span 
                className="close-modal" 
                onClick={() => setDeleteModalData({ ...deleteModalData, isOpen: false })}
              >
                &times;
              </span>
            </div>
            <div className="modal-body">
              <p>このプロジェクトを削除してもよろしいですか？</p>
              <div className="modal-actions">
                <button 
                  type="button" 
                  className="cancel-btn" 
                  onClick={() => setDeleteModalData({ ...deleteModalData, isOpen: false })}
                >
                  キャンセル
                </button>
                <button 
                  type="button" 
                  className="delete-btn" 
                  onClick={handleProjectDelete}
                >
                  削除
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* コンテキストメニュー */}
      {contextMenuData.isOpen && (
        <div 
          className="context-menu" 
          style={{ 
            display: 'block', 
            left: `${contextMenuData.x}px`, 
            top: `${contextMenuData.y}px` 
          }}
        >
          <ul>
            <li onClick={() => {
              openProjectDetails(contextMenuData.projectId);
              setContextMenuData({ ...contextMenuData, isOpen: false });
            }}>
              <i className="fas fa-eye"></i> 詳細表示
            </li>
            <li onClick={() => {
              openProjectModal(contextMenuData.projectId);
              setContextMenuData({ ...contextMenuData, isOpen: false });
            }}>
              <i className="fas fa-edit"></i> 編集
            </li>
            <li onClick={() => {
              openDeleteConfirmation(contextMenuData.projectId);
              setContextMenuData({ ...contextMenuData, isOpen: false });
            }}>
              <i className="fas fa-trash"></i> 削除
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Projects;