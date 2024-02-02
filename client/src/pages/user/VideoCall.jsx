import "../../style/VideoCall.css";
import React, { useState } from "react";
import { MdCallEnd, MdOutlineVideocamOff } from "react-icons/md";
import { IoMicOff } from "react-icons/io5";
import Webcam from "react-webcam";
import Callring from "../../media/callring.mp3";

const VideoCall = (props) => {
  const data = false;
  const handleSend = () => {
    props.handleSend(data);
  };
  const [videoShow, setVideoShow] = useState(false);
  setTimeout(() => {
    setVideoShow(true);
  }, 8500);

  return (
    <div className="videocall">
      {videoShow ? (
        <video
          autoPlay="true"
          onEnded={handleSend}
          onLoad={"Internate slow"}
          preload="auto"
          className="videocall-video"
        >
          <source src={props?.videoUrl} type="video/mp4" />
        </video>
      ) : (
        <div className="videocall-video videocall-ringing">Ringing...</div>
      )}

      <Webcam className="videocall-my-video" audio={false} />
      <div className="videocall-icon-container">
        <div className="videocall-icon">
          <MdOutlineVideocamOff />
        </div>
        <div className="videocall-icon-callend" onClick={handleSend}>
          <MdCallEnd />
        </div>
        <div className="videocall-icon">
          <IoMicOff />
        </div>
      </div>
      <audio autoPlay="autoplay">
        <source src={Callring} type="audio/mp3" />
      </audio>
    </div>
  );
};

export default VideoCall;
