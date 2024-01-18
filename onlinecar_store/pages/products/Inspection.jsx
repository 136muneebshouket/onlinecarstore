import React, { useEffect, useState, useContext, useCallback } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import axios from "axios";
import Context from "@/components/processing_functions/context";

const Optionsmodal = dynamic(() => import("@/components/Modals/custom models/Option_modals/Optionsmodal"), {
  loading: () => (
    <div className="loder">
      <h2>Loading...</h2>
    </div>
  ),
});
// import Optionsmodal from "@/components/Modals/custom models/Option_modals/Optionsmodal";

const Inspection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalvalue, setModalvalue] = useState("");
  const [showerr, setshowerr] = useState(false);

  //closing and opening modal /////////////////////////////////////////////////////////////////////////////////
  const handleOpenModal = useCallback((value) => {
    setIsModalOpen(true);
    setModalvalue(value);
  }, []);

  const { message, setMessage } = useContext(Context);
  const router = useRouter();
  const url = router.asPath;
  const pageurl = url.split("ad_id=");
  const ad_id = pageurl[pageurl.length - 1];

  const { data: sessionData } = useSession();
  let user_name = sessionData?.user.name;
  let userid = sessionData?.user._id;
  let user_mail = sessionData?.user.email;

  let intialobj = {
    city: "",
    area: "",
    Address: "",
    brand: "",
    model: "",
    variant_name: "",
    modelyear: "",
    slot: "",
    slottime: "",
    username: "",
    email: "",
    phone_no: "",
    ad_id: "",
    user_id: "",
  };

  const [inspection_obj, setInspection_obj] = useState(intialobj);

  useEffect(() => {
    // if(inspection_obj.user_id){
    //   return
    // }else{
    get_ad();
    // }
  }, [sessionData]);

  //   const [Ad, setAd] = useState({});

  async function get_ad() {
    // let {ad_id , user_id } = inspection_obj
    // console.log(ad_id , userid)
    if (ad_id && userid) {
      setMessage({ loader: true });
      await axios
        .get(
          `/api/update_add/get_my_ad?ad_id=${ad_id}&user_id=${userid}&ad_type=car`
        )
        .then((res) => {
          setMessage({ loader: false });
          // console.log(res?.data.data)
          let Ad = res?.data.data;
          setInspection_obj({
            ...inspection_obj,
            city: Ad?.city,
            area: Ad?.area,
            brand: Ad?.brand,
            model: Ad?.model,
            variant_name: Ad?.variant_name,
            modelyear: Ad?.modelyear,
            phone_no: `${Ad?.Phone_no}`,
            user_id: userid,
            ad_id: Ad?._id,
            username: user_name,
            email: user_mail,
          });
          // setInspection_obj({...inspection_obj , user_id:userid, username :user_name, email :user_mail})
        })
        .catch((err) => {
          setMessage({ loader: false });
          setMessage({ success: false, msg: err?.response?.data.message });
        });
    }
  }
  // console.log(sessionData)

  //   console.log(Ad);

  function onchangehandler(e) {
    setInspection_obj({ ...inspection_obj, [e.target.name]: e.target.value });
  }

  ////geting data from options modal//////////////////////////////////////////////////////////////////////
  const getfromoptionsmodal = useCallback(
    (values) => {
      if (values.city) {
        setInspection_obj((prevCarobj) => {
          return {
            ...prevCarobj,
            ...(values.city && { city: values.city }),
            ...{ area: values.area.name },
          };
        });
      }
      if (values.b) {
        // console.log(values)
        setInspection_obj((prevCarobj) => {
          return {
            ...prevCarobj,
            ...(values.b && { brand: values.b }),
            ...{ modelyear: values.modelyear },
            ...{ model: values.m },
            ...{ variant_name: values.v_name },
          };
        });
      }
      if (values.date) {
        if (!values.time) {
          setInspection_obj({
            ...inspection_obj,
            slot: values?.date,
            slottime: "",
          });
        } else {
          setInspection_obj({
            ...inspection_obj,
            slot: values?.date,
            slottime: values?.time,
          });
        }
      }
    },
    [inspection_obj]
  );

  // console.log(inspection_obj)

  function to12HourFormat(timeString) {
    if (timeString == 404) {
      return " Not Slot Selected";
    }
    if (!timeString) {
      return "";
    }
    const hours24 = parseInt(timeString);
    let hours12 = hours24 % 12 || ""; // Handle midnight (00:00)
    const amPm = hours24 >= 12 ? "PM" : "AM";

    return ` ${hours12} ${amPm}`;
  }

  async function order_inspection(e) {
    e.preventDefault();
    setshowerr(true);
    try {
      for(var key in inspection_obj){
        let v = inspection_obj[key];
        if (!v) {
          if (key != "ad_id") {
            throw new Error(`${key} fields`)
          }
        }
      };
    } catch (error) {
      // console.log(error.message)
      setMessage({ success: false, msg:error.message});
      return ;
    }
    
    // console.log(inspection_obj);
    setMessage({ loader: true });

    await axios
      .post(`/api/admin/inspection/inspec_orders/add_orders`, inspection_obj)
      .then((res) => {
        setMessage({ loader: false });
        setshowerr(false);
        setInspection_obj(intialobj);
        setMessage({ success: true, msg: res?.data.message });
      })
      .catch((err) => {
        setMessage({ loader: false });
        setMessage({ success: false, msg: err?.response?.data.message });
      });
  }
  //
  return (
    <>
      <div className="main_inspection">
        <div className="header_inspection">
          <div className="img_div">
            <Image
              src="/images/inspectionbanner.png"
              width={100}
              height={100}
              quality={80}
              alt="inspectionbanner.png"
            />
          </div>
          <div className="formsection">
            <form onSubmit={order_inspection}>
              <h2>Shedule Carselection Car Incpection</h2>
              <input
                type="text"
                name="location"
                onClick={() => {
                  handleOpenModal("Inspection_cities");
                }}
                value={`${inspection_obj?.area} ${inspection_obj?.city}`}
                placeholder="Location"
                readOnly
                required
              />

              <span className="err_span">
                {showerr &&
                  `${inspection_obj?.area ? "" : "area is required"} ${
                    inspection_obj?.city ? "" : "city is required"
                  }`}
              </span>

              <input
                type="text"
                name="Address"
                value={inspection_obj?.Address}
                onChange={onchangehandler}
                placeholder="House No/Building No,street,Area"
              />
              <span className="err_span">
                {showerr &&
                  `${inspection_obj?.Address ? "" : "Address is required"}`}
              </span>

              <input
                type="text"
                onClick={() => {
                  handleOpenModal("Car Model");
                }}
                value={`${inspection_obj?.modelyear} ${inspection_obj?.brand} ${inspection_obj?.model} ${inspection_obj?.variant_name}`}
                // value={inspection_obj?.Make_model_version}
                onChange={onchangehandler}
                name="Make_model_version"
                placeholder="Make/Model/Version"
                readOnly
                required
              />
              <span className="err_span">
                {showerr &&
                  `${
                    inspection_obj?.brand ? "" : "Proper Car name is required"
                  }`}
              </span>

              <input
                onClick={() => {
                  handleOpenModal("Book Slot");
                }}
                type="text"
                name="slot"
                value={`${inspection_obj?.slot}${to12HourFormat(
                  inspection_obj?.slottime
                )}`}
                placeholder="Incpection Slot"
                required
                readOnly
              />

              <span className="err_span">
                {showerr &&
                  `${inspection_obj?.slot ? "" : "Slot Date is required"} ${
                    inspection_obj?.slottime ? "" : "TimeSlot is required"
                  }`}
              </span>

              <input
                type="text"
                name="username"
                value={inspection_obj?.username}
                onChange={onchangehandler}
                placeholder="Enter Full Name"
                required
              />

              <span className="err_span">
                {showerr &&
                  `${inspection_obj?.username ? "" : "Username is required"}`}
              </span>

              <input
                type="text"
                name="phone_no"
                pattern="[0]{1}[3]{1}[0-9]{9}"
                maxLength={11}
                title="Please match the requested format 0XXXXXXXXXX"
                onChange={onchangehandler}
                value={inspection_obj?.phone_no}
                placeholder="Enter Your Phone"
                required
              />

              <span className="err_span">
                {showerr &&
                  `${
                    inspection_obj?.phone_no ? "" : "Phone Number is required"
                  }`}
              </span>

              <button  type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Optionsmodal
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

export default Inspection;
