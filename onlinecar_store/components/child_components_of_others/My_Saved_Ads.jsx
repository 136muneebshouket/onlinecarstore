import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

import { useSession, signOut } from "next-auth/react";
import axios from "axios";
import price_converter from "@/components/processing_functions/Price_calculator";

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

const My_fav_ads = () => {
  const [cardata, setCarData] = useState([]);
  const [loadiing, setLoadiing] = useState(false);

  useEffect(() => {
    getcarts();
  }, []);

  async function getcarts() {
    let carts = await JSON.parse(localStorage.getItem("carts"));
    if (carts && carts.length > 0) {
      // console.log(carts)
      setLoadiing(true);
      await axios
        .get(`/api/usercarts/?carts=${carts}`)
        .then((res) => {
          console.log(res.data.payload);
          setCarData(res.data.payload);
          setLoadiing(false);
        })
        .catch((err) => {
          console.log(err);
          setLoadiing(false);
        });
    }
  }

  return (
    <>
      <div className="main_ads_section">
        <div className="my_Ads_section">
          {cardata.map((obj, i) => {
            return (
              <>
                {/* <Link className="singlecar_link" href="#"> */}
                <div
                  key={i}
                  className="singlecar"
                  style={{
                    border: "1px solid rgb(216, 216, 216)",
                    padding: "4px",
                    boxShadow: "0 0 11px rgba(0,0,0,0.1)",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <div className="car_img">
                      <Image
                        src={
                          obj.images_url[0].img_url
                            ? obj.images_url[0].img_url
                            : obj.images_url[0]
                        }
                        width={200}
                        height={200}
                        alt="loading"
                      />
                    </div>
                    <div className="car_info">
                      <div
                        className="car_content"
                        style={{ textAlign: "left" }}
                      >
                        <Link
                          href={`/used_cars/car/${obj.brand.replaceAll(
                            " ",
                            "-"
                          )}-${obj.model.replaceAll(" ", "-")}-${
                            obj.modelyear
                          }-${obj._id}`.toLowerCase()}
                          // target="_blank"
                        >
                          <h3>
                            {obj.brand} {obj.model}{" "}
                            {obj.variant_name && obj.variant_name}{" "}
                            {obj.modelyear}
                          </h3>
                        </Link>
                        <p className="price_mbv">
                          <strong>PKR:{price_converter(obj.price)}</strong>
                        </p>

                        <p>{obj.city}</p>
                        <div>
                          <span>{obj.Mileage} km</span>
                          <span>{obj.enginecc}cc</span>
                          <span className="hide_in_mbv">
                            {obj.transmission}
                          </span>
                          <span className="hide_in_mbv">{obj.enginetype}</span>
                        </div>
                      </div>
                      <div className="car_price_section">
                        <div className="car_price_fav">
                          <h3>{price_converter(obj.price)}</h3>
                          {/* <i className="bx bx-heart"></i> */}
                        </div>
                        {/* <div className="phone_num">
                          <button>Show Phone No.</button>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  {/* <div className="edit_or_del_btns">
                      <button style={{ background: "#3083d1" }}>
                        {" "}
                        <Link href={`/users/edit_myad/${obj._id}`}>Update</Link>
                      </button>
                      <button
                        style={{ background: "#b40000" }}
                        onClick={()=>{handleOpenModal(obj)}}
                      >
                        Delete
                      </button>
                    </div> */}
                </div>
              </>
            );
          })}
          {}
          {cardata.length == 0 && (
            <>
              <h5>No Active Ads</h5>
            </>
          )}
        </div>
      </div>
      {loadiing ? <FullLoader /> : <></>}
    </>
  );
};

export default My_fav_ads;
