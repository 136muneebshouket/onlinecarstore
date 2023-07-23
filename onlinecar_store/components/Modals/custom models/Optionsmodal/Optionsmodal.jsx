import React, { useRef, useState, useEffect } from "react";
import carData from "@/components/carsdata/arrays";

const Optionsmodal = ({ isOpen, onClose, modalvalue }) => {
  if (!isOpen) {
    return null;
  }

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
    }
  }, [searchval]);

  const addcar = (b, m, v) => {
    // console.log(b)
    // console.log(m)
    // console.log(v)
    //set states via propes in parent component

    //
    if (v.length !== 0) {
      setVarients(v);
    } else if (v.length == 0) {
      //close model
      onClose();
    }
  };
  const addvarients = (obj) => {
console.log(obj)

  };
  // console.log(varients)

  return (
    <>
      <div className="options_modal">
        <div className="modal">
          <div className="modal-content">
            <div className="modal_head">
              <h2>{modalvalue}</h2>
              <i className="bx bx-x modal-close" onClick={onClose}></i>
            </div>
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
              {varients.length > 0 ? (
                <>
                  {varients.map((obj) => {
                    return (
                      <>
                        <div
                          className="varient_div"
                          onClick={() => {
                            addvarients(obj)
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
                            model.name
                              .toLowerCase()
                              .includes(searchval.toLowerCase())
                          ) {
                            return (
                              <>
                                <p
                                  className="carmodel_name"
                                  key={model.name}
                                  onClick={() => {
                                    addcar(
                                      brand.name,
                                      model.name,
                                      model.variants
                                    );
                                  }}
                                >
                                  {model.name}
                                </p>
                              </>
                            );
                          } else if (
                            brand.name
                              .toLowerCase()
                              .includes(searchval.toLowerCase())
                          ) {
                            return (
                              <>
                                <p
                                  className="carmodel_name"
                                  key={model.name}
                                  onClick={() => {
                                    addcar(
                                      brand.name,
                                      model.name,
                                      model.variants
                                    );
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Optionsmodal;
