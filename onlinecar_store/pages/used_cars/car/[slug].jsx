import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

import Link from "next/link";
import Sellerdetails from "./Sellerdetails_box/Sellerdetails";
import Contact_details from "./price_and_phone/Contact_details";
import Reporting_add from "./report_add/Reporting_add";
import dynamic from "next/dynamic";

import price_converter from "@/components/processing_functions/Price_calculator";

const FullLoader = dynamic(
  () => import("@/components/Modals/Loader/FullLoader"),
  {
    loading: () => <div className="loder"><h2>Loading...</h2></div>,
  }
);

const slug = ({ carrdata,loadiing }) => {
  // const [car, setCar] = useState({});
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(loadiing);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (carrdata) {
      setFeatures(carrdata.carfeatures);

      setImages(
        carrdata.images_url.map((x) => {
          delete x.img_id;
          return x.img_url;
        })
      );
    }
  }, [carrdata]);
  // console.log(images)
  // const [features, setFeatures] = useState([
  //   "ABS",
  //   "Air Bags",
  //   "Air Conditioning",
  //   "Alloy Rims",
  //   "AM/FM Radio",
  //   "CD Player",
  //   "Cassette Player",
  //   "Cool Box",
  //   "Cruise Control",
  //   "Climate Control",
  //   "DVD Player",
  //   "Front Speakers",
  //   "Front Camera",
  //   "Heated Seats",
  //   "Immobilizer Key",
  //   "Keyless Entry",
  //   "Navigation System",
  //   "Power Locks",
  //   "Power Mirrors",
  //   "Power Steering",
  //   "Power Windows",
  //   "Rear Seat Entertainment",
  //   "Rear AC Vents",
  //   "Rear Speakers",
  //   "Rear Camera",
  //   "Sun Roof",
  //   "Steering Switches",
  //   "USB and Auxillary Cable",
  // ]);

  // const [images, setImages] = useState([
  //   "/images/samplecar.webp",
  //   "/images/car1.jpg",
  //   "/images/car2.jpg",
  //   "/images/car4.webp",
  // ]);

  // const [img, setImg] = useState(images[0]);
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

  // console.log(images[index])
  return (
    <>
    {
        loading ? <FullLoader/>:<></>
      }
      <div className="singlecar_page">
        <div className="inner_main">
          <div className="car_section">
            <div className="car_upper_section">
              <div className="car_title" style={{ padding: "10px" }}>
                <h1 style={{ color: "#223C7A", marginBottom: "5px" }}>
                  {carrdata?.brand} {carrdata?.model} {carrdata?.variant_name} {carrdata?.modelyear}
                </h1>
                <span style={{ color: "#223C7A" }}><i className='bx bxs-location-plus'></i>&nbsp;{carrdata.city}</span>
              </div>
              <div className="img_section">
                {images.map((url,i) => {
                  return (
                    <>
                      {/* <div style={{width:'100%'}}> */}
                      <Image
                       key={i}
                       style={{translate:`${-100 * index}%`}}
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
              <h2 style={{color:'#223C7A', padding: "10px" , fontFamily:'monospace'}}>
              PKR: {price_converter(carrdata.price)} 
              </h2>
            </div>
            <div className="car_specs">
              <div className="single_spec">
                <i className="bx bxs-calendar"></i>
                <p>{carrdata.modelyear}</p>
              </div>
              <div className="single_spec">
                <i className="bx bx-tachometer"></i>
                <p>
                  {carrdata.Mileage} <span>km</span>
                </p>
              </div>
              <div className="single_spec">
                <i className="bx bxs-gas-pump"></i>
                <p>{carrdata.enginetype}</p>
              </div>
              <div className="single_spec">
                <i className="bx bx-wrench"></i>
                <p>{carrdata.transmission}</p>
              </div>
            </div>

            {/* <div className="car_incepection">car_incepection</div> */}
            <h2>Specifications</h2>
            <div className="car_details">
              <div className="single_detail">
                <span>Registered In</span>
                <span>{carrdata.Registered_In}</span>
              </div>
              <div className="single_detail">
                <span>Assembly</span>
                <span>{carrdata.Assembly}</span>
              </div>
              <div className="single_detail">
                <span>Color</span>
                <span>{carrdata.color}</span>
              </div>
              <div className="single_detail">
                <span>Engine Capacity</span>
                <span>{carrdata.enginecc}cc</span>
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
              <p>{carrdata.comments}</p>
              <p style={{ color: "#223C7A" }}>
                Mention when calling Seller to get a good deal
              </p>
            </div>
          </div>
          <div className="seller_section">
          <Contact_details className='contact_dtals' price={carrdata.price} phone={carrdata.Phone_no}/>
            <Sellerdetails sellerid={carrdata.seller_email} />
            <Reporting_add selleremail={carrdata.seller_email} ad_id={carrdata._id} type={'car'} />
          </div>
        </div>
        <div className="post_ad_link">
          <img src="/images/sell-car.png" alt="loading" />
          <h3>
            Post an ad for <span style={{ color: "#d10202" }}>FREE</span>{" "}
          </h3>
          <p>Sell it faster to thousands of buyers</p>
          <Link href="#">Sell Your Car</Link>
        </div>
      </div>
      
    </>
  );
};

export async function getServerSideProps({ params, query,res }) {
  let pageurl = params.slug.split("-");
  let slugid = pageurl[pageurl.length - 1];
  const resp = await axios.get(
    `${process.env.Host}/api/Singlecardata/?id=${slugid}`
  );

  const carrdata = resp.data.data;
  let loadingg = false;
  if (carrdata) {
    loadingg = false;
  }
  // console.log(carrdata)

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )
  return {
    props: {
      carrdata,
      loadiing: loadingg,
      // total:pages,
      // cardata,
      // pagenum:params.page
    },
    //   revalidate: 300
  };
}

export default slug;
