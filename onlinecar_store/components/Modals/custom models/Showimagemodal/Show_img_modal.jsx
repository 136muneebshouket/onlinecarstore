import React from "react";
import Image from "next/image";

const Show_img_modal = ({ onClose, selectedimg,delimages }) => {




  return (
    <>
      <div className="image_show_modal">
        <div className="close_btn">
          {" "}
          <i
            className="bx bx-x modal-close"
            onClick={() => {
              onClose(false);
            }}
          ></i>
        </div>
        <div className="imginmodal">
          <img src={selectedimg.imgurl} alt="loading" width={10} height={10} loading="lazy" />
        </div>
        <div>
          <button onClick={()=>{delimages(selectedimg.index)}}>Delete image</button>
        </div>
      </div>
    </>
  );
};

export default Show_img_modal;
