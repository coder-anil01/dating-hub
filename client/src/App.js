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
import AllGirls from './pages/admin/AllGirls'
import UserRoutes from './routes/UserRoutes'
import Registation from './pages/Registation'
import Login from './pages/Login'
import UserProfile from './pages/user/UserProfile'

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
        <Route path='/allgirl' element={<AllGirls/>}/>
        <Route path='/register' element={<Registation/>}/>
        <Route path='/login' element={<Login/>}/>

{/* USER */}
        <Route path='/user' element={<UserRoutes/>}>
          <Route path='' element={<UserProfile/>}/>
          <Route path='order' element={<MyOrder/>}/>
        </Route>

{/* ADmin */}
        <Route path='/admin' element={<AdminRoutes/>}>
          <Route path='' element={<Dashbord/>}/>
          <Route path='create' element={<CreateProfile/>}/>
          <Route path='allgirl' element={<AllGirls/>}/>
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
