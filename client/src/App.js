import './App.css'
import React from 'react'
import HomePage from './pages/HomePage'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Video from './pages/Video'
import GirlsDetail from './pages/GirlsDetail'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const App = () => {
  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/girl/:id' element={<GirlsDetail/>}/>
        <Route path='/video' element={<Video/>}/>
      </Routes>
      <Footer/>
    </Router>
    </>
  )
}

export default App