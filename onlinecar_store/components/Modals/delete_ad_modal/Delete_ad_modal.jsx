// Modal.js
import React, { useRef, useState } from "react";
// import OutsideClickHandler from "react-outside-click-handler";
// import FullLoader from "./Loader/FullLoader";
import { useRouter } from 'next/router';
import axios from "axios";
import dynamic from "next/dynamic";

const FullLoader = dynamic(() => import("../Loader/FullLoader"), {
  loading: () => <p>Loading...</p>,
});

const Modal = ({ isOpen, onClose, car }) => {

  const router = useRouter();
  if (!isOpen) {
    return null;
  }

  var modalref = useRef();

  //   const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorstatus, setErrorstatus] = useState();
  //  console.log(car_id)

  async function delete_ad(car_id) {
    setLoading(true)
    // console.log(carid_to_del)
    await axios
      .delete(`/api/del_my_ad`, { params: {ad_id:car_id} })
      .then((res) => {console.log(res); setLoading(false); onClose(); router.reload();})
      .catch((err) => {console.error(err); setLoading(false)})
      .finally(()=>{setLoading(false); onClose()})
  }

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
                style={{ background: "rgb(180, 0, 0)", padding: "10px" }}
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
      {loading ? <FullLoader /> : ""}
    </>
  );
};

export default Modal;
