import React,{useState,useCallback,useRef } from "react";
import Textareamodal from "@/components/Modals/custom models/textareamodel/Textareamodal";
import Head from "next/head";
import { set } from "mongoose";

const Post_ad = () => {
  const textareaRef = useRef(null);

  const [desc, setDesc] = useState('');
  // const [resettxtarea, setResettxtarea] = useState(false);
  const [concatenatedValue, setConcatenatedValue] = useState('');


  const Addtext = useCallback((value) => {
   setDesc(desc + value); 
  }, [desc]);

  const resettextarea=()=>{
    setDesc("");
    textareaRef.current.resetfunc();
  }


  const uploadcar=(e)=>{
    e.preventDefault();
  }


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
            <i className="bx bx-chevron-left"></i>
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
              <i className="bx bxs-car"></i>
              <p> Enter Your Car Information </p>
            </div>
            <div className="icons">
              <i className="bx bxs-car"></i>
              <p> Enter Your Car Information </p>
            </div>
            <div className="icons">
              <i className="bx bxs-car"></i>
              <p> Enter Your Car Information </p>
            </div>
          </div>
        </div>
        <div className="postad_formsection">
          <div className="car_info">
            <div className="form_section">
              <form onSubmit={uploadcar}>
                <div className="upper_form_section">
                  <div className="form_title">
                    <h2>Car Information</h2>
                    <p>(All fields marked with * are mandatory)</p>
                  </div>
                  <div className="input_field">
                    <i className="bx bxs-car"></i>
                    <div>
                      <label htmlFor="">Location</label>
                      <select name="" id="">
                        <option value="select">City</option>
                      </select>
                    </div>
                    <i className='bx bx-error-circle'></i>
                    <p>We don't allow duplicates of same ad.</p>
                  </div>
                  <div className="input_field">
                    <i className="bx bxs-car"></i>
                    <div>
                      <label htmlFor="">City Area</label>
                      <select name="" id="">
                        <option value="select">-Select Area-</option>
                      </select>
                    </div>
                    <i className='bx bx-error-circle'></i>
                    <p>We don't allow duplicates of same ad.</p>
                  </div>
                  <div className="input_field">
                    <i className="bx bxs-car"></i>
                    <div>
                      <label htmlFor="">Car Model</label>
                      <select name="" id="">
                        <option value="select">Make/Model/Version</option>
                      </select>
                    </div>
                   
                  </div>
                  <div className="input_field">
                    <i className="bx bxs-car"></i>
                    <div>
                      <label htmlFor="">Registered In</label>
                      <select name="" id="">
                        <option value="select">Un-Registered</option>
                      </select>
                    </div>
                    
                  </div>
                  <div className="input_field">
                    <i className="bx bxs-car"></i>
                    <div>
                      <label htmlFor="">Exterior Color</label>
                      <select name="" id="">
                        <option value="select">Color</option>
                      </select>
                    </div>
                   
                  </div>
                  <div className="input_field">
                    <i className="bx bxs-car"></i>
                    <div>
                      <label htmlFor="">Mileage * (km)</label>
                      <select name="" id="">
                        <option value="select">Specify Km driven</option>
                      </select>
                    </div>
                    <i className='bx bx-error-circle'></i>
                    <p>We don't allow promotional messages <br />that are not relevant to the ad</p>
                  </div>
                  <div className="input_field">
                    <i className="bx bxs-car"></i>
                    <div>
                      <label htmlFor="">Price* (Rs.)</label>
                      <select name="" id="">
                        <option value="select">select</option>
                      </select>
                    </div>
                    <i className='bx bx-error-circle'></i>
                    <p>Please enter a realistic price <br />to get more genuine responses.</p>
                  </div>
                  <div className="input_field">
                    <i className="bx bxs-car"></i>
                    <div className="discription_area">
                      <label htmlFor="textarea"><span>Description</span> <span className="resetbtn" onClick={resettextarea}>Reset</span></label>
                      <textarea name="textarea" id="" cols="30" rows="10" onChange={(e)=>{setDesc(e.target.value)}} value={desc} placeholder="e.g:alloy rims, first hand etc..." />
                      <Textareamodal ref={textareaRef}  adddtext={Addtext} /> 
                    </div>
                    
                  </div>
                </div>
                <div className="upload_img_section">
                <div className="form_title" >
                    <h2>Car Information</h2>
                  </div>
                  <div className="upload_img_input">
                    <div className="upload_input">
                    <i className='bx bx-import'></i>
                    <input type="file" />
                    </div>
                   
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
