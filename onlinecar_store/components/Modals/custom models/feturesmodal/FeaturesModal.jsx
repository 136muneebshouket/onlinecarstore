import React, { useEffect, useState } from "react";
import { car_features } from "@/components/processing_functions/features_generations";
// import Context from "@/components/processing_functions/context";
import { useContext } from "react";

const FeaturesModal = ({ carrdata , carfeatures}) => {
  const features = [
    { key1: 'ABS', key2: 'abs' },
    { key1: 'Air Bags', key2: 'air_bags' },
    { key1: 'Air Conditioning', key2: 'air_conditioning' },
    { key1: 'Alloy Rims', key2: 'alloy_rims' },
    { key1: 'AM/FM Radio', key2: 'cd_player' },
    { key1: 'CD Player', key2: 'cassette_player' },
    { key1: 'Cassette Player', key2: 'cool_box' },
    { key1: 'Cool Box', key2: 'cruise_control' },
    { key1: 'Cruise Control', key2: 'dvd_player' },
    { key1: 'DVD Player', key2: 'am_fm_radio' },
    { key1: 'AM/FM Radio', key2: 'immobilizer_key' },
    { key1: 'Immobilizer Key', key2: 'keyless_entry' },
    { key1: 'Keyless Entry', key2: 'navigation_system' },
    { key1: 'Navigation System', key2: 'power_locks' },
    { key1: 'Power Locks', key2: 'power_mirrors' },
    { key1: 'Power Mirrors', key2: 'power_steering' },
    { key1: 'Power Steering', key2: 'power_windows' },
    { key1: 'Power Windows', key2: 'sun_roof' },
    { key1: 'Sun Roof', key2: 'rear_seat_entertainment' },
    { key1: 'Rear Seat Entertainment', key2: 'climate_control' },
    { key1: 'Climate Control', key2: 'rear_ac_vents' },
    { key1: 'Rear AC Vents', key2: 'front_speakers' },
    { key1: 'Front Speakers', key2: 'rear_speakers' },
    { key1: 'Rear Speakers', key2: 'usb_and_auxillary_cable' },
    { key1: 'USB and Auxillary Cable', key2: 'heated_seats' },
    { key1: 'Heated Seats', key2: 'steering_switches' },
    { key1: 'Steering Switches', key2: 'front_camera' },
    { key1: 'Front Camera', key2: 'rear_camera' }
  ]
  // const [realfeatures, setRealfeatures] = useState(car_features);
  const [featurearr, setFeaturearr] = useState(car_features);
  useEffect(() => {
    // if(car_features?.length > 0){
      if(carfeatures){
        setFeaturearr(carfeatures);
      }else{
        setFeaturearr(car_features);
        carrdata(car_features);
      }
 
    // }
  }, [car_features]);
  // if()
  // console.log(carfeatures)

  const addfeature = (value) => {
    if (featurearr.includes(value)) {
      // If value exists in the array, remove it
      const filteredArray = featurearr.filter((item) => item !== value);
      setFeaturearr(filteredArray);
      carrdata(filteredArray); // Pass the updated array directly to carrdata function
    } else {
      // If value doesn't exist in the array, add it
      const updatedArray = [...featurearr, value];
      setFeaturearr(updatedArray);
      carrdata(updatedArray); // Pass the updated array directly to carrdata function
    }
  };

  return (
    <>
      <div className="input_field">
        <i className="bx bxs-car"></i>
        <div style={{ width: "100%" }}>
          <label htmlFor="">Features</label>
          <div
            style={{ display: "flex", flexDirection: "unset" }}
            className="features_div"
          >
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
                      onClick={() => {
                        addfeature(v.key2);
                      }}
                     checked={(featurearr.includes(v.key2) || featurearr.includes(v.key1))? true: false}
                    />
                    <label>{v.key1}</label>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturesModal;
