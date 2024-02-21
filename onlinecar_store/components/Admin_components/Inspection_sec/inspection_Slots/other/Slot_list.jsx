import React,{useState} from "react";
import useSWR from "swr";
import axios from "axios";
import FullLoader from "@/components/Modals/Loader/FullLoader";

const fetcher = (url) => axios.get(url).then((res) => res.data.payload);
const Slot_list = () => {
  const [areas, setAreas] = useState([]);

  const { data, error, isLoading, mutate } = useSWR(
    `/api/admin/slots/getslots`,
    fetcher
  );
  if (isLoading) {
    return (
      <>
        <FullLoader />
      </>
    );
  }
  // console.log(areas)
  return (
    <>
      <div className="lists">
        <div className="heading">
          <h2>Cities</h2>
          {data?.map((v) => {
            return (
              <>
                <div onClick={()=>{setAreas(v.areas)}} className="single_ad">
                  <p  className="ad_heading">{v.city}</p>
                </div>
              </>
            );
          })}
        </div>
      </div>
      <div className="lists">
        <h2>Areas</h2>
        {areas?.map((v)=>{
          return <>
           <div className="single_ad">
             <p className="ad_heading">{v.name}</p>
           </div>
         </>
        })}
        {/* <div className="single_ad">
          <p className="ad_heading">Areas</p>
        </div> */}
      </div>
      {/* <div className="lists">
        <h2>Slots</h2>
      </div> */}
    </>
  );
};

export default Slot_list;
