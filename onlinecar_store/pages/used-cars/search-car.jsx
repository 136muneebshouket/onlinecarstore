import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

import { useRouter } from "next/router";
import Head from "next/head";
import price_converter from "@/components/processing_functions/Price_calculator";
// import getServerSideProps from './filtercarfunc'
import Favourites from "@/components/favourites_component/Favourites";

import Filtermodal from "@/components/Filters/FiIter_bar/Filtermodal";
// import Context from "@/components/processing_functions/context";
// import { useContext } from "react";

const FullLoader = dynamic(
  () => import("@/components/Modals/Loader/FullLoader"),
  {
    loading: () => (
      <div className="loder">
        <h2>Loading...</h2>
      </div>
    ),
  }
);

const Search_car = ({ carrdata, loadiing, total, pagenum }) => {
  const router = useRouter();

  // console.log(carrdata)
  const [filtersheading, setFiltersheading] = useState({});
  const [filterslength, setFilterslength] = useState(0);
  const [loading, setLoading] = useState(loadiing);
  const [sortoptions, setSortoptions] = useState([
    { value: "", html: "Sort" },
    { value: "createdAt-desc", html: "Latest" },
    { value: "createdAt-asc", html: "Oldest" },
    { value: "price-asc", html: "price: Low to High" },
    { value: "price-desc", html: "price: High to Low" },
    { value: "modelyear-desc", html: "modelyear: High to Low" },
    { value: "modelyear-asc", html: "modelyear: Low to High" },
    { value: "Mileage-asc", html: "Mileage: Low to High" },
    { value: "Mileage-desc", html: "Mileage: High to Low" },
  ]);

  // const [carrdata, setCarrdata] = useState([
  //   {
  //     id:'12345678976543',
  //     images_url: ["/images/postad-img.png"],
  //     brand: "Audi",
  //     model: "A3",
  //     variant_name: "e-tron",
  //     modelyear: "2021",
  //     city: "Lahore",
  //     Mileage: 100000,
  //     enginecc: 1300,
  //     transmission: "Automatic",
  //     enginetype: "Petrol",
  //     price: 1200000,
  //   },
  //   {
  //     id:'12345678976543',
  //     images_url: ["/images/postad-img.png"],
  //     brand: "Audi",
  //     model: "A3",
  //     variant_name: "e-tron",
  //     modelyear: "2021",
  //     city: "Lahore",
  //     Mileage: 100000,
  //     enginecc: 1300,
  //     transmission: "Automatic",
  //     enginetype: "Petrol",
  //     price: 1200000,
  //   },
  //   {
  //     id:'12345678976543',
  //     images_url: ["/images/postad-img.png"],
  //     brand: "Audi",
  //     model: "A3",
  //     variant_name: "e-tron",
  //     modelyear: "2021",
  //     city: "Lahore",
  //     Mileage: 100000,
  //     enginecc: 1300,
  //     transmission: "Automatic",
  //     enginetype: "Petrol",
  //     price: 1200000,
  //   },

  // ]);

  const getfilters = useCallback(async (filters) => {
    // console.log(filters)
    if (filters) {
      // passfilters = filters;

      const flattenedFilters = {};
      Object.entries(filters).map(([key, value]) => {
        if (Array.isArray(value)) {
          flattenedFilters[key] = value;
        } else if (typeof value === "object") {
          if (Object.keys(value).length > 0) {
            flattenedFilters[key] = JSON.stringify(value);
          }
        } else {
          flattenedFilters[key] = value;
        }
      });

      if (Object.keys(flattenedFilters).length > 0) {
        // console.log(Object.keys(flattenedFilters).length)
        // setFilterslength(Object.keys(flattenedFilters).length)
        const filtersString = JSON.stringify(flattenedFilters);
        router.replace({
          query: `filters=${filtersString}`, // Pass the filters as query parameters
        });
      } else {
        router.replace({
          query: ``, // Pass the filters as query parameters
        });
      }
    }
  }, []);

  useEffect(() => {
    let filters = router.query.filters;
    if (filters) {
      // console.log(filters)
      let queryobj = JSON.parse(filters);

      setFilterslength(Object.keys(queryobj).length);
    }
  }, []);

  // console.log( typeof filtersheading)
  const showfilters = () => {
    document.getElementById("filters").style.display = "block";
  };

  async function pagination(hint) {
    let number = parseInt(pagenum);
    if (hint == "prev") {
      if (pagenum != 1) {
        number = number - 1;
      } else {
        return;
      }
    }
    if (hint == "next") {
      if (pagenum != total) {
        number = number + 1;
      } else {
        return;
      }
    }

    await router.push({
      ...router,
      query: {
        ...router.query,
        page: number,
      },
    });
  }

  async function handleSortBy(e) {
    let sort = e.target.value;
    // console.log(sort)
    if (!sort) {
      return;
    }
    await router.push({
      ...router,
      query: {
        ...router.query,
        sortby: sort,
      },
    });
    // }
  }

  function checksort(val) {
    let sortkey = router.query?.sortby;
    if (val == sortkey) {
      return true;
    }else{
      return false;
    }
  }

  function img_transformation(pic) {
    let imgname = pic.split(`${process.env.URLENDPOINT}`)[1]
    let newurl = process.env.URLENDPOINT + '/tr:q-50,ar-5-4,w-200,f-webp' + imgname;
    // console.log(newurl)
     return newurl;
   }
  // console.log(filterslength)

  return (
    <>
      <Head>
        <title>{filtersheading.toString()}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {loading ? <FullLoader /> : <></>}
      <div className="main_searchcar">
        <div className="filters_sort_section">
          <button onClick={showfilters}>
            <i class="bx bxs-filter-alt"></i>
            <span>Filters</span>
            {filterslength > 0 ? (
              <span className="length_icon">{filterslength}</span>
            ) : (
              <></>
            )}
          </button>
        </div>
        <div className="head">
          <h1>{filtersheading.toString()}</h1>
        </div>
        <div className="sort_div">
          {/* <button>Sort By: &nbsp;</button> */}
          <select name="" id="" onChange={handleSortBy}>
            {sortoptions?.map((v) => {
              return (
                <>
                  <option value={v.value} selected={checksort(v.value)}>
                    {v.html}
                  </option>
                </>
              );
            })}
          </select>
        </div>
        <div className="cars_and_filters">
          <div className="filters" id="filters">
            <Filtermodal
              getfilters={getfilters}
              description={setFiltersheading}
            />
          </div>
          <div className="cars">
            {carrdata?.map((obj, i) => {
              // console.log(obj)
              return (
                <>
                  {/* <Link className="singlecar_link" href="#"> */}
                  <div
                    style={{
                      background: "white",
                      border: "1px solid rgb(216, 216, 216)",
                      boxShadow: "0 0 11px rgba(0,0,0,0.1)",
                      margin: "3px 0px",
                      padding: "5px 0px",
                    }}
                  >
                    <div
                      key={obj?._id}
                      className="singlecar"
                      style={{
                        display: "flex",
                      }}
                    >
                      <div className="car_img">
                        <Image
                          src={
                            img_transformation(obj?.images_url[0]?.img_url
                              ? obj?.images_url[0]?.img_url
                              : obj?.images_url[0])
                          }
                          width={200}
                          height={200}
                          alt="loading"
                        />
                      </div>
                      <div className="car_info">
                        <div>
                          <Link
                            className="car_content"
                            href={`car/${obj?.brand.replaceAll(
                              " ",
                              "-"
                            )}-${obj?.model.replaceAll(" ", "-")}-${
                              obj?.modelyear
                            }-for-sale-in-${obj?.city.replaceAll(" ", "-")}-${
                              obj?._id
                            }`.toLowerCase()}
                          >
                            <h3>
                              {obj?.brand} {obj?.model}{" "}
                              {obj?.variant_name && obj?.variant_name}{" "}
                              {obj?.modelyear}
                            </h3>

                            <p className="price_mbv">
                              <strong>PKR:{price_converter(obj?.price)}</strong>
                            </p>

                            <p>{obj?.city}</p>

                            <div style={{ marginBottom: "5px" }}>
                              <span>{obj?.Mileage} km</span>
                              <span>{obj?.enginecc}cc</span>
                              <span className="hide_in_mbv">
                                {obj?.transmission}
                              </span>
                              <span className="hide_in_mbv">
                                {obj?.enginetype}
                              </span>
                            </div>
                          </Link>
                        </div>

                        <div className="car_price_section">
                          <div className="car_price_fav">
                            <h3>{price_converter(obj?.price)}</h3>
                            <Favourites car_id={obj?._id} />
                          </div>
                          <div className="phone_num">
                            <button>Show Phone No.</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="extra_details">
                      {obj?.pending == 0 ? (
                        <span className="pending_banner">Pending</span>
                      ) : null}
                      {obj?.managed_by == true ? (
                        <span className="pending_banner">
                          Managed by CarSelection
                        </span>
                      ) : null}
                      {obj?.auction_sheet == true ? (
                        <span className="pending_banner">
                          &#10004; Auction Sheet
                        </span>
                      ) : null}

                      {obj?.overall_incpection_rating?.overall_rating ? (
                        <span className="total_rating">
                          {obj?.overall_incpection_rating?.overall_rating}
                          /10
                        </span>
                      ) : null}
                    </div>
                  </div>

                  {/* </Link> */}
                </>
              );
            })}
            {carrdata?.length == 0 && (
              <>
                <h2>No car with these filters..</h2>
              </>
            )}
            <div className="pages_btns">
              <div className="page_numbers">
                <span>Page</span>
                <span>{pagenum}</span>
                <span>of</span>
                <span>{total}</span>
              </div>
              <div className="btns">
                <button
                  onClick={() => {
                    pagination("prev");
                  }}
                >
                  Previous
                </button>
                <button
                  onClick={() => {
                    pagination("next");
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* {loadiing ? <FullLoader /> : <></>} */}
    </>
  );
};

export async function getServerSideProps({ params, query, res }) {
  const resp = await axios.get(
    `${process.env.Host}/api/getcarswithfilters/?filters=${
      query.filters ? query.filters : ""
    }&limit=12&page=${query.page ? query.page : ""}&text=${
      query.text ? query.text : ""
    }${query.sortby ? `&sortby=${query.sortby}` : ""}`
  );
  const carrdata = resp.data.data;
  const pages = Math.ceil(resp.data.count / 12);
  let loadingg = true;
  if (carrdata) {
    loadingg = false;
  }

  // console.log(pages)
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  return {
    props: {
      carrdata,
      loadiing: loadingg,
      total: pages,
      pagenum: query.page || 1,
    },
    // revalidate: 300
  };
}

export default Search_car;
// ${obj?.brand.replaceAll(" ",'-')}-${obj?.model.replaceAll(" ",'-')}-${obj?.modelyear}
