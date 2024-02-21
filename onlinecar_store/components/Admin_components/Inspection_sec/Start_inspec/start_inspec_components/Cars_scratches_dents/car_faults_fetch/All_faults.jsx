import React from "react";
// import useSWR from "swr";
import axios from "axios";

// const fetcher = (url) => axios.get(url).then((res) => res.data.payload);
const All_faults = ({Ad_id, data}) => {

    // const { data, error, isLoading } = useSWR(`/api/admin/inspection/start_inspec/body_Fualts/get_faults?Ad_id=${Ad_id}`,fetcher);


    // console.log(data)


  return (
    <>
      <div className="cars_faults">
      <h2>All Faults</h2>
        <div className="faults_flex">
        {data?.map((v,index)=>{
            return<>
            <p key={index}><b>{v.type}</b> :{v.type_name}</p>
            </>
        })}
        </div>
      </div>
    </>
  );
};

export default All_faults;
