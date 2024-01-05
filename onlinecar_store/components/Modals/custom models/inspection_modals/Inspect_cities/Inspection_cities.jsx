import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";
import Context from "@/components/processing_functions/context";

const Inspection_cities = ({ onClose, carrdata }) => {
  const { message, setMessage } = useContext(Context);

  const [citiesdata, setCitiesdata] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [searchval, setSearchval] = useState("");

  async function get() {
    setMessage({ loader: true });
    await axios
      .get(`/api/admin/slots/getslots`)
      .then((res) => {
        setMessage({ loader: false });
        // console.log(res?.data.payload)
        let Ad = res?.data?.payload;
        setCitiesdata(Ad);
        setOriginalData(Ad);
      })
      .catch((err) => {
        setMessage({ loader: false });
        setMessage({ success: false, msg: err?.response?.data.message });
      });
  }
  useEffect(() => {
    get();
  }, []);

  useEffect(() => {
    // Apply filtering only when the search input is not empty
    if (searchval !== "") {
      const filteredData = originalData.filter((obj) => {
        if (obj.city) {
          return obj.city.toLowerCase().includes(searchval.toLowerCase());
        }
        return obj.name.toLowerCase().includes(searchval.toLowerCase());
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
    if (obj.city) {
      location.city = obj.city;
      setLocation(location);
      await carrdata(location);
    }
    if (obj.areas) {
      if (obj.areas.length > 0) {
        // setArraychange(true)
        setCitiesdata(obj.areas);
        setOriginalData(obj.areas);
      } else {
        onClose();
      }
    } else {
      // console.log('i ran')
      //  await setLocation((s)=>{return {...s, area:obj } })
      location.area = obj;
      setLocation(location);
      await carrdata(location);
      onClose();
    }
  };

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
        {location.city !== "" ? (
          <>Select area/town in {location.city}</>
        ) : (
          <>Select City</>
        )}
      </p>
      <div className="cars_options">
        {citiesdata.length > 0 ? (
          citiesdata.map((obj, index) => {
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
                    {obj.city ? obj.city : obj.name}
                  </p>
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

export default React.memo(Inspection_cities);
