import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FcVideoCall } from "react-icons/fc";
import '../../style/MyOrder.css'
import VideoCall from './VideoCall';


const MyOrder = () => {
    const userjson = localStorage.getItem('user');
    const user = JSON.parse(userjson);
    const [orders, setOrders] = useState([]);
    const [videocall, setVideocall] = useState(false);

    const getOrders = async() => {
        try {
            const {data} = await axios.get(`/api/v1/order/get/${user?._id}`);
            setOrders(data?.orders)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getOrders();
    },[])

    const receiveDataFromChild = (data) => {
      setVideocall(data);
    };

  return (
    <>
    <div className='order'>
      <div className='order-container'>
        {orders?.map((o) =>(
          <div key={o._id} className='order-card'>
                <img loading='lazy' src={o?.product?.image} alt="" className='order-image'/>
                <div className='order-right'>
                    <div className='order-id'><strong>Order Id:-</strong> {o?._id}</div>
                    <div className='order-payment'>Payment Processing</div>
                    <div className='order-message'><strong>Call Time:-</strong> {o?.message}</div>
                    <div className='order-videocall-icon' onClick={() => setVideocall(true)}><FcVideoCall/></div>
                </div>
            </div>
        ))}
      </div>
    </div>
    {videocall && <VideoCall handleSend={receiveDataFromChild}/>}
    </>
  )
}

export default MyOrder
