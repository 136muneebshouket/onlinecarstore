import React, { memo, useState, useEffect } from "react";
import Context from "@/components/processing_functions/context";
import { useSession, signOut } from "next-auth/react";
import dynamic from "next/dynamic";
import axios from "axios";
import { useRouter } from "next/router";
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

const Favourites = ({ car_id }) => {
  const [exist, setExist] = useState(false);

  async function check_in_fav() {
    try {
      let carts = await JSON.parse(localStorage.getItem("carts"));
      if (!carts) {
        return;
      }
      if (carts.includes(car_id)) {
        setExist(true);
      }else{
        setExist(false);
      }
    } catch (error) {
      console.log("not any carts");
    }
  }
  useEffect(() => {
    check_in_fav();
  }, []);
  // console.log(car_id)
  const router = useRouter();
  const { data: sessionData } = useSession();
  const { message, setMessage } = useContext(Context);

  const [loading, setLoading] = useState(false);

  const addto_favorites = async () => {
    let userid = sessionData?.user._id;
    if (!userid) {
      setMessage({ success: false, msg: "you need to login first" });
      setTimeout(() => {
        router.push("/authentication/Login");
      }, 1000);
      return;
    }
    if (!car_id) {
      setMessage({ success: false, msg: "somethings wrong" });
      return;
    }
    // let obj = {
    //    userid,
    //   cartItems: [{ product: car_id }],
    // };
    try {
      let carts = await JSON.parse(localStorage.getItem("carts"));
      if (!carts) {
        localStorage.setItem("carts", JSON.stringify([]));
        let newcart = await JSON.parse(localStorage.getItem("carts"));
        newcart.push(car_id);
        localStorage.setItem("carts", JSON.stringify(newcart));
        check_in_fav()
        setMessage({ success: true, msg: 'added to cart' });
      }
      if (carts) {
        if (carts.includes(car_id)) {
         let filter_carts =  carts.filter((v)=>{return v !== car_id})
         localStorage.setItem("carts", JSON.stringify(filter_carts));
          setMessage({ success: true, msg: 'removed from favourites' });
          check_in_fav()
          return;
        }else{
          carts.push(car_id);
          localStorage.setItem("carts", JSON.stringify(carts));
          setMessage({ success: true, msg: 'added to cart' });
          check_in_fav()
        }
    
      }
    } catch (error) {}

    // setLoading(true);
    // await axios
    //   .post("/api/addto_favourites/Ad_to_fav", obj)
    //   .then((res) => {
    //     setLoading(false);
    //     // console.log(res?.data.message)
    //     setMessage({ success: true, msg: res?.data.message });
    //   })
    //   .catch((err) => {
    //     setLoading(false);
    //     // console.log(err?.response?.data.message)
    //     setMessage({ success: false, msg: err?.response?.data.message });
    //   }).finally(()=>{
    //     setLoading(false);
    // });
  };
  return (
    <>
      <i
        style={ {color:`${exist ? '#ff5642' : 'rgb(45, 45, 45)'}`}}
        onClick={() => {
          addto_favorites();
        }}
        className="bx bxs-heart"
      ></i>

      {loading ? <FullLoader /> : <></>}
    </>
  );
};

export default memo(Favourites);
