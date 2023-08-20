import React, { useEffect, useState,useCallback } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Filtermodal from "@/components/Filters/FiIterModal/Filtermodal";


const FullLoader = dynamic(
  () => import("@/components/Modals/Loader/FullLoader"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const Search_car = ({carrdata}) => {
  const router = useRouter();
   var [loading, setLoading] = useState(false);
  // console.log(cardata)
  // console.log(carrdata)
  
  // const [cardata, setCardata] = useState([
  //   {
  //     images_url: ["/images/postad-img.png"],
  //     brand: "Audi",
  //     variant_name: "A3",
  //     modelyear: "2021",
  //     city: "Lahore",
  //     Mileage: 100000,
  //     enginecc: 1300,
  //     transmission: "Automatic",
  //     enginetype: "Petrol",
  //     price: 1200000,
  //   },
  //   {
  //     images_url: ["/images/postad-img.png"],
  //     brand: "Audi",
  //     variant_name: "A3",
  //     modelyear: "2021",
  //     city: "Lahore",
  //     Mileage: 100000,
  //     enginecc: 1300,
  //     transmission: "Automatic",
  //     enginetype: "Petrol",
  //     price: 1200000,
  //   },
  //   {
  //     images_url: ["/images/postad-img.png"],
  //     brand: "Audi",
  //     variant_name: "A3",
  //     modelyear: "2021",
  //     city: "Lahore",
  //     Mileage: 100000,
  //     enginecc: 1300,
  //     transmission: "Automatic",
  //     enginetype: "Petrol",
  //     price: 1200000,
  //   },
  //   {
  //     images_url: ["/images/postad-img.png"],
  //     brand: "Audi",
  //     variant_name: "A3",
  //     modelyear: "2021",
  //     city: "Lahore",
  //     Mileage: 100000,
  //     enginecc: 1300,
  //     transmission: "Automatic",
  //     enginetype: "Petrol",
  //     price: 1200000,
  //   },
  // ]);

  const getfilters = useCallback((filters) => {
    // console.log(filters)
    if(filters){
      // passfilters = filters;
      const flattenedFilters = {};
     Object.entries(filters)
      .map(([key, value]) => {
         if(Array.isArray(value)){
          flattenedFilters[key] = value;
        }else if(typeof value === "object"){
          flattenedFilters[key] = JSON.stringify(value)
        }
        else{
          flattenedFilters[key] = value;
        }
      })
      // console.log(flattenedFilters)

      const filtersString = JSON.stringify(flattenedFilters)

      // console.log(filtersString)
      router.replace({
        // pathname: router.pathname, // Keep the current pathname
        // query: `filters=${filtersString}`, // Pass the filters as query parameters
        query: `filters=${filtersString}`, // Pass the filters as query parameters
      });
      // const queryStrin = '?age=30&name=John%20Doe';
  
    }
    
  }, []);

  // const getcars = async () => {
  //   setLoading(true);
  //   await axios
  //     .get(`/api/getcarswithfilters`)
  //     .then((res) => {
  //       console.log(res?.data);
  //       setCardata(res?.data.data);
  //     })
  //     .catch((err) => {
  //       console.log(err?.response?.data);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

  // useEffect(() => {
  //   getcars();
  // }, []);
  // console.log(cardata);

  // };

  return (
    <>
      <div className="main_searchcar">
        <div className="head">
          <h2>Used cars for sale in pakistan</h2>
        </div>
        <div className="cars_and_filters">
          <div className="filters">
            <Filtermodal getfilters={getfilters} />
          </div>
          <div className="cars">
            {carrdata.map((obj,i) => {
              return (
                <>
                  <Link className="singlecar_link" href="#">
                    <div
                    key={i}
                      className="singlecar"
                      style={{
                        border: "1px solid black",
                        padding: "3px",
                        display: "flex",
                      }}
                    >
                      <div className="car_img">
                        <Image
                          src={obj.images_url[0]}
                          width={200}
                          height={200}
                          alt="loading"
                        />
                      </div>
                      <div className="car_info">
                        <div className="car_content">
                          <h3>
                            {obj.brand} {obj.variant_name && obj.variant_name}{" "}
                            {obj.modelyear}
                          </h3>
                          <p>{obj.city}</p>
                          <span>{obj.Mileage}km</span>
                          <span>{obj.enginecc}cc</span>
                          <span>{obj.transmission}</span>
                          <span>{obj.enginetype}</span>
                        </div>
                        <div className="car_price_section">
                          <div className="car_price_fav">
                            <h3>{obj.price}</h3>
                            <i className="bx bx-heart"></i>
                          </div>
                          <div className="phone_num">
                            <button>Show Phone No.</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </>
              );
            })}
          </div>
        </div>
      </div>
      {loading ? <FullLoader /> : <></>}
    </>
  );
};

export async function getServerSideProps({ params, query }) {
  
 const res= await axios.get(`http://localhost:3000/api/getcarswithfilters/?filters=${query.filters}`)
 const carrdata = res.data.data;
 
  // const pages =Math.ceil(json.count/12);
// console.log(carrdata)

  return {
    props: {
      carrdata,
    
      // total:pages,
      // cardata,
      // pagenum:params.page
    },
  //   revalidate: 300
  }
}

export default Search_car;
