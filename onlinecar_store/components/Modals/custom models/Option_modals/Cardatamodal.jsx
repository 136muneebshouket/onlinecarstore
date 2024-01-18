import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import axios from "axios";
import { arrayOfyears } from "@/components/carsdata/arrays";
// import final_carsdata from "../../../carsdata/carsdata17_01_24";
import { feature_generation } from "@/components/processing_functions/features_generations";
import Context from "@/components/processing_functions/context";
import { useContext } from "react";
import useSWR from "swr";

const fetcher = (url) =>
  axios.get(url).then((res) => res.data.payload[0].main_arr);

const Cardatamodal = ({ onClose, carrdata, filtermodal }) => {
  // const cardata = JSON.parse(final_carsdata)
  const { message, setMessage } = useContext(Context);
  const { data, error, isLoading } = useSWR(
    "/api/admin/options/car_options_routes/get_route",
    fetcher
  );
  // console.log(data)

  const [model_year, setModel_year] = useState(null);
  const [modelyears, setModelyears] = useState(arrayOfyears);
  const [carsoptions, setCarsoptions] = useState([]);
  const [maincarsoptions, setMaincarsoptions] = useState([]);
  const [searchval, setSearchval] = useState("");
  const [varients, setVarients] = useState([]);
  // const [brandmatch, setBrandmatch] = useState(false);

  useMemo(() => {
    if (isLoading) {
      setMessage({ loader: true });
    }
    if (error) {
      setMessage({ loader: false });
      setMessage({ success: false, msg: "something went wrong" });
    }
    if (data) {
      setMessage({ loader: false });
      setCarsoptions(data);
      setMaincarsoptions(data);
    }
  }, [data, isLoading, error]);

  useEffect(() => {
    if (filtermodal) {
      setModel_year(0);
    }
  }, []);

  const filter = useMemo(() => {
    // if (searchval !== "") {
    // const filteredCarData = maincarsoptions.filter((brand) => {
    //   const brandName = brand.name.toLowerCase();
    //   const modelNames = brand.models.map((model) => model.name.toLowerCase());
    //   // Check if the brand name includes the search term
    //   if (brandName.includes(searchval.toLowerCase())) {
    //     return brand;
    //   }
    //   // Check if any model name includes the search term
    //   return modelNames.some((name) => name.includes(searchval.toLowerCase()));
    // });
    // setCarsoptions(filteredCarData);
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
    bodytype: "",
  });

  // adding barnd  and model
  const addcar = (b, m, v) => {
    // console.log(v)
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
    // console.log(cardata_obj)
    carrdata(cardata_obj);
  };

  // adding varients and features
  const addvarients = async (obj) => {
    // console.log(obj)

    const enginecc = obj.enginecc;
    const transmission = obj.transmission;
    const enginetype = obj.fuel_type;

    cardata_obj.duration = `${obj?.start_duration} - ${obj?.ending_duration}`;
    cardata_obj.v_name = obj?.variant_name;
    cardata_obj.enginecc = parseInt(enginecc?.split("c")[0]);
    cardata_obj.transmission = transmission?.trim();
    cardata_obj.enginetype = enginetype?.trim();
    cardata_obj.bodytype = obj?.Bodytype;
    setCardata_obj(cardata_obj);
    await carrdata(cardata_obj);
    // console.log(obj.Features)
    obj.Features && feature_generation(obj.Features);
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
            {varients?.map((obj, index) => {
              if ((obj.start_duration <= model_year) && (!filtermodal)) {
                return (
                  <>
                    <div
                      className="varient_div"
                      onClick={() => {
                        addvarients(obj);
                      }}
                    >
                      <p>
                        {obj.start_duration} -{" "}
                        {obj.ending_duration == "On going"
                          ? `${new Date().getFullYear()}`
                          : obj.ending_duration}
                      </p>
                      <p>{obj.variant_name}</p>
                      <p>
                        {obj.enginecc} , {obj.transmission} , {obj.fuel_type}
                      </p>
                    </div>
                  </>
                );
              } else if (filtermodal) {
                return (
                  <>
                    <div
                      className="varient_div"
                      onClick={() => {
                        addvarients(obj);
                      }}
                    >
                      <p>
                        {obj.start_duration} -{" "}
                        {obj.ending_duration == "On going"
                          ? `${new Date().getFullYear()}`
                          : obj.ending_duration}
                      </p>
                      <p>{obj.variant_name}</p>
                      <p>
                        {obj.enginecc} , {obj.transmission} , {obj.fuel_type}
                      </p>
                    </div>
                  </>
                );
              } else {
                return (
                  <>
                    {index == 0 ? (
                      <div className="varient_div">
                        <p>No version exist</p>
                      </div>
                    ) : (
                      <></>
                    )}
                  </>
                );
              }
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
