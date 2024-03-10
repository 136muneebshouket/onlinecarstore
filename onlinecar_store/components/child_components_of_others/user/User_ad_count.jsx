import React from 'react'
import useSWR from "swr";
import axios from 'axios';


const fetcher = (url) => axios.get(url).then((res) => res.data.count);
const User_ad_count = ({user_email , type}) => {


    const { data, error, isLoading } = useSWR(
        user_email ? `/api/user_ads/?user_email=${user_email}&type=${type}&ad_type=car&count_only=true` : null, 
        fetcher
      );
    
  return (
   <>
   {data ? <>
    <div className="counts">
    {data ? data : 0}
   </div>
   </>: null}
 
   </>
  )
}

export default User_ad_count
