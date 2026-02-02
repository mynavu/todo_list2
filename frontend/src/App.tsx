import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AuthContent from './AuthContent'
import Login from './pages/Login'
import Register from './pages/Register'
import Todo from './pages/Todo'
import { getAuthToken } from './axios_helper'
import Home from './pages/Home'
import Error from './pages/Error'
import type { Dispatch, SetStateAction } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import ClickSpark from './components/ClickSpark'

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  
  return (
    <div className='App'>
      <ClickSpark
        sparkColor='#fff'
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        
      <Router>
        <Routes>
          <Route path="/" element={<Home isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/login" element={
            <Login
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
          } />
          <Route path="/register" element={
            <Register
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
          } />
          <Route path="/todo" element={
            isAuthenticated ? <Todo isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" replace />
          } />
          <Route path="/*" element={<Error />} />
        </Routes>
      </Router>
      
      </ ClickSpark>
    </div>
  )
}

export default App
