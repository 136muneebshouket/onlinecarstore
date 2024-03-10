import React, { useState, useRef, useContext } from "react";
import { useRouter } from "next/router";
import Context from "@/components/processing_functions/context";
import Image from "next/image";
import Details_img_upload from "@/components/Admin_components/Inspection_sec/Start_inspec/start_inspec_components/Details_img_upload";
import Accident_checklist from "@/components/Admin_components/Inspection_sec/Start_inspec/start_inspec_components/Accident_checklist";
import ETC from "@/components/Admin_components/Inspection_sec/Start_inspec/start_inspec_components/ETC";
import Brakes from "@/components/Admin_components/Inspection_sec/Start_inspec/start_inspec_components/Brakes";
import SUS_STR from "@/components/Admin_components/Inspection_sec/Start_inspec/start_inspec_components/SUS_STR";
import Interior from "@/components/Admin_components/Inspection_sec/Start_inspec/start_inspec_components/Interior";
import Ac_heater from "@/components/Admin_components/Inspection_sec/Start_inspec/start_inspec_components/Ac_heater";
import Electronics from "@/components/Admin_components/Inspection_sec/Start_inspec/start_inspec_components/Electronics";
import Exterior from "@/components/Admin_components/Inspection_sec/Start_inspec/start_inspec_components/Exterior";
import Tyres from "@/components/Admin_components/Inspection_sec/Start_inspec/start_inspec_components/Tyres";
import Test_drive from "@/components/Admin_components/Inspection_sec/Start_inspec/start_inspec_components/Test_drive";
import Car_img from "@/components/Admin_components/Inspection_sec/Start_inspec/start_inspec_components/Cars_scratches_dents/Car_img";
import Calculate_insp from "@/components/Admin_components/Inspection_sec/Start_inspec/start_inspec_components/Calculate/Calculate_insp";
import Main_image from "@/components/Admin_components/Inspection_sec/Start_inspec/start_inspec_components/main_img/Main_image";
import useSWR, { mutate } from "swr";
import axios from "axios";



const fetcher = (url) => axios.get(url).then((res) => res.data.payload);
const Start_inspection = () => {
  const { message, setMessage } = useContext(Context);
  const router = useRouter();
  const Ad_id = router.query.Ad_id;

  const { data, error, isLoading ,mutate } = useSWR(
    `/api/admin/inspection/start_inspec/uploaded_equip?Ad_id=${Ad_id}`,
    fetcher
  );
 
  function refresh(){
    mutate() 
  }
  // console.log(data)
 
  return (
    <>
      <div className="Start_inspec">
        <h1 style={{ padding: "10px 20px" }}>Start Inspection</h1>
        <Main_image/>
       <Details_img_upload/>
       <Car_img/>
       <Accident_checklist exist={data} refresh={refresh}/>
       <ETC exist={data} refresh={refresh}/>
       <Brakes exist={data} refresh={refresh}/>
       <SUS_STR exist={data} refresh={refresh}/>
       <Interior exist={data} refresh={refresh}/>
       <Ac_heater exist={data} refresh={refresh}/>
       <Electronics exist={data} refresh={refresh}/>
       <Exterior exist={data} refresh={refresh}/>
       <Tyres exist={data} refresh={refresh}/>
       <Test_drive exist={data} refresh={refresh}/>
       <Calculate_insp Ad_id={Ad_id}/>
       
      </div>
    </>
  );
};

export default Start_inspection;
