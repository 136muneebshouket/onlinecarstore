import React, { useRef, useState, useEffect } from "react";
import { arrayOfyears, carData } from "@/components/carsdata/arrays";
// import from "@/components/carsdata/arrays";

const Cardatamodal = ({ onClose, carrdata }) => {
  const [model_year, setModel_year] = useState(0);
  const [modelyears, setModelyears] = useState([]);
  const [carsoptions, setCarsoptions] = useState([]);
  const [searchval, setSearchval] = useState("");
  const [varients, setVarients] = useState([]);
  // const [brandmatch, setBrandmatch] = useState(false);

  useEffect(() => {
    if (searchval !== "") {
      const filteredCarData = carData.filter((brand) => {
        const brandName = brand.name.toLowerCase();
        const modelNames = brand.models.map((model) =>
          model.name.toLowerCase()
        );

        // Check if the brand name includes the search term
        if (brandName.includes(searchval.toLowerCase())) {
          return brand;
        }

        // Check if any model name includes the search term
        return modelNames.some((name) =>
          name.includes(searchval.toLowerCase())
        );
      });
      setCarsoptions(filteredCarData);
    } else {
      setCarsoptions(carData);
      setModelyears(arrayOfyears);
    }
  }, [searchval]);

  const [cardata_obj, setCardata_obj] = useState({
    modelyear: 0,
    b: "",
    m: "",
    v_name: "",
    duration: "",
    enginecc: "",
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
    cardata_obj.enginecc = enginecc;
    cardata_obj.transmission = transmission;
    cardata_obj.enginetype = enginetype;
    setCardata_obj(cardata_obj);
    await carrdata(cardata_obj);
    onClose();
  };
  // console.log(varients)

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
        {model_year == 0 ? (
          modelyears.map((year) => {
            return (
              <>
                <div className="car_option">
                  <p
                    style={{ cursor: "pointer", margin:"4px" }}
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
                <div className="car_option" key={brand.name}>
                  <p className="cars_brand" style={{ margin: "2px 5px" }}>
                    {brand.name}
                  </p>
                  {brand.models.map((model) => {
                    if (
                      model.name.toLowerCase().includes(searchval.toLowerCase())
                    ) {
                      return (
                        <>
                          <p
                            className="carmodel_name"
                            key={model.name}
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
                            key={model.name}
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

export default Cardatamodal;
