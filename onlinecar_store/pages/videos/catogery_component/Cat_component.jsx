import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

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

const cat_component = ({ catgry }) => {
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getvideos();
  }, []);
  async function getvideos() {
    setLoading(true);
    try {
      await axios
        .get(`/api/admin/utube/getvideos?catogery=${catgry}&limit=6`)
        .then(async (res) => {
          // console.log(res.data.payload)
          if (res.data.payload) {
            await setVideos(res.data.payload.data);
            //    console.log(videos)
            setLoading(false);
          }
        })
        .catch((err) => {
          console.error(err.response.data.message);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="component_container">
        <div className="container">
          <h3>{catgry}</h3>
          <div className="flex_cntaner_ifrmes">
            {videos.map((video) => {
              return (
                <>
                  <div key={video._id} className="card succes">
                    <Link href={`#`}>
                      <div className="img_div">
                        <span className="play_icon">&#10148;</span>
                        <img
                          loading="lazy"
                          src={video.image}
                          alt="loading"
                        />
                      </div>
                      <p>{video.title}</p>
                    </Link>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
      {loading ? <FullLoader /> : <></>}
    </>
  );
};

export default cat_component;
