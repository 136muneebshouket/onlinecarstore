import React, { useEffect, useState ,useContext ,useCallback} from "react";
import Context from "@/components/processing_functions/context";
// import React from "react";
import useSWR from "swr";
import axios from "axios";
import Update_req_modal from "@/components/Modals/admin/Update_req_modal";
import FullLoader from "@/components/Modals/Loader/FullLoader";

const fetcher = (url) => axios.get(url).then((res) => res.data.payload);
const Inspect_requests = () => {
  const { message, setMessage } = useContext(Context);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalvalue, setModalvalue] = useState("");

  //closing and opening modal /////////////////////////////////////////////////////////////////////////////////
  const handleOpenModal = useCallback((value) => {
    setIsModalOpen(true);
    setModalvalue(value);
  }, []);

  const { data, error, isLoading, mutate } = useSWR(
    `/api/admin/inspection/inspec_orders/get_orders?accepted=false`,
    fetcher
  );
  // if(data){
  //   console.log(data)
  // }




  function to12HourFormat(timeString) {
    if (timeString == 404) {
      return " Not Slot Selected";
    }
    if (!timeString) {
      return "";
    }
    const hours24 = parseInt(timeString);
    let hours12 = hours24 % 12 || ""; // Handle midnight (00:00)
    const amPm = hours24 >= 12 ? "PM" : "AM";

    return ` ${hours12} ${amPm}`;
  }
  function refresh(){
    mutate();
  }
   async function del_req(v){
    let admin_token = JSON.parse(localStorage.getItem('admin_token'))
    let obj ={
      req_id:v._id,
      admin_token
    }
    setMessage({ loader: true });
    await axios.delete(`/api/admin/inspection/inspec_orders/del_orders`,{params: obj})
    .then((res) => {
      setMessage({ loader: false });
      setMessage({ success: true, msg: res?.data.message });
      mutate();
    }).catch((err) => {
      setMessage({ loader: false });
      setMessage({ success: false, msg: err?.response?.data.message });
    });
   }

   async function accept_req(v){
    let admin_token = JSON.parse(localStorage.getItem('admin_token'))
    let obj ={
      req_id:v._id,
      admin_token
    }
    setMessage({ loader: true });
    await axios.post(`/api/admin/inspection/inspec_orders/accept_order`, obj)
    .then((res) => {
      setMessage({ loader: false });
      setMessage({ success: true, msg: res?.data.message });
      mutate();
    }).catch((err) => {
      setMessage({ loader: false });
      setMessage({ success: false, msg: err?.response?.data.message });
    });
   
   }



  return (
    <>
      <div className="inspection_req_main">
        <h1>Inspection requests</h1>
        <div className="request_sec">
          {isLoading ? <FullLoader /> : null}
          {error ? (
          <h1 style={{ color: "rgb(175, 46, 36)" }}>Something went wrong</h1>
          ) : null}

          {data?.map((obj, index) => {
            return <>
             <div key={index} className="single_req">
              <div className="field">
                <label>Car</label>
                <p>{obj?.brand} {obj?.model} {obj?.variant_name}</p>
              </div>
              <div className="field">
                <label>Owner</label>
                <p>{obj?.username}</p>
              </div>
              <div className="field">
                <label>Email</label>
                <p>{obj?.email}</p>
              </div>
              <div className="field">
                <label>Location</label>
                <p>{obj?.area} {obj?.city}</p>
              </div>
              <div className="field">
                <label>Address</label>
                <p>{obj?.Address}</p>
              </div>

              <div className="field">
                <label>Slot-day</label>
                <p>{obj?.slot}</p>
              </div>
              <div className="field">
                <label>Slot-time</label>
                <p>{to12HourFormat(obj?.slottime)}</p>
              </div>
              <div className="field">
                <label>Phone</label>
                <p>{obj?.phone_no}</p>
              </div>
              <div className="buttons">
                <button   onClick={() => {
                    accept_req(obj);
                  }} style={{ background: "#246524" }}>
                  Accept Request
                </button>
                <button  onClick={() => {
                    del_req(obj);
                  }} style={{ background: "#af2e24" }}>
                  Reject Request
                </button>
                <button
                  onClick={() => {
                    handleOpenModal(obj);
                  }}
                  style={{ background: "#205b8b" }}
                >
                  Edit Request
                </button>
              </div>
            </div>;
            </>
           
          })}
        </div>
      </div>

      {isModalOpen && (
        <Update_req_modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
          modalvalue={modalvalue}
          refresh={refresh}
        />
      )}
    </>
  );
};

export default Inspect_requests;
