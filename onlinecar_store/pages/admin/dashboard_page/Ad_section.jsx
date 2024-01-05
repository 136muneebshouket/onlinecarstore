import React, { useState, useEffect, useRef,useContext } from "react";
import Context from "@/components/processing_functions/context";
import price_converter from "@/components/processing_functions/Price_calculator";
import Image from "next/image";
import Reject_ad_modal from "@/components/Modals/admin/Reject_ad_modal";
import axios from "axios";

const Ad_section = ({ single_ad_data ,reset}) => {
  const { message, setMessage } = useContext(Context);
  const [features, setFeatures] = useState([]);
  const [images, setImages] = useState([]);
  const [reject_modal, setReject_modal] = useState(false);

  useEffect(() => {
    if (single_ad_data) {
      setFeatures(single_ad_data.carfeatures);

      setImages(
        single_ad_data.images_url.map((x) => {
          delete x.img_id;
          return x.img_url;
        })
      );
    }
  }, [single_ad_data]);

  const [index, setIndex] = useState(0);
  const slideimg = (slide) => {
    if (slide == "left") {
      // console.log("left");
      if (index > 0) {
        setIndex(index - 1);
      }
    }
    if (slide == "right") {
      if (index < images.length - 1) {
        // console.log("right");
        setIndex(index + 1);
      }
    }
  };

  async function approve_add() {
    // reset()
    setMessage({ loader: true });
    let admin_token = JSON.parse(localStorage.getItem('admin_token'))
    let data={
      Ad_id:single_ad_data._id,
      admin_token
    }

    await axios.post(`/api/admin/Ad_approval/review_ad/approve_ad`,data)
    .then((res) => {
      setMessage({ loader: false });
      setMessage({ success: true, msg: res.data.msg });
      reset()
    }).catch((err) => {
      setMessage({ loader: false });
      setMessage({ success: false, msg: err.response.data.msg });
    });
  }

  return (
    <>
      <div className="singlecar_page">
        <div className="car_section" style={{ width: "100%" }}>
          <div className="car_upper_section">
            <div className="car_title" style={{ padding: "10px" }}>
              <h1 style={{ color: "#223C7A", marginBottom: "5px" }}>
                {single_ad_data.brand} {single_ad_data.model}{" "}
                {single_ad_data.variant_name} {single_ad_data.modelyear}
              </h1>
              <span style={{ color: "#223C7A" }}>
                <i className="bx bxs-location-plus"></i>&nbsp;
                {single_ad_data.city}
              </span>
            </div>
            <div className="img_section">
              {images.map((url, i) => {
                return (
                  <>
                    {/* <div style={{width:'100%'}}> */}
                    <Image
                      key={i}
                      style={{ translate: `${-100 * index}%` }}
                      src={url}
                      alt="loading"
                      loading="lazy"
                      width={100}
                      height={100}
                      unoptimized={true}
                      priority={false}
                    />
                    {/* </div> */}
                  </>
                );
              })}

              <i
                onClick={() => {
                  slideimg("left");
                }}
                style={{ transform: `rotate(90deg)` }}
                className="bx bx-chevron-down left_arrow"
              ></i>
              <i
                onClick={() => {
                  slideimg("right");
                }}
                style={{ transform: `rotate(270deg)` }}
                className="bx bx-chevron-down right_arrow"
              ></i>
            </div>
            <h2
              style={{
                color: "#223C7A",
                padding: "10px",
                fontFamily: "monospace",
                display: "block",
              }}
            >
              PKR: {price_converter(single_ad_data.price)}
            </h2>
          </div>
          <div className="car_specs">
            <div className="single_spec">
              <i className="bx bxs-calendar"></i>
              <p>{single_ad_data.modelyear}</p>
            </div>
            <div className="single_spec">
              <i className="bx bx-tachometer"></i>
              <p>
                {single_ad_data.Mileage} <span>km</span>
              </p>
            </div>
            <div className="single_spec">
              <i className="bx bxs-gas-pump"></i>
              <p>{single_ad_data.enginetype}</p>
            </div>
            <div className="single_spec">
              <i className="bx bx-wrench"></i>
              <p>{single_ad_data.transmission}</p>
            </div>
          </div>
          <h2>Specifications</h2>
          <div className="car_details">
            <div className="single_detail">
              <span>Registered In</span>
              <span>{single_ad_data.Registered_In}</span>
            </div>
            <div className="single_detail">
              <span>Assembly</span>
              <span>{single_ad_data.Assembly}</span>
            </div>
            <div className="single_detail">
              <span>Color</span>
              <span>{single_ad_data.color}</span>
            </div>
            <div className="single_detail">
              <span>Engine Capacity</span>
              <span>{single_ad_data.enginecc}cc</span>
            </div>
            <div className="single_detail">
              <span>Last Updated:</span>
              <span>Aug 26, 2023</span>
            </div>
          </div>
          <div className="car_features">
            <h2>Car features</h2>
            <div className="features">
              {features.map((v, i) => {
                return (
                  <>
                    <p key={i}>{v}</p>
                  </>
                );
              })}
            </div>
          </div>
          <div className="car_comments">
            <h2>Seller's Comments</h2>
            <p>{single_ad_data.comments}</p>
          </div>
        </div>
      </div>
      <div className="reject_approve" style={{ display: "flex" }}>
        <button
          className="reject_btn"
          onClick={() => {
            setReject_modal(true);
          }}
          style={{ background: "#cb0000" }}
        >
          reject
        </button>
        <button className="approve_btn" style={{ background: "#006d00" }}
        onClick={approve_add}>
          approve
        </button>
      </div>

      {reject_modal ? (
        <Reject_ad_modal
          onClose={() => {
            setReject_modal(false);
            reset()
          }}
          Ad_id={single_ad_data._id}
          SellerEmail ={single_ad_data.seller_email}
        />
      ):null}
    </>
  );
};

export default Ad_section;
