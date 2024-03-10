import React,{useMemo, useState} from 'react'
import Image from 'next/image'
import axios from "axios";
import useSWR from "swr";
import  {useRouter} from "next/router"


const fetcher = (url) => axios.get(url).then((res) => res.data.payload);
const Main_image = () => {

    const router = useRouter();
    const Ad_id = router.query.Ad_id;

    const [main_img, setMain_img] = useState('');

    const { data, error, isLoading, mutate } = useSWR(
        `${Ad_id ? `/api/client_inspec/get?only_main_img=${true}&ad_id=${Ad_id}` : null}`,
        fetcher
      );
     if(error){
      return  <h2>Something</h2>
     }
     
     useMemo(()=>{
        if(data){
            let main_img = data.all_imgs.find((v,index)=>{
                 if(v?.field  == "img_flag" ){
                     return v;
                 }
             })
            //  console.log(main_img)
             setMain_img(main_img)
          }
     },[data])


   
    //   console.log(data)
  return (
   <>
   <div className="main_uploaded_img">
    {/* {error ? :} */}
    {data ? <Image src={main_img?.img_url}  unoptimized={true} alt='main_img' width={100} height={100}/>:null}

   
   </div>
   
   </>
  )
}

export default Main_image
