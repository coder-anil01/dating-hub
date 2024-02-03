import React, { useState } from 'react'
import { FaLock, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Register.css'
import { toast } from 'react-toastify';
import axios from 'axios';

const Registation = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const {data} = await axios.post('/api/v1/user/create', {username, password});
      if(data?.user){
        localStorage.setItem("token", data?.token);
        localStorage.setItem("user", JSON.stringify(data?.user));
        navigate('/');
      }else{
        toast.info(data.message)
      }
    } catch (error) {
      toast.error("Somthing Went Wrong")
    }
  }
  return (
    <div className='login-form-body'>
    <form className='login-form' onSubmit={handleSubmit}>
        <h2 className='login-form-heading'>Create Account</h2>
        <div className='login-form-items'>
            <div className='login-form-icon'><FaUser/></div>
            <input type="text"
            value={username}
            onChange={(e)=> setUsername(e.target.value)}
            placeholder='Enter Your Email'
            className='login-form-input'
            required/>
        </div>
        
        <div className='login-form-items'>
            <div className='login-form-icon'><FaLock/></div>
            <input type="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            placeholder='Enter Your Password'
            className='login-form-input'
            required/>
        </div>
        {/* <Link to="/forgot-password" className='login-form-link'>Forgot Password ?</Link> */}
        <button type='submit' className='login-form-submit'>Create</button>
        <div className='login-form-benidit'>I have an account <Link className='login-form-link' to='/login'>Login</Link></div>
      </form>
      </div>
  )
}

export default Registation
