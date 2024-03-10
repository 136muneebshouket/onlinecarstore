import React, { useState, useRef, useContext, useMemo, useEffect } from "react";
import { useRouter } from "next/router";
import Context from "@/components/processing_functions/context";
import Image from "next/image";
import axios from "axios";

const Details_img_upload = () => {
  const { message, setMessage } = useContext(Context);
  const router = useRouter();
  const Ad_id = router.query.Ad_id;
  const [main_img, setMain_img] = useState();

  let initail_obj = {
    ad_id: "",
    // main_img: {},
    car_name: "",
    cust_dealer_name: "",
    engine_cc: "",
    milage: "",
    transmission: "",
    date_of_insp: "",
    chas_no: "",
    engine_type_no: "",
    reg_no: "",
    fuel_type: "",
    color: "",
    location: "",
    reg_city: "",
  };

  const [main_details, setMain_details] = useState(initail_obj);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (Ad_id) {
      setMain_details((s) => ({
        ...s,
        ad_id: Ad_id,
        date_of_insp: new Date().toISOString(),
      }));
    }
  }, []);
  //   console.log(Ad_id)

  async function main_img_handler(event) {
    setMessage({ loader: true });
    const file = event.target.files[0];
    // console.log(file);
    try {
      const promises = [];
      if (file.size > 4 * 1024 * 1024) {
        setMessage({
          success: false,
          msg: "Image size should not exceed 4MB. Upload your Image again",
        });
        return;
      }

      // Read the selected image and convert it to a Data URL
      const reader = new FileReader();

      const promise = new Promise((resolve) => {
        reader.onload = (e) => {
          setMain_img({ url: e.target.result, filename: file.name });
          resolve();
        };
      });

      reader.readAsDataURL(file);
      promises.push(promise);
      await Promise.all(promises);
      setMessage({ loader: false });
    } catch (error) {
      setMessage({ loader: false });
      setMessage({
        success: false,
        msg: error.message,
      });
    }
    setMessage({ loader: false });
    // Clear the file input after image selection
    fileInputRef.current.value = null;
  }

  function change_handler(e) {
    if (e.target.name == "date_of_insp") {
      setMain_details((s) => ({
        ...s,
        [e.target.name]: new Date(e.target.value).toISOString(),
      }));
      return;
    }
    setMain_details((s) => ({ ...s, [e.target.name]: e.target.value }));
  }





  async function upload_basic_details(e) {
    e.preventDefault();
    // setMain_details({ ...main_details, main_img: main_img });
    let admin_token = JSON.parse(localStorage.getItem('admin_token'))
    let obj = {
      main_details,
      admin_token,
      main_img
    }
    setMessage({ loader: true });
    await axios
      .post(`/api/admin/inspection/start_inspec/add_main_details`,obj)
      .then((res) => {
        setMessage({ loader: false });
        setMessage({ success: true, msg: res?.data.message });
        setMain_details(initail_obj)
        setMain_img({})
      })
      .catch((err) => {
        setMessage({ loader: false });
        setMessage({ success: false, msg: err?.response?.data.message });
      });
  }
  // console.log(main_details)
  // console.log();
  return (
    <>
      <form onSubmit={upload_basic_details}>
        <div className="upload_main_img">
          <div className="main_img">
            {main_img?.url ? (
              <Image
                src={`${main_img?.url}`}
                unoptimized={true}
                priority={false}
                width={100}
                height={100}
                alt="loading"
              />
            ) : null}
          </div>

          <div className="button_section">
            <input
              className="main_img_input"
              type="file"
              ref={fileInputRef}
              onChange={main_img_handler}
              accept="image/*"
            
            />
            {/* <button onClick={upload_main_img}>Upload pic</button> */}
          </div>
        </div>
         
         

        <div className="car_basic_details">
          <div className="input_div">
            <label htmlFor="">Car Name</label>
            <input
              type="text"
              name="car_name"
              value={main_details?.car_name}
              onChange={change_handler}
              required
            />
          </div>
          <div className="input_div">
            <label htmlFor="">Customer/Dealer Name</label>
            <input
              type="text"
              name="cust_dealer_name"
              value={main_details?.cust_dealer_name}
              onChange={change_handler}
              required
            />
          </div>
          <div className="input_div">
            <label htmlFor="">Engine Capacity</label>
            <input
              type="number"
              name="engine_cc"
              value={main_details?.engine_cc}
              onChange={change_handler}
              required
            />
          </div>
          <div className="input_div">
            <label htmlFor="">Mileage</label>
            <input
              type="number"
              name="milage"
              value={main_details?.milage}
              onChange={change_handler}
              required
            />
          </div>
          <div className="input_div">
            <label htmlFor="">Transmission Type</label>
            <select
              name="transmission"
              id=""
              onChange={change_handler}
              required
            >
              <option value="">Select Transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div className="input_div">
            <label htmlFor="">Inspection Date</label>
            <input
              type="date"
              name="date_of_insp"
              value={new Date(main_details.date_of_insp)
                .toLocaleDateString("en-GB")
                .split("/")
                .reverse()
                .join("-")}
              onChange={change_handler}
              required
            />
          </div>
          <div className="input_div">
            <label htmlFor="">Chassis No</label>
            <input
              type="text"
              name="chas_no"
              value={main_details?.chas_no}
              onChange={change_handler}
              required
            />
          </div>
          <div className="input_div">
            <label htmlFor="">Engine Type</label>
            <input
              type="text"
              name="engine_type_no"
              value={main_details?.engine_type_no}
              onChange={change_handler}
              required
            />
          </div>
          <div className="input_div">
            <label htmlFor="">Registration No</label>
            <input
              type="text"
              name="reg_no"
              value={main_details?.reg_no}
              onChange={change_handler}
              required
            />
          </div>
          <div className="input_div">
            <label htmlFor="">Fuel Type</label>
            <select name="fuel_type" id="" onChange={change_handler} required>
              <option value="">Select Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Electric">Electric</option>
              <option value="CNG">CNG</option>
              <option value="Diesel">Diesel</option>
            </select>
            {/* <input type="text" /> */}
          </div>
          <div className="input_div">
            <label htmlFor="">Color</label>
            <input
              type="text"
              name="color"
              value={main_details?.color}
              onChange={change_handler}
              required
            />
          </div>
          <div className="input_div">
            <label htmlFor="">Location</label>
            <input
              type="text"
              name="location"
              value={main_details?.location}
              onChange={change_handler}
              required
            />
          </div>
          <div className="input_div">
            <label htmlFor="">Registered City</label>
            <input
              type="text"
              name="reg_city"
              value={main_details?.reg_city}
              onChange={change_handler}
              required
            />
          </div>
        </div>
        <div className="submit_btn">
          <button type="submit">Upload</button>
        </div>
      </form>
    </>
  );
};

export default React.memo(Details_img_upload);
