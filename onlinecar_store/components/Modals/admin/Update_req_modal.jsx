import React, { useEffect, useState ,useContext} from "react";
import Context from "@/components/processing_functions/context";
import axios from "axios";

const Update_req_modal = ({ onClose, modalvalue ,refresh}) => {
  const { message, setMessage } = useContext(Context);
  let intialobj = {
    req_id:'',
    Address: "",
    slot: "",
    slottime: "",
  };
  const [change_slot_obj, setchange_slot_obj] = useState(intialobj);

  useEffect(() => {
    setchange_slot_obj({
      ...change_slot_obj,
      Address: `${modalvalue?.area} ${modalvalue?.city} ${modalvalue?.Address}`,
      slot: modalvalue?.slot,
      slottime: modalvalue?.slottime,
      req_id:modalvalue._id
    });
  }, [modalvalue]);

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

  function select_time(v){
   if(v == change_slot_obj.slottime){
    return true
   }else{
    return false
   }
  }
  async function updateslot() {
   try {
    let admin_token = JSON.parse(localStorage.getItem('admin_token'))
    let obj ={
      change_slot_obj,
      admin_token
    }
    setMessage({ loader: true });
    // console.log(change_slot_obj)
    await axios.post(`/api/admin/inspection/inspec_orders/update_slot`, obj)
    .then((res) => {
      setMessage({ loader: false });
      setMessage({ success: true, msg: res?.data.message });
      refresh()
    }).catch((err) => {
      setMessage({ loader: false });
      setMessage({ success: false, msg: err?.response?.data.message });
    });
   } catch (error) {
    console.error(object)
   }
  }

  // console.log(change_slot_obj);
  return (
    <>
      <div className="modal">
        <div className="modal-content">
          <div className="modal_head">
            <h3 style={{ fontSize: "large" }}>Change slot </h3>
            <i className="bx bx-x modal-close" onClick={onClose}></i>
          </div>
          <div className="change_req">
            <div>
              <label>Change Address:</label>
              <input
                onChange={(e) => {
                  setchange_slot_obj({ ...change_slot_obj, Address: e.target.value });
                }}
                type="text"
                style={{ width: "-webkit-fill-available" }}
                value={change_slot_obj?.Address}
              />
            </div>

            <div>
              <label>Time Slot:</label>
              <span style={{ fontWeight: "500" }}>
                {change_slot_obj?.slot}______{to12HourFormat(change_slot_obj?.slottime)}
              </span>
            </div>
            <div>
              <input
                type="date"
                value={(change_slot_obj?.slot).split("/").reverse().join("-")}
                onChange={(e) => {
                  setchange_slot_obj({
                    ...change_slot_obj,
                    slot: new Date(e.target.value).toLocaleDateString("en-GB"),
                  });
                }}
              />

              <select
                onChange={(e) => {
                  setchange_slot_obj({ ...change_slot_obj, slottime: e.target.value });
                }}
                name=""
                id=""
              >
                <option value={""} selected>
                  00:00 AM
                </option>
                <option value={6} selected={select_time(6)}>6:00 AM</option>
                <option value={7} selected={select_time(7)}>7:00 AM</option>
                <option value={8} selected={select_time(8)}>8:00 AM</option>
                <option value={9} selected={select_time(9)}>9:00 AM</option>
                <option value={10} selected={select_time(10)}>10:00 AM</option>
                <option value={11} selected={select_time(11)}>11:00 AM</option>
                <option value={12} selected={select_time(12)}>12:00 PM</option>
                <option value={13} selected={select_time(13)}>1:00 PM</option>
                <option value={14} selected={select_time(14)}>2:00 PM</option>
                <option value={15} selected={select_time(15)}>3:00 PM</option>
                <option value={16} selected={select_time(16)}>4:00 PM</option>
                <option value={17} selected={select_time(17)}>5:00 PM</option>
                <option value={18} selected={select_time(18)}>6:00 PM</option>
              </select>
            </div>

            <div className="Update">
              <button onClick={updateslot} className="">Update</button>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Update_req_modal;
