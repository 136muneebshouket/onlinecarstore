import axios from "axios";
import React,{useState,useEffect,useCallback,useMemo , useContext} from "react";
import Context from "@/components/processing_functions/context";

const Update_equip_modal = ({modalvalue,onClose}) => {
  const { message, setMessage } = useContext(Context);
    // console.log(modalvalue)


async function getequip() {
  setMessage({ loader: true });
  await axios.get(`/api/admin/inspection/start_inspec/update_equip`,{params:modalvalue})
  .then((res) => {
    setMessage({ loader: false });
    console.log(res?.data.payload)
  }).catch((err) => {
    setMessage({ loader: false });
    setMessage({ success: false, msg: err?.response?.data.message });
  });
}

useEffect(()=>{
  getequip()
},[])

  return (
    <>
      <div className="modal">
        <div className="modal-content">
          <div className="modal_head">
            <h3 style={{ fontSize: "large" }}>Edit Equipment</h3>
            <i className="bx bx-x modal-close" onClick={onClose}></i>
          </div>
          <div>
          


          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(Update_equip_modal);
