import React, { useEffect, useState } from "react";
import cities from "@/components/carsdata/citiesdata";
// import { carData } from "@/components/carsdata/arrays";

const Locationsmodal = ({ onClose, carrdata }) => {
  const [citiesdata, setCitiesdata] = useState([]);
  const [searchval, setSearchval] = useState("");

  useEffect(() => {
    if (searchval !== "") {
      const filtereddata = citiesdata.filter((obj) => {
        if (obj.cityname) {
          if (obj.cityname.toLowerCase().includes(searchval.toLowerCase())) {
            return obj.cityname;
          }
        } else if (obj) {
          if (obj.toLowerCase().includes(searchval.toLowerCase())) {
            return obj;
          }
        }
      });
      setCitiesdata(filtereddata);
    } else {
      setCitiesdata(cities);
      // setModelyears(arrayOfyears);
    }
  }, [searchval]);

  const [location, setLocation] = useState({
   
    city: "",
    area: "",
    
  });

  const addcity = async (obj) => {
    console.log(obj)
    if (obj.cityname) {
      setLocation((s)=>{return {...s,
        ...(obj.cityname && {city:obj.cityname})   
      } })
      carrdata(location);
    }
    if (obj.areas) {
      if (obj.areas.length > 0) {
        setCitiesdata(obj.areas);
      } else {
        onClose();
      }
    } else {
      console.log('i ran')
     await setLocation((s)=>{return {...s, area:obj } })
      onClose();
    }
   
    carrdata(location);
  };
console.log(location)
  return (
    <>
      <div className="caroptions_search">
        <input
          type="search"
          onChange={(e) => {
            setSearchval(e.target.value);
          }}
          placeholder="Type to refine search"
        />
      </div>
      <div className="cars_options">
        {citiesdata.map((obj) => {
          return (
            <>
              <div className="car_option">
                <p
                  style={{ margin: "4px" }}
                  className="carmodel_name"
                  key={obj.cityname ? obj.cityname : obj}
                  onClick={() => {
                    addcity(obj);
                  }}
                >
                  {obj.cityname ? obj.cityname : obj}
                </p>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Locationsmodal;
