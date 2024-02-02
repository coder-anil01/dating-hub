import axios from "axios";
import React, { useEffect, useState } from "react";
import { FcVideoCall } from "react-icons/fc";
import "../../style/MyOrder.css";
import VideoCall from "./VideoCall";
import { toast } from "react-toastify";

const MyOrder = () => {
  const userjson = localStorage.getItem("user");
  const user = JSON.parse(userjson);
  const [orders, setOrders] = useState([]);
  const [videocall, setVideocall] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`/api/v1/order/get/${user?._id}`);
      setOrders(data?.orders);
      console.log(data?.orders);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const receiveDataFromChild = (data) => {
    setVideocall(data);
  };

  const startVideoCall = (status, videourl) => {
    const slik = status.slice(0, 7);
    if (slik === "Call Me") {
      return setVideocall(true);
    } else {
      toast.info(status);
    }
  };

  return (
    <>
      <div className="order">
        <div className="order-container">
          {orders?.map((o) => (
            <div key={o._id} className="order-card">
              <img
                loading="lazy"
                src={o?.product?.image}
                alt=""
                className="order-image"
              />
              <div className="order-right">
                <div className="order-id">
                  <strong>Order Id:-</strong> {o?._id}
                </div>
                <div className="order-message">::-- {o?.status}</div>
                <div
                  className="order-videocall-icon"
                  onClick={() => {
                    startVideoCall(o?.status);
                    setVideoUrl(o?.product?.videourl);
                  }}
                >
                  <FcVideoCall />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {videocall && (
        <VideoCall handleSend={receiveDataFromChild} videoUrl={videoUrl} />
      )}
    </>
  );
};

export default MyOrder;
