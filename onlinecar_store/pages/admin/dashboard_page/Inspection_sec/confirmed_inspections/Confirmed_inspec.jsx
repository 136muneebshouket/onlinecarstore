import React, { useEffect, useState, useContext, useCallback } from "react";
import Context from "@/components/processing_functions/context";
import FullLoader from "@/components/Modals/Loader/FullLoader";
import Link from "next/link";
// import React from "react";
import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data.payload);
const Confirm_inspec = () => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/admin/inspection/inspec_orders/get_orders?accepted=true`,
    fetcher
  );

  function to12HourFormat(timeString) {
    if (timeString == 404) {
      return " Not Slot Selected";
    }
    if (!timeString) {
      return "";
    }
    const hours24 = parseInt(timeString);
    let hours12 = hours24 % 12 || ""; // Handle midnight (00:00)
    const amPm = hours24 >= 12 ? "PM" : "AM";

    return ` ${hours12} ${amPm}`;
  }

  return (
    <>
   
      <div className="inspection_req_main ">
        <h1>Confirmed Inspections</h1>
        <div className="request_sec">
          {isLoading ? <FullLoader /> : null}
          {error ? (
            <h1 style={{ color: "rgb(175, 46, 36)" }}>Something went wrong</h1>
          ) : null}

          {data?.map((obj, index) => {
            return (
              <>
                <div key={index} className="single_req">
                  <div className="field">
                    <label>Car</label>
                    <p>
                      {obj?.brand} {obj?.model} {obj?.variant_name}
                    </p>
                  </div>
                  <div className="field">
                    <label>Owner</label>
                    <p>{obj?.username}</p>
                  </div>
                  <div className="field">
                    <label>Email</label>
                    <p>{obj?.email}</p>
                  </div>
                  <div className="field">
                    <label>Location</label>
                    <p>
                      {obj?.area} {obj?.city}
                    </p>
                  </div>
                  <div className="field">
                    <label>Address</label>
                    <p>{obj?.Address}</p>
                  </div>

                  <div className="field">
                    <label>Slot-day</label>
                    <p>{obj?.slot}</p>
                  </div>
                  <div className="field">
                    <label>Slot-time</label>
                    <p>{to12HourFormat(obj?.slottime)}</p>
                  </div>
                  <div className="field">
                    <label>Phone</label>
                    <p>{obj?.phone_no}</p>
                  </div>
                  <div className="buttons">
                    <Link
                      href={`Inspection_sec/Start_inspec/Check_ad?Ad_id=${obj.ad_id}`}
                    >
                      <button
                       
                        style={{ background: "#246524" }}
                      >
                        Check Ad
                      </button>
                    </Link>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>

    </>
  );
};

export default Confirm_inspec;
