import React, { useState, useRef, useContext } from "react";
import { useRouter } from "next/router";
import Context from "@/components/processing_functions/context";
import Image from "next/image";
import Main_img_upload from "./start_inspec_components/Main_img_upload";
import Body_frame from "./start_inspec_components/Body_frame";
import ETC from "./start_inspec_components/ETC";
import Brakes from "./start_inspec_components/Brakes";
import SUS_STR from "./start_inspec_components/SUS_STR";
import Interior from "./start_inspec_components/Interior";
import Ac_heater from "./start_inspec_components/Ac_heater";
import Electronics from "./start_inspec_components/Electronics";
import Exterior from "./start_inspec_components/Exterior";
import Tyres from "./start_inspec_components/Tyres";
import Test_drive from "./start_inspec_components/Test_drive";





const Start_inspection = () => {
  const { message, setMessage } = useContext(Context);
  const router = useRouter();
  const Ad_id = router.query.Ad_id;
 
  return (
    <>
      <div className="Start_inspec">
        <h1 style={{ padding: "10px 20px" }}>Start Inspection</h1>
       <Main_img_upload/>
       <Body_frame/>
       <ETC/>
       <Brakes/>
       <SUS_STR/>
       <Interior/>
       <Ac_heater/>
       <Electronics/>
       <Exterior/>
       <Tyres/>
       <Test_drive/>
       
      </div>
    </>
  );
};

export default Start_inspection;
