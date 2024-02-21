import React, { useState, useEffect } from "react";
import Image from "next/image";

const Images_modal = ({ imgs, onClose }) => {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setImages(imgs);
  }, []);

  const slideimg = (slide) => {
    if (slide == "left") {
      // console.log("left");
      if (index > 0) {
        setIndex(index - 1);
      }
    }
    if (slide == "right") {
      if (index < images.length - 1) {
        // console.log("right");
        setIndex(index + 1);
      }
    }
  };

  // console.log(imgs);
  return (
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
        <div className="img_section client_imgs">
          {images.map((url, i) => {
            return (
              <>
                <div key={i}
                    style={{ translate: `${-100 * index}%` }}>
                  <Image
                    
                    src={url}
                    alt="loading"
                    loading="lazy"
                    width={100}
                    height={100}
                    unoptimized={true}
                    priority={false}
                  />
                </div>
                {/* <div style={{width:'100%'}}> */}

                {/* </div> */}
              </>
            );
          })}

          <i
            onClick={() => {
              slideimg("left");
            }}
            style={{ transform: `rotate(90deg)` }}
            className="bx bx-chevron-down left_arrow"
          ></i>
          <i
            onClick={() => {
              slideimg("right");
            }}
            style={{ transform: `rotate(270deg)` }}
            className="bx bx-chevron-down right_arrow"
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Images_modal;
