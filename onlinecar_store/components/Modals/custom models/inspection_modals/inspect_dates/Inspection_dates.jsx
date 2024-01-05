import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from "react";
import Context from "@/components/processing_functions/context";
import axios from "axios";

const Inspection_dates = ({carrdata,onClose}) => {
  const { message, setMessage } = useContext(Context);
  const [Dates, setDates] = useState([]);
  const [showslots, setshowslots] = useState(false);
  let intialobj = {
    selecteddate:'',
    time:''
  }
  const [insp_req, setInsp_req] = useState(intialobj);
  const [selected_timeslots, setSelected_timeslots] = useState([]);

  useEffect(() => {
    let today = new Date();
    let datearr = [...Dates];
    for (let i = 0; i <= 6; i++) {
      const nextDate = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
      let daysInWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      let d = nextDate.toLocaleDateString("en-GB");
      let day =
        nextDate.getDay() == today.getDay()
          ? "Today"
          : daysInWeek[nextDate.getDay()];
    let dates = { actualdate: nextDate, date: d, time: "", day: day };
      datearr.push(dates);
    }
    if (!Dates.length > 0) {
      setDates(datearr);
    }
  }, []);
  //   console.log(Dates);

  async function checkslots(v) {
    setMessage({ loader: true });
    // intialobj.selecteddate = v.date
    setInsp_req((s)=>({...s, selecteddate: v.date}))

    await axios.get(`/api/admin/inspection/inspec_orders/get_orders?slotdate=${v.date}`)
    .then((res) => {
      setMessage({ loader: false });
      let data = res?.data.payload
      // console.log(data)
      let timeslots = [];
       if(data?.length > 0){
        for(var v of data){
         timeslots.push(v.slottime)
        }
        setSelected_timeslots(timeslots)
       }else{
        setSelected_timeslots([])
       }
       setshowslots(true);
    
       
      // setMessage({ success: false, msg: err?.response?.data.message });
    }).catch((err) => {
      setMessage({ loader: false });
      setMessage({ success: false, msg: err?.response?.data.message });
    });
    
  }

  function checktime(t) {
    if(selected_timeslots.includes(t)){
      return false;
    }
    let cd = new Date()
    let ct = cd.getHours();
    if (((t - ct) > 2) || (cd.toLocaleDateString("en-GB") != insp_req.selecteddate)) {
      return true;
    } else {
      return false;
    }
  }


  async function selectslot(t){
   let obj={
    date: insp_req.selecteddate,
    time: t
   }
    carrdata(obj)
    onClose()
  }
  

  return (
    <>
      <h3>dates</h3>
      {showslots ? (
        <>
          <div className="available_slots">
            <div className="back_btn">
              <button
                onClick={() => {
                  setshowslots(false);
                }}
              >
                back
              </button>
            </div>
            <div className="slots">
              <button onClick={()=>{selectslot(10)}} disabled={checktime(10) ? false : true}>10:00 AM</button>
              <button onClick={()=>{selectslot(11)}} disabled={checktime(11) ? false : true}>11:30 AM</button>
              <button onClick={()=>{selectslot(13)}} disabled={checktime(13) ? false : true}>1:30 PM</button>
              <button onClick={()=>{selectslot(15)}} disabled={checktime(15) ? false : true}>3:00 PM</button>
              <button onClick={()=>{selectslot(16)}} disabled={checktime(16) ? false : true}>4:30 PM</button>
            </div>
            <div className="cantfind_slot">
              <button onClick={()=>{selectslot(404)}}>can't find my slot</button>
            </div>
          </div>
        </>
      ) : (
        <>
          {" "}
          <div className="cars_options">
            {Dates?.map((v) => {
              return (
                <>
                  <div
                    className="car_option datediv"
                    onClick={() => {
                      checkslots(v);
                    }}
                  >
                    <span style={{ margin: "4px" }} className="carmodel_name">
                      {v.day}
                    </span>
                    -
                    <span style={{ margin: "4px" }} className="carmodel_name">
                      {v.date}
                    </span>
                  </div>
                </>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default React.memo(Inspection_dates);
