import React, { useState, useEffect, useRef, useMemo, useContext } from "react";
import Context from "@/components/processing_functions/context";
import price_converter from "@/components/processing_functions/Price_calculator";
import Image from "next/image";
import Reject_ad_modal from "@/components/Modals/admin/Reject_ad_modal";
import useSWR from "swr";
import axios from "axios";
import Link from "next/link";
import FullLoader from "@/components/Modals/Loader/FullLoader";
import { useRouter } from "next/router";

const fetcher = (url) => axios.get(url).then((res) => res.data?.data);
const Check_ad = ({}) => {
  const router = useRouter();
  const Ad_id = router.query.Ad_id;
  const managed_ad = router.query.managed_ad;
  // console.log(Ad_id)

  const { data, error, isLoading } = useSWR(
    Ad_id ? `/api/Singlecardata/?id=${Ad_id}&managed_ad=${managed_ad ? 'true' : ''}` : null,
    fetcher
  );

  const { message, setMessage } = useContext(Context);
  const [features, setFeatures] = useState([]);
  const [images, setImages] = useState([]);
  const [reject_modal, setReject_modal] = useState(false);
  // console.log(error);

  useMemo(() => {
    if (data) {
      setFeatures(data?.carfeatures);

      setImages(
        data?.images_url.map((x) => {
          delete x.img_id;
          return x.img_url;
        })
      );
    }
  }, [data]);

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
  // console.log(error)

  return (
    <>
      <div className="Confirm_ad">
        <h1 style={{ padding: "10px 20px" }}>Check_Ad</h1>
        {isLoading ? <FullLoader /> : null}
        {error ? (
          <>
            {error?.response.status == 404 ? (
              <h1 style={{ color: "red" }}>
                Something went wrong (AD may be deleted)
              </h1>
            ) : (
              <h1 style={{ color: "red" }}>Ad not present </h1>
            )}
          </>
        ) : null}
        {data ? (
          <>
            {" "}
            <div className="singlecar_page">
              <div className="car_section" style={{ width: "100%" }}>
                <div className="car_upper_section">
                  <div className="car_title" style={{ padding: "10px" }}>
                    <h1 style={{ color: "#223C7A", marginBottom: "5px" }}>
                      {data?.brand} {data?.model} {data?.variant_name}{" "}
                      {data?.modelyear}
                    </h1>
                    <span style={{ color: "#223C7A" }}>
                      <i className="bx bxs-location-plus"></i>&nbsp;
                      {data?.city}
                    </span>
                  </div>
                  <div className="img_section">
                    {images.map((url, i) => {
                      return (
                        <>
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
                    PKR: {price_converter(data?.price)}
                  </h2>
                </div>
                <div className="car_specs">
                  <div className="single_spec">
                    <i className="bx bxs-calendar"></i>
                    <p>{data?.modelyear}</p>
                  </div>
                  <div className="single_spec">
                    <i className="bx bx-tachometer"></i>
                    <p>
                      {data?.Mileage} <span>km</span>
                    </p>
                  </div>
                  <div className="single_spec">
                    <i className="bx bxs-gas-pump"></i>
                    <p>{data?.enginetype}</p>
                  </div>
                  <div className="single_spec">
                    <i className="bx bx-wrench"></i>
                    <p>{data?.transmission}</p>
                  </div>
                </div>
                <h2>Specifications</h2>
                <div className="car_details">
                  <div className="single_detail">
                    <span>Registered In</span>
                    <span>{data?.Registered_In}</span>
                  </div>
                  <div className="single_detail">
                    <span>Assembly</span>
                    <span>{data?.Assembly}</span>
                  </div>
                  <div className="single_detail">
                    <span>Color</span>
                    <span>{data?.color}</span>
                  </div>
                  <div className="single_detail">
                    <span>Engine Capacity</span>
                    <span>{data?.enginecc}cc</span>
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
                  <p>{data?.comments}</p>
                </div>
              </div>
            </div>
          </>
        ) : null}

        {data ? (
          <>
            {" "}
            <div
              className="reject_approve"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Link href={`Start_inspection?Ad_id=${Ad_id}`}>
                <button
                  className="approve_btn"
                  style={{ background: "#006d00", width: "100%" }}
                >
                  Start Inspection
                </button>
              </Link>
            </div>
          </>
        ) : null}
        {( (Ad_id == 'null' ) && (managed_ad == 'true') ) ? (
          <>
           <div style={{margin:'20px',border:'10px solid rgb(220,220,220)',padding:'10px'}}>
           <p>** If AD is not present and Ad is Managed Ad then:</p>
            <Link href={"/admin/dashboard_page/managed-cars/Upload_ad"}>
              <button
                className="approve_btn"
                style={{ background: "#006d00", color:'white',padding:'10px 20px' }}
              >
                Upload Ad
              </button>
            </Link>
           </div>
         
          </>
        ) : null}
      </div>
    </>
  );
};

export default Check_ad;
