import axios from "axios";
import React, { useEffect, useState } from "react";
import dateFormat, { masks } from "dateformat";

const Sellerdetails = ({ sellerid }) => {
  const [sellerdata, setSellerdata] = useState({
    name: "",
    date: "",
    avatar: "",
  });

  useEffect(() => {
    async function getsellerdetails() {
      await axios
        .get(`/api/Sellerdetails/?sellerid=${sellerid}`)
        .then((res) => {
          if (res.status == 200) {
            let sellerdetails = res.data.data;
            let converteddate = dateFormat(
              sellerdetails.createdAt,
              "mmmm dS, yyyy"
            );
            setSellerdata((prev) => {
              return {
                ...prev,
                ...(sellerdetails.full_name && {
                  name: sellerdetails.full_name,
                }),
                ...(converteddate && { date: converteddate }),
                ...(sellerdetails.avatar && { avatar: sellerdetails.avatar }),
              };
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
    getsellerdetails();
  }, [sellerid]);
  // console.log(sellerdata)

  return (
    <>
      <div className="seller_details">
        <h5>Seller Details</h5>
        <div className="seller_name">
          <span>
            {sellerdata.avatar != "" ? (
              <img src={sellerdata.avatar} alt="loading" />
            ) : (
              <img src="/images/default-profile-image-.gif" alt="loading" />
            )}
          </span>
          <div>
            <p>{sellerdata.name ? sellerdata.name : "unknown"}</p>
            <p>Member since {sellerdata.date ? sellerdata.date : "unknown"}</p>
          </div>
        </div>
        <div className="seller_icons">
          <i className="bx bx-mobile-alt"></i>
          <i className="bx bxl-facebook"></i>
          <i className="bx bx-mail-send"></i>
        </div>
      </div>
    </>
  );
};

export default Sellerdetails;
