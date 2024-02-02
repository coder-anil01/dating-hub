import React, { useEffect, useState } from 'react'

const UserDashbord = () => {
    const [existuser, setExistUser] = useState('');
    useEffect(()=> {
        const jsonuser = localStorage.getItem("user");
        const user = JSON.parse(jsonuser);
        if(!jsonuser){
            setExistUser(false)
        }
    },[])
  return (
    <div>
      <div title="Create Account">
      <div className='user-input-card'>
        <div className='user-input-icon'><FaUser/></div>
        <input type="text"
          className='user-input'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="New User I'd"
          required/>
       </div>

      <div className='user-input-card'>
        <div className='user-input-icon'><FaLock/></div>
        <input type="password"
          className='user-input'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='New Password'
          required/>
       </div>

    </div>
    </div>
  )
}

export default UserDashbord
