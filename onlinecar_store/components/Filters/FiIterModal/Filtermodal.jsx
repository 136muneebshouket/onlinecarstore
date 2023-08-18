import React, { useState, useCallback, useEffect } from "react";
import colors from "@/components/carsdata/colors";
import Optionsmodal from "@/components/Modals/custom models/Optionsmodal/Optionsmodal";
import ReactSlider from "react-slider";

const Filtermodal = () => {
  const [showcolors, setShowcolors] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalvalue, setModalvalue] = useState("");
  const [currentyear, setCurrentyear] = useState(
    parseInt(new Date().getFullYear())
  );
  const [trustedcars, setTrustedcars] = useState([
    "Certified",
    "Inspected",
    "Auction Sheet Verified",
    "Managed_by_Carselection",
  ]);

  //closing and opening modal /////////////////////////////////////////////////////////////////////////////////
  const handleOpenModal = useCallback((value) => {
    setIsModalOpen(true);
    setModalvalue(value);
  }, []);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const initialState = {
    city: [],
    area: [],
    brand: [],
    modelyear: { after: null, before: null },
    Registered_In: [],
    color: [],
    Mileage: { Gt: null, Lt: null },
    price: { Gt: null, Lt: null },
    enginetype: [],
    model: [],
    enginecc: null,
    transmission: [],
    Assembly: [],
    variant_name: [],
    certified: null,
    inspected: null,
    auction_sheet: null,
    managed_by: null,
  };

  const [carfilters, setCarfilters] = useState(initialState);

  const getfromoptionsmodal = useCallback(
    async (values) => {
      if (values.b) {
        if (!carfilters.brand.includes(values.b)) {
          setCarfilters((prevcarfilters) => ({
            ...prevcarfilters,
            brand: [...prevcarfilters.brand, values.b],
          }));
        }
        if (values.m) {
          if (!carfilters.model.includes(values.m)) {
            setCarfilters((prevcarfilters) => ({
              ...prevcarfilters,
              model: [...prevcarfilters.model, values.m],
            }));
          }
        }

        if (values.v_name) {
          if (!carfilters.variant_name.includes(values.v_name)) {
            setCarfilters((prevcarfilters) => ({
              ...prevcarfilters,
              variant_name: [...prevcarfilters.variant_name, values.v_name],
            }));
          }
        }
      }
      if (values.city) {
        if (!carfilters.city.includes(values.city)) {
          setCarfilters((prevcarfilters) => ({
            ...prevcarfilters,
            city: [...prevcarfilters.city, values.city],
          }));
        }

        if (values.area) {
          if (!carfilters.area.includes(values.area)) {
            setCarfilters((prevcarfilters) => {
              return {
                ...prevcarfilters,
                area: [...prevcarfilters.area, values.area],
              };
            });
          }
        }
      }
      if (values.colorname) {
        setCarfilters((prevcarfilters) => {
          return {
            ...prevcarfilters,
            ...(values.colorname && { color: values.colorname }),
          };
        });
      }
      if (values.registerationin) {
        setCarfilters((prevcarfilters) => {
          return {
            ...prevcarfilters,
            Registered_In: [
              ...prevcarfilters.Registered_In,
              values.registerationin,
            ],
          };
        });
      }
    },
    [carfilters]
  );

  const delfilters = (field, index) => {
    const key = field;

    if (key in carfilters) {
      const updatedArray = carfilters[key].filter((_, i) => i !== index);
      // initialState.city = updatedArray
      // setCarfilters(initialState)
      setCarfilters((prevcarfilters) => ({
        ...prevcarfilters,
        [key]: updatedArray,
      }));
    }
  };

  const add_trusted_filter=(field)=>{
    const key = field;
    // console.log(carfilters[key])
   
    if(carfilters[key] == false || carfilters[key] == null){
      setCarfilters((prevcarfilters) => ({
              ...prevcarfilters,
              [key]: true,
            }));
    }
    if(carfilters[key] == true ){
      setCarfilters((prevcarfilters) => ({
              ...prevcarfilters,
              [key]: false,
            }));
    }

  }
