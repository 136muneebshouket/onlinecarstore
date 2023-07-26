import React from "react";
import Image from "next/image";

const Show_img_modal = ({ onClose, imgurl }) => {
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
          <Image src={imgurl} alt="loading" width={100} height={100} />
        </div>
      </div>
    </>
  );
};

export default Show_img_modal;
