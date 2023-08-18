import React, { useRef, useState, useEffect } from "react";
import Cardatamodal from "./Cardatamodal";
import Locationsmodal from "./Locationsmodal";
import Colorsmodal from "./Colorsmodal";
import Registeroptionsmodal from "./Registeroptionsmodal";
// import carData from "@/components/carsdata/arrays";



const Optionsmodal = ({ isOpen, onClose, modalvalue, carrdata ,filtercarmodal}) => {
  if (!isOpen) {
    return null;
  }









  return (
    <>
      <div className="options_modal">
        <div className="modal">
          <div className="modal-content">
            <div className="modal_head">
              <h2>{modalvalue}</h2>
              <i className="bx bx-x modal-close" onClick={onClose}></i>
            </div>
           {modalvalue == 'Car Model' && <Cardatamodal onClose={onClose} carrdata={carrdata} filtermodal={filtercarmodal}/>} 
           {modalvalue == 'Location' && <Locationsmodal onClose={onClose}  carrdata={carrdata} />} 
           {modalvalue == 'Color' && <Colorsmodal onClose={onClose}  carrdata={carrdata} />} 
           {modalvalue == 'Registration' && <Registeroptionsmodal onClose={onClose}  carrdata={carrdata} />} 
         

          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(Optionsmodal);
