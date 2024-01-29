import React, { useEffect, useState } from 'react'
import '../style/GirlDetail.css'
import axios from 'axios'
import Qrpayment from '../media/paymentqr.png'
import { Modal } from 'antd';

const GirlsDetail = () => {

  const [girl, setGirl] = useState([]);
  const [image, setImage] = useState("")
  const [paymentScreenShort, setPaymentScreenShort] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getProfile = async() => {
    try {
      const {data} = await axios.get(`http://localhost:8000/api/v1/girl/get/65b706982a69583b73f2611b`);
      setGirl(data.girl)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getProfile();
  },[])

  const handleOrder = () => {
    try {
      
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
              <a href={`upi://pay?pa=6203283183@axl&pn=Date_hub&am=${girl?.price}&cu=INR`} rel='noopener noreferrer'> UPI - Pay {girl?.price}</a>
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
              onChange={setPaymentScreenShort}
              required />
            <button type='submit' className='girl-detail-book'>Book Girl</button>
          </form>
        </div>
    </div>
    </div>
    <Modal title="QR CODE" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false}>
      <img className='girl-detail-payment-qr' src={Qrpayment} alt="" />
    </Modal>
    </>
  )
}

export default GirlsDetail
