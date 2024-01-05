import React, { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";

import { useSession, signOut } from "next-auth/react";
import axios from "axios";
import price_converter from "@/components/processing_functions/Price_calculator";
const Del_ad_modal = dynamic(
  () => import("@/components/Modals/del_ad_modal/Delete_ad_modal"),
  {
    loading: () => <p>Loading...</p>,
  }
);

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

const fetcher = (url) => axios.get(url).then((res) => res.data.message);

const My_Rides = () => {
  const { data: sessionData } = useSession();
  let user_email = sessionData?.user.email;

  const [carrdata, setCarrdata] = useState([]);
  // const [refresh, setRefresh] = useState(true);
  const [carprops, setCarprops] = useState();
  const [loadiing, setLoadiing] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [type, setType] = useState("bikes");

  const handleOpenModal = (cardataprops) => {
    setCarprops(cardataprops);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const { data, error, isLoading } = useSWR(
    user_email ? `/api/user_ads/?user_email=${user_email}&ad_type=${type}` : null,
    fetcher
  );

  useMemo(() => {
    // if (user_email) {
    //   // setLoadiing(true);
    //   getuser_ads();
    // }
    if (data) {
      setCarrdata(data);
    }
    // console.log('hello')
  }, [data]);
// console.log(carrdata)
  // async function getuser_ads() {
  //   await axios
  //     .get(`/api/user_ads/?user_email=${user_email}`)
  //     .then((res) => {
  //       // console.log(res.data.message);
  //       setCarrdata(res.data.message);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     })
  //     .finally(() => {
  //       setLoadiing(false);
  //     });

  // }

  return (
    <>
      {isLoading && <FullLoader />}

      <div className="main_ads_section">
        {/* <div className="ads_links_section">
          <div
            className="links"
            onClick={() => {
              setType("active");
            }}
          >
            Active
          </div>
          <div
            className="links"
            onClick={() => {
              setType("pending");
            }}
          >
            Pending
          </div>
          <div
            className="links"
            onClick={() => {
              setType("removed");
            }}
          >
            Removed
          </div>
        </div> */}
        <div className="my_Ads_section">
          <div className="cars" style={{ width: "100%" }}>
            {error && <h5>Something Went Wrong</h5>}
            {carrdata?.length == 0 && (
              <>
                <h5>No Active Ads</h5>
              </>
            )}
            {carrdata?.map((obj, i) => {
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
                        <div style={{ textAlign: "left" }}>
                          <Link
                            className="car_content"
                            href={`/used_bikes/${obj.brand.replaceAll(
                              " ",
                              "-"
                            )}-${obj.model.replaceAll(" ", "-")}-${
                              obj.modelyear
                            }-${obj._id}`.toLowerCase()}
                            style={{ textDecoration: "none" }}
                          >
                            <h3>
                              {obj.brand} {obj.model}{" "}
                              {obj.variant_name && obj.variant_name}{" "}
                              {obj.modelyear}
                            </h3>

                            <p className="price_mbv">
                              <strong>PKR:{price_converter(obj.price)}</strong>
                            </p>

                            <p>{obj.city}</p>
                            <div>
                              <span>{obj.Mileage} km</span>
                              {/* <span>{obj.enginecc}cc</span> */}
                              {/* <span className="hide_in_mbv">
                                {obj.transmission}
                              </span> */}
                              {/* <span className="hide_in_mbv">
                                {obj.enginetype}
                              </span> */}
                            </div>
                            {/* {obj.pending == 0 ? <p className="pending_banner">Pending</p> : null} */}
                          </Link>
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
                    <div className="edit_or_del_btns">
                      <button style={{ background: "#3083d1" }}>
                        {" "}
                        <Link href={`/users/edit_myad/bike/${obj._id}`}>Update</Link>
                      </button>
                      <button
                        style={{ background: "#b40000" }}
                        onClick={() => {
                          handleOpenModal(obj);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                    
                    {/* {obj.reject_reasons?.length > 0 ? (
                      <div className="reject_reasons">
                        <div className="head">
                          <p>Reject Reasons</p>
                          <i
                            className="bx bx-chevron-down arrow"
                            style={{
                              transform: `rotate(${
                                toggle ? "0deg" : "180deg"
                              })`,
                            }}
                            onClick={() => {
                              setToggle(!toggle);
                            }}
                          ></i>
                          
                        </div>
                        <ol style={{ height: `${toggle ? "auto" : "0"}` }}>
                          {obj.reject_reasons.map((v) => {
                            return (
                              <>
                                <li>{v}</li>
                              </>
                            );
                          })}
                        </ol>
                      </div>
                    ) : null} */}

                  </div>
                </>
              );
            })}
          </div>
          {/* <h5>No Active Ads</h5> */}
        </div>
      </div>
      {isModalOpen && (
        <Del_ad_modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          car={carprops}
          ad_type={type}
          // refresh={getuser_ads}
        />
      )}
    </>
  );
};

export default My_Rides;
