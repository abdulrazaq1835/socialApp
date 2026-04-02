import React from 'react'
import { useAuth } from './context/AuthContext.jsx'
import { Routes,Route } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Feed from './pages/Feed.jsx'
import Register from './pages/Register.jsx'
import CreatePostPage from "./pages/CreatePost.jsx"

const App = () => {
  const {user} = useAuth()
  return (
     <Routes>
      <Route path="/" element={user ? <Navigate to="/feed" /> : <Navigate to="/login" />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/feed" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/feed" />} />
      <Route path="/feed" element={user ? <Feed /> : <Navigate to="/login" />} />
      <Route path="/create-post" element={user ? <CreatePostPage /> : <Navigate to="/login" />} />
    </Routes>
  )
}

export default App
