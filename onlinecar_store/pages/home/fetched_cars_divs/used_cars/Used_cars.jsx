import React, { useState } from "react";
import Link from "next/link";
import price_converter from "@/components/processing_functions/Price_calculator";
import Image from "next/image";

const Used_cars = () => {
  const [carrdata, setCarrdata] = useState([
    {
      id: "12345678976543",
      images_url: ["/images/samplecar.webp"],
      brand: "Audi",
      model: "A3",
      variant_name: "e-tron",
      modelyear: "2021",
      city: "Lahore",
      Mileage: 100000,
      enginecc: 1300,
      transmission: "Automatic",
      enginetype: "Petrol",
      price: 1200000,
    },
    {
      id: "12345678976543",
      images_url: ["/images/samplecar.webp"],
      brand: "Audi",
      model: "A3",
      variant_name: "e-tron",
      modelyear: "2021",
      city: "Lahore",
      Mileage: 100000,
      enginecc: 1300,
      transmission: "Automatic",
      enginetype: "Petrol",
      price: 1200000,
    },
    {
      id: "12345678976543",
      images_url: ["/images/samplecar.webp"],
      brand: "Audi",
      model: "A3",
      variant_name: "e-tron",
      modelyear: "2021",
      city: "Lahore",
      Mileage: 100000,
      enginecc: 1300,
      transmission: "Automatic",
      enginetype: "Petrol",
      price: 1200000,
    },
    {
      id: "12345678976543",
      images_url: ["/images/samplecar.webp"],
      brand: "Audi",
      model: "A3",
      variant_name: "e-tron",
      modelyear: "2021",
      city: "Lahore",
      Mileage: 100000,
      enginecc: 1300,
      transmission: "Automatic",
      enginetype: "Petrol",
      price: 1200000,
    },
    {
      id: "12345678976543",
      images_url: ["/images/samplecar.webp"],
      brand: "Audi",
      model: "A3",
      variant_name: "e-tron",
      modelyear: "2021",
      city: "Lahore",
      Mileage: 100000,
      enginecc: 1300,
      transmission: "Automatic",
      enginetype: "Petrol",
      price: 1200000,
    },
   
  ]);

  return (
    <>
      <div className="car_cars_sliders">
        {carrdata.map((obj, i) => {
          return (
            <>
              {/* <Link className="singlecar_link" href="#"> */}
              <Link
                href={`used_cars/car/${obj.brand.replaceAll(
                  " ",
                  "-"
                )}-${obj.model.replaceAll(" ", "-")}-${obj.modelyear}-${
                  obj._id
                }`.toLowerCase()}
              >
                <div key={i} className="singlecar">
                  <div className="car_img">
                    <Image
                      src={
                        obj.images_url[0].img_url
                          ? obj.images_url[0].img_url
                          : obj.images_url[0]
                      }
                      width={200}
                      height={200}
                      alt="loading"
                    />
                  </div>
                  <div className="car_info">
                    <div className="car_content">
                      <h3>
                        {obj.brand} {obj.model}{" "}
                        {obj.variant_name && obj.variant_name} {obj.modelyear}
                      </h3>
                      {/* </Link> */}

                      <p className="price_mbv">
                        <strong>PKR:{obj.price}</strong>
                      </p>

                      <p>{obj.city}</p>
                      <div>
                        <span>{obj.modelyear}</span>
                        <span>{obj.Mileage} km</span>
                        <span>{obj.enginetype}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </>
          );
        })}
        {carrdata.length == 0 && (
          <>
            <h2>No car with these filters..</h2>
          </>
        )}
      </div>
    </>
  );
};

// export async function getServerSideProps({}) {
//   const res = await axios.get(
//     `${process.env.Host}/api/getcarswithfilters/?filters=${query.filters}`
//   );
//   const carrdata = res.data.data;
//   let loadingg = false;
//   if (carrdata) {
//     loadingg = false;
//   }

//   // console.log(carrdata)

//   return {
//     props: {
//       carrdata,
//       loadiing: loadingg,
//       // total:pages,
//       // cardata,
//       // pagenum:params.page
//     },
//     //   revalidate: 300
//   };
// }

export default Used_cars;
