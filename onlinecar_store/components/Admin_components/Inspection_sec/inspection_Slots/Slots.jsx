import React, { useEffect, useCallback, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import Context from "@/components/processing_functions/context";
import Slot_list from "./other/Slot_list";
import { useContext } from "react";

const OptionsModal = dynamic(
  () => import("@/components/Modals/custom models/Option_modals/Optionsmodal"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const Slots = () => {
  const { message, setMessage } = useContext(Context);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalvalue, setModalvalue] = useState("");
  let intialobj = {
    city: "",
    area: "",
  };
  const [slotobj, setSlotobj] = useState(intialobj);

  //closing and opening modal /////////////////////////////////////////////////////////////////////////////////
  const handleOpenModal = useCallback((value) => {
    setIsModalOpen(true);
    setModalvalue(value);
  }, []);

  ////geting data from options modal//////////////////////////////////////////////////////////////////////
  const getfromoptionsmodal = useCallback((values) => {
    // console.log(values)
    if (values.city) {
      setSlotobj((prevCarobj) => {
        return {
          ...prevCarobj,
          ...(values.city && { city: values.city }),
          ...{ area: values.area },
        };
      });
    }
  }, []);
  //
  async function Addnew_slot() {
    let admin_token = JSON.parse(localStorage.getItem("admin_token"));
    let obj = {
      city: slotobj?.city,
      area: slotobj?.area,
      admin_token,
    };
    setMessage({loader:true});
    await axios
      .post(`/api/admin/slots/slots_api`, obj)
      .then((res) => {
        setSlotobj(intialobj)
        setMessage({loader:false}); 
        setMessage({success:true,msg:res?.data.message}); 
      })
      .catch((err) => {
        console.log(err);
        setMessage({loader:false}); 
        setMessage({success:false,msg:err?.response?.data.message});
       
      });
  }
  // function check() {
  //   setMessage({success:true,msg:'heloo'});
  // }

  return (
    <>
      <div className="Slots">
        <div className="ad_slot">
          <h3>Slots Avaliable</h3>
          {/* <button onClick={check}>check</button> */}
          <input type="text" value={`${slotobj?.city} > ${slotobj?.area}`} />

          <button
            style={{ background: "#044477" }}
            onClick={() => {
              handleOpenModal("Location");
            }}
          >
            Select new Slot
          </button>
          {slotobj?.city ? (
            <button onClick={Addnew_slot}>Ad new Slot</button>
          ) : null}
        </div>
        <div className="slots_lists">
          <Slot_list/>
        </div>
      </div>

      {isModalOpen && (
        <OptionsModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
          modalvalue={modalvalue}
          carrdata={getfromoptionsmodal}
        />
      )}
    </>
  );
};

export default Slots;
