import React, { useState, useEffect, useCallback } from "react";
import Car_options from "@/components/Modals/admin/options_modal/Car_options";
import axios from "axios";
import Context from "@/components/processing_functions/context";
import { useContext } from "react";

const Ad_car_option = () => {
  const { message, setMessage } = useContext(Context);
  const [carsdata, setCarsdata] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalvalue, setModalvalue] = useState("");

  let intialobj = {
    make: "",
    model: "",
    version: "",
  };
  const [carobj, setCarobj] = useState(intialobj);

  const features = [
    "ABS",
    "Air Bags",
    "Air Conditioning",
    "Alloy Rims",
    "AM/FM Radio",
    "CD Player",
    "Cassette Player",
    "Cool Box",
    "Cruise Control",
    "Climate Control",
    "DVD Player",
    "Front Speakers",
    "Front Camera",
    "Heated Seats",
    "Immobilizer Key",
    "Keyless Entry",
    "Navigation System",
    "Power Locks",
    "Power Mirrors",
    "Power Steering",
    "Power Windows",
    "Rear Seat Entertainment",
    "Rear AC Vents",
    "Rear Speakers",
    "Rear Camera",
    "Sun Roof",
    "Steering Switches",
    "USB and Auxillary Cable",
  ];

  async function getoptions() {
    setMessage({ loader: true });
    await axios
      .get(`/api/admin/options/car_options_routes/get_route`)
      .then((res) => {
        setMessage({ loader: false });
        setCarsdata(res.data.payload[0].main_arr);
      })
      .catch((err) => {
        setMessage({ loader: false });
        setMessage({ success: false, msg: "something went wrong" });
      });
  }

  useEffect(() => {
    getoptions();
  }, []);

  function handleopenmodel(v) {
    setIsModalOpen(true);
    setModalvalue(v);
  }

  const get_from_modal = useCallback((v) => {
    if(v.modal_value == 'Make'){
      setCarobj({...carobj, make : v.v})
    }
    // console.log(v);
  }, []);

  return (
    <>
      <div className="ad_caroptions">
        <h2> Ad Car Options </h2>

        <div className="form_section">
          <form>
            <div
              onClick={() => {
                handleopenmodel("Make");
              }}
              className="input_label"
            >
              <label>Ad car Make</label>
              <input type="text"  value={carobj?.make} readOnly/>
            </div>
            <div
              className="input_label"
              onClick={() => {
                handleopenmodel("Model");
              }}
            >
              <label>Ad car Model</label>
              <input type="text" readOnly />
            </div>
            <div className="input_label">
              <label>Ad car Version</label>
              <input type="text" readOnly />
            </div>
            <div className="input_label">
              <label>Ad car's duration starting year</label>
              <input type="number" />
            </div>
            <div className="input_label">
              <label>Ad car's duration Ending year</label>
              <input type="number" />
            </div>
            <div className="input_label">
              <label>Ad car Engine capacity</label>
              <input type="text" />
            </div>
            <div className="input_label">
              <label>Ad Engine type</label>
              <select name="" id="">
                <option value="">Engine Type</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="LPG">LPG</option>
                <option value="CNG">CNG</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
              </select>
            </div>
            <div className="input_label">
              <label>Ad Transmission</label>
              <select name="" id="">
                <option value="">-Transmission-</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
            </div>
            <div className="input_label">
              <label>Ad Assembly</label>
              <select name="" id="">
                <option value="">-Assembly-</option>
                <option value="Local">Local</option>
                <option value="Imported">Imported</option>
              </select>
            </div>
            <div className="input_label">
              <label>Ad Body type</label>
              <select name="" id="">
                <option value="">Body Type</option>
                <option value="Sedan">Sedan</option>
                <option value="Hatchback">Hatchback</option>
                <option value="SUV">SUV</option>
                <option value="Crossover">Crossover</option>
                <option value="Mini Van">Mini Van</option>
                <option value="Double Cabin">Double Cabin</option>
                <option value="MPV">MPV</option>
                <option value="Compact SUV">Compact SUV</option>
                <option value="Micro Van">Micro Van</option>
                <option value="Pick Up">Pick Up</option>
                <option value="Station Wagon">Station Wagon</option>
                <option value="Coupe">Coupe</option>
                <option value="Truck">Truck</option>
                <option value="High Roof">High Roof</option>
                <option value="Convertible">Convertible</option>
                <option value="Single Cabin">Single Cabin</option>
                <option value="Off-Road Vehicles">Off-Road Vehicles</option>
                <option value="Mini Vehicles">Mini Vehicles</option>
                <option value="Compact hatchback">Compact hatchback</option>
                <option value="Subcompact hatchback">
                  {" "}
                  Subcompact hatchback{" "}
                </option>
              </select>
            </div>

            <div className="input_label">
              <label>Ad Features</label>
              <div className="features_sec">
                {features.map((v, index) => {
                  return (
                    <>
                      <div
                        key={index}
                        className="single_feature"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          width: "30%",
                        }}
                      >
                        <input
                          style={{
                            width: "15px",
                            height: "15px",
                            margin: "10px 7px",
                          }}
                          type="checkbox"
                          id="fetchere"
                          name="vehicle1"
                          //   onClick={() => {
                          //     addfeature(v);
                          //   }}
                          //  checked={featurearr.includes(v) ? true: false}
                        />
                        <label>{v}</label>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>

            <div className="ad_car_sec">
              <button className="ad_car_option">Add Car Option</button>
            </div>
          </form>
        </div>
      </div>

      {isModalOpen ? (
        <Car_options
          carsdata={carsdata}
          modal_value={modalvalue}
          make={carobj?.make}
          model={carobj?.model}
          refresh={getoptions}
          get_from_modal={get_from_modal}
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      ) : null}
    </>
  );
};

export default Ad_car_option;
