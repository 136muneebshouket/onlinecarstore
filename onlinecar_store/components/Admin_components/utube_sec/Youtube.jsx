import React, { useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import Context from "@/components/processing_functions/context";
import { useContext , useRef } from "react";
import Image from "next/image";


const FullLoader = dynamic(
  () => import("@/components/Modals/Loader/FullLoader"),
  {
    loading: () => (
      <div className="loder">
        <h2>Loading...</h2>
      </div>
    ),
  }
);

const Youtube = () => {
    const { message, setMessage } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState();
  const fileInputRef = useRef(null);
  let initial_obj ={ title: "",
  source: "",
  description: "",
  catogery: "",
  priority: 0,}

  const [video, setVideo] = useState(initial_obj);

  async function main_img_handler(event) {
    setMessage({ loader: true });
    const file = event.target.files[0];
    // console.log(file);
    try {
      const promises = [];
      if (file.size > 4 * 1024 * 1024) {
        setMessage({
          success: false,
          msg: "Image size should not exceed 4MB. Upload your Image again",
        });
        return;
      }

      // Read the selected image and convert it to a Data URL
      const reader = new FileReader();

      const promise = new Promise((resolve) => {
        reader.onload = (e) => {
          setImg({ img_url: e.target.result, filename: file.name });
          resolve();
        };
      });

      reader.readAsDataURL(file);
      promises.push(promise);
      await Promise.all(promises);
      setMessage({ loader: false });
    } catch (error) {
      setMessage({ loader: false });
      setMessage({
        success: false,
        msg: error.message,
      });
    }
    setMessage({ loader: false });
    // Clear the file input after image selection
    fileInputRef.current.value = null;
  }


// console.log(video.image) 

  async function uploadvideo(e) {
    e.preventDefault();
    setLoading(true)
    let admin_token = JSON.parse(localStorage.getItem('admin_token'))
    let body={
        video,
        admin_token,
        img
    }
    // console.log(video);
    await axios.post('/api/admin/utube/uplod_video',body)
    .then((res)=>{
      // console.log(res)
        setLoading(true)
        setMessage({success:true,msg:res?.data.message}); 
        setVideo(initial_obj)
        setImg(null)
    }).catch((err)=>{
      console.log(err)
        setLoading(true)
        setMessage({success:false,msg:err?.response?.data.message});
    })
    setLoading(false)
  }
  return (
    <>
      <div className="utubeupload">
        <h3 style={{ textAlign: "center" }}>Upload Youtube videos </h3>
        <form onSubmit={uploadvideo}>
          <div className="input_label">
            <label htmlFor="">Add Title of Video</label>
            <input
              type="text"
              value={video.title}
              onChange={(e) => {
                setVideo((s) => ({ ...s, title: e.target.value }));
              }}
            />
          </div>
          <div className="input_label">
            <label htmlFor="">Add Source of video</label>
            <input
              type="text"
              value={video.source}
              onChange={(e) => {
                setVideo((s) => ({ ...s, source: e.target.value }));
              }}
            />
          </div>
          
         
          <div className="input_label">
            <label htmlFor="">Add image (url) of video</label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={main_img_handler}
              accept="image/*"
            />
            {img?.img_url ?  <div className="video_img">
            <Image src={img?.img_url} width={300} height={200} unoptimized={true} alt="videopreview"/>
          </div> : null}
          </div>
          <div className="input_label">
            <label htmlFor="">Description</label>
            <input
              type="text"
              value={video.description}
              onChange={(e) => {
                setVideo((s) => ({ ...s, description: e.target.value }));
              }}
            />
          </div>
          <div className="input_label">
            <label htmlFor="">Priority</label>
            <input
            value={video.priority}
              type="number"
              onChange={(e) => {
                setVideo((s) => ({ ...s, priority: e.target.value }));
              }}
            />
          </div>
          <div className="input_label">
            <label htmlFor="">Catogery</label>
            <select
              name=""
              id=""
              onChange={(e) => {
                setVideo((s) => ({ ...s, catogery: e.target.value }));
              }}
            >
              <option value="" defaultValue={true}>
                Select Catogery
              </option>
              <option value="Owner's Reviews">Owner's Reviews</option>
              <option value="Success Stories">Success Stories</option>
              <option value="Expert Reviews">Expert Reviews</option>
              <option value="Car_selection Tips">Car_selection Tips</option>
              <option value="Budget Car Reviews">Budget Car Reviews</option>
              <option value="Car_selection Weekly">Car_selection Weekly</option>
              <option value="Car_selection Stories">
                Car_selection Stories
              </option>
              <option value="Car_selection Diaries">
                Car_selection Diaries
              </option>
              <option value="Car_selection Auto Parts & Accessories">
                Car_selection Auto Parts & Accessories
              </option>
              <option value="Car_selection Products & Services">
                Car_selection Products & Services
              </option>
            </select>
          </div>

          <div className="input_label ">
            <label htmlFor="">Upload Video</label>
            <button className="upload_btn" type="submit">Upload</button>
          </div>
        </form>
      </div>
      {loading ? <FullLoader /> : <></>}
    </>
  );
};

export default Youtube;
