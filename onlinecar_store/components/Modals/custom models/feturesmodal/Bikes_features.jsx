import React, { useEffect, useState } from "react";
// import { car_features } from "@/components/processing_functions/features_generations";
// import Context from "@/components/processing_functions/context";
import { useContext } from "react";

const Bikes_features = ({ carrdata ,bike_features}) => {
  const features = [
    "Anti Theft Lock",
    "Disc Brake",
    "Led Light",
    "Wind Shield",
  ];
  // const [realfeatures, setRealfeatures] = useState(car_features);
  const [featurearr, setFeaturearr] = useState([]);

   useEffect(()=>{
    if(bike_features){
      setFeaturearr(bike_features)
    }
   },[bike_features])
  //  console.log(featurearr)
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
                        addfeature(v);
                      }}
                     checked={featurearr.includes(v) ? true: false}
                    />
                    <label>{v}</label>
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

export default Bikes_features;

