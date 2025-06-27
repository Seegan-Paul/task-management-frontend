import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
// import Signup from './pages/Signup.jsx';
import TaskList from './pages/TaskList.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace/>} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/signup" element={<Signup />} /> */}
        <Route path="/tasks" element={<TaskList />} />
      </Routes>
    </Router>
  );
}
