import React, { useEffect, useMemo, useState, useCallback } from "react";
import cities from "@/components/carsdata/citiesdata";
// import { carData } from "@/components/carsdata/arrays";

const Registeroptionsmodal = ({ onClose, carrdata }) => {
  const [citiesdata, setCitiesdata] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [searchval, setSearchval] = useState("");
  // const [arraychange, setArraychange] = useState(false);

  // const filter = useMemo(() => {
  useEffect(() => {
    setCitiesdata(cities);
    setOriginalData(cities);
  }, []);
  //
//   const filter = useMemo(() => {
//     if (searchval !== "") {
//     const filteredCities = cities.filter((city) => {
//         const brandName = city.name.toLowerCase();
//       const modelNames = city.cities.map((cityname) => cityname.cityname.toLowerCase());

//        // Check if the brand name includes the search term
//        if (brandName.includes(searchval.toLowerCase())) {
//         return city;
//       }
//     //   console.log(modelNames)
//       // Check if any model name includes the search term
//       return modelNames.some((name) => name.includes(searchval.toLowerCase()));
//     });
//     // console.log(filteredCities)
//     setCitiesdata(filteredCities);
//     } else {
//         setCitiesdata(originalData);
//     }
//   }, [searchval,originalData]);

  const [location, setLocation] = useState({
    registerationin: "",
  });

  const addcity = async (city) => {
    location.registerationin=city;
    setLocation(city);
   await carrdata(location);
   onClose();
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
          // autoFocus
        />
      </div>
      <p className="options_guide">City of Registration</p>
      <div className="cars_options">
        {citiesdata.length > 0 ? (
          citiesdata.map((obj, index) => {
            return (
              <>
                <div className="car_option" key={index}>
                  <p className="cars_brand" style={{ margin: "2px 5px" }}>
                    {obj.name}
                  </p>
                  {obj.cities.map((cities, index) => {
                    if(cities.cityname.toLowerCase().includes(searchval.toLowerCase())){
                        return (
                            <>
                              <p
                                style={{ margin: "4px" }}
                                className="carmodel_name"
                                key={index}
                                onClick={() => {
                                  addcity(cities.cityname);
                                }}
                              >
                                {cities.cityname}
                              </p>
                            </>
                          );
                    }
                   
                  })}
                </div>
              </>
            );
          })
        ) : (
          <>not found</>
        )}
      </div>
    </>
  );
};

export default React.memo(Registeroptionsmodal);
