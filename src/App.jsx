import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import SignUp from './pages/Signup.jsx';
import TaskList from './pages/TaskList.jsx';
import ProtectedRoute from "./pages/ProtectedRoute.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/tasks" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/tasks" element={
          <ProtectedRoute>
            <TaskList />
          </ProtectedRoute>
          } />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}
