import React, { useRef, useState ,memo} from "react";
import OutsideClickHandler from "react-outside-click-handler";

const Response = ({ isOpen, onClose, res }) => {
//   if (!isOpen) {
//     return null;
//   }

  var modalref = useRef();
  console.log(res.msgs)
  return (
    <>
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
    </>
  );
};

export default memo(Response);
