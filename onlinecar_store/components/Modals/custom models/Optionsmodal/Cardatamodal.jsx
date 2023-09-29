import React, { useRef, useState, useEffect, useMemo } from "react";
import { arrayOfyears } from "@/components/carsdata/arrays";
import final_carsdata from '../../../carsdata/final_carsdata'
import {feature_generation} from "@/components/processing_functions/features_generations";


const Cardatamodal = ({ onClose, carrdata, filtermodal }) => {

// const cardata = JSON.parse(final_carsdata)  
// console.log(final_carsdata)

  const [model_year, setModel_year] = useState(null);
  const [modelyears, setModelyears] = useState(arrayOfyears);
  const [carsoptions, setCarsoptions] = useState(final_carsdata);
  const [searchval, setSearchval] = useState("");
  const [varients, setVarients] = useState([]);
  // const [brandmatch, setBrandmatch] = useState(false);
  useEffect(() => {
    filtermodal && setModel_year(0);
  }, []);

  //  console.log('im rendering')
  const filter = useMemo(() => {
    // if (searchval !== "") {
    const filteredCarData = final_carsdata.filter((brand) => {
      const brandName = brand.name.toLowerCase();
      const modelNames = brand.models.map((model) => model.name.toLowerCase());

      // Check if the brand name includes the search term
      if (brandName.includes(searchval.toLowerCase())) {
        return brand;
      }

      // Check if any model name includes the search term
      return modelNames.some((name) => name.includes(searchval.toLowerCase()));
    });
    setCarsoptions(filteredCarData);
    // } else {
    //   setCarsoptions(carData);
    //   setModelyears(arrayOfyears);
    // }
  }, [searchval]);

  const [cardata_obj, setCardata_obj] = useState({
    modelyear: null,
    b: "",
    m: "",
    v_name: "",
    duration: "",
    enginecc: null,
    transmission: "",
    enginetype: "",
  });

  // adding barnd  and model
  const addcar = (b, m, v) => {
    if (v.length !== 0) {
      setVarients(v);
    } else if (v.length == 0) {
      //close model
      onClose();
    }

    //set data
    cardata_obj.modelyear = model_year;
    cardata_obj.b = b;
    cardata_obj.m = m;
    setCardata_obj(cardata_obj);
    carrdata(cardata_obj);
  };

  // adding varients and features
  const addvarients = async (obj) => {
    // console.log(obj)

    const enginecc = obj.specs.split(",")[0];
    const transmission = obj.specs.split(",")[1];
    const enginetype = obj.specs.split(",")[2];

    cardata_obj.duration = obj.duration;
    cardata_obj.v_name = obj.variant_name;
    cardata_obj.enginecc = parseInt(enginecc.split("c")[0]);
    cardata_obj.transmission = transmission.trim();
    cardata_obj.enginetype = enginetype.trim();
    setCardata_obj(cardata_obj);
    await carrdata(cardata_obj);
    // console.log(obj.Features)
    obj.Features && feature_generation(obj.Features)
    onClose();
  };
  // console.log(varients)

  //adding only brand for filtercarmodel

  async function addonlybrand(b) {
    if (filtermodal == true) {
      cardata_obj.b = b;
      await setCardata_obj(cardata_obj);
      await carrdata(cardata_obj);
      onClose();
    }
  }

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
      <p className="options_guide">
        {model_year === null ? (
          <>Select year of Car Model</>
        ) : (
          <>
            {cardata_obj.b === "" ? (
              <>Select Brand and Model</>
            ) : (
              <>Select Varient of Model</>
            )}
          </>
        )}
      </p>
      <div className="cars_options">
        {model_year == null ? (
          modelyears.map((year) => {
            return (
              <>
                <div className="car_option">
                  <p
                    style={{ cursor: "pointer", margin: "4px" }}
                    className="carmodel_name"
                    key={year}
                    onClick={() => {
                      setModel_year(year);
                    }}
                  >
                    {year}
                  </p>
                </div>
              </>
            );
          })
        ) : varients.length > 0 ? (
          <>
            {varients.map((obj) => {
              return (
                <>
                  <div
                    className="varient_div"
                    onClick={() => {
                      addvarients(obj);
                    }}
                  >
                    <p>{obj.duration}</p>
                    <p>{obj.variant_name}</p>
                    <p>{obj.specs}</p>
                  </div>
                </>
              );
            })}
          </>
        ) : carsoptions.length > 0 ? (
          carsoptions.map((brand, index) => {
            return (
              <>
                <div className="car_option" key={index}>
                  <p
                    className="cars_brand"
                    style={{ margin: "2px 5px" }}
                    onClick={() => {
                      addonlybrand(brand.name);
                    }}
                  >
                    {brand.name}
                  </p>
                  {filtermodal && (
                    <p
                      className="carmodel_name"
                      key={index}
                      onClick={() => {
                        addonlybrand(brand.name);
                      }}
                    >
                      All Models
                    </p>
                  )}
                  {brand.models.map((model, index) => {
                    if (
                      model.name.toLowerCase().includes(searchval.toLowerCase())
                    ) {
                      return (
                        <>
                          <p
                            className="carmodel_name"
                            key={index}
                            onClick={() => {
                              addcar(brand.name, model.name, model.variants);
                            }}
                          >
                            {model.name}
                          </p>
                        </>
                      );
                    } else if (
                      brand.name.toLowerCase().includes(searchval.toLowerCase())
                    ) {
                      return (
                        <>
                          <p
                            className="carmodel_name"
                            key={index}
                            onClick={() => {
                              addcar(brand.name, model.name, model.variants);
                            }}
                          >
                            {model.name}
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
          <>
            <div>sorry not found</div>
          </>
        )}
      </div>
    </>
  );
};

export default React.memo(Cardatamodal);
