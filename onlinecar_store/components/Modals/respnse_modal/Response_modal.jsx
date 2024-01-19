import React, { useRef, useState ,memo} from "react";
import OutsideClickHandler from "react-outside-click-handler";
import dynamic from "next/dynamic";

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

const Response = ({ isOpen, onClose, res,progress }) => {
//   if (!isOpen) {
//     return null;
//   }

  var modalref = useRef();
  // console.log(res.msgs)
  return (
    <>
    {res.loader && <FullLoader/>}
     {res.msg &&    <div className="res_modal">
     <div
        className="modal"
        
      >
        <div ref={modalref} className="modal-content" style={{ border: `2px solid ${res.success ? "green" : "red"}` }}>
          <i className="bx bx-x modal-close" onClick={onClose}></i>

          <div className="modal_innercontent">
            <div className="modal_title edit_or_del_btns">
              <h2 style={{ color: `${res.success ? "green" : "red"}`, textAlign:'center' }}>
                {res.success ?<>Success &#128512;</>:<>Error &#128543;</>}</h2>
              <p style={{ color: `${res.success ? "green" : "red"}`, textAlign:'center' }}>
                <b>{res.msg}</b>
              </p>
            </div>
          </div>
        </div>
      </div>
      <OutsideClickHandler
        onOutsideClick={(event) => {
          if (!modalref.current.contains(event.target)) {
            onClose();
          }
        }}
      ></OutsideClickHandler>
     </div>}
      {res.progress && <>

      <div className="modal progressbar">
        <div className="modal-content" style={{textAlign:'center'}}>
          <h2 style={{color:'#b10000'}}>Please dont leave the page</h2>
          <p className="progress_num" style={{fontSize:'xx-large',color:'green',marginBottom:'3px'}}>{res.progress}%</p>
          <span style={{fontSize:'large',color:'green'}}>done</span>
        <div className="progress_bar">
        <div style={{width:`${res.progress}%`}} className="progress"></div>
      </div>
        </div>
      
      </div>
      
      </>}
     
    </>
  );
};

export default memo(Response);
