import React from "react";
import Image from "next/image";

const Show_img_modal = ({ onClose, selectedimg, delimages, setcoverphoto, no_coverphoto }) => {
  // console.log(no_coverphoto)
  return (
    <>
      <div className="image_show_modal">
        <div className="close_btn">
          <i
            className="bx bx-x modal-close"
            onClick={() => {
              onClose(false);
            }}
          ></i>
        </div>
        <div className="imginmodal">
          <img
            src={selectedimg?.imgurl}
            alt="loading"
            width={10}
            height={10}
            loading="lazy"
          />
        </div>
        <div>
          <button
            onClick={() => {
              delimages(selectedimg?.index);
              onClose()
            }}
          >
            Delete image
          </button>
          {selectedimg?.index != 0 ? (  
            <button
              className="setcover_photo_btn"
              onClick={() => {
                setcoverphoto(selectedimg?.index);
              }}
              disabled = {no_coverphoto ? true : false}
            >
              Set Cover photo
            </button>

          ) : null}
        </div>
      </div>
    </>
  );
};

export default Show_img_modal;
