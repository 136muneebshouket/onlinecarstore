import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import Filtermodal from "@/components/Filters/FiIterModal/Filtermodal";

const FullLoader = dynamic(
  () => import("@/components/Modals/Loader/FullLoader"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const Search_car = () => {
  const [loading, setLoading] = useState(false);
  const [cardata, setCardata] = useState([
    {
      images_url: ["/images/postad-img.png"],
      brand: "Audi",
      variant_name: "A3",
      modelyear: "2021",
      city: "Lahore",
      Mileage: 100000,
      enginecc: 1300,
      transmission: "Automatic",
      enginetype: "Petrol",
      price: 1200000,
    },
    {
      images_url: ["/images/postad-img.png"],
      brand: "Audi",
      variant_name: "A3",
      modelyear: "2021",
      city: "Lahore",
      Mileage: 100000,
      enginecc: 1300,
      transmission: "Automatic",
      enginetype: "Petrol",
      price: 1200000,
    },
    {
      images_url: ["/images/postad-img.png"],
      brand: "Audi",
      variant_name: "A3",
      modelyear: "2021",
      city: "Lahore",
      Mileage: 100000,
      enginecc: 1300,
      transmission: "Automatic",
      enginetype: "Petrol",
      price: 1200000,
    },
    {
      images_url: ["/images/postad-img.png"],
      brand: "Audi",
      variant_name: "A3",
      modelyear: "2021",
      city: "Lahore",
      Mileage: 100000,
      enginecc: 1300,
      transmission: "Automatic",
      enginetype: "Petrol",
      price: 1200000,
    },
  ]);

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
            <Filtermodal />
          </div>
          <div className="cars">
            {cardata.map((obj) => {
              return (
                <>
                  <Link className="singlecar_link" href="#">
                    <div
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
                            <i class="bx bx-heart"></i>
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

export default Search_car;
