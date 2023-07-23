import React, { useState, useCallback, useRef } from "react";
import Textareamodal from "@/components/Modals/custom models/textareamodel/Textareamodal";
import Head from "next/head";
import dynamic from 'next/dynamic'

const OptionsModal = dynamic(() => import('@/components/Modals/custom models/Optionsmodal/Optionsmodal'), {
  loading: () => <p>Loading...</p>,
})


const Post_ad = () => {
  const textareaRef = useRef(null);


  const [carobj, setCarobj] = useState({
    brand:"",
    model:"",
    variant_name:"",
    specs:'',
    duration:''
  });

// console.log(carobj)

  

  const [desc, setDesc] = useState("");
  // const [resettxtarea, setResettxtarea] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalvalue, setModalvalue] = useState('');

// functions for toggling modals..
  const handleOpenModal = (value) => {
    setModalOpen(true);
    setModalvalue(value)
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };


  const Addtext = useCallback(
    (value) => {
      setDesc(desc + value);
    },[desc]);

  const resettextarea = () => {
    setDesc("");
    textareaRef.current.resetfunc();
  };


  
  const uploadcar = (e) => {
    e.preventDefault();
  };

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
                    <div onClick={()=>{handleOpenModal('Location')}}>
                      <label htmlFor="">Location</label>
                     <input type="text"  placeholder="City"  disabled/>
                    </div>
                    <div className="input_alert">
                      <i className="bx bx-error-circle"></i>
                      <p>We don't allow duplicates of same ad.</p>
                    </div>
                  </div>
                  <div className="input_field">
                    <i className="bx bxs-car"></i>
                    <div >
                      <label htmlFor="">City Area</label>
                      <select name="" id="">
                        <option value="select">-Select Area-</option>
                      </select>
                    </div>
                  </div>
                  <div className="input_field">
                    <i className="bx bxs-car"></i>
                    <div onClick={()=>{handleOpenModal('carData')}}>
                      <label htmlFor="">Car Model</label>
                      {/* <select name="" id="">
                        <option value="select">Make/Model/Version</option>
                      </select> */}
                      <input type="text" name="" id="" placeholder="Make/Model/Version" disabled/>
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
                      <input type="number" />
                    </div>
                    <div className="input_alert">
                      <i className="bx bx-error-circle"></i>
                      <p>
                        We don't allow promotional messages that are not
                        relevant to the ad
                      </p>
                    </div>
                  </div>
                  <div className="input_field">
                    <i className="bx bxs-car"></i>
                    <div>
                      <label htmlFor="">Price* (Rs.)</label>
                      <input type="number" />
                    </div>
                    <div className="input_alert">
                      <i className="bx bx-error-circle"></i>
                      <p>
                        Please enter a realistic price to get more genuine
                        responses.
                      </p>
                    </div>
                  </div>
                  <div className="input_field">
                    <i className="bx bxs-car"></i>
                    <div className="discription_area">
                      <label htmlFor="textarea">
                        <span>Description</span>{" "}
                        <span className="resetbtn" onClick={resettextarea}>
                          Reset
                        </span>
                      </label>
                      <textarea
                        name="textarea"
                        id=""
                        cols="30"
                        rows="10"
                        onChange={(e) => {
                          setDesc(e.target.value);
                        }}
                        value={desc}
                        placeholder="e.g:alloy rims, first hand etc..."
                      />
                      <Textareamodal ref={textareaRef} adddtext={Addtext} />
                    </div>
                  </div>
                </div>
                <div className="upload_img_section">
                  <div className="form_title">
                    <h2>Upload Photos</h2>
                  </div>
                  <div className="upload_img_input">
                    <div className="upload_input">
                      <i className="bx bx-image-add"></i>
                      <label
                        htmlFor="upload_images_input"
                        className="uploadimg_input"
                      >
                        + Add_Photos
                      </label>
                      <input
                        name="upload_images_input"
                        id="upload_images_input"
                        type="file"
                        style={{ display: "none" }}
                      />
                    </div>
                    <div className="upload_alerts">
                      <div>
                        <i className="bx bx-check"></i>
                        <p>
                          <strong>Adding at least 8 pictures</strong> improves
                          the chances for a quick sale.{" "}
                        </p>
                      </div>
                      <div>
                        <i className="bx bx-check"></i>
                        <p>
                          <strong>
                            Adding clear Front, Back and Interior pictures
                          </strong>{" "}
                          of your car increases the quality of your Ad and gets
                          you noticed more.{" "}
                        </p>
                      </div>
                      <div>
                        <i className="bx bx-check"></i>
                        <p>
                          <strong>Photos should be in</strong> 'jpeg, jpg, png,
                          gif' format only.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="number_upload_section">
                  <div className="form_title">
                    <h2>Car Information</h2>
                  </div>
                  <div className="input_field">
                    <i className="bx bx-phone"></i>
                    <div>
                      <label htmlFor="number_upload">Mobile Number</label>
                      <input
                        id="number_upload"
                        type="number"
                        placeholder="Mobile Number"
                      />
                    </div>
                    <div className="input_alert">
                      <i className="bx bx-phone"></i>
                      <p>
                        Enter a genuine 11 digit mobile no. with format
                        03XXXXXXXXX. All inquires will come on this number.
                      </p>
                    </div>
                  </div>
                  <div className="input_field">
                    <i className="bx bx-phone"></i>
                    <div>
                      <label htmlFor="number_upload">
                        Secondary Number (Optional)
                      </label>
                      <input
                        id="number_upload"
                        type="number"
                        placeholder="Secondary Number"
                      />
                    </div>
                  </div>
                  <div className="input_field" style={{alignItems:'center' , justifyContent:'center'}}>
                    <div>
                    <div className="watsapp_field" >
                      <i className="bx bxl-whatsapp"></i>
                      <p> Allow WhatsApp Contact</p>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckChecked"
                          defaultChecked
                        />
                       
                      </div>
                    </div>
                    </div>
                   
                  </div>
                </div>

                <div className="submit_section">
                  <button type="submit">Submit & Continue</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
   
      {isModalOpen && <OptionsModal isOpen={isModalOpen} onClose={handleCloseModal} modalvalue={modalvalue} 
      />}
    </>
  );
};

export default Post_ad;
