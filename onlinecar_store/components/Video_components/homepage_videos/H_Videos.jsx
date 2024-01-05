import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from "react";
import Context from "@/components/processing_functions/context";
import axios from "axios";
import Link from "next/link";
import useSWR from "swr";

const H_Videos = () => {
  const { message, setMessage } = useContext(Context);

  const { data, error, isLoading } = useSWR(
    `/api/admin/utube/getvideos?catogery=Expert Reviews&limit=3`,
    (url) => axios.get(url).then((res) => res.data.payload)
  );
  const [videos, setVideos] = useState([]);

  useMemo(() => {
    // console.log(data?.data)
    if(data){
      setVideos(data?.data)
    }
    // getvideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // async function getvideos() {

  //   setMessage({loading:true});
  //     try {
  //       await axios
  //         .get(`/api/admin/utube/getvideos?catogery=Expert Reviews&limit=3`)
  //         .then(async (res) => {
  //           // console.log(res.data.payload)
  //           if (res.data.payload) {
  //             await setVideos(res.data.payload.data);
  //               // console.log(res.data.payload.data)
  //             setMessage({loading:false});
  //           }
  //         })
  //         .catch((err) => {
  //           setMessage({ success: false, msg: err.response.data.message });
  //           console.error(err.response.data.message);
  //           setMessage({loading:false});
  //         });
  //     } catch (error) {
  //       console.log(error);
  //     }

  // }
  // console.log(videos)

  return (
    <>
      {isLoading && (
        <>
          <h2>Loading...</h2>
        </>
      )}
      {error && (
        <>
          <h2>Somethings wrong in Videos fetching</h2>
        </>
      )}
      {videos.length > 0 && (
        <>
          <div className="home_videos_sec">
            <div className="first_div">
              <div className="v_link">
                <div className="card succes">
                  <Link href={`/videos_page/Videos?video_id=${videos[0]?._id}`}>
                    <div className="img_div">
                      <span className="play_icon">
                        {" "}
                        <i>&#10148;</i>
                      </span>
                      <img
                        loading="lazy"
                        src={videos[0]?.image}
                        alt="loading"
                      />
                    </div>
                    <p>{videos[0]?.description}</p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="second_div">
              <div className="v_link">
                <div className="card succes">
                  <Link href={`/videos_page/Videos?video_id=${videos[1]?._id}`}>
                    <div className="img_div">
                      <span className="play_icon">
                        {" "}
                        <i>&#10148;</i>
                      </span>
                      <img
                        loading="lazy"
                        src={videos[1]?.image}
                        alt="loading"
                      />
                    </div>
                    <p>{videos[1]?.description}</p>
                  </Link>
                </div>
              </div>
              <div className="v_link">
                <div className="card succes">
                  <Link href={`/videos_page/Videos?video_id=${videos[2]?._id}`}>
                    <div className="img_div">
                      <span className="play_icon">
                        {" "}
                        <i>&#10148;</i>
                      </span>
                      <img
                        loading="lazy"
                        src={videos[2]?.image}
                        alt="loading"
                      />
                    </div>
                    <p>{videos[2]?.description}</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default H_Videos;
