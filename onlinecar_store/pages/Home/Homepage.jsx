import React, { useState } from "react";
import Link from "next/link";
import Slider from "@/components/fetched_cars_divs/Slider";
import Used_cars from "@/components/fetched_cars_divs/used_cars/Used_cars";
// import Usedcarchild from "@/components/carschildcomponents/Usedcarchild.server";

const Home = () => {
  const [option, setOption] = useState("Body Type");
  // console.log(option)
  const [optionsarr, setOptionsarr] = useState([
    "Body Type",
    "Make",
    "Model",
    "City",
    "Budget",
    "Category",
  ]);
  return (
    <>
      <div className="home_main">
        <div className="home_header">
          <div className="header_content">
            <div className="header_title">
              <h1>Find Used Cars in Pakistan</h1>
              <p>With thousands of cars, we have just the right one for you</p>
            </div>
            <div className="home_search">
              <input
                type="text"
                name=""
                id=""
                placeholder="Car Make or Model"
              />
              <select name="All Cities" id="">
                <option value="">Cities</option>
              </select>
              <select name="Price Range" id="">
                <option value="">Range</option>
              </select>
              <div className="icon_search">
                <i className="bx bx-search"></i>
              </div>
            </div>
            <div className="advance_searchbtn">
              <Link href="/used_cars/Search_car">Advance Search &gt;</Link>
            </div>
          </div>
        </div>
        <div className="home_others">
          <div className="sell_links">
            <div className="inner_container">
              <h3 style={{ textAlign: "center" }}>
                Sell Your Car on Carselection and Get the Best Price
              </h3>
              <div className="post_ad_sec">
                <div className="first_div">
                  <h4>Post your Ad on Carselection</h4>
                  <ul>
                    <li>
                      <span>&#10003;</span>Post your Ad for Free in 3 Easy Steps
                    </li>
                    <li>
                      <span>&#10003;</span>Get Genuine offers from Verified
                      Buyers
                    </li>
                    <li>
                      <span>&#10003;</span>Sell your car Fast at the Best Price
                    </li>
                  </ul>
                  <Link href="/used_cars/Sell">Register Your Car</Link>
                </div>
                <div className="first_div">
                  <h4>Try Carselection Sell It For Me</h4>
                  <ul>
                    <li>
                      <span>&#10003;</span>Dedicated Sales Expert to Sell your
                      Car
                    </li>
                    <li>
                      <span>&#10003;</span>We Bargain for you and share the Best
                      Offer
                    </li>
                    <li>
                      <span>&#10003;</span>We ensure Safe & Secure Transaction
                    </li>
                  </ul>
                  <Link
                    href="#"
                    style={{ background: "#3675B3", textDecoration: "none" }}
                  >
                    Register Your Car
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="browse_cars">
            <div className="inner_container">
              <h2>Browse Used Cars</h2>
              <div className="browse_section">
                <div className="options">
                  {optionsarr.map((v, index) => {
                    return (
                      <>
                        <p
                          style={
                            option == v
                              ? { color: "#b73439" }
                              : { border: "none" }
                          }
                          onClick={(e) => {
                            setOption(v);
                          }}
                          key={index}
                        >
                          {v}
                        </p>
                      </>
                    );
                  })}
                </div>
                <div className="options_slider">
                  <Slider filterby={option} />
                </div>
              </div>
            </div>
          </div>
          <div className="offerings">
            <div className="inner_container">
              <h2>Carselection offerings</h2>
              <div className="offers_divs">
                <div>
                  <div className="offer">
                    <img src="/images/car1.jpg" alt="loading" />
                    <div>
                      <span>Carselection</span>
                      <p>Sell it for me</p>
                    </div>
                  </div>
                  <div className="offer">
                    <img src="/images/car1.jpg" alt="loading" />
                    <div>
                      <span>Carselection</span>
                      <p>Car Incepection</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="offer">
                    <img src="/images/car1.jpg" alt="loading" />
                    <div>
                      <span>Carselection</span>
                      <p>Partner Workshop</p>
                    </div>
                  </div>
                  <div className="offer">
                    <img src="/images/car1.jpg" alt="loading" />
                    <div>
                      <span>Carselection</span>
                      <p>Ownership transfer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="offerings">
            <div className="inner_container">
              <h2>Used Cars</h2>
              <div className="used_cars">
                <Used_cars />
              </div>
            </div>
          </div>
          <div className="browse_cars">
            <div className="inner_container">
              <h2>Browse New Cars by Brand</h2>
              <div className="browse_section">
                <div className="options_slider">
                  <Slider filterby={'Make'} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer/> */}
    </>
  );
};

export default Home;
