import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import Projects from './pages/Projects/Projects';
import Notes from './pages/Notes/Notes';
import Tasks from './pages/Tasks/Tasks';
import AIMentor from './pages/AIMentor/AIMentor';
import Calendar from './pages/Calendar/Calendar';
import Analytics from './pages/Analytics/Analytics';
import Settings from './pages/Settings/Settings';
import './App.css';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="notes" element={<Notes />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="ai-mentor" element={<AIMentor />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

