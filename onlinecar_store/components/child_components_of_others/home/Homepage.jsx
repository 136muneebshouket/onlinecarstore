import React, { useState , useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Slider from "@/components/fetched_cars_divs/Slider";
import Used_cars from "@/components/fetched_cars_divs/used_cars_homepage/Used_cars";
import H_Videos from "@/components/Video_components/homepage_videos/H_Videos"; 
import Header_title from "./Header_title";
import Header_search_bar from "./Header_search_bar";
// import Usedcarchild from "@/components/carschildcomponents/Usedcarchild.server";

const Homepage = () => {
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
  const [readmore_ul, setReadmore_ul] = useState(false);

  return (
    <>
      <div className="home_main">
        <div className="home_header">
          <div className="grey_back"></div>
          {/* <div className="header_content" style={{position:'relative' }}> */}
            <Header_title/>
            <Header_search_bar/>
            {/* <div className="home_search">
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
            </div> */}
            {/* <div className="advance_searchbtn">
              <Link href="/used_cars/Search-car">Advance Search <i class='bx bx-search-alt-2'></i> </Link>
            </div> */}
          {/* </div> */}
        </div>
        <div className="home_others">
          <div className="sell_links">
            <div className="inner_container">
              <h3 style={{ textAlign: "center" }}>
                Sell Your Car on Carselection and Get the Best Price
              </h3>
              <div className="mobile_logo">
                <Image src={'/images/logo.png'} unoptimized={true}  alt="Logo" width={100} height={100}/>
              </div>
              <div className="post_ad_sec">
                <div className="first_div">
                  <h4>Post your Ad on Carselection</h4>
                  <ul style={{maxHeight:`${readmore_ul?'220px':''}`}}>
                    <li>
                      <span>&#10003;</span><p>Post your car ad <strong>FREE</strong> on our platform and connect with <strong>pre-verified</strong> buyers ready to purchase.</p>
                    </li>
                    <li>
                      <span>&#10003;</span><p><strong>Sell your car quickly</strong> and get the <strong>best possible price</strong> with our extensive network of interested buyers.</p>
                    </li>
                    <li>
                      <span>&#10003;</span><p><strong>Selling your car</strong> is now easier than ever! Our <strong>3-step ad posting</strong> takes the hassle out of the process.</p>
                    </li>
                  </ul>
                  <i onClick={()=>{setReadmore_ul(!readmore_ul)}} className='bx bxs-down-arrow'></i>

                  <Link href="/used-cars/-/sell">Post Your Car Ad</Link>
                </div>
                <div className="first_div">
                  <h4>Try Carselection Sell It For Me</h4>
                  <ul style={{maxHeight:`${readmore_ul?'220px':''}`}}>
                    <li>
                      <span>&#10003;</span> <p><strong>Stress-Free Car Selling:</strong> Dedicated Sales Experts Get You <strong>Top Offers</strong></p> 
                    </li>
                    <li>
                      <span>&#10003;</span>  <p><strong>Sell your car fast and hassle-free</strong> with our <strong>experienced sales specialists</strong>. We handle the negotiation and secure you the <strong>best possible offer</strong>.</p> 
                    </li>
                    <li>
                      <span>&#10003;</span> <p><strong>Safe and Secure Transactions:</strong> Enjoy peace of mind knowing our process is designed to protect you throughout the entire <strong>sale</strong>.</p>  
                    </li>
                    
                  </ul>
                  <i onClick={()=>{setReadmore_ul(!readmore_ul)}} className='bx bxs-down-arrow'></i>
                  <Link
                    href="/products/sell-it-for-me"
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
                  <Link style={{textDecoration:'none'}} href={'/products/sell-it-for-me'}>
                  <div className="offer">
                    <Image src="/images/sell_it_for_me.webp" width={1000} height={1000} alt="loading" />
                    <div>
                      <span>Carselection</span>
                      <p>Sell it for me</p>
                    </div>
                  </div>
                  </Link>
                 
                  {/* <div className="offer">
                    <Image src="/images/car1.jpg" width={1000} height={1000}  alt="loading" />
                    <div>
                      <span>Carselection</span>
                      <p>Car Incepection</p>
                    </div>
                  </div> */}
                </div>
                <div>
                  <Link style={{textDecoration:'none'}} href={'/users/user_dashboard/Others?My_Ads'}>
                  <div className="offer">
                    <Image src="/images/car_incepection.webp" width={1000} height={1000}  alt="loading" />
                    <div>
                      <span>Carselection</span>
                      <p>Car Inspection</p>
                    </div>
                  </div>
                  </Link>
                 
                  {/* <div className="offer">
                    <Image src="/images/car1.jpg" width={1000} height={1000}  alt="loading" />
                    <div>
                      <span>Carselection</span>
                      <p>Ownership transfer</p>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          <div className="offerings">
            <div className="inner_container">
              <h2>Used Cars for Sale</h2>
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
          <div className="browse_cars">
            <div className="inner_container">
              <h2>Our Videos</h2>
              <H_Videos/>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer/> */}
    </>
  );
};

export default Homepage;
