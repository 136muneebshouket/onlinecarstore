import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

import Link from "next/link";
import Sellerdetails from "@/components/child_components_of_others/slug_car_components/Sellerdetails_box/Sellerdetails";
import Contact_details from "@/components/child_components_of_others/slug_car_components/price_and_phone/Contact_details";
import Count_views from "@/components/child_components_of_others/slug_car_components/view_count/Count_views";
import Reporting_add from "@/components/child_components_of_others/slug_car_components/report_add/Reporting_add";

import dynamic from "next/dynamic";

import price_converter from "@/components/processing_functions/Price_calculator";
import Call_contact from "@/components/child_components_of_others/slug_car_components/Call_contact_bar/Call_contact";
import All_features_icons from "@/components/icons/All_features_icons";
import Images_modal from "@/components/Modals/Show_imgs_client/Images_modal";


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

const slug = ({ carrdata, loadiing }) => {

 
  // const [car, setCar] = useState({});
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(loadiing);
  const [images, setImages] = useState([]);
  const [show_imgs, setShow_imgs] = useState(false);



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
      {loading ? <FullLoader /> : <></>}
      <div className="singlecar_page">
        <div className="inner_main">
          <div className="car_section">
            <div className="car_upper_section">
              <div className="car_title" style={{ padding: "10px" }}>
                <h1 style={{ color: "#223C7A", marginBottom: "5px" }}>
                  {carrdata?.brand} {carrdata?.model} {carrdata?.variant_name}{" "}
                  {carrdata?.modelyear}
                </h1>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                <span style={{ color: "#223C7A" }}>
                  <i className="bx bxs-location-plus"></i>&nbsp;{carrdata.city}
                </span>
                <Count_views views={carrdata.views}/>
                </div>
               
              </div>
              <div className="img_section" >
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
                        onClick={()=>{setShow_imgs(true)}}
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
                }}
              >
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
            {carrdata?.overall_incpection_rating?.overall_rating ? (
              <div className="incepection_report_div">
                <h3>Car Selection Inspection Report</h3>
                <span>
                  <b>Inspected Date:</b>  {new Date(carrdata?.overall_incpection_rating?.createdAt).toDateString()}
                </span>
                <div className="car_parts o_rating">
                  <div>
                    <span>Overall Rating</span> <span>{carrdata?.overall_incpection_rating?.overall_rating}/10</span>
                  </div>
                </div>
                <div className="car_parts">
                  <div>
                    <span>Exterior & Body</span> <span>{carrdata?.overall_incpection_rating?.percentages?.Extrior_conditions}%</span>
                  </div>
                  <div className="range">
                    <div style={{ width: `${carrdata?.overall_incpection_rating?.percentages?.Extrior_conditions}%` }} className="inner_range"></div>
                  </div>
                </div>
                <div className="car_parts">
                  <div>
                    <span>Engine/Transmission/Clutch</span> <span>{carrdata?.overall_incpection_rating?.percentages?.ETC}%</span>
                  </div>
                  <div className="range">
                    <div style={{ width: `${carrdata?.overall_incpection_rating?.percentages?.ETC}%` }} className="inner_range"></div>
                  </div>
                </div>
                <div className="car_parts">
                  <div>
                    <span>Suspension/Steering</span> <span>{carrdata?.overall_incpection_rating?.percentages?.susp_steering}%</span>
                  </div>
                  <div className="range">
                    <div style={{ width: `${carrdata?.overall_incpection_rating?.percentages?.susp_steering}%` }} className="inner_range"></div>
                  </div>
                </div>
                <div className="car_parts">
                  <div>
                    <span>Interior</span> <span>{carrdata?.overall_incpection_rating?.percentages?.interior}%</span>
                  </div>
                  <div className="range">
                    <div style={{ width: `${carrdata?.overall_incpection_rating?.percentages?.interior}%` }} className="inner_range"></div>
                  </div>
                </div>
                <div className="car_parts">
                  <div>
                    <span>AC/Heater</span> <span>{carrdata?.overall_incpection_rating?.percentages?.Ac_heater}%</span>
                  </div>
                  <div className="range">
                    <div style={{ width: `${carrdata?.overall_incpection_rating?.percentages?.Ac_heater}%` }} className="inner_range"></div>
                  </div>
                </div>
                <div className="full_inspec_link">
                  <Link href={`/inspection-report/${carrdata?.overall_incpection_rating?._id}`} target="_blank">
                    <button>View Full Inspection Report</button>
                  </Link>
                </div>
              </div>
            ) : null}

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
                <span>Body Type</span>
                <span>{carrdata.body_type}</span>
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
                    {/* <All_features_icons f={v}/> */}
                      <p key={i}> <All_features_icons f={v}/> {v.replace(/_/g, " ")}</p>
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
            <Contact_details
              className="contact_dtals"
              price={carrdata.price}
              phone={carrdata.Phone_no}
              managed_by ={carrdata?.managed_by}
            />
            <Sellerdetails sellerid={carrdata.seller_email} managed_by={carrdata?.managed_by} />
            {carrdata?.managed_by == true ? null :<>
              <Reporting_add
              selleremail={carrdata.seller_email}
              ad_id={carrdata._id}
              type={"car"}
              
            />
            </>} 
          
          </div>
        </div>
        <div className="post_ad_link">
          <img src="/images/sell-car.png" alt="loading" />
          <h3>
            Post an ad for <span style={{ color: "#d10202" }}>FREE</span>{" "}
          </h3>
          <p>Sell it faster to thousands of buyers</p>
          <Link href="/used-cars/-/sell">Sell Your Car</Link>
        </div>
      </div>

      <Call_contact phone={carrdata?.Phone_no} />


      {show_imgs ? (
        <Images_modal
          imgs={images}
          onClose={() => {
            setShow_imgs(false);
          }}
        />
      ) : null}
    </>
  );
};

export async function getServerSideProps({ params, query, res }) {
  let pageurl = params.slug.split("-");
  let slugid = pageurl[pageurl.length - 1];
  // console.log(slugid)
  const resp = await axios.get(
    `${process.env.Host}/api/Singlecardata?id=${slugid}`
  )
  // .then((result) => {
  //   console.log(result.data)
  //   console.log('then')
  // }).catch((err) => {
  //   console.log(err.response.data.message)
  // });;
  // console.log(resp)
  const carrdata = resp?.data?.data;
  let loadingg = false;
  if (carrdata) {
    loadingg = false;
  }
 

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
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
