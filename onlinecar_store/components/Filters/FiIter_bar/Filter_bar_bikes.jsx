import React, { useState, useCallback, useEffect } from "react";
import colors from "@/components/carsdata/colors";
import Image from "next/image";
import { bodyTypeArray } from "../Options-sliders/optionsarray";
import Optionsmodal from "@/components/Modals/custom models/Option_modals/Optionsmodal";
import price_converter from "@/components/processing_functions/Price_calculator";
import ReactSlider from "react-slider";
import { useRouter } from "next/router";

const Filter_bar_bikes = ({ getfilters, description }) => {
  const router = useRouter();

  const [showcolors, setShowcolors] = useState(false);
  const [showbodytypes, setShowbodytypes] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalvalue, setModalvalue] = useState("");
  const [currentyear, setCurrentyear] = useState(
    parseInt(new Date().getFullYear())
  );
  const [trustedcars, setTrustedcars] = useState([
    { v: "Certified", field: "certified" },
    { v: "Inspected", field: "inspected" },
    { v: "Auction Sheet Verified", field: "auction_sheet" },
    { v: "Managed_by_Carselection", field: "managed_by" },
  ]);
  const [fueltype, setFueltype] = useState([
    "2 Stroke",
    "4 Stroke",
    "Electric",
  ]);

  // const [finalfilters, setFinalfilters] = useState({});

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
    Mileage: { Gt: null, Lt: null },
    price: { Gt: null, Lt: null },
    enginetype: [],
    body_type:[],
    model: [],
  };

  const [carfilters, setCarfilters] = useState(initialState);
