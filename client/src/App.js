import './App.css'
import React from 'react'
import HomePage from './pages/HomePage'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Video from './pages/Video'
import GirlsDetail from './pages/GirlsDetail'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import MyOrder from './pages/user/MyOrder'
import Dashbord from './pages/admin/Dashbord'
import AdminOrder from './pages/admin/AdminOrder'
import AdminRoutes from './routes/AdminRoutes'
import CreateProfile from './pages/admin/CreateProfile'
import AllUsers from './pages/admin/AllUsers'
import Logout from './pages/admin/Logout'

const App = () => {
  return (
    <>
    <ToastContainer
      position="top-right"
      autoClose={3000}/>
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/girl/:id' element={<GirlsDetail/>}/>
        <Route path='/video' element={<Video/>}/>
        <Route path='/order' element={<MyOrder/>}/>

{/* ADmin */}
        <Route path='/admin' element={<AdminRoutes/>}>
          <Route path='' element={<Dashbord/>}/>
          <Route path='create' element={<CreateProfile/>}/>
          <Route path='orders' element={<AdminOrder/>}/>
          <Route path='allusers' element={<AllUsers/>}/>
          <Route path='logout' element={<Logout/>}/>
        </Route>

      </Routes>
      <Footer/>
    </Router>
    </>
  )
}

export default App
