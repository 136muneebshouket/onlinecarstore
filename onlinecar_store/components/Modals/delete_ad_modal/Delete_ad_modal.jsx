// Modal.js
import React, { useRef, useState } from "react";
// import OutsideClickHandler from "react-outside-click-handler";
// import FullLoader from "./Loader/FullLoader";
import Response_modal from "../response_modal/Response_modal";
import { useRouter } from 'next/router';
import axios from "axios";
import dynamic from "next/dynamic";

const FullLoader = dynamic(() => import("../Loader/FullLoader"), {
  loading: () => <div className="loder"><h2>Loading...</h2></div>,
});

const Modal = ({ isOpen, onClose, car }) => {

  const router = useRouter();
  if (!isOpen) {
    return null;
  }

  var modalref = useRef();

  //   const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [dberrors, setDberrors] = useState({
    msg: "",
    success: null,
  });

  // const [error, setError] = useState("");
  // const [errorstatus, setErrorstatus] = useState();
  //  console.log(car_id)

  async function delete_ad(car_id) {
    setLoading(true)
    // console.log(carid_to_del)
    await axios
      .delete(`/api/del_my_ad`, { params: {ad_id:car_id} })
      .then((res) => {
        console.log(res); setLoading(false);
         onClose();
         setDberrors({ ...dberrors, msg: res?.data.message, success: true });
        setTimeout(()=>{
          router.reload();
        },1000)  
        })
      .catch((err) => {
        console.error(err?.response);
         setLoading(false)
        setDberrors({ ...dberrors, msg: err?.response?.data.message, success: false });
      })
      .finally(()=>{setLoading(false)})
  }
  // console.log(dberrors)

  return (
    <>
      <div className="modal">
        <div ref={modalref} className="modal-content">
          <i className="bx bx-x modal-close" onClick={onClose}></i>

          <div className="modal_innercontent">
            <div className="modal_title edit_or_del_btns">
              <h2>Are You Sure? &#129300;</h2>
              <p>
                You want to delete This AD <br />
                <b>{car.brand}{' '}{car.model}{' '}{car.variant_name}{' '}{car.variant_name && car.variant_name}
                {' '}{car.modelyear}</b>
              </p>
              {loading ? <>
              <p style={{textAlign:'center'}}> <b>Deleting...</b></p>
              </>:<button
                onClick={() => {
                  delete_ad(car._id);
                }}
                style={{ backgroundColor: "rgb(180, 0, 0)", padding: "10px", color: "white", fontSize: "medium", width: "50%", margin: "auto", border: "none", borderRadius: "5px" }}
              >
                Delete this AD
              </button>}
            </div>
          </div>
        </div>
      </div>

      {/* <OutsideClickHandler
        onOutsideClick={(event) => {
          if (!modalref.current.contains(event.target)) {
            onClose();
          }
        }}
      ></OutsideClickHandler> */}
       {dberrors.success != null && (
        <Response_modal
          onClose={()=>{setDberrors({...dberrors,msg:'',success:null})}}
          res={dberrors}
        />
      )}
      {loading ? <FullLoader /> : ""}
    </>
  );
};

export default Modal;
