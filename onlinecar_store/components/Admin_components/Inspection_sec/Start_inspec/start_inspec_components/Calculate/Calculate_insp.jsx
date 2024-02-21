import React,{useState,useContext} from "react";
import Context from "@/components/processing_functions/context";
import axios from "axios";

const Calculate_insp = ({ Ad_id }) => {
    const { message, setMessage } = useContext(Context);

  async function Calculateinspection() {
    setMessage({ loader: true });
    await axios
      .post(`/api/admin/inspection/start_inspec/Calculate_inspec`,{Ad_id})
      .then((result) => {
        // console.log(result.data);
        setMessage({ loader: false });
        setMessage({ success: true, msg: result?.data?.message });
      })
      .catch((err) => {
        setMessage({ loader: false });
        setMessage({ success: false, msg: err?.response?.data.message });
      });
  }

  return (
    <>
      <div style={{ padding: "20px" }} className="final_upload_btn">
        <button onClick={Calculateinspection}>Calculate Inspection</button>
      </div>
    </>
  );
};

export default Calculate_insp;
