import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";
import dynamic from "next/dynamic";
import Messages from "@/components/child_components_of_others/user/chat/Messages";
import Context from "@/components/processing_functions/context";
// import { totalwork } from "@/components/processing_functions/progress";

import { useContext } from "react";

// const FullLoader = dynamic(
//   () => import("@/components/Modals/Loader/FullLoader"),
//   {
//     loading: () => (
//       <div className="loder">
//         <h2>Loading...</h2>
//       </div>
//     ),
//   }
// );

// const fetcher = (url) => axios.get(url).then((res) => res.data.payload);

const slug = () => {
  const router = useRouter();
  const { message, setMessage } = useContext(Context);
  let ad_id = router.asPath.split("/")[router.asPath.split("/").length - 1];
  //  console.log(ad_id)
  const [Ad, setAD] = useState();

  // const { data, error, isLoading } = useSWR(
  //   ad_id ? `/api/usercarts/?carts=${ad_id}` : null,
  //   fetcher
  // );
  // useMemo(() => {
  //   if (data) {
  //     setAD(data[0]);
  //   }
  // }, [data]);

  useEffect(() => {
    getad();
  }, [ad_id]);

  async function getad() {
    if (ad_id) {
      // console.log(ad_id)
      setMessage({ loader: true });
      await axios
        .get(`/api/usercarts/?carts=${ad_id}`)
        .then((result) => {
          setMessage({ loader: false });
          // console.log(result.data.payload)
          setAD(result.data.payload[0]);
        })
        .catch((err) => {
          setMessage({ loader: false });
          // console.log(err.response.data.message)
          setMessage({ success: false, msg: err.response.data.message });
        });
    }
  }
  // console.log(Ad)

  return (
    <>
      {/* {isLoading && <FullLoader />}

      {error ? (
        <>
          <h2>Something went wrong</h2>
        </>
      ) : null} */}

      {Ad ? (
        <div className="chatpage">
          <nav>
            <div className="cardata">
              <Image
                src={Ad?.images_url[0]?.img_url}
                unoptimized={true}
                width={50}
                height={50}
                alt="loading"
              />
              <div className="name">
                {Ad?.brand} {Ad?.model} {Ad?.variant_name}
              </div>
            </div>
            <div className="arrow">
              <i className="bx bx-chevron-left"></i>
            </div>
          </nav>
          <Messages Ad={Ad} />
        </div>
      ) : null}

      {/* <h1>Chats</h1> */}
    </>
  );
};

export default slug;
