// import slug from "@/pages/used_bikes/[slug]";
import React, { useEffect, useState, memo } from "react";
import Link from "next/link";

const Call_contact = ({ phone }) => {
  const [shake, setShake] = useState("shake");

  useEffect(()=>{
      setTimeout(()=>{
          if(shake == 'shake'){
              setShake('')
          }else{
              setShake('shake')
          }
      },5000)
  },[shake])

//   console.log(phone);

  return (
    <>
      <div className="Call_contact_bar">
        <Link className="phone" href={`tel:${phone}`}>
          <div className={`call ${shake}`} style={{ background: "#283949" }}>
            <i className="bx bxs-phone-call"></i>
          </div>
        </Link>

        <Link className="phone" href={`HTTPS://wa.me/92${phone.slice(1)}`}>
          <div
            className={`whatsapp_chat ${shake}`}
            style={{ background: "#3EB549" }}
          >
            <i className="bx bxl-whatsapp"></i>
          </div>
        </Link>
      </div>
    </>
  );
};

export default memo(Call_contact);
