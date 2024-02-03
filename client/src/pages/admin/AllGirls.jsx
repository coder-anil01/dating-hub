import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/AdminMenu'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../../style/AllProductAdmin.css'
import {toast} from 'react-toastify'

const AllGirls = () => {
    const [data, setData] = useState([]);

    const getAllData = async() => {
        const {data} = await axios.get('/api/v1/girl/get')
        setData(data?.girls)
      }
      useEffect(()=>{
        getAllData();
      },[])

      const handleDelete = async(id) => {
        try {
          const conformation = window.confirm('Are You really Want To delete');
          if(conformation){
            await axios.delete(`/api/v1/girl/delete/${id}`)
            toast.success('Profile Deleted Successfully')
            getAllData();
          }else{
            toast.info('Thanks, Not Delete')
          }
        } catch (error) {
          toast.error("Somthing Went Wrong")
        }
      }

  return (
    <div className='dashbord'>
      <div><AdminMenu/></div>
      <div className='dashbord-right'>
      <div className='homepage-grils-container'>
        {data?.map((e) => (
        <div className='homepage-grils-card' key={e._id}>
          <Link to={`/girl/${e?._id}`} className='homepage-grils-image-container'>
            <img  className='homepage-grils-image' src={e?.image} alt="" loading='lazy'/>
          </Link>
          <div className='homepage-username'>@{e?.username}</div>
            <button onClick={() => handleDelete(e?._id)} className='homepage-grils-call-button homepage-grils-delete-button'>Delete</button>
        </div>
        ))}
      </div>
      </div>
    </div>
  )
}

export default AllGirls
