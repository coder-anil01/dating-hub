import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
  return (
    <div className='admin-menu'>
      <NavLink to='/admin/dashbord' className='admin-menu-item'>MY ACCOUNT</NavLink>
      <NavLink to='/admin/create' className='admin-menu-item'>CREATE</NavLink>
      <NavLink to='/admin/allgirl' className='admin-menu-item'>All Girls</NavLink>
      <NavLink to='/admin/orders' className='admin-menu-item'>ORDERS</NavLink>
      <NavLink to='/admin/allusers' className='admin-menu-item'>ALL USERS</NavLink>
      <NavLink to='/admin/logout' className='admin-menu-item'>LOGOUT</NavLink>
    </div>
  )
}

export default AdminMenu
