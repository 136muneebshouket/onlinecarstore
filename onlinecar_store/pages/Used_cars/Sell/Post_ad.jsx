import React from "react";
import Head from "next/head";

const Post_ad = () => {
  return (
    <>
      <Head>
        <title>POST a free add</title>
        <meta name="description" content="POST a free add" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="upload_ad_page">
        <div className="mobileview_nav">
          <div className="nav_elem">
            <i class="bx bx-chevron-left"></i>
          </div>
          <div className="nav_elem">
            <span>Sell Your Car</span>
          </div>
          <div className="nav_elem">
            <span>Post</span>
          </div>
        </div>
        <div className="uploadpage_banner">
          <div className="banner_title">
            <h1>Sell your Car With 3 Easy & Simple Steps!</h1>
            <p>It's free and takes less than a minute</p>
          </div>
          <div className="banner_icons">
            <div className="icons">
              <i class="bx bxs-car"></i>
              <p> Enter Your Car Information </p>
            </div>
            <div className="icons">
              <i class="bx bxs-car"></i>
              <p> Enter Your Car Information </p>
            </div>
            <div className="icons">
              <i class="bx bxs-car"></i>
              <p> Enter Your Car Information </p>
            </div>
          </div>
        </div>
        <div className="postad_formsection">
          <div className="car_info">
            <div className="form_section">
              <form action="">
                <div className="upper_form_section">
                  <div className="form_title">
                    <h2>Car Information</h2>
                    <p>(All fields marked with * are mandatory)</p>
                  </div>
                  <div className="input_field">
                    <i class="bx bxs-car"></i>
                    <div>
                      <label htmlFor="">Location</label>
                      <select name="" id="">
                        <option value="select">select</option>
                      </select>
                    </div>
                    <i class='bx bx-error-circle'></i>
                    <p>We don't allow duplicates of same ad.</p>
                  </div>
                  <div className="input_field">
                    <i class="bx bxs-car"></i>
                    <div>
                      <label htmlFor="">Location</label>
                      <select name="" id="">
                        <option value="select">select</option>
                      </select>
                    </div>
                   
                  </div>
                  <div className="input_field">
                    <i class="bx bxs-car"></i>
                    <div>
                      <label htmlFor="">Location</label>
                      <select name="" id="">
                        <option value="select">select</option>
                      </select>
                    </div>
                    
                  </div>
                  <div className="input_field">
                    <i class="bx bxs-car"></i>
                    <div>
                      <label htmlFor="">Location</label>
                      <select name="" id="">
                        <option value="select">select</option>
                      </select>
                    </div>
                   
                  </div>
                  <div className="input_field">
                    <i class="bx bxs-car"></i>
                    <div>
                      <label htmlFor="">Location</label>
                      <select name="" id="">
                        <option value="select">select</option>
                      </select>
                    </div>
                    <i class='bx bx-error-circle'></i>
                    <p>We don't allow promotional messages <br />that are not relevant to the ad</p>
                  </div>
                  <div className="input_field">
                    <i class="bx bxs-car"></i>
                    <div>
                      <label htmlFor="">Location</label>
                      <select name="" id="">
                        <option value="select">select</option>
                      </select>
                    </div>
                    <i class='bx bx-error-circle'></i>
                    <p>Please enter a realistic price <br />to get more genuine responses.</p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post_ad;
