import React, { useState ,useEffect} from "react";
import Link from "next/link";
import axios from "axios";
import price_converter from "@/components/processing_functions/Price_calculator";
import Image from "next/image";
// import { useEffect,useState } from "react";
import useSWR from "swr";

const Used_cars = () => {
// console.log(carsdata)
  // const [carsdata, setCarsdata] = useState([])

  const { data, error, isLoading } = useSWR( `/api/getcarswithfilters/?limit=6`, (url)=> axios.get(url).then((res)=> res.data.data))
  // const [carsdata, setCarsdata] = useState(()=> (data || []));
  if(isLoading){
    return <><h2>Loading...</h2></>
  }
  if(error){
    return <><h2>Somethings wrong in Used car fetching</h2></>
    // setMessage({ success: false, msg: error.response.data.message });
   }
  
  // useEffect(()=>{
  //   // console.log(data)
  //   setCarsdata(data)
  //   // getdata()
  //       // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[data])


  // const [cardata, setCarrdata] = useState([
  //   // {
  //   //   id: "12345678976543",
  //   //   images_url: ["/images/samplecar.webp"],
  //   //   brand: "Audi",
  //   //   model: "A3",
  //   //   variant_name: "e-tron",
  //   //   modelyear: "2021",
  //   //   city: "Lahore",
  //   //   Mileage: 100000,
  //   //   enginecc: 1300,
  //   //   transmission: "Automatic",
  //   //   enginetype: "Petrol",
  //   //   price: 1200000,
  //   // },
  //   // {
  //   //   id: "12345678976543",
  //   //   images_url: ["/images/samplecar.webp"],
  //   //   brand: "Audi",
  //   //   model: "A3",
  //   //   variant_name: "e-tron",
  //   //   modelyear: "2021",
  //   //   city: "Lahore",
  //   //   Mileage: 100000,
  //   //   enginecc: 1300,
  //   //   transmission: "Automatic",
  //   //   enginetype: "Petrol",
  //   //   price: 1200000,
  //   // },
  //   // {
  //   //   id: "12345678976543",
  //   //   images_url: ["/images/samplecar.webp"],
  //   //   brand: "Audi",
  //   //   model: "A3",
  //   //   variant_name: "e-tron",
  //   //   modelyear: "2021",
  //   //   city: "Lahore",
  //   //   Mileage: 100000,
  //   //   enginecc: 1300,
  //   //   transmission: "Automatic",
  //   //   enginetype: "Petrol",
  //   //   price: 1200000,
  //   // },
  //   // {
  //   //   id: "12345678976543",
  //   //   images_url: ["/images/samplecar.webp"],
  //   //   brand: "Audi",
  //   //   model: "A3",
  //   //   variant_name: "e-tron",
  //   //   modelyear: "2021",
  //   //   city: "Lahore",
  //   //   Mileage: 100000,
  //   //   enginecc: 1300,
  //   //   transmission: "Automatic",
  //   //   enginetype: "Petrol",
  //   //   price: 1200000,
  //   // },
  //   // {
  //   //   id: "12345678976543",
  //   //   images_url: ["/images/samplecar.webp"],
  //   //   brand: "Audi",
  //   //   model: "A3",
  //   //   variant_name: "e-tron",
  //   //   modelyear: "2021",
  //   //   city: "Lahore",
  //   //   Mileage: 100000,
  //   //   enginecc: 1300,
  //   //   transmission: "Automatic",
  //   //   enginetype: "Petrol",
  //   //   price: 1200000,
  //   // },
   
  // ]);


  // async function getdata(){
  //   try {
  //     const res = await axios.get(
  //       `/api/getcarswithfilters/?limit=6`
  //     );
  //     const carrdata = res.data.data;
  //     setCarsdata(carrdata)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  // useEffect(()=>{
  //   getdata()
  //       // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[])

  return (
    <>
      <div className="car_cars_sliders">
      {isLoading && (
        <>
          <h2>Loading...</h2>
        </>
      )}
      {error && (
        <>
          <h2>Somethings wrong in Used cars fetching</h2>
        </>
      )}
        {data?.map((obj, i) => {
          return (
            <>
              {/* <Link className="singlecar_link" href="#"> */}
              <Link
                href={`used-cars/car/${obj?.brand.replaceAll(
                  " ",
                  "-"
                )}-${obj?.model.replaceAll(" ", "-")}-${obj?.modelyear}-${
                  obj?._id
                }`.toLowerCase()}
              >
                <div key={i} className="singlecar">
                  <div className="car_img">
                    <Image
                      src={
                        obj?.images_url[0]?.img_url
                          ? obj?.images_url[0]?.img_url
                          : obj?.images_url[0]
                      }
                      width={200}
                      height={200}
                      alt="loading"
                    />
                  </div>
                  <div className="car_info">
                    <div className="car_content">
                      <h3>
                        {obj?.brand} {obj?.model}{" "}
                        {obj?.variant_name && obj?.variant_name} {obj?.modelyear}
                      </h3>
                      {/* </Link> */}

                      <p className="price_mbv">
                        <strong>PKR:{price_converter(obj?.price)}</strong>
                      </p>

                      <p>{obj?.city}</p>
                      {/* <div>
                        <span>{obj?.modelyear}</span>
                        <span>{obj?.Mileage} km</span>
                        <span>{obj?.enginetype}</span>
                      </div> */}
                    </div>
                  </div>
                </div>
              </Link>
            </>
          );
        })}
        
      </div>
      {/* <button onClick={()=>{getdata()}}>get please</button> */}
    </>
  );
};

// export async function getServerSideProps() {
//   console.log('get server child')
//   const res = await axios.get(
//     `${process.env.Host}/api/getcarswithfilters?limit=6`
//   );
//   const carsdata = res.data.data;
//   let loadingg = false;
//   if (carsdata) {
//     loadingg = false;
//   }

//   console.log(carsdata)

//   return {
//     props: {
//       carsdata,
//       loadiing: loadingg,
//     },
//     //   revalidate: 300
//   };
// }

export default Used_cars;
