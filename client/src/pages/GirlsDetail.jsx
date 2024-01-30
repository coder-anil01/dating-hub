import React, { useEffect, useState } from 'react'
import '../style/GirlDetail.css'
import axios from 'axios'
import Qrpayment from '../media/paymentqr.png'
import { Modal } from 'antd';
import {FaUser, FaLock} from 'react-icons/fa'
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const GirlsDetail = () => {

  const params = useParams();
  const productid = params?.id;

  const [girl, setGirl] = useState([]);
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [payscreenshot, setPayscreenshot] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userCreateModel, setUserCreateModel] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

const vpa = '6203493183@axl';
const amount = '10';
const transactionId = '123456789';
const name = 'John Doe'; 
const description = 'Payment for Product X';

  const upiLink = `upi://pay?pa=${encodeURIComponent(vpa)}&pn=${encodeURIComponent(name)}&mc=yourMerchantCode&tid=${encodeURIComponent(transactionId)}&tr=${encodeURIComponent(transactionId)}&tn=${encodeURIComponent(description)}&am=${amount}&cu=INR&url=https://your-callback-url.com`;

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getProfile = async() => {
    try {
      const {data} = await axios.get(`/api/v1/girl/get/${productid}`);
      setGirl(data.girl)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getProfile();
  },[])

  const handleCreateUser = async(e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post('/api/v1/user/create', {username, password});
      if(data?.user){
        setUserCreateModel(false);
        localStorage.setItem("token", data?.token)
        localStorage.setItem("user", JSON.stringify(data?.user))
        handleOrder();
        setUsername('');
        setPassword('');
      }else{
        toast.info(data.message)
      }
    } catch (error) {
      toast.error("Somthing Went Wrong")
    }
  }

  const handleImageChange = (event) => {
    const file = (event.target.files[0])
    const render = new FileReader();
    if(file){
      render.readAsDataURL(file);
      render.onload = () => {
        console.log(render.result)
        setPayscreenshot(render.result)
      }
    }
  };

  const handleOrder = async(e) => {
    e.preventDefault();
    try {
      const jsonuser = await localStorage.getItem("user");
      const user = JSON.parse(jsonuser);
      if(!jsonuser){
        return setUserCreateModel(true);
      }
      const {data} = await axios.post('/api/v1/order/create', {user: user?._id, product: productid, price: girl?.price, message, payscreenshot})
    } catch (error) {
      
    }
  }

  return (
    <>
    <div className='girl-detail'>
      <div className='girl-detail-continer'>
        <div className='girl-detail-destop-images'></div>
        <div className='girl-detail-left'>
          <img className='girl-detail-b-image' src={image ? image : girl?.image} alt="" />
          <div className='girl-detail-images'>
            <img className='girl-detail-sm-image' src={girl.image} onClick={()=> setImage(girl.image)} alt="" />
            <img className='girl-detail-sm-image' src={girl?.images?.[0]} onClick={()=> setImage(girl?.images?.[0])} alt="" />
            <img className='girl-detail-sm-image' src={girl?.images?.[1]} onClick={()=> setImage(girl?.images?.[1])} alt="" />
            <img className='girl-detail-sm-image' src={girl?.images?.[2]} onClick={()=> setImage(girl?.images?.[2])} alt="" />
          </div>
        </div>
        <div className='girl-detail-right'>
          <h3>@{girl?.username}</h3>
          <div className='girl-detail-price'>Rs:- {girl?.price}/One Time</div>
          <div className='girl-detail-des-tag'>★》 में आपको ऑनलाइन शारीरिक संतुष्टि दूंगी</div>
          <div className='girl-detail-des-tag' >★》 सबकुछ खोल कर दिखाऊॅगी</div>
          <div className='girl-detail-des-tag' >★》 में आपको पूरा खुश दूंगी</div>

          <div>
            <button className='girl-detail-payment-button'>
              <a href={upiLink} rel='noopener noreferrer'> UPI - Pay {girl?.price}</a>
              {/* <a href={`upi://pay?pa=6203283183@axl&pn=Date_hub&am=${girl?.price}&cu=INR`} rel='noopener noreferrer'> UPI - Pay {girl?.price}</a> */}
            </button>
            <div className='girl-detail-payment-or-container'>
              <div className='girl-detail-payment-or'>or</div>
            </div>
            <button className='girl-detail-payment-button-qr' onClick={() => setIsModalOpen(true)}>QR CODE</button>
          </div>

          <form onSubmit={handleOrder} className='girl-detail-order'>
          <div className='girl-detail-payment-input-lable'>Send Payment ScreenSort *</div>
            <input type="file"
              className='girl-detail-payment-input'
              onChange={handleImageChange}
              required />

            <input type="text"
              className='girl-detail-payment-input'
              onChange={(e)=> setMessage(e.target.value)}
              placeholder='Set Video Call Time'
              />
            <button type='submit' className='girl-detail-book'>Book Girl</button>
          </form>
        </div>
    </div>
    </div>
    <Modal title="QR CODE" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false}>
      <img className='girl-detail-payment-qr' src={Qrpayment} alt="" />
    </Modal>

{/* CREATE USER */}
    <Modal title="Create Account" open={userCreateModel} onOk={handleCreateUser} onCancel={handleCancel}>
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

    </Modal>
    </>
  )
}

export default GirlsDetail
