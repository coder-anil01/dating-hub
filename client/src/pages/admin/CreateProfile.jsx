import '../../style/AdminCreateprofile.css'
import React, { useState, useCallback } from 'react'
import {useDropzone} from 'react-dropzone'
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from 'axios'
import { Progress } from 'antd';
import {toast} from 'react-toastify';
import AdminMenu from '../../components/AdminMenu';

const CreateProfile = () => {

    const [username, setUsername] = useState('');
    const [image, setImage] = useState([]);
    const [videourl, setVideourl] = useState('');
    const [price, setPrice] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [previmage, setPrevimage] = useState([]);

    const upload_preset = process.env.REACT_APP_upload_preset;
    const cloud_name = process.env.REACT_APP_cloud_name;

    const onDrop = useCallback((acceptedFiles) => {
      setUploadProgress(0)
      const file = acceptedFiles[0];
      if(file){
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', upload_preset);
        formData.append('folder', 'callmasti');
        const render = new FileReader();
        render.onloadend =()=>{
          setPrevimage(prev => [ ...prev, render.result]);
        };
        render.readAsDataURL(file);

        axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData, {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
            setUploadProgress(progress);
          },}
         )
        .then((response) => {
          const url = response?.data?.secure_url;
          setImage(prevData => [...prevData, url]);
        })
        .catch((error) => {
          console.error('Error uploading image to Cloudinary:', error);
        });
      }
    }, [])

      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

      const uploadProfile = async (e) => {
        e.preventDefault();
        const imagethumbnail = image[0];
        const images = [image[1], image[2], image[3]];
        try {
          const {data} = await axios.post('/api/v1/girl/create', {username, videourl, price, image:imagethumbnail, images})
          if(data.success){
            setUsername(''); setVideourl(''); setPrice(''); setPrevimage(''); setImage([]); setUploadProgress(0);
          }
        } catch (error) {
          toast.error('Internal Server Error')
        }
      }

  return (
    <div className='dashbord'>
      <div><AdminMenu/></div>
      <div className='dashbord-right'>
      <div className='admin-dashbord'>
      {/* {image} */}
      <div className='admin-profile-heading'>Add New Profile</div>
      <div className='admin-profile-add'>
        <form onSubmit={uploadProfile} className='admin-profile-form'>
          <input type="text"
              className='admin-profile-input'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="User Name"
              required />

          <input type="Number"
              className='admin-profile-input'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              required />

          <input type="text"

              className='admin-profile-input'
              value={videourl}
              onChange={(e) => setVideourl(e.target.value)}
              placeholder="Video Url"
              required />

          <div {...getRootProps()} className='image-upload-area'>
            <input {...getInputProps()} />
            { isDragActive ?
              <p>Drop Image</p> :
              <div>
              <FaCloudUploadAlt className='image-upload-icon'/> {image?.[3] ? <div>Thanks, Ab Nahi khuga</div> : <div> Drag and Drop Upload Image</div>}
              </div>}
          </div>
          <Progress percent={uploadProgress} />
          <button className='admin-profile-submit' type='submit' >Upload Profile</button>
        </form>

        <div className='admin-show-image-container'>
            <div className='admin-show-image-card'>
              <div>Thumbnail</div>
              <img className='admin-show-image' src={previmage?.[0]} alt="" />
              {image?.[0] && <Progress className='admin-process-bar' percent={100} />}
              
            </div>
            <div className='admin-show-image-card'>
            <div>1st images</div>
              <img className='admin-show-image' src={previmage?.[1]} alt="" />
              {image?.[1] && <Progress className='admin-process-bar' percent={100} />}
            </div>
            <div className='admin-show-image-card'>
              <div>2nd images</div>
              <img className='admin-show-image' src={previmage?.[2]} alt="" />
              {image?.[2] && <Progress className='admin-process-bar' percent={100} />}
            </div>
            <div className='admin-show-image-card'>
              <div>3rd images</div>
              <img className='admin-show-image' src={previmage?.[3]} alt="" />
              {image?.[3] && <Progress className='admin-process-bar' percent={100} />}

            </div>
        </div>
      </div>
    </div>
      </div>
    </div>

    
  )
}

export default CreateProfile
