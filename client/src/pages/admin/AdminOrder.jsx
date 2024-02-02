import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/AdminMenu'
import axios from 'axios'
import '../../style/AdminOrder.css'
import { toast } from "react-toastify";
import { Select } from "antd";
const { Option } = Select;

const AdminOrder = () => {

  const [orders, setOrders] = useState([]);

  const getAllOrders = async()=> {
    try {
      const {data} = await axios.get('/api/v1/order/getall')
      if(data.success){
        setOrders(data.orders)
        console.log(data.orders)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getAllOrders();
    // eslint-disable-next-line
  },[])

//=> UPDATE 
  const handleUpdate = async(id, value) => {
    try {
      const {data} = await axios.put(`/api/v1/order/update/${id}`, {status: value})
      if(data.success){
        toast.success('Status Updated Successfully');
      }
    } catch (error) {
      toast.error('Internal Server Error');
    }
  }
  return (
    <div className='dashbord'>
      <div><AdminMenu/></div>
      <div>
        <div className='admin-order'>
          {orders?.map((o) =>(
          <div key={o._id} className='admin-order-card'>
            <img loading='lazy' src={o?.payscreenshot} alt="" className='admin-order-pay-image'/>
            <div className='admin-order-right'>
              <div className='admin-order-id'><strong>Order Id:-</strong> {o?._id}</div>
              <div className='admin-order-message'><strong>Call Time:-</strong> {o?.message}</div>

              <Select
                defaultValue={o?.status}
                className=''
                onChange={(value) => handleUpdate(o?._id, value)}>
                  <Option value="Call Me">Call Me</Option>
                  <Option value="Please Wait...">Please Wait...</Option>
                  <Option value="Payment Not verified">Payment Not verified</Option>
              </Select>

            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminOrder
