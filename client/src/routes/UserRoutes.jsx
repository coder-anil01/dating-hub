import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom';
import '../style/Route.css';

const UserRoutes = () => {
    const[existUser, setExistUser] = useState(false);

    const  getUser = async() => {
        try {
            const jsonuser = await localStorage.getItem("user");
            const user = JSON.parse(jsonuser);
            if(!jsonuser){
                return setExistUser(false);
            }else{
                return setExistUser(true);
            }
        } catch (error) {
            
        }
    }
    useEffect(()=> {
        getUser();
    },[])
  return (
    <>
     {existUser ? <Outlet/> :
     <div className='user-profile'>
        <div className='user-route'>
            <Link to='/register'>Register</Link>
            <Link to='/login' >Login</Link>
        </div>
     </div>
     }
    </>
  )
}

export default UserRoutes