console.log(carfilters)
  const add_del_btn_filters = (field, index) => {
    const key = field;

    if (key in carfilters) {
      if (carfilters[key].includes(v)) {
        const updatedArray = carfilters[key].filter((_, i) => i !== index);
        setCarfilters((prevcarfilters) => ({
          ...prevcarfilters,
          [key]: updatedArray,
        }));
      } else {
        setCarfilters((prevcarfilters) => ({
          ...prevcarfilters,
          [key]: updatedArray,
        }));
      }
    }
  };
  // console.log(carfilters.modelyear);
  // console.log(citty);

  const [GT, setGT] = useState("0");
  const [LT, setLT] = useState("Any");

  const [milageGT, setmilageGT] = useState("0");
  const [milageLT, setmilageLT] = useState("Any");

  useEffect(() => {
    if (carfilters.price.Gt) {
      if (carfilters.price.Gt >= 10000000) {
        setGT(`${carfilters.price.Gt / 10000000} crore`);
      } else if (carfilters.price.Gt >= 100000) {
        setGT(`${carfilters.price.Gt / 100000} lakh`);
      } else if (carfilters.price.Gt >= 1000) {
        setGT(`${carfilters.price.Gt / 1000} thousand`);
      } else {
        setGT(carfilters.price.Gt);
      }
    }
    if (carfilters.price.Lt) {
      if (carfilters.price.Lt >= 10000000) {
        setLT(`${carfilters.price.Lt / 10000000} crore`);
      } else if (carfilters.price.Lt >= 100000) {
        setLT(`${carfilters.price.Lt / 100000} lakh`);
      } else if (carfilters.price.Lt >= 1000) {
        setLT(`${carfilters.price.Lt / 1000} thousand`);
      } else {
        setLT(carfilters.price.Lt);
      }
    }

    if (carfilters.Mileage.Gt) {
      if (carfilters.Mileage.Gt >= 10000000) {
        setmilageGT(`${carfilters.Mileage.Gt / 10000000} crore`);
      } else if (carfilters.Mileage.Gt >= 100000) {
        setmilageGT(`${carfilters.Mileage.Gt / 100000} lakh`);
      } else if (carfilters.Mileage.Gt >= 1000) {
        setmilageGT(`${carfilters.Mileage.Gt / 1000} thousand`);
      } else {
        setmilageGT(carfilters.Mileage.Gt);
      }
    }
    if (carfilters.Mileage.Lt) {
      if (carfilters.Mileage.Lt >= 10000000) {
        setmilageLT(`${carfilters.Mileage.Lt / 10000000} crore`);
      } else if (carfilters.Mileage.Lt >= 100000) {
        setmilageLT(`${carfilters.Mileage.Lt / 100000} lakh`);
      } else if (carfilters.Mileage.Lt >= 1000) {
        setmilageLT(`${carfilters.Mileage.Lt / 1000} thousand`);
      } else {
        setmilageLT(carfilters.Mileage.Lt);
      }
    }
  }, [carfilters.price, carfilters.Mileage]);
  // console.log(GT);
  // console.log(carfilters.Mileage);
  // console.log(LT);

  return (
    <>
      <div className="filtermodal">
        <div className="head_banner">
          <p>Refine your search</p>
        </div>
        <div className="head_banner apllied_filters"></div>

        <div className="input_field">
          <i className="bx bxs-car"></i>
          <div>
            <label
              htmlFor="location"
              onClick={() => {
                handleOpenModal("Location");
              }}
            >
              Location <i className="bx bx-chevron-down"></i>{" "}
            </label>
            <div className="related_filters">
              {carfilters.city.length > 0 && (
                <>
                  {carfilters.city.map((v, index) => (
                    <span key={index}>
                      {v}
                      <button
                        className="small_btns"
                        onClick={() => {
                          delfilters("city", index);
                        }}
                      >
                        &#10006;
                      </button>
                    </span>
                  ))}
                  <button
                    className="small_btns addbtn"
                    onClick={() => {
                      handleOpenModal("Location");
                    }}
                  >
                    &#43;
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        {carfilters.area.length > 0 && (
          <div className="input_field">
            <i className="bx bxs-car"></i>
            <div>
              <label
                htmlFor="location"
                onClick={() => {
                  handleOpenModal("Location");
                }}
              >
                Areas <i className="bx bx-chevron-down"></i>{" "}
              </label>
              <div className="related_filters">
                {carfilters.area.map((v, index) => (
                  <span key={index}>
                    {v}
                    <button
                      className="small_btns"
                      onClick={() => {
                        delfilters("area", index);
                      }}
                    >
                      &#10006;
                    </button>
                  </span>
                ))}
                <button
                  className="small_btns addbtn"
                  onClick={() => {
                    handleOpenModal("Location");
                  }}
                >
                  &#43;
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="input_field">
          <i className="bx bxs-car"></i>
          <div>
            <label
              htmlFor="location"
              onClick={() => {
                handleOpenModal("Car Model");
              }}
            >
              Car Make <i className="bx bx-chevron-down"></i>{" "}
            </label>
            <div className="related_filters">
              {carfilters.brand.length > 0 && (
                <>
                  {carfilters.brand.map((v, index) => (
                    <span key={index}>
                      {v}
                      <button
                        className="small_btns"
                        onClick={() => {
                          delfilters("brand", index);
                        }}
                      >
                        &#10006;
                      </button>
                    </span>
                  ))}
                  <button
                    className="small_btns addbtn"
                    onClick={() => {
                      handleOpenModal("Car Model");
                    }}
                  >
                    &#43;
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        {carfilters.model.length > 0 && (
          <>
            <div className="input_field">
              <i className="bx bxs-car"></i>
              <div>
                <label
                  htmlFor="location"
                  onClick={() => {
                    handleOpenModal("Car Model");
                  }}
                >
                  Car Models <i className="bx bx-chevron-down"></i>{" "}
                </label>
                <div className="related_filters">
                  {carfilters.model.length > 0 && (
                    <>
                      {carfilters.model.map((v, index) => (
                        <span key={index}>
                          {v}
                          <button
                            className="small_btns"
                            onClick={() => {
                              delfilters("model", index);
                            }}
                          >
                            &#10006;
                          </button>
                        </span>
                      ))}
                      <button
                        className="small_btns addbtn"
                        onClick={() => {
                          handleOpenModal("Car Model");
                        }}
                      >
                        &#43;
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
        {carfilters.variant_name.length > 0 && (
          <>
            <div className="input_field">
              <i className="bx bxs-car"></i>
              <div>
                <label
                  htmlFor="location"
                  onClick={() => {
                    handleOpenModal("Car Model");
                  }}
                >
                  Car variants <i className="bx bx-chevron-down"></i>{" "}
                </label>
                <div className="related_filters">
                  {carfilters.variant_name.length > 0 && (
                    <>
                      {carfilters.variant_name.map((v, index) => (
                        <span key={index}>
                          {v}
                          <button
                            className="small_btns"
                            onClick={() => {
                              delfilters("variant_name", index);
                            }}
                          >
                            &#10006;
                          </button>
                        </span>
                      ))}
                      <button
                        className="small_btns addbtn"
                        onClick={() => {
                          handleOpenModal("Car Model");
                        }}
                      >
                        &#43;
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
        <div className="ranges">
          <div className="input_field" style={{ border: "none" }}>
            <i className="bx bxs-car"></i>
            <div>
              <label htmlFor="location">Price Range(PKR)</label>
            </div>
          </div>
          <div className="range_inputs">
            <input
              type="number"
              value={carfilters.price.Gt !== null && carfilters.price.Gt}
              placeholder="0"
              onChange={(e) => {
                e.target.value >= 0 &&
                  setCarfilters((prev) => ({
                    ...prev,
                    price: { ...prev.price, Gt: parseInt(e.target.value) },
                  }));
              }}
            />
            <span>to</span>
            <input
              type="number"
              value={carfilters.price.Lt !== null && carfilters.price.Lt}
              placeholder="Any"
              onChange={(e) => {
                e.target.value >= 0 &&
                  setCarfilters((prev) => ({
                    ...prev,
                    price: { ...prev.price, Lt: parseInt(e.target.value) },
                  }));
              }}
            />
          </div>
          <div className="range_figure">
            <span>{carfilters.price.Gt !== null ? GT : "0"}</span>
            <span>{carfilters.price.Lt !== null ? LT : "any"}</span>
          </div>
          <div className="range_line">
            <ReactSlider
              className="horizontal-slider"
              thumbClassName="example-thumb"
              trackClassName="example-track"
              defaultValue={[0, 100]}
              ariaLabel={["Lower thumb", "Upper thumb"]}
              ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
              onChange={(props, state) => {
                if (
                  props[0] == 0
                  //  && carfilters.price.Gt < 10
                ) {
                  setCarfilters((prev) => ({
                    ...prev,
                    price: { ...prev.price, Gt: null },
                  }));
                }
                if (props[1] == 100) {
                  setCarfilters((prev) => ({
                    ...prev,
                    price: { ...prev.price, Lt: null },
                  }));
                }
                if (props[0] != 0) {
                  setCarfilters((prev) => ({
                    ...prev,
                    price: { ...prev.price, Gt: props[0] * 50000 },
                  }));
                }
                if (props[1] != 100) {
                  setCarfilters((prev) => ({
                    ...prev,
                    price: { ...prev.price, Lt: props[1] * 50000 },
                  }));
                }
              }}
              pearling
              minDistance={0}
            />
          </div>
        </div>

        <div className="ranges">
          <div className="input_field" style={{ border: "none" }}>
            <i className="bx bxs-car"></i>
            <div>
              <label htmlFor="location">Model Year Range</label>
            </div>
          </div>
          <div className="range_inputs">
            <input
              type="number"
              placeholder="1980"
              value={
                carfilters.modelyear.after !== null &&
                carfilters.modelyear.after
              }
              onChange={(e) => {
                e.target.value >= 0 &&
                  setCarfilters((prev) => ({
                    ...prev,
                    modelyear: {
                      ...prev.modelyear,
                      after: parseInt(e.target.value),
                    },
                  }));
              }}
            />
            <span>to</span>
            <input
              type="number"
              placeholder={currentyear}
              value={
                carfilters.modelyear.before !== null &&
                carfilters.modelyear.before
              }
              onChange={(e) => {
                e.target.value >= 0 &&
                  setCarfilters((prev) => ({
                    ...prev,
                    modelyear: {
                      ...prev.modelyear,
                      before: parseInt(e.target.value),
                    },
                  }));
              }}
            />
          </div>
          <div className="range_line">
            <ReactSlider
              className="horizontal-slider"
              thumbClassName="example-thumb"
              trackClassName="example-track"
              defaultValue={[1980, currentyear]}
              min={1980}
              max={currentyear}
              ariaLabel={["Lower thumb", "Upper thumb"]}
              ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
              onChange={(props, state) => {
                if (props[0] == 1980) {
                  setCarfilters((prev) => ({
                    ...prev,
                    modelyear: { ...prev.modelyear, after: null },
                  }));
                }
                if (props[1] == currentyear) {
                  setCarfilters((prev) => ({
                    ...prev,
                    modelyear: { ...prev.modelyear, before: null },
                  }));
                }
                if (props[0] != 1980) {
                  setCarfilters((prev) => ({
                    ...prev,
                    modelyear: { ...prev.modelyear, after: props[0] },
                  }));
                }
                if (props[1] != currentyear) {
                  setCarfilters((prev) => ({
                    ...prev,
                    modelyear: { ...prev.modelyear, before: props[1] },
                  }));
                }
              }}
              pearling
              minDistance={0}
            />
          </div>
        </div>

        <div className="ranges">
          <div className="input_field" style={{ border: "none" }}>
            <i className="bx bxs-car"></i>
            <div>
              <label htmlFor="location">KM's Driven</label>
            </div>
          </div>
          <div className="range_inputs">
            <input
              type="number"
              placeholder="0"
              value={carfilters.Mileage.Gt !== null && carfilters.Mileage.Gt}
              onChange={(e) => {
                e.target.value >= 0 &&
                  setCarfilters((prev) => ({
                    ...prev,
                    Mileage: { ...prev.Mileage, Gt: parseInt(e.target.value) },
                  }));
              }}
            />
            <span>to</span>
            <input
              type="number"
              placeholder="Any"
              value={carfilters.Mileage.Lt !== null && carfilters.Mileage.Lt}
              onChange={(e) => {
                e.target.value >= 0 &&
                  setCarfilters((prev) => ({
                    ...prev,
                    Mileage: { ...prev.Mileage, Lt: parseInt(e.target.value) },
                  }));
              }}
            />
          </div>
          <div className="range_figure">
            <span>{carfilters.Mileage.Gt !== null ? milageGT : "0"}</span>
            <span>{carfilters.Mileage.Lt !== null ? milageLT : "Any"}</span>
          </div>
          <div className="range_line">
            <ReactSlider
              className="horizontal-slider"
              thumbClassName="example-thumb"
              trackClassName="example-track"
              defaultValue={[0, 500000]}
              min={0}
              max={500000}
              ariaLabel={["Lower thumb", "Upper thumb"]}
              ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
              onChange={(props, state) => {
                // console.log(props[0],props[1])
                if (props[0] == 0) {
                  setCarfilters((prev) => ({
                    ...prev,
                    Mileage: { ...prev.Mileage, Gt: null },
                  }));
                }
                if (props[1] == 500000) {
                  setCarfilters((prev) => ({
                    ...prev,
                    Mileage: { ...prev.Mileage, Lt: null },
                  }));
                }
                if (props[0] != 0) {
                  setCarfilters((prev) => ({
                    ...prev,
                    Mileage: { ...prev.Mileage, Gt: props[0] },
                  }));
                }
                if (props[1] != 500000) {
                  setCarfilters((prev) => ({
                    ...prev,
                    Mileage: { ...prev.Mileage, Lt: props[1] },
                  }));
                }
              }}
              pearling
              minDistance={0}
            />
          </div>
        </div>

        <div className="input_field">
          <i className="bx bxs-car"></i>
          <div>
            <label
              htmlFor="location"
              onClick={() => {
                handleOpenModal("Registration");
              }}
            >
              Registered In <i className="bx bx-chevron-down"></i>
            </label>
            <div className="related_filters">
              {carfilters.Registered_In.length > 0 && (
                <>
                  {carfilters.Registered_In.map((v, index) => (
                    <span key={index}>
                      {v}
                      <button
                        className="small_btns"
                        onClick={() => {
                          delfilters("Registered_In", index);
                        }}
                      >
                        &#10006;
                      </button>
                    </span>
                  ))}
                  <button
                    className="small_btns addbtn"
                    onClick={() => {
                      handleOpenModal("Registration");
                    }}
                  >
                    &#43;
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="input_field">
          <i className="bx bxs-car"></i>
          <div>
            <label htmlFor="location">Trusted Cars</label>
            <div className="related_filters">
              {trustedcars.map((v, index) => {
                return (
                  <>
                    <span
                    // className={ }
                    style={{border:`${carfilters[v] ? '1px solid blue' : ''}`}}
                      key={index}
                      onClick={() => {
                        add_trusted_filter(v);
                      }}
                    >
                      {v}
                    </span>
                  </>
                );
              })}
     
            </div>
          </div>
         
        </div>

        <div className="input_field">
          <i className="bx bxs-car"></i>
          <div>
            <label htmlFor="location">Transmission</label>
            <div className="related_filters">
              <span>Automatic</span>
              <span>Manual</span>
            </div>
          </div>
          {/* <i className="bx bx-chevron-down"></i> */}
        </div>

        <div className="input_field ">
          <i className="bx bxs-car"></i>
          <div>
            <label htmlFor="location">Body Color</label>
            <div
              className="related_filters filter_colorsoption"
              style={{ maxHeight: `${showcolors ? "1000px" : "100px"}` }}
            >
              {colors.map((Obj, index) => {
                return (
                  <>
                    <span
                      style={{ display: "flex", alignItems: "center" }}
                      key={index}
                    >
                      <div
                        className="color_span"
                        style={{ background: `${Obj.colorcode}` }}
                      ></div>
                      <span>{Obj.colorname}</span>
                    </span>
                  </>
                );
              })}
            </div>
            <span
              onClick={() => {
                setShowcolors(!showcolors);
              }}
              className="see_morebtn"
            >
              see more &rArr;
            </span>
          </div>
          {/* <i className="bx bx-chevron-down"></i> */}
        </div>

        <div className="input_field ">
          <i className="bx bxs-car"></i>
          <div>
            <label htmlFor="location">Fuel Type</label>
            <div className="related_filters">
              <span>Petrol</span>
              <span>Diesel</span>
              <span>Hybrid</span>
              <span>Electric</span>
              <span>CNG</span>
              <span>LPG</span>
            </div>
          </div>
          {/* <i className="bx bx-chevron-down"></i> */}
        </div>

        <div className="ranges">
          <div className="input_field" style={{ border: "none" }}>
            <i className="bx bxs-car"></i>
            <div>
              <label htmlFor="location">Engine Capacity (cc)</label>
            </div>
          </div>
          <div className="range_inputs">
            <input type="number" /> <span>to</span> <input type="number" />
          </div>
          <div className="range_line">
            <ReactSlider
              className="horizontal-slider"
              thumbClassName="example-thumb"
              trackClassName="example-track"
              defaultValue={[0, 100]}
              ariaLabel={["Lower thumb", "Upper thumb"]}
              ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
              onChange={(props, state) => {
                console.log(...props);
                // console.log(props[0])
                // console.log(props[1])
              }}
              pearling
              minDistance={0}
            />
          </div>
        </div>

        <div className="input_field ">
          <i className="bx bxs-car"></i>
          <div>
            <label htmlFor="location">Assembly</label>
            <div className="related_filters">
              <span>Local</span>
              <span>Imported</span>
            </div>
          </div>
          {/* <i className="bx bx-chevron-down"></i> */}
        </div>

        <div className="input_field ">
          <i className="bx bxs-car"></i>
          <div>
            <label htmlFor="location">Seller Type</label>
            <div className="related_filters">
              <span>Individuals</span>
              <span>dealers</span>
            </div>
          </div>
          {/* <i className="bx bx-chevron-down"></i> */}
        </div>

        <div className="input_field ">
          <i className="bx bxs-car"></i>
          <div>
            <label htmlFor="location">Ad Properties</label>
            <div className="related_filters">
              <span>Picture Ads</span>
              <span>Feature Ads</span>
              <span>Video Ads</span>
            </div>
          </div>
          {/* <i className="bx bx-chevron-down"></i> */}
        </div>
      </div>

      {isModalOpen && (
        <Optionsmodal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          modalvalue={modalvalue}
          carrdata={getfromoptionsmodal}
          filtercarmodal={true}
        />
      )}
    </>
  );
};

export default Filtermodal;
