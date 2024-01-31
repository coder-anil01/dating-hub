import '../../style/VideoCall.css'
import React, { useState } from 'react'
import Video from '../../media/video.mp4'
import { MdCallEnd, MdOutlineVideocamOff } from "react-icons/md";
import { FaVolumeMute } from "react-icons/fa";
import { IoMicOff } from "react-icons/io5";
import Webcam from 'react-webcam';

const VideoCall = (props) => {
  const data = false
  const handleSend =() =>{
    props.handleSend(data)
  }
  const[videoShow, setVideoShow] = useState(false);
  setTimeout(()=>{
    setVideoShow(true)
  },5000)
  return (
    <div className='videocall'>
      {videoShow ? <video autoPlay='true' muted loop onLoad={'Internate slow'} preload='auto' className='videocall-video'>
        <source src={Video} type="video/mp4"/>
    </video> : <div className='videocall-video videocall-ringing'>Ringing...</div>}
    <Webcam className='videocall-my-video' audio={false}/>
    <div className='videocall-icon-container'>
        <div className='videocall-icon'><MdOutlineVideocamOff /></div>
        <div className='videocall-icon-callend' onClick={handleSend}><MdCallEnd /></div>
        <div className='videocall-icon' ><IoMicOff /></div>
    </div>
    </div>
  )
}

export default VideoCall
