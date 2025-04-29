import React, { createContext, useState, useContext, useEffect } from 'react';

// コンテキストの作成
const AppContext = createContext();

// コンテキストプロバイダコンポーネント
export const AppProvider = ({ children }) => {
  // 状態変数
  const [darkMode, setDarkMode] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState(true);
  const [autoSync, setAutoSync] = useState(true);
  const [reminders, setReminders] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // 現在時刻の更新
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // ダークモード切替
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // 通知設定切替
  const toggleNotifications = () => {
    setNotifications(!notifications);
  };

  // 自動同期切替
  const toggleAutoSync = () => {
    setAutoSync(!autoSync);
  };

  // リマインダー切替
  const toggleReminders = () => {
    setReminders(!reminders);
  };

  // サイドバー折りたたみ切替
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // 提供する値
  const value = {
    darkMode,
    toggleDarkMode,
    currentTime,
    notifications,
    toggleNotifications,
    autoSync,
    toggleAutoSync,
    reminders,
    toggleReminders,
    sidebarCollapsed,
    toggleSidebar
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// カスタムフック
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};