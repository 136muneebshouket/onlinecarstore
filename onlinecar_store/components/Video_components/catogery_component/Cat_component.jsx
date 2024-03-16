import React, { useState, useEffect } from "react";
import axios from "axios";
import Context from "@/components/processing_functions/context";
import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import useSWR from "swr";

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

const Cat_component = ({ catgry }) => {
  const { message, setMessage } = useContext(Context);
  const [loading, setLoading] = useState(false);
  // const [videos, setVideos] = useState([]);

  const { data, error, isLoading } = useSWR(
    `/api/admin/utube/getvideos?catogery=${catgry}&limit=6`,
    (url) => axios.get(url).then((res) => res.data.payload)
  );

  if (error) {
    setMessage({ success: false, msg: error.response.data.message });
  }

  // useEffect(() => {
  //   getvideos();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [catgry]);
  // async function getvideos() {
  //   if(catgry){
  //     setLoading(true);
  //     try {
  //       await axios
  //         .get(`/api/admin/utube/getvideos?catogery=${catgry}&limit=6`)
  //         .then(async (res) => {
  //           // console.log(res.data.payload)
  //           if (res.data.payload) {
  //             await setVideos(res.data.payload.data);
  //             //    console.log(videos)
  //             setLoading(false);
  //           }
  //         })
  //         .catch((err) => {
  //           setMessage({ success: false, msg: err.response.data.message });
  //           console.error(err.response.data.message);
  //           setLoading(false);
  //         });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  // }

  return (
    <>
      {isLoading ? (
        <FullLoader />
      ) : (
        <>
          <div className="component_container">
            <div className="container">
              <h3>{catgry}</h3>
              <div className="flex_cntaner_ifrmes">
                {data?.data?.map((video) => {
                  return (
                    <>
                      <div key={video._id} className="card succes">
                        <Link href={`/videos_page/Videos?video_id=${video?._id}`}>
                          <div className="img_div">
                            <span className="play_icon">
                              {" "}
                              <span>&#9658;</span>
                            </span>
                            <img
                              loading="lazy"
                              src={video?.image?.img_url}
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
        </>
      )}
    </>
  );
};

export default Cat_component;
