import React, { useState, useCallback, useRef, useEffect } from "react";
import Textareamodal from "@/components/Modals/custom models/textareamodel/Textareamodal";
import Show_img_modal from "@/components/Modals/custom models/Showimagemodal/Show_img_modal";
import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";

const OptionsModal = dynamic(
  () => import("@/components/Modals/custom models/Optionsmodal/Optionsmodal"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const Post_ad = () => {
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const [desc, setDesc] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isimgModalOpen, setIsimgModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState({
    imgurl: "",
    index: null,
  });
  const [modalvalue, setModalvalue] = useState("");
  const [imagestoshow, setImagestoshow] = useState([]);

  const [carobj, setCarobj] = useState({
    city: "",
    area: "",
    modelyear: "",
    brand: "",
    model: "",
    variant_name: "",
    enginecc: "",
    transmission: "",
    enginetype: "",
    duration: "",
    color: "",
    Registered_In: ""
  });

  useEffect(() => {
    // Clear the images array when the component mounts.
    setImagestoshow([]);
  }, []);

  //closing and opening modal /////////////////////////////////////////////////////////////////////////////////
  const handleOpenModal = useCallback((value) => {
    setIsModalOpen(true);
    setModalvalue(value);
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  /////////////////////////////////////////////////////////////////////////////////

  ////geting data from options modal//////////////////////////////////////////////////////////////////////
  const getfromoptionsmodal = useCallback((values) => {
    if (values.b) {
      setCarobj((prevCarobj) => {
        return {
          ...prevCarobj,
          ...(values.b && { brand: values.b }),
          ...{ modelyear: values.modelyear },
          ...{ model: values.m },
          ...{ variant_name: values.v_name },
          ...{ enginecc: values.enginecc },
          ...{ transmission: values.transmission },
          ...{ enginetype: values.enginetype },
          ...{ duration: values.duration },
        };
      });
    }
    if (values.city) {
      setCarobj((prevCarobj) => {
        return {
          ...prevCarobj,
          ...(values.city && { city: values.city }),
          ...{ area: values.area },
        };
      });
    }
    if (values.colorname) {
      setCarobj((prevCarobj) => {
        return {
          ...prevCarobj,
          ...(values.colorname && { color: values.colorname }),
        };
      });
    }
    if(values.registerationin){
      setCarobj((prevCarobj) => {
        return {
          ...prevCarobj,
          ...(values.registerationin && { Registered_In: values.registerationin }),
        };
      });
    }
  }, []);

  console.log(carobj);
  // console.log(imagestoshow);

  //add text from text area///////////////////////////////////////////////////////////////////////////
  const Addtext = useCallback(
    (value) => {
      setDesc(desc + value);
    },
    [desc]
  );

  const resettextarea = () => {
    setDesc("");
    textareaRef.current.resetfunc();
  };

  //uploading images section///////////////////////////////////////////////////////////////////////////
  const handleImagePicked = async (event) => {
    const files = event.target.files;
  if(files.length >= 10 || imagestoshow.length >= 10){
    alert("Maximum 10 images are allowed");
    return;
  }
    // Loop through the selected files
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Check if the size of the current image exceeds the limit (5MB)
      if (file.size > 4 * 1024 * 1024) {
        alert("Image size should not exceed 4MB. Upload your Images again");
        continue;
      }

      // Read the selected image and convert it to a Data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagestoshow((prevSelectedImages) => [
          ...prevSelectedImages,
          { url: e.target.result, file },
        ]);
      };
      reader.readAsDataURL(file);
    }

    // Clear the file input after image selection
    fileInputRef.current.value = null;
  };
  // function for deleting selected images///////////////////////////////////////////////////////////////////////////

  const delimages = (imgindex) => {
   const filteredimages= imagestoshow.filter((obj,index) => {
      if (index !== imgindex) {
        return obj;
      }
    });
    setImagestoshow(filteredimages)
    setIsimgModalOpen(false);
  }
  // function for uploading cardata///////////////////////////////////////////////////////////////////////////
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
                    <div
                      onClick={() => {
                        handleOpenModal("Location");
                      }}
                    >
                      <label htmlFor="">Location</label>
                      <input
                        type="text"
                        placeholder="Location"
                        value={
                          carobj.city &&
                          `${carobj.city} > ${carobj.area && carobj.area} `
                        }
                        disabled
                      />
                    </div>
                    <div className="input_alert">
                      <i className="bx bx-error-circle"></i>
                      <p>We don't allow duplicates of same ad.</p>
                    </div>
                  </div>
                  <div className="input_field">
                    <i className="bx bxs-car"></i>
                    <div>
                      <label htmlFor="">City Area</label>
                      <select name="" id="">
                        <option value="select">-Select Area-</option>
                      </select>
                    </div>
                  </div>
                  <div className="input_field">
                    <i className="bx bxs-car"></i>
                    <div
                      onClick={() => {
                        handleOpenModal("Car Model");
                      }}
                    >
                      <label htmlFor="">Car Model</label>
                      {/* <select name="" id="">
                        <option value="select">Make/Model/Version</option>
                      </select> */}
                      <input
                        type="text"
                        name=""
                        id=""
                        value={
                          carobj.brand
                            ? `${carobj.modelyear} ${carobj.brand} ${carobj.model} ${carobj.variant_name}`
                            : ""
                        }
                        placeholder="Make/Model/Version"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="input_field">
                    <i className="bx bxs-car"></i>
                    <div
                     onClick={() => {
                      handleOpenModal("Registration");
                    }}
                    >
                      <label htmlFor="">Registered In</label>
                      <input
                        type="text"
                        placeholder="Registered_In"
                        value={
                          carobj.registerationin &&
                          `${carobj.registerationin}  `
                        }
                        disabled
                      />
                    </div>
                  </div>
                  <div className="input_field">
                    <i className="bx bxs-car"></i>
                    <div
                      onClick={() => {
                        handleOpenModal("Color");
                      }}
                    >
                      <label htmlFor="">Exterior Color</label>
                      <input
                        type="text"
                        value={carobj.color && `${carobj.color}`}
                        placeholder="Color"
                        disabled
                      />
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
                        onChange={handleImagePicked}
                        multiple
                        accept="image/*"
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                      />
                    </div>
                    <div
                      className="uploaded_images"
                      style={{ display: "flex", flexWrap: "wrap" }}
                    >
                      {imagestoshow.map((image, index) =>
                        image.url ? (
                          <div
                            key={index}
                            style={{
                              width: "160px",
                              height: "130px",
                              margin: "10px",
                              overflow: "hidden",
                              cursor: "pointer",
                            }}
                            className={index == 0 && "coverphototag"}
                            onClick={() => {
                              setSelectedImageUrl((s) => ({
                                ...s,
                                imgurl: image.url,
                                index: index,
                              }));
                              setIsimgModalOpen(true);
                            }}
                          >
                            <Image
                              src={image.url}
                              alt={`Image ${index + 1}`}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                              width={100}
                              height={100}
                            />
                          </div>
                        ) : (
                          <>loading img..</>
                        )
                      )}
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
                  <div
                    className="input_field"
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <div>
                      <div className="watsapp_field">
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

      {isModalOpen && (
        <OptionsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          modalvalue={modalvalue}
          carrdata={getfromoptionsmodal}
        />
      )}
      {isimgModalOpen && (
        <Show_img_modal
          onClose={setIsimgModalOpen}
          selectedimg={selectedImageUrl}
          delimages={delimages}
        />
      )}
    </>
  );
};

export default Post_ad;
