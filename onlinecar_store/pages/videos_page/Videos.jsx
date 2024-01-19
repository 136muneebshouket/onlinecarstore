// import React from "react";
import React,{useState,useEffect,useContext} from 'react'
import Context from '@/components/processing_functions/context';
import axios from 'axios';
import Link from 'next/link'
import Cat_component from "@/components/Video_components/catogery_component/Cat_component";
import { useRouter } from 'next/router';
import useSWR from 'swr';


const fetcher = (url) => axios.get(url).then((res) => res.data.payload);

const Videos = () => {
  const router = useRouter()
  const { message, setMessage } = useContext(Context);
  // const [videos, setVideos] = useState([]);

  // console.log(router.query.video_id)
  const { data, error, isLoading } = useSWR(router.query?.video_id ? `/api/admin/utube/getvideos?videoId=${router.query?.video_id}&limit=1` : `/api/admin/utube/getvideos?limit=1`,fetcher);

  if(isLoading){
    setMessage({loading:true})
  }
  // if(data){
  //   // console.log(data)
  // }
  
  
  return (
    <>
      <div className="main_videos">
        <div className="videos_header">
          <div className="container">
            <h1>Carselection Videos</h1>
            <div className="search_bar">
              <input type="text" />
              <button>search</button>
            </div>
          </div>
        </div>
        <div className="iframe_section">
          <div className="container">
          <iframe
                className="main_iframe"
                src={data?.data[0]?.source}
                title={`${data?.data[0]?.title}| CarSelection`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
          </div>
        </div>
        <Cat_component catgry={"Owner's Reviews"}/>
        {/* <Cat_component catgry={"Success Stories"}/> */}
        <Cat_component catgry={"Expert Reviews"}/>
      </div>
    </>
  );
};

export default Videos;
