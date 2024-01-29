import React from 'react'
import { GoHomeFill } from "react-icons/go";
import { FaUser } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import {Link, NavLink} from 'react-router-dom';

const Navbar = () => {
  return (
    <>
    <div className='navbar-top'>
        <div className='navbar-top-container'>
            <Link to='/' className='navbar-top-logo-div'>Adult hub</Link>
            <div className='navbar-top-right'>
                <NavLink activeClassName="active" to='/order'>Orders</NavLink>
                <NavLink activeClassName="active" to='/contact'>Contacts</NavLink>
                <NavLink activeClassName="active" to='/dashbord'><FaUser/></NavLink>
            </div>
        </div>
    </div>

    <div className='navbar-buttom'>
        <NavLink to='/' activeClassName="active" className='navbar-button-item'><div><GoHomeFill/></div>Home</NavLink>
        <NavLink to='/order' activeClassName="active" className='navbar-button-item'><div><FaVideo/></div>Video Call</NavLink>
        <NavLink to='/dashbord' activeClassName="active" className='navbar-button-item'><div><FaUser/></div>Me</NavLink>
    </div>
    </>
  )
}

export default Navbar