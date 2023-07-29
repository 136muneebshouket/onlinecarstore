import React, { useEffect, useMemo, useState,useCallback } from "react";
import cities from "@/components/carsdata/citiesdata";
// import { carData } from "@/components/carsdata/arrays";

const Locationsmodal = ({ onClose, carrdata }) => {
  

  const [citiesdata, setCitiesdata] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [searchval, setSearchval] = useState("");
  // const [arraychange, setArraychange] = useState(false);

  // const filter = useMemo(() => {
    useEffect(()=>{
      setCitiesdata(cities[1].cities);
      setOriginalData(cities[1].cities); 
    },[])
    // 
    useEffect(() => {
      // Apply filtering only when the search input is not empty
      if (searchval !== "") {
        const filteredData = originalData.filter((obj) => {
          if (obj.cityname) {
            return obj.cityname.toLowerCase().includes(searchval.toLowerCase());
          }
          return obj.toLowerCase().includes(searchval.toLowerCase());
        });
        setCitiesdata(filteredData);
      } else {
        // Reset citiesdata to the original data when the search input is empty
        setCitiesdata(originalData);
      }
    }, [searchval, originalData]);

  const [location, setLocation] = useState({
   
    city: "",
    area: "",
    
  });

  const addcity = async (obj) => {
    // console.log(obj)
    if (obj.cityname) {
    location.city=obj.cityname;
     setLocation(location);
     await carrdata(location);
    }
    if (obj.areas) {
      if (obj.areas.length > 0) {
        // setArraychange(true)
        setCitiesdata(obj.areas);
        setOriginalData(obj.areas)
      } else {
        onClose();
      }
    } else {
      // console.log('i ran')
    //  await setLocation((s)=>{return {...s, area:obj } })
    location.area=obj;
    setLocation(location);
    await carrdata(location);
      onClose();
    }
  };

// console.log(originalData.length)
  return (
    <>
      <div className="caroptions_search">
        <input
          type="search"
          onChange={(e) => {
            setSearchval(e.target.value);
          }}
          placeholder="Type to refine search"
          autoFocus
        />
      </div>
      <p className="options_guide">{location.city !== '' ? <>Select area/town in {location.city}</>:<>Select City</>}</p>
      <div className="cars_options">
         
        {citiesdata.length > 0 ? (
        citiesdata.map((obj,index) => {
          return (
            <>
           
              <div className="car_option">
                <p
                  style={{ margin: "4px" }}
                  className="carmodel_name"
                  key={index}
                  onClick={() => {
                    addcity(obj);
                  }}
                >
                  {obj.cityname ? obj.cityname : obj}
                </p>
              </div>
            </>
          );
        })
        ):<>not found</>
      }
      </div>
    </>
  );
};

export default React.memo(Locationsmodal);
