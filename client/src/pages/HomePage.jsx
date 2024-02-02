import React, { useEffect, useState } from 'react'
import '../style/HomePage.css'
import { Link } from 'react-router-dom'
import axios from 'axios';

const HomePage = () => {
  const [data, setData] = useState([]);

  const getAllData = async() => {
    const {data} = await axios.get('/api/v1/girl/get')
    setData(data?.girls)
  }

  useEffect(() => {
    getAllData();
  },[])
  return (
    <div className='homepage'>
      <h2 className='homepage-hading'>Adult Video Call With Girls</h2>
      <div className='homepage-grils-container'>
        {data?.map((e) => (
        <Link to={`/girl/${e?._id}`} className='homepage-grils-card' key={e._id}>
          <div className='homepage-grils-image-container'>
            <img loading='lazy' className='homepage-grils-image' src={e?.image} alt="" />
          </div>
          <div className='homepage-price'> ₹ {e?.price}</div>
            <button className='homepage-grils-call-button'>View</button>
        </Link>
        ))}
      </div>
    </div>
  )
}

export default HomePage
