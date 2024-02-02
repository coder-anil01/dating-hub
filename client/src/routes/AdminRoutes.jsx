import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

const AdminRoutes = () => {
  const [password, setPassword] = useState('');
  const [admin, setAdmin] = useState(false);

  const pass = process.env.REACT_APP_Admin_pass;

  const handleSubmit = () => {
    try {
      if(password === pass){
        return setAdmin(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      {admin ? <Outlet/>: <>
      <input type="text"
        value={password}
        onChange={(e)=> setPassword(e.target.value)}/>
        <button onClick={handleSubmit}>Send</button>
      </>}
    </div>
  )
}

export default AdminRoutes
