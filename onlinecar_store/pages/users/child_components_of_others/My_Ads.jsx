import React, { useEffect,useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";


const FullLoader = dynamic(
  () => import("@/components/Modals/Loader/FullLoader"),
  {
    loading: () => <p>Loading...</p>,
  }
);


import axios from "axios";

const My_Ads = () => {
  const { data: sessionData } = useSession();

  const [carrdata, setCarrdata] = useState([])
  const [loadiing, setLoadiing] = useState(false)


  useEffect(() => {
    let userid = sessionData?.user._id;
    if (userid) {
      getuser_ads();
    }
    async function getuser_ads() {
     
      setLoadiing(true)

      await axios
        .get(`/api/user_ads/?userid=${userid}`)
        .then((res) => {
          console.log(res.data.message);
          setCarrdata(res.data.message)
        })
        .catch((err) => {
          console.log(err.message);
        }).finally(()=>{
          setLoadiing(false)
        });
    }
  }, []);

  return (
    <>
      <div className="main_ads_section">
        <div className="ads_links_section">
          <div className="links">Active</div>
          <div className="links">Pending</div>
          <div className="links">Removed</div>
        </div>
        <div className="my_Ads_section">
          <div className="cars" style={{width:'100%'}}>
            {carrdata.map((obj, i) => {
              return (
                <>
                  {/* <Link className="singlecar_link" href="#"> */}
                  <div
                    key={i}
                    className="singlecar"
                    style={{
                      border: "1px solid rgb(216, 216, 216)",
                      padding: "3px",
                      display: "flex",
                      boxShadow: "0 0 11px rgba(0,0,0,0.1)",
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
                      <div className="car_content" style={{textAlign:'left'}}>
                        <Link
                          href={`/used_cars/car/${obj.brand.replaceAll(
                            " ",
                            "-"
                          )}-${obj.model.replaceAll(" ", "-")}-${
                            obj.modelyear
                          }-${obj._id}`.toLowerCase()}

                          target="_blank"
                        >
                          <h3>
                            {obj.brand} {obj.model}{" "}
                            {obj.variant_name && obj.variant_name}{" "}
                            {obj.modelyear}
                          </h3>
                        </Link>
                        <p className="price_mbv">
                          <strong>PKR:{obj.price}</strong>
                        </p>

                        <p>{obj.city}</p>
                        <div>
                          <span>{obj.Mileage}km</span>
                          <span>{obj.enginecc}cc</span>
                          <span>{obj.transmission}</span>
                          <span>{obj.enginetype}</span>
                        </div>
                      </div>
                      <div className="car_price_section">
                        <div className="car_price_fav">
                          <h3>{obj.price}</h3>
                          {/* <i className="bx bx-heart"></i> */}
                        </div>
                        {/* <div className="phone_num">
                          <button>Show Phone No.</button>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  {/* </Link> */}
                </>
              );
            })}
            {carrdata.length == 0 && (
              <>
                <h5>No Active Ads</h5>
              </>
            )}
            {loadiing ? <FullLoader /> : <></>}
          </div>
          {/* <h5>No Active Ads</h5> */}
        </div>
      </div>
    </>
  );
};

export default My_Ads;
