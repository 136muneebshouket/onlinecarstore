import React, { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { equip_status_arr } from "@/components/equipments_status/equipment_status";
import FullLoader from "@/components/Modals/Loader/FullLoader";
import Images_modal from "@/components/Modals/Show_imgs_client/Images_modal";
import axios from "axios";
import useSWR from "swr";
import { useRouter } from "next/router";

const fetcher = (url) => axios.get(url).then((res) => res.data.payload);
const slug = () => {
  const router = useRouter();
  const inspec_id = router.query.slug;
  // let url = router
  // console.log(inspec_id)

  const [show_imgs, setShow_imgs] = useState(false);
  const [imgs_for_modal, setImgs_for_modal] = useState([]);

  const { data, error, isLoading, mutate } = useSWR(
    `${inspec_id ? `/api/client_inspec/get?Id=${inspec_id}` : null}`,
    fetcher
  );

  function color(status) {
    let colour;
    equip_status_arr.map((v) => {
      if (v?.status_marks == status) {
        colour = v?.status_color;
      }
    });
    return colour;
  }
  if (isLoading) {
    return <FullLoader />;
  }
  // if(error) {
  //   throw new Error("Something Went Wrong");
  // }
  if (data) {
    // console.log(data);
  }

  function main_img() {
    let img;
    data?.all_imgs.map((v) => {
      if (v?.field == "img_flag") {
        img = v?.img_url;
      }
    });
    return img;
  }

  function checkimgs_exist_of_equip(keys) {
    let imgs = data?.all_imgs
      ?.map((v, index) => {
        if (v.img_flag == keys) {
          return v.img_url;
        }
      })
      .filter((x) => x != undefined);
    if (imgs.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  function open_imgs_modal(keys, hint) {
    if (hint == "Extrior_conditions") {
      let imgs = data?.all_imgs
        ?.map((v, index) => {
          if (v.flag_index == keys) {
            return v.img_url;
          }
        })
        .filter((x) => x != undefined);
      if (imgs?.length > 0) {
        setImgs_for_modal(imgs);
        setShow_imgs(true);
      }
      return;
    }
    if (hint == "others") {
      let imgs = data?.all_imgs
        ?.map((v, index) => {
          if (v.img_flag == keys) {
            return v.img_url;
          }
        })
        .filter((x) => x != undefined);
      if (imgs?.length > 0) {
        setImgs_for_modal(imgs);
        setShow_imgs(true);
      }
      return;
    }
  }
  // console.log(data)
  return (
    <>
      <div className="main_client_inspec_report">
        <div className="inner_main">
          <div className="heading_sec">
            <h1>Car Selection Inspection Report</h1>
          </div>
          <div className="car_img_sec">
            <div className="img_sec">
              <img src={main_img()} alt="Loading" />
            </div>
            <div className="rating_sec">
              <CircularProgressbar
                className="circle_bar"
                value={(data?.overall_rating / 10) * 100}
                text={`${data?.overall_rating}/10`}
              />
            </div>
          </div>
          <div className="main_details">
            <h3>Car Details</h3>
            <div className="details">
              <div className="single_detail">
                <label>Customer/Dealer Name</label>
                <p>{data?.cust_dealer_name}</p>
              </div>
              <div className="single_detail">
                <label>Chassis Number</label>
                <p>{data?.chas_no}</p>
              </div>
              <div className="single_detail">
                <label>Engine Type</label>
                <p>{data?.engine_type_no}</p>
              </div>
              <div className="single_detail">
                <label>Registration No</label>
                <p>{data?.reg_no}</p>
              </div>
              <div className="single_detail">
                <label>Fuel Type</label>
                <p>{data?.fuel_type}</p>
              </div>
              <div className="single_detail">
                <label>Color</label>
                <p>{data?.color}</p>
              </div>
              <div className="single_detail">
                <label>Mileage</label>
                <p>{data?.milage}</p>
              </div>
              <div className="single_detail">
                <label>Transmission Type</label>
                <p>{data?.transmission}</p>
              </div>
              <div className="single_detail">
                <label>Location</label>
                <p>{data?.location}</p>
              </div>
              <div className="single_detail">
                <label>Registered City</label>
                <p>{data?.reg_city}</p>
              </div>
              <div className="single_detail">
                <label>Inspection Date</label>
                <p>{new Date(data?.createdAt).toDateString()}</p>
              </div>
            </div>
          </div>

          {/* <div className="comments">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque ut
              necessitatibus laboriosam adipisci temporibus fugiat quod eos
              voluptates deleniti, dicta cupiditate eligendi magni sed atque ad
              minima voluptas quidem autem?
            </p>
          </div> */}

          <div className="parts_ratings">
            <div className="car_parts">
              <div>
                <span>ENGINE / TRANSMISSION / CLUTCH</span>{" "}
                <span>{data?.percentages?.ETC}%</span>
              </div>
              <div className="range">
                <div
                  style={{ width: `${data?.percentages?.ETC}%` }}
                  className="inner_range"
                ></div>
              </div>
            </div>
            <div className="car_parts">
              <div>
                <span>BRAKES</span> <span>{data?.percentages?.brakes}%</span>
              </div>
              <div className="range">
                <div
                  style={{ width: `${data?.percentages?.brakes}%` }}
                  className="inner_range"
                ></div>
              </div>
            </div>
            <div className="car_parts">
              <div>
                <span>INTERIOR</span>{" "}
                <span>{data?.percentages?.interior}%</span>
              </div>
              <div className="range">
                <div
                  style={{ width: `${data?.percentages?.interior}%` }}
                  className="inner_range"
                ></div>
              </div>
            </div>
            <div className="car_parts">
              <div>
                <span>SUSPENSION/STEERING</span>{" "}
                <span>{data?.percentages?.susp_steering}%</span>
              </div>
              <div className="range">
                <div
                  style={{ width: `${data?.percentages?.susp_steering}%` }}
                  className="inner_range"
                ></div>
              </div>
            </div>
            <div className="car_parts">
              <div>
                <span>AC/HEATER</span>{" "}
                <span>{data?.percentages?.Ac_heater}%</span>
              </div>
              <div className="range">
                <div
                  style={{ width: `${data?.percentages?.Ac_heater}%` }}
                  className="inner_range"
                ></div>
              </div>
            </div>
            <div className="car_parts">
              <div>
                <span>ELECTRICAL & ELECTRONICS</span>{" "}
                <span>{data?.percentages?.Electronics}%</span>
              </div>
              <div className="range">
                <div
                  style={{ width: `${data?.percentages?.Electronics}%` }}
                  className="inner_range"
                ></div>
              </div>
            </div>
            <div className="car_parts">
              <div>
                <span>EXTERIOR & BODY</span>{" "}
                <span>{data?.percentages?.Exterior}%</span>
              </div>
              <div className="range">
                <div
                  style={{ width: `${data?.percentages?.Exterior}%` }}
                  className="inner_range"
                ></div>
              </div>
            </div>
            <div className="car_parts">
              <div>
                <span>BODY (Frame)</span>{" "}
                <span>{data?.percentages?.Extrior_conditions}%</span>
              </div>
              <div className="range">
                <div
                  style={{ width: `${data?.percentages?.Extrior_conditions}%` }}
                  className="inner_range"
                ></div>
              </div>
            </div>
            <div className="car_parts">
              <div>
                <span>ACCIDENT Checklist (Condition)</span>{" "}
                <span>{data?.percentages?.accident_checklist}%</span>
              </div>
              <div className="range">
                <div
                  style={{ width: `${data?.percentages?.accident_checklist}%` }}
                  className="inner_range"
                ></div>
              </div>
            </div>
            <div className="car_parts">
              <div>
                <span>TYRES</span> <span>{data?.percentages?.Tyres}%</span>
              </div>
              <div className="range">
                <div
                  style={{ width: `${data?.percentages?.Tyres}%` }}
                  className="inner_range"
                ></div>
              </div>
            </div>
          </div>

          <div className="body_frame">
            <h3>Body (frame) Defects</h3>
            <div className="img_sec">
              <img src="/images/car_skeleton.jpg" alt="Loading" />
              {data?.Extrior_conditions?.map((v, index) => {
                return (
                  <>
                    <div
                      onClick={() => {
                        open_imgs_modal(index, "Extrior_conditions");
                      }}
                      style={{
                        top: `${v?.positions?.top}%`,
                        left: `${v?.positions?.left}%`,
                      }}
                      className="map_fault"
                    >
                      <span>
                        <b>{v?.type}</b>
                      </span>
                    </div>
                  </>
                );
              })}
            </div>

            <div className="faults_legends">
              <h3>Defects</h3>
              <div className="map_faults">
                {data?.Extrior_conditions?.map((v) => {
                  return (
                    <>
                      <p>
                        <b>{v?.type}</b> {v?.type_name}
                      </p>
                    </>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="parts_details">
            <div className="head">
              <p>ACCIDENT Checklist</p>
              <div>
                <p>{data?.percentages?.accident_checklist}%</p>
                <p>-</p>
              </div>
            </div>
            <div className="map_equipments">
              {data?.accident_checklist?.map((v) => {
                return (
                  <>
                    <div className="single_equip">
                      <div className="name">
                        <p>{v?.equip_name}</p>

                        {checkimgs_exist_of_equip(
                          `accident_checklist>${v?.equip_name}`
                        ) ? <button
                        onClick={() => {
                          open_imgs_modal(
                            `accident_checklist>${v?.equip_name}`,
                            "others"
                          );
                        }}
                      >
                        View image
                      </button> : null}
                        
                      </div>
                      <div
                        className="status"
                        style={{ background: `${color(v?.status_mark)}` }}
                      >
                        <p>{v?.equip_status}</p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>

          <div className="parts_details">
            <div className="head">
              <p>ENGINE / TRANSMISSION / CLUTCH</p>
              <div>
                <p>{data?.percentages?.ETC}%</p>
                <p>-</p>
              </div>
            </div>
            <div className="map_equipments">
              {data?.ETC?.map((v) => {
                return (
                  <>
                    <div className="single_equip">
                      <div className="name">
                        <p>{v?.equip_name}</p>

                        {checkimgs_exist_of_equip(
                          `ETC>${v?.equip_name}`
                        ) ? <button
                        onClick={() => {
                          open_imgs_modal(
                            `ETC>${v?.equip_name}`,
                            "others"
                          );
                        }}
                      >
                        View image
                      </button> : null}
                        
                      </div>
                      <div
                        className="status"
                        style={{ background: `${color(v?.status_mark)}` }}
                      >
                        <p>{v?.equip_status}</p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>

          <div className="parts_details">
            <div className="head">
              <p>Brakes</p>
              <div>
                <p>{data?.percentages?.brakes}%</p>
                <p>-</p>
              </div>
            </div>
            <div className="map_equipments">
              {data?.brakes?.map((v) => {
                return (
                  <>
                    <div className="single_equip">
                      <div className="name">
                        <p>{v?.equip_name}</p>

                        {checkimgs_exist_of_equip(
                          `brakes>${v?.equip_name}`
                        ) ? <button
                        onClick={() => {
                          open_imgs_modal(
                            `brakes>${v?.equip_name}`,
                            "others"
                          );
                        }}
                      >
                        View image
                      </button> : null}
                        
                      </div>
                      <div
                        className="status"
                        style={{ background: `${color(v?.status_mark)}` }}
                      >
                        <p>{v?.equip_status}</p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>


          <div className="parts_details">
            <div className="head">
              <p>SUSPENSION/STEERING</p>
              <div>
                <p>{data?.percentages?.susp_steering}%</p>
                <p>-</p>
              </div>
            </div>
            <div className="map_equipments">
              {data?.susp_steering?.map((v) => {
                return (
                  <>
                    <div className="single_equip">
                      <div className="name">
                        <p>{v?.equip_name}</p>

                        {checkimgs_exist_of_equip(
                          `susp_steering>${v?.equip_name}`
                        ) ? <button
                        onClick={() => {
                          open_imgs_modal(
                            `susp_steering>${v?.equip_name}`,
                            "others"
                          );
                        }}
                      >
                        View image
                      </button> : null}
                        
                      </div>
                      <div
                        className="status"
                        style={{ background: `${color(v?.status_mark)}` }}
                      >
                        <p>{v?.equip_status}</p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>

          <div className="parts_details">
            <div className="head">
              <p>INTERIOR</p>
              <div>
                <p>{data?.percentages?.interior}%</p>
                <p>-</p>
              </div>
            </div>
            <div className="map_equipments">
              {data?.interior?.map((v) => {
                return (
                  <>
                    <div className="single_equip">
                      <div className="name">
                        <p>{v?.equip_name}</p>

                        {checkimgs_exist_of_equip(
                          `interior>${v?.equip_name}`
                        ) ? <button
                        onClick={() => {
                          open_imgs_modal(
                            `interior>${v?.equip_name}`,
                            "others"
                          );
                        }}
                      >
                        View image
                      </button> : null}
                        
                      </div>
                      <div
                        className="status"
                        style={{ background: `${color(v?.status_mark)}` }}
                      >
                        <p>{v?.equip_status}</p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>

          <div className="parts_details">
            <div className="head">
              <p>AC/HEATER</p>
              <div>
                <p>{data?.percentages?.Ac_heater}%</p>
                <p>-</p>
              </div>
            </div>
            <div className="map_equipments">
              {data?.Ac_heater?.map((v) => {
                return (
                  <>
                    <div className="single_equip">
                      <div className="name">
                        <p>{v?.equip_name}</p>

                        {checkimgs_exist_of_equip(
                          `Ac_heater>${v?.equip_name}`
                        ) ? <button
                        onClick={() => {
                          open_imgs_modal(
                            `Ac_heater>${v?.equip_name}`,
                            "others"
                          );
                        }}
                      >
                        View image
                      </button> : null}
                        
                      </div>
                      <div
                        className="status"
                        style={{ background: `${color(v?.status_mark)}` }}
                      >
                        <p>{v?.equip_status}</p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>

          <div className="parts_details">
            <div className="head">
              <p>ELECTRICAL & ELECTRONICS</p>
              <div>
                <p>{data?.percentages?.Electronics}%</p>
                <p>-</p>
              </div>
            </div>
            <div className="map_equipments">
              {data?.Electronics?.map((v) => {
                return (
                  <>
                    <div className="single_equip">
                      <div className="name">
                        <p>{v?.equip_name}</p>

                        {checkimgs_exist_of_equip(
                          `Electronics>${v?.equip_name}`
                        ) ? <button
                        onClick={() => {
                          open_imgs_modal(
                            `Electronics>${v?.equip_name}`,
                            "others"
                          );
                        }}
                      >
                        View image
                      </button> : null}
                        
                      </div>
                      <div
                        className="status"
                        style={{ background: `${color(v?.status_mark)}` }}
                      >
                        <p>{v?.equip_status}</p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>

          <div className="parts_details">
            <div className="head">
              <p>EXTERIOR & BODY</p>
              <div>
                <p>{data?.percentages?.Exterior}%</p>
                <p>-</p>
              </div>
            </div>
            <div className="map_equipments">
              {data?.Exterior?.map((v) => {
                return (
                  <>
                    <div className="single_equip">
                      <div className="name">
                        <p>{v?.equip_name}</p>

                        {checkimgs_exist_of_equip(
                          `Exterior>${v?.equip_name}`
                        ) ? <button
                        onClick={() => {
                          open_imgs_modal(
                            `Exterior>${v?.equip_name}`,
                            "others"
                          );
                        }}
                      >
                        View image
                      </button> : null}
                        
                      </div>
                      <div
                        className="status"
                        style={{ background: `${color(v?.status_mark)}` }}
                      >
                        <p>{v?.equip_status}</p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>

          <div className="parts_details">
            <div className="head">
              <p>TYRES</p>
              <div>
                <p>{data?.percentages?.Tyres}%</p>
                <p>-</p>
              </div>
            </div>
            <div className="map_equipments">
              {data?.Tyres?.map((v) => {
                return (
                  <>
                    <div className="single_equip">
                      <div className="name">
                        <p>{v?.equip_name}</p>

                        {checkimgs_exist_of_equip(
                          `Tyres>${v?.equip_name}`
                        ) ? <button
                        onClick={() => {
                          open_imgs_modal(
                            `Tyres>${v?.equip_name}`,
                            "others"
                          );
                        }}
                      >
                        View image
                      </button> : null}
                        
                      </div>
                      <div
                        className="status"
                        style={{ background: `${color(v?.status_mark)}` }}
                      >
                        <p>{v?.equip_status}</p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {show_imgs ? (
        <Images_modal
          imgs={imgs_for_modal}
          onClose={() => {
            setShow_imgs(false);
          }}
        />
      ) : null}
    </>
  );
};

export default slug;
