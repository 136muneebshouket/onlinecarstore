import axios from "axios";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import Context from "@/components/processing_functions/context";
import { useContext } from "react";

const Car_options = ({
  onClose,
  modal_value,
  carsdata,
  get_from_modal,
  make,
  model,
  refresh
}) => {
  const { message, setMessage } = useContext(Context);
  const [searchval, setSearchval] = useState("");
  const [maindata, setMaindata] = useState([]);
  const [data, setdata] = useState([]);
  const [Newdata, setNewdata] = useState('');

  useEffect(() => {
    if (modal_value == "Make") {
      let options = carsdata.map((v) => {
        return v.name;
      });
      setdata(options);
      setMaindata(options);
    }

    if (modal_value == "Model") {
      if (!make) {
        setMessage({ success: false, msg: "please Ad car's make first" });
        return;
      }
      let arr = []
      let options = carsdata.map((v) => {
        if(v.name == make){
            v.models.map((modls)=>{
              arr.push(modls.name)
            })
        }
      });
      setdata(arr);
      setMaindata(arr);
    }

  }, [carsdata]);

  useMemo(() => {
    if (searchval != "") {
      let filterdata = maindata.filter((v) => {
        if (searchval && v.toLowerCase().includes(searchval.toLowerCase())) {
          return v;
        }
      });
      setdata(filterdata);
    } else {
      setdata(maindata);
    }
  }, [searchval]);


  function add_value(v){
    get_from_modal({modal_value , v})
    onClose()
  }



  // adding new options ////////////////////////////////////////////////////////////////////////////////////////
  async function add_newoption(e){
    e.preventDefault()
    setMessage({ loader: true });

    let admin_token = JSON.parse(localStorage.getItem('admin_token'))

    let obj={
        modal_value,
        Newdata,
        admin_token,
        make
    }

    if(data.includes(Newdata)){
      setMessage({ success: false, msg: `Already exist in the ${modal_value}` });
      return;
    }
    await axios
      .post(`/api/admin/options/car_options_routes/ad_route`,obj)
      .then((res) => {
        // console.log(res.data.payload)
        setMessage({ loader: false });
        setMessage({ success: true, msg: "Added" });
        setNewdata('')
        refresh()
      })
      .catch((err) => {
        setMessage({ loader: false });
        setMessage({ success: false, msg: "something went wrong" });
      });
  }

  //   console.log(searchval)

  return (
    <>
      <div className="modal">
        <div className="modal-content">
          <div className="modal_head">
            <h3 style={{ fontSize: "large" }}>Ad car {modal_value}</h3>
            <i className="bx bx-x modal-close" onClick={onClose}></i>
          </div>
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

          <div className="cars_options_admin">
            {data?.length > 0 ? <>
              {data?.map((v) => {
              return (
                <>
                  <div className="car_option">
                    <p
                      style={{ cursor: "pointer", margin: "4px" }}
                      className="carmodel_name"
                      key={v}
                      onClick={() => {
                        add_value(v)
                      }}
                    >
                      {v}
                    </p>
                  </div>
                </>
              );
            })}</>:<>
             <div className="car_option">
                    <p
                      style={{ cursor: "pointer", margin: "4px" }}
                      className="carmodel_name"
                    >
                      Not Found 
                    </p>
                  </div>
            </>}
            
          </div>

          <div className="ad_newoption">
            <form onSubmit={add_newoption}>
            <input onChange={(e)=>{setNewdata(e.target.value)}} type="text" placeholder={`Ad new ${modal_value}`} value={Newdata} required/>
            <button type="submit">Add</button>
            </form>
       
          </div>
        </div>
      </div>
    </>
  );
};

export default Car_options;