//  console.log(carfilters)
  useEffect(() => {
    let filters = router.query.filters;

    let appliedfilters = {};
    if (filters) {
      try {
        let queryobj = JSON.parse(filters);

        Object.entries(queryobj).map(([key, value]) => {
          if (typeof value === "string") {
            appliedfilters[key] = JSON.parse(value);
          } else {
            appliedfilters[key] = value;
          }
        });
      } catch (error) {
        console.log(error);
      }
    }

    // showing applied filters ....to user
    Object.entries(appliedfilters).map(([key, value]) => {
      Object.entries(carfilters).map(([key2, value2]) => {
        if (key2 == key) {
          if (Array.isArray(value)) {
            setCarfilters((prev) => ({ ...prev, [key2]: value }));
          } else if (typeof value == "object") {
            const inkey = Object.keys(value);
            const inkey2 = Object.keys(value2);
            if (inkey.length > 1) {
              if (inkey[0] == "$gt") {
                setCarfilters((prev) => ({
                  ...prev,
                  [key2]: { ...prev[key2], [inkey2[0]]: value[inkey[0]] },
                }));
              }
              if (inkey[1] == "$lt") {
                setCarfilters((prev) => ({
                  ...prev,
                  [key2]: { ...prev[key2], [inkey2[1]]: value[inkey[1]] },
                }));
              }
            } else {
              if (inkey[0] == "$gt") {
                setCarfilters((prev) => ({
                  ...prev,
                  [key2]: { ...prev[key2], [inkey2[0]]: value[inkey[0]] },
                }));
              } else if (inkey[0] == "$lt") {
                setCarfilters((prev) => ({
                  ...prev,
                  [key2]: { ...prev[key2], [inkey2[1]]: value[inkey[0]] },
                }));
              }
            }
          } else if (typeof value == "boolean") {
            setCarfilters((prev) => ({ ...prev, [key2]: value }));
          }
          //  console.log(typeof value)
          // console.log(value2,value)
        }
      });
      // console.log(initialState)
    });
    //  console.log(appliedfilters)

    // generating discription etc from applied filters
    let fitersstr = "Used Cars for Sale in Pakistan";
    if (Object.keys(appliedfilters).length > 0) {
      let color = appliedfilters.color ? appliedfilters.color : null;
      let brand = appliedfilters.brand ? appliedfilters.brand : "Cars";
      let model = appliedfilters.model ? appliedfilters.model : null;
      let varients = appliedfilters.variant_name
        ? appliedfilters.variant_name
        : null;
      let enginetype = appliedfilters.enginetype
        ? ` ${appliedfilters.enginetype}`
        : null;
      let transmission = appliedfilters.transmission
        ? appliedfilters.transmission
        : null;
      let Assembly = appliedfilters.Assembly
        ? ` ${appliedfilters.Assembly}`
        : null;
      let enginecc = null;
      if (appliedfilters.enginecc) {
        // console.log(appliedfilters.enginecc)
        if (Object.keys(appliedfilters.enginecc).length > 1) {
          enginecc = ` from ${appliedfilters.enginecc.$gt}cc to ${appliedfilters.enginecc.$lt}cc`;
        }
        if (Object.keys(appliedfilters.enginecc).length == 1) {
          enginecc = ` under ${appliedfilters.enginecc.$lt}cc`;
        }
      }
      let year = null;
      if (appliedfilters.modelyear) {
        // console.log(appliedfilters.enginecc)
        if (Object.keys(appliedfilters.modelyear).length > 1) {
          year = ` from ${appliedfilters.modelyear.$gt} to ${appliedfilters.modelyear.$lt}`;
        }
        if (
          Object.keys(appliedfilters.modelyear).length == 1 &&
          Object.keys(appliedfilters.modelyear).includes("$lt")
        ) {
          year = ` before ${appliedfilters.modelyear.$lt}`;
        }
      }
      let location = appliedfilters.city ? appliedfilters.city : "Pakistan";
      let area = appliedfilters.area ? `in ${appliedfilters.area}` : null;
      let certified = appliedfilters.certified ? `Certified` : null;
      let sheet = appliedfilters.auction_sheet
        ? `Auction Sheet Verified Cars`
        : null;

      // let year = appliedfilters.Assembly ? appliedfilters.Assembly :'';

      fitersstr = `${color && color} ${brand} ${model && model} ${
        varients && varients
      } ${
        transmission
          ? transmission
          : Assembly
          ? Assembly
          : enginetype
          ? enginetype
          : enginecc && enginecc
      } ${certified && certified} ${sheet && sheet} ${
        year && year
      } for sale in ${location} ${area && area}`;
      //  console.log(fitersstr)
      let trimed = fitersstr.split(" ");
      // console.log(trimed)
      let newdescription = trimed.filter((v) => {
        return v != "null";
      });
      //  console.log(newdescription.join(' '))
      description(newdescription.join(" "));
    } else {
      description(fitersstr);
    }
    // console.log(queryobj)
  }, []);

  // console.log(carfilters)

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
    //   if (values.colorname) {
    //     setCarfilters((prevcarfilters) => {
    //       return {
    //         ...prevcarfilters,
    //         ...(values.colorname && { color: values.colorname }),
    //       };
    //     });
    //   }
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

  const add_trusted_filter = (field) => {
    const key = field;
    // console.log(carfilters[key])

    if (carfilters[key] == false || carfilters[key] == null) {
      setCarfilters((prevcarfilters) => ({
        ...prevcarfilters,
        [key]: true,
      }));
    }
    if (carfilters[key] == true) {
      setCarfilters((prevcarfilters) => ({
        ...prevcarfilters,
        [key]: null,
      }));
    }
  };

  const add_del_btn_filters = (field, v) => {
    const key = field;

    if (key in carfilters) {
      if (carfilters[key].includes(v)) {
        const updatedArray = carfilters[key].filter((val) => val !== v);
        setCarfilters((prevcarfilters) => ({
          ...prevcarfilters,
          [key]: updatedArray,
        }));
      } else {
        setCarfilters((prevcarfilters) => ({
          ...prevcarfilters,
          [key]: [...prevcarfilters[key], v],
        }));
      }
    }
  };

  // console.log(carfilters.modelyear);
  // console.log(citty);

  // connverting numeric figures//////////////////////////////////////////////////////////
  const [GT, setGT] = useState("0");
  const [LT, setLT] = useState("Any");

  const [milageGT, setmilageGT] = useState("0");
  const [milageLT, setmilageLT] = useState("Any");

  useEffect(() => {
    if (carfilters.price.Gt) {
      setGT(price_converter(carfilters.price.Gt));
    }
    if (carfilters.price.Lt) {
      setLT(price_converter(carfilters.price.Lt));
    }

    if (carfilters.Mileage.Gt) {
      setmilageGT(price_converter(carfilters.Mileage.Gt));
    }
    if (carfilters.Mileage.Lt) {
      setmilageLT(price_converter(carfilters.Mileage.Lt));
    }
  }, [carfilters.price, carfilters.Mileage]);

  let Finalfilters = {};

  // apllying filters////////////////////////////////////////////////////////////////////////////////
  const applyfilters = async () => {
    for (const key in carfilters) {
      if (Array.isArray(carfilters[key])) {
        // console.log(carfilters[key])
        if (carfilters[key].length > 0) {
          Finalfilters[key] = carfilters[key];
        }
      }
      if (
        !Array.isArray(carfilters[key]) &&
        typeof carfilters[key] != "boolean"
      ) {
        if (
          carfilters[key] !== true &&
          carfilters[key] !== false &&
          carfilters[key] !== null
        ) {
          let rangeobj = {};
          let parentkey = carfilters[key];
          const inkey = Object.keys(parentkey);

          if (inkey[0]) {
            if (parentkey[inkey[0]] != null) {
              if (parentkey[inkey[0]] > 0) {
                rangeobj.$gt = parentkey[inkey[0]];
              }
            }
          }
          if (inkey[1]) {
            if (parentkey[inkey[1]] != null) {
              if (parentkey[inkey[1]] > 0) {
                rangeobj.$lt = parentkey[inkey[1]];
              }
            }
          }
          if (parentkey[inkey[0]] == null && parentkey[inkey[1]] == null) {
          } else {
            Finalfilters[key] = rangeobj;
          }

          // }
        }
      }
      if (carfilters[key] == true) {
        Finalfilters[key] = carfilters[key];
      }
    }
    // console.log(Finalfilters)
    if (Object.keys(Finalfilters).length > 0) {
      await getfilters(Finalfilters);
    }
  };
  // console.log(carfilters)
  const resetfilters = () => {
    setCarfilters(initialState);
    let filters = router.query.filters;
    if (filters) {
      getfilters(Finalfilters);
    }
  };

  return (
    <>
      <div className="filtermodal">
        <div className="head_banner">
          <span>
            <i
              onClick={() => {
                document.getElementById("filters").style.display = "none";
              }}
              className="bx bx-chevron-down back_arrow"
            ></i>
          </span>
          <p style={{color:'white'}}>Refine your search</p>
        </div>
        {/* <div className="head_banner apllied_filters"></div> */}

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
                handleOpenModal("All_bikes");
              }}
            >
              Bike Make <i className="bx bx-chevron-down"></i>{" "}
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
                      handleOpenModal("All_bikes");
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
        {/* {carfilters.variant_name.length > 0 && (
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
        )} */}

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

        {/* <div className="input_field">
          <i className="bx bxs-car"></i>
          <div>
            <label htmlFor="location">Trusted Cars</label>
            <div className="related_filters">
              {trustedcars.map((obj, index) => {
                return (
                  <>
                    <span
                      className={carfilters[obj.field] ? "selected_filter" : ""}
                      // style={{border:`${carfilters[v] ? '1px solid blue' : ''}`}}
                      key={index}
                      onClick={() => {
                        add_trusted_filter(obj.field);
                      }}
                    >
                      {obj.v}
                    </span>
                  </>
                );
              })}
            </div>
          </div>
        </div> */}

    
        {/* <div className="input_field ">
          <i className="bx bxs-car"></i>
          <div>
            <label htmlFor="location">Body Type</label>
            <div
              className="related_filters filter_colorsoption"
              style={{ maxHeight: `${showbodytypes ? "1760px" : "100px"}` }}
            >
              {bodyTypeArray.map((Obj, index) => {
                return (
                  <>
                    <div
                      className={`bodytype_icons ${
                        carfilters.body_type.includes(Obj.name)
                          ? "selected_filter"
                          : ""
                      }`}
                      
                      key={index}
                      onClick={() => {
                        add_del_btn_filters("body_type", Obj.name);
                      }}
                    >
                      <Image src={`/images/icons_imgs/${Obj.img}`} alt="loading"
                       width={200}
                       height={200}
                        style={{width:'100px'}}
                      />
                      <span>{Obj.name}</span>
                    </div>
                  </>
                );
              })}
            </div>
            <span
              onClick={() => {
                
                setShowbodytypes(!showbodytypes);
              }}
              className="see_morebtn"
            >
              {showbodytypes ? 'show less' : 'see more'} &rArr;
            </span>
          </div>
        </div> */}

        <div className="input_field ">
          <i className="bx bxs-car"></i>
          <div>
            <label htmlFor="location">Fuel Type</label>
            <div className="related_filters">
              {fueltype.map((v, index) => {
                return (
                  <>
                    <span
                      className={
                        carfilters.enginetype.includes(v)
                          ? "selected_filter"
                          : ""
                      }
                      key={index}
                      onClick={() => {
                        add_del_btn_filters("enginetype", v);
                      }}
                    >
                      {v}
                    </span>
                  </>
                );
              })}
            </div>
          </div>
          {/* <i className="bx bx-chevron-down"></i> */}
        </div>

        {/* <div className="ranges">
          <div className="input_field" style={{ border: "none" }}>
            <i className="bx bxs-car"></i>
            <div>
              <label htmlFor="location">Engine Capacity (cc)</label>
            </div>
          </div>
          <div className="range_inputs">
            <input
              type="number"
              placeholder="600"
              value={carfilters.enginecc.Gt !== null && carfilters.enginecc.Gt}
              onChange={(e) => {
                e.target.value >= 0 &&
                  setCarfilters((prev) => ({
                    ...prev,
                    enginecc: {
                      ...prev.enginecc,
                      Gt: parseInt(e.target.value),
                    },
                  }));
              }}
            />{" "}
            <span>to</span>
            <input
              type="number"
              placeholder="6000"
              value={carfilters.enginecc.Lt !== null && carfilters.enginecc.Lt}
              onChange={(e) => {
                e.target.value >= 0 &&
                  setCarfilters((prev) => ({
                    ...prev,
                    enginecc: {
                      ...prev.enginecc,
                      Lt: parseInt(e.target.value),
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
              defaultValue={[600, 6000]}
              min={600}
              max={6000}
              ariaLabel={["Lower thumb", "Upper thumb"]}
              ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
              onChange={(props, state) => {
                if (props[0] == 600) {
                  setCarfilters((prev) => ({
                    ...prev,
                    enginecc: { ...prev.enginecc, Gt: null },
                  }));
                }
                if (props[1] == 6000) {
                  setCarfilters((prev) => ({
                    ...prev,
                    enginecc: { ...prev.enginecc, Lt: null },
                  }));
                }
                if (props[0] != 600) {
                  setCarfilters((prev) => ({
                    ...prev,
                    enginecc: { ...prev.enginecc, Gt: props[0] },
                  }));
                }
                if (props[1] != 6000) {
                  setCarfilters((prev) => ({
                    ...prev,
                    enginecc: { ...prev.enginecc, Lt: props[1] },
                  }));
                }
              }}
              pearling
              minDistance={0}
            />
          </div>
        </div> */}

        {/* <div className="input_field ">
          <i className="bx bxs-car"></i>
          <div>
            <label htmlFor="location">Assembly</label>
            <div className="related_filters">
              <span
                className={
                  carfilters.Assembly.includes("Local") ? "selected_filter" : ""
                }
                onClick={() => {
                  add_del_btn_filters("Assembly", "Local");
                }}
              >
                Local
              </span>
              <span
                className={
                  carfilters.Assembly.includes("Imported")
                    ? "selected_filter"
                    : ""
                }
                onClick={() => {
                  add_del_btn_filters("Assembly", "Imported");
                }}
              >
                Imported
              </span>
            </div>
          </div>
        
        </div> */}

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

    
        <div className="input_field apply_filter_btns">
          <button onClick={resetfilters}>Reset</button>
          <button onClick={applyfilters}>Apply</button>
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

export default Filter_bar_bikes;
