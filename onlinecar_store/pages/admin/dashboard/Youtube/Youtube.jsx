import React, { useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import Context from "@/components/processing_functions/context";
import { useContext } from "react";


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
  const [video, setVideo] = useState({
    title: "",
    source: "",
    description: "",
    catogery: "",
    image: "",
    priority: 0,
  });

  async function uploadvideo(e) {
    e.preventDefault();
    setLoading(true)
    let admin_token = JSON.parse(localStorage.getItem('admin_token'))
    let body={
        video,
        admin_token
    }
    // console.log(video);
    await axios.post('/api/admin/utube/uplod_video',body)
    .then((res)=>{
      // console.log(res)
        setLoading(true)
        setMessage({success:true,msg:res?.data.message}); 
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
              type="text"
              value={video.image}
              onChange={(e) => {
                setVideo((s) => ({ ...s, image: e.target.value }));
              }}
            />
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
