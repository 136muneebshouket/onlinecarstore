import React, { useState, useCallback, useRef, useEffect } from "react";
import axios from "axios";
import Textareamodal from "@/components/Modals/custom models/textareamodel/Textareamodal";
import Show_img_modal from "@/components/Modals/custom models/Showimagemodal/Show_img_modal";
import FeaturesModal from "@/components/Modals/custom models/feturesmodal/FeaturesModal";
import { useSession, signOut } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
// import uploadimages from "../../../config/cloudinary/cloudinaryimagesupdate";
// import Response_modal from "@/components/Modals/response_modal/Response_modal";
import price_converter from "@/components/processing_functions/Price_calculator";
// import { generate_err } from "@/components/processing_functions/errors_gen";
import Context from "@/components/processing_functions/context";
// import { totalwork } from "@/components/processing_functions/progress";

import { useContext } from "react";

const OptionsModal = dynamic(
  () => import("@/components/Modals/custom models/Option_modals/Optionsmodal"),
  {
    loading: () => <p>Loading...</p>,
  }
);

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

const Post_ad = () => {
  //  let p = localStorage.getItem('p')
  //  console.log(totalwork)

  const { message, setMessage } = useContext(Context);
  const { data: sessionData } = useSession();

  const axiosConfig = {
    maxContentLength: 100000000, // 100MB
  };
  const axiosInstance = axios.create(axiosConfig);

  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  // const [desc, setDesc] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isimgModalOpen, setIsimgModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState({
    imgurl: "",
    index: null,
  });
  const [modalvalue, setModalvalue] = useState("");
  const [imagestoshow, setImagestoshow] = useState([]);
  const [Cloudimages, setCloudimages] = useState([]);

  const [errors, setErrors] = useState(false);
  const [phoneerr, setPhoneerr] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // const [dberrors, setDberrors] = useState({
  //   msg: "",
  //   success: null,
  // });
  //   console.log(uploadProgress)
  // useEffect(()=>{
  //   console.log(uploadProgress)
  // },[uploadProgress])

  const [loading, setLoading] = useState(false);

  // const regex = /^03[0-9]{8}$/;
  // const [err_values, setErr_values] = useState([]);
  const initialState = {
    seller_id: null,
    city: "",
    area: "",
    brand: "",
    modelyear: "",
    Registered_In: "",
    color: "",
    Mileage: null,
    price: null,
    comments: "",
    enginetype: "",
    body_type: "",
    slug: "slug",
    model: "",
    enginecc: null,
    transmission: "",
    Assembly: "",
    carfeatures: [],
    Phone_no: "",
    variant_name: "",
    duration: "",
    Secondary_no: "",
  };

  const [carobj, setCarobj] = useState(initialState);

  useEffect(() => {
    let userid = sessionData?.user._id;

    setCarobj((prevCarobj) => {
      return {
        ...prevCarobj,
        ...{ seller_id: userid },
      };
    });
  }, [imagestoshow]);

  const resetState = () => {
    setCarobj(initialState);
  };

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
      // console.log(values)
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
          ...{ body_type: values.bodytype },
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
    if (values.registerationin) {
      setCarobj((prevCarobj) => {
        return {
          ...prevCarobj,
          ...(values.registerationin && {
            Registered_In: values.registerationin,
          }),
        };
      });
    }
    if (Array.isArray(values)) {
      // console.log(values);
      setCarobj((prevCarobj) => {
        return {
          ...prevCarobj,
          ...{ carfeatures: values },
        };
      });
    }
  }, []);

  // console.log(carobj);
  // console.log(imagestoshow);

  //add text from text area///////////////////////////////////////////////////////////////////////////
  const Addtext = useCallback(
    (value) => {
      // setDesc(desc + value);
      if (value) {
        setCarobj((prevCarobj) => {
          return {
            ...prevCarobj,
            ...{ comments: prevCarobj.comments.concat(value) },
          };
        });
      }
    },
    [carobj]
  );

  const resettextarea = () => {
    setCarobj((prevCarobj) => {
      return {
        ...prevCarobj,
        ...{ comments: "" },
      };
    });
    textareaRef.current.resetfunc();
  };

  //uploading images section///////////////////////////////////////////////////////////////////////////
  const handleImagePicked = async (event) => {
    setLoading(true);
    const files = event.target.files;
    if (files.length > 20 || imagestoshow.length >= 20) {
      setLoading(false);
      setMessage({ success: false, msg: "Maximum 20 images are allowed" });
      return;
    }

    try {
      const promises = [];

      // Loop through the selected files
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Check if the size of the current image exceeds the limit (4MB)
        if (file.size > 4 * 1024 * 1024) {
          setLoading(false);
          setMessage({
            success: false,
            msg: "Image size should not exceed 4MB. Upload your Images again",
          });
          continue;
        }

        // Read the selected image and convert it to a Data URL
        const reader = new FileReader();

        const promise = new Promise((resolve) => {
          reader.onload = (e) => {
            setImagestoshow((prevSelectedImages) => [
              ...prevSelectedImages,
              { url: e.target.result, file },
            ]);
            resolve();
          };
        });

        reader.readAsDataURL(file);
        promises.push(promise);
      }

      await Promise.all(promises); // Wait for all file reading operations to complete
    } catch (error) {
      // Handle any potential errors
      console.error("Error reading images:", error);
    } finally {
      setLoading(false); // Set the loading state to false after all images are processed
    }

    // Clear the file input after image selection
    fileInputRef.current.value = null;
  };

  // function for deleting selected images///////////////////////////////////////////////////////////////////////////

  const delimages = async (imgindex) => {
    const filteredimages = imagestoshow.filter((obj, index) => {
      if (index !== imgindex) {
        return obj;
      }
    });
    setImagestoshow(filteredimages);
    setIsimgModalOpen(false);
  };

  // function for getting errors
  var err_values = [];

  const geterrors = async () => {
    await Object.keys(carobj).forEach((key) => {
      const value = carobj[key];

      if (value == "" || value == null || value.length < 0) {
        // setErrors(true);
        if (
          !err_values.includes(key) &&
          key !== "area" &&
          key !== "variant_name" &&
          key !== "duration" &&
          key !== "Secondary_no" &&
          key !== "seller_id" &&
          key !== "model"
        ) {
          err_values.push(key);
        }
      }
    });
    if (err_values.length > 0) {
      await setErrors(true);
      let elementindex = 0;
      scroll();
      function scroll() {
        const element = document.getElementById(err_values[elementindex]);
        if (element == null) {
          elementindex += 1;
          scroll();
          return;
        }

        // console.log(element);
        const scrollOffset = -130; // Adjust the pixel value as needed

        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY + scrollOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    } else if (err_values.length === 0) {
      await setErrors(false);

      if (imagestoshow.length < 1 && err_values.length == 0) {
        await setErrors(true);
        const element = document.getElementById("carphotos");
        // console.log(element);
        const scrollOffset = -130; // Adjust the pixel value as needed

        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY + scrollOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      } else if (imagestoshow.length === 10) {
        await setErrors(false);
      }
    }
  };

  // function for uploading cardata///////////////////////////////////////////////////////////////////////////
  const uploadcar = async (e) => {
    e.preventDefault();
  
    await geterrors();
    // console.log(err_values.length);
    // console.log(errors, phoneerr);

    if (err_values.length == 0 && errors == false && phoneerr == false) {
      console.log("done");
      setLoading(true);
      // const formdataimgs = new FormData();
      const imgsto_load = imagestoshow.map((img) => {
        //  delete img.file;
        let obj = { url: img.url, name: img.file.name };
        return obj;
        // formdataimgs.append("images", img.file);
      });

      let cardata = {
        carobj,
        // formdataimgs
        imgsto_load,
      };

      const uploadPromise = axios.post(`/api/uploadcar/postmy_ad`, cardata);

      // Start the interval for tracking progress
      const progressTracker = setInterval(async () => {
        await axios.get(`/api/uploadcar/postmy_ad`).then((res) => {
          console.log(res.data); // Access progress information from response
          setMessage({progress:res.data});
        });
      }, 1000);

      // Wait for the upload to complete
      await uploadPromise
        .then((res) => {
          console.log("Upload successful:", res.data); // Handle upload response
           if (res.status == 201) {
            // setError(res?.data);
            console.log(res?.data);

            // let retun = await uploadimages(res?.data.car_id, imagestoshow, []);
            // retun
            //   .then((res) => {
            //     console.log(res);

            //   })
            //   .catch((err) => console.err(err));
            resetState();
            resettextarea();
            setLoading(false);
            setImagestoshow([])
            // setResponse(true)
            // setDberrors({ ...dberrors, msg: res?.data.message, success: true });
            setMessage({progress:null});
            setMessage({success:true,msg:res?.data.message});

          }
        })
        .catch((err) => {
          setMessage({progress:null});
          console.error("Upload failed:", err);
          setMessage({ success: false, msg: err?.response?.data.message });
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
     
        clearInterval(progressTracker);
      // await axios
      //   .post(`/api/uploadcar/postmy_ad`, cardata)
      //   .then(async (res) => {
      //     console.log(res);

      //    
      //   })
      //   .catch((err) => {
      //     // console.log(err?.response?.data);
      //     // setResponse(true)
      //     // setDberrors({ ...dberrors, msg: err?.response?.data.message, success: false });
      //     setMessage({ success: false, msg: err?.response?.data.message });
      //     setLoading(false);
      //   })
      //   .finally(() => {
      //     setLoading(false);
      //   });
    }
  };





  // console.log(carobj.carfeatures);
  // console.log(imagestoshow);
  // console.log(regex.test(carobj.Phone_no));
  // console.log(totalwork)
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
                      <label>Location</label>
                      <input
                        id="city"
                        type="text"
                        placeholder="Location"
                        name="location"
                        value={
                          carobj.city &&
                          `${carobj.city} > ${carobj.area && carobj.area} `
                        }
                        // disabled
                        readOnly
                        // required
                      />
                      {errors && carobj.city == "" ? (
                        <span className="errorspan">
                          Please fill out this input
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="input_alert">
                      <i className="bx bx-error-circle"></i>
                      <p>We don't allow duplicates of same ad.</p>
                    </div>
                  </div>

                  <div className="input_field">
                    <i className="bx bxs-car"></i>
                    <div
                      onClick={() => {
                        handleOpenModal("Car Model");
                      }}
                    >
                      <label>Car Model</label>
                      <input
                        type="text"
                        name=""
                        id="brand"
                        value={
                          carobj.brand
                            ? `${carobj.modelyear} ${carobj.brand} ${carobj.model} ${carobj.variant_name}`
                            : ""
                        }
                        placeholder="Make/Model/Version"
                        readOnly
                      />
                      {errors && carobj.brand == "" ? (
                        <span className="errorspan">
                          Please fill out this input
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="input_field">
                    <i className="bx bxs-car"></i>
                    <div
                      onClick={() => {
                        handleOpenModal("Registration");
                      }}
                    >
                      <label>Registered In</label>
                      <input
                        id="Registered_In"
                        type="text"
                        placeholder="Registered_In"
                        value={
                          carobj.Registered_In && `${carobj.Registered_In}`
                        }
                        readOnly
                      />
                      {errors && carobj.Registered_In == "" ? (
                        <span className="errorspan">
                          Please fill out this input
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="input_field">
                    <i className="bx bxs-car"></i>
                    <div
                      onClick={() => {
                        handleOpenModal("Color");
                      }}
                    >
                      <label>Exterior Color</label>
                      <input
                        id="color"
                        type="text"
                        value={carobj.color && `${carobj.color}`}
                        placeholder="Color"
                        readOnly
                      />
                      {errors && carobj.color == "" ? (
                        <span className="errorspan">
                          Please fill out this input
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="input_field">
                    <i className="bx bxs-car"></i>
                    <div>
                      <label>Mileage * (km)</label>
                      <input
                        value={carobj.Mileage !== null && carobj.Mileage}
                        id="Mileage"
                        type="number"
                        onChange={(e) => {
                          setCarobj((prevCarobj) => {
                            return {
                              ...prevCarobj,
                              Mileage: parseInt(e.target.value)|| null,
                            };
                          });
                        }}
                        min="1"
                        max="1000000"
                      />
                      {errors && carobj.Mileage == null ? (
                        <span className="errorspan">
                          Please fill out this input
                        </span>
                      ) : (
                        ""
                      )}
                      {carobj.Mileage < 1 || carobj.Mileage > 1000000 ? (
                        carobj.Mileage !== null && (
                          <span className="errorspan">
                            mileage must be greater than 1 and less 1000000
                          </span>
                        )
                      ) : (
                        <></>
                      )}
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
                      <label>Price* (Rs.)</label>
                      <input
                        type="number"
                        id="price"
                        value={carobj.price !== null && carobj.price}
                        onChange={(e) => {
                          setCarobj((prevCarobj) => {
                            return {
                              ...prevCarobj,
                              price: parseInt(e.target.value)|| null,
                            };
                          });
                        }}
                        min="10000"
                        max="100000000000"
                      />
                      {errors && carobj.price == null ? (
                        <span className="errorspan">
                          Please fill out this input
                        </span>
                      ) : (
                        ""
                      )}
                      {carobj.price ? (
                        <span>Pkr: {price_converter(carobj.price)}</span>
                      ) : (
                        <></>
                      )}
                      {carobj.price < 10000 || carobj.price > 100000000000 ? (
                        carobj.price !== null && (
                          <span className="errorspan">
                            mileage must be greater than 10000 and less
                            100000000000
                          </span>
                        )
                      ) : (
                        <></>
                      )}
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
                        {errors && carobj.comments == "" ? (
                          <span className="errorspan">
                            Please fill out this input
                          </span>
                        ) : (
                          ""
                        )}
                        <span className="resetbtn" onClick={resettextarea}>
                          Reset
                        </span>
                      </label>
                      <textarea
                        name="textarea"
                        id="comments"
                        cols="30"
                        rows="10"
                        value={carobj.comments && carobj.comments}
                        onChange={(e) => {
                          setCarobj((prevCarobj) => {
                            return {
                              ...prevCarobj,
                              comments: e.target.value,
                            };
                          });
                        }}
                        placeholder="e.g:alloy rims, first hand etc..."
                      />

                      <Textareamodal ref={textareaRef} adddtext={Addtext} />
                    </div>
                  </div>
                </div>

                <div className="upload_img_section" id="carphotos">
                  <div className="form_title">
                    <h2>Upload Photos</h2>
                  </div>
                  <div className="upload_img_input">
                    {errors && imagestoshow.length < 1 ? (
                      <span className="errorspan">
                        Upload at least 1 images
                      </span>
                    ) : (
                      ""
                    )}
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
                      {imagestoshow?.map((image, index) =>
                        image.url ? (
                          <div
                            key={index}
                            style={{
                              width: "150px",
                              height: "120px",
                              margin: "10px",
                              overflow: "hidden",
                              cursor: "pointer",
                              border: "1px solid greenyellow",
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

                {carobj.brand !== "" ? (
                  <div className="upper_form_section">
                    <div className="form_title">
                      <h2>Additional Information</h2>
                    </div>
                    <div className="input_field">
                      <i className="bx bxs-car"></i>
                      <div>
                        <label>Engine Type</label>
                        <select
                          name=""
                          id="enginetype"
                          value={carobj.enginetype && carobj.enginetype}
                          onChange={(e) => {
                            setCarobj((prevCarobj) => {
                              return {
                                ...prevCarobj,
                                ...{ enginetype: e.target.value },
                              };
                            });
                          }}
                        >
                          <option value="">Engine Type</option>
                          <option value="Petrol">Petrol</option>
                          <option value="Diesel">Diesel</option>
                          <option value="LPG">LPG</option>
                          <option value="CNG">CNG</option>
                          <option value="Hybrid">Hybrid</option>
                          <option value="Electric">Electric</option>
                        </select>
                        {errors && carobj.enginetype == "" ? (
                          <span className="errorspan">
                            Please fill out this input
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="input_field">
                      <i className="bx bxs-car"></i>
                      <div>
                        <label>Engine Capacity * (cc)</label>
                        <input
                          id="enginecc"
                          type="number"
                          placeholder="Engine Capacity (cc)"
                          value={carobj.enginecc ? carobj.enginecc : ""}
                          onChange={(e) => {
                            setCarobj((prevCarobj) => {
                              return {
                                ...prevCarobj,
                                ...{ enginecc: parseInt(e.target.value) || null },
                              };
                            });
                          }}
                        />
                        {errors && carobj.enginecc == null ? (
                          <span className="errorspan">
                            Please fill out this input
                          </span>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    <div className="input_field">
                      <i className="bx bxs-car"></i>
                      <div>
                        <label>Transmission</label>
                        <select
                          name=""
                          id="transmission"
                          value={carobj.transmission && carobj.transmission}
                          onChange={(e) => {
                            setCarobj((prevCarobj) => {
                              return {
                                ...prevCarobj,
                                ...{ transmission: e.target.value },
                              };
                            });
                          }}
                        >
                          <option value="">-Transmission-</option>
                          <option value="Manual">Manual</option>
                          <option value="Automatic">Automatic</option>
                        </select>
                        {errors && carobj.transmission == "" ? (
                          <span className="errorspan">
                            Please fill out this input
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="input_field">
                      <i className="bx bxs-car"></i>
                      <div>
                        <label>Assembly</label>
                        <select
                          name=""
                          id="Assembly"
                          value={carobj.Assembly && carobj.Assembly}
                          onChange={(e) => {
                            setCarobj((prevCarobj) => {
                              return {
                                ...prevCarobj,
                                ...{ Assembly: e.target.value },
                              };
                            });
                          }}
                        >
                          <option value="">-Assembly-</option>
                          <option value="Local">Local</option>
                          <option value="Imported">Imported</option>
                        </select>
                        {errors && carobj.Assembly == "" ? (
                          <span className="errorspan">
                            Please fill out this input
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="input_field">
                      <i className="bx bxs-car"></i>
                      <div>
                        <label>Body Type</label>
                        <select
                          name=""
                          id="body_type"
                          value={carobj.body_type && carobj.body_type}
                          onChange={(e) => {
                            setCarobj((prevCarobj) => {
                              return {
                                ...prevCarobj,
                                ...{ body_type: e.target.value },
                              };
                            });
                          }}
                        >
                          <option value="">Body Type</option>
                          <option value="Sedan">Sedan</option>
                          <option value="Hatchback">Hatchback</option>
                          <option value="SUV">SUV</option>
                          <option value="Crossover">Crossover</option>
                          <option value="Mini Van">Mini Van</option>
                          <option value="Double Cabin">Double Cabin</option>
                          <option value="MPV">MPV</option>
                          <option value="Compact SUV">Compact SUV</option>
                          <option value="Micro Van">Micro Van</option>
                          <option value="Pick Up">Pick Up</option>
                          <option value="Station Wagon">Station Wagon</option>
                          <option value="Coupe">Coupe</option>
                          <option value="Truck">Truck</option>
                          <option value="High Roof">High Roof</option>
                          <option value="Convertible">Convertible</option>
                          <option value="Single Cabin">Single Cabin</option>
                          <option value="Off-Road Vehicles">
                            Off-Road Vehicles
                          </option>
                          <option value="Mini Vehicles">Mini Vehicles</option>
                          <option value="Compact hatchback">
                            Compact hatchback
                          </option>
                          <option value="Subcompact hatchback">
                            Subcompact hatchback
                          </option>
                        </select>
                        {errors && carobj.body_type == "" ? (
                          <span className="errorspan">
                            Please fill out this input
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div id="carfeatures">
                      {errors && carobj.carfeatures.length <= 0 ? (
                        <div
                          className="errorspan"
                          style={{ textAlign: "center" }}
                        >
                          Please fill out your car features
                        </div>
                      ) : (
                        ""
                      )}
                      <FeaturesModal carrdata={getfromoptionsmodal} />
                    </div>
                  </div>
                ) : (
                  <></>
                )}

                <div className="number_upload_section">
                  <div className="form_title">
                    <h2>Car Information</h2>
                  </div>
                  <div className="input_field">
                    <i className="bx bx-phone"></i>
                    <div>
                      <label htmlFor="number_upload">Mobile Number</label>
                      <input
                        id="Phone_no"
                        type="number"
                        placeholder="Mobile Number"
                        value={carobj.Phone_no !== null && carobj.Phone_no}
                        onChange={(e) => {
                          setCarobj((prevCarobj) => {
                            return {
                              ...prevCarobj,
                              ...{ Phone_no: e.target.value },
                            };
                          });
                          var isValidPhoneNo = /^0\d{2}[ -]?\d{8}$/.test(
                            e.target.value
                          );
                          if (!isValidPhoneNo) {
                            setPhoneerr(true);
                          } else {
                            setPhoneerr(false);
                          }
                        }}
                        // pattern="{0}[1]{0-9}[2]{0-9}[7]"
                        // title="must be in 03XXXXXXXXX format"
                        // required
                      />
                      {errors && carobj.Phone_no == null ? (
                        <span className="errorspan">
                          Please fill out this input
                        </span>
                      ) : (
                        ""
                      )}
                      {carobj.Phone_no && phoneerr ? (
                        <span className="errorspan">
                          Phone number must be in the format 03XXXXXXXXX
                        </span>
                      ) : null}
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
                        id="Secondary_no"
                        type="number"
                        placeholder="Secondary Number"
                        value={
                          carobj.Secondary_no !== null && carobj.Secondary_no
                        }
                        onChange={(e) => {
                          setCarobj((prevCarobj) => {
                            return {
                              ...prevCarobj,
                              ...{ Secondary_no: e.target.value },
                            };
                          });
                          var isValidPhoneNo = /^0\d{2}[ -]?\d{8}$/.test(
                            e.target.value
                          );
                          if (!isValidPhoneNo) {
                            setPhoneerr(true);
                          } else {
                            setPhoneerr(false);
                          }
                        }}
                        pattern="{0}[1]{0-9}[2]{0-9}[7]"
                        title="must be in 03XXXXXXXXX format"
                      />
                      {carobj.Secondary_no && phoneerr ? (
                        <span className="errorspan">
                          Phone number must be in the format 03XXXXXXXXX
                        </span>
                      ) : null}
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
              {/* <button onClick={checkloader}>send</button> */}
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
      {/* {dberrors.success != null && (
        <Response_modal
          onClose={()=>{setDberrors({...dberrors,msg:'',success:null})}}
          res={dberrors}
        />
      )} */}
      {loading ? <FullLoader /> : <></>}
    </>
  );
};

export default Post_ad;
