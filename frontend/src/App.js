import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import React from 'react';
import './App.css';
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Task from "./Pages/Task";
import Client from "./Pages/Client";
import ContentPlan from "./Pages/ContentPlan";
import ProtectedRoute from './Component/ProtectedRoute';
import SocialMedia from "./Pages/SocialMedia";
import User from "./Pages/User";

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={['admin', 'content_planner', 'designer', 'videographer']}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contentplan"
              element={
                <ProtectedRoute allowedRoles={['content_planner']}>
                  <ContentPlan />
                </ProtectedRoute>
              }
            />
            <Route
              path="/socialmedia"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <SocialMedia />
                </ProtectedRoute>
              }
            />
            <Route
              path="/usermanagement"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <User />
                </ProtectedRoute>
              }
            />
            <Route
              path="/task"
              element={
                <ProtectedRoute allowedRoles={['content_planner', 'designer', 'videographer']}>
                  <Task />
                </ProtectedRoute>
              }
            />
            <Route
              path="/client"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Client />
                </ProtectedRoute>
              }
            />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
