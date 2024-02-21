import React, { useState, useEffect, useContext, useRef , memo } from "react";
import axios from "axios";
// import { useRouter } from "next/router";
import Context from "@/components/processing_functions/context";
import Show_img_modal from "@/components/Modals/custom models/Showimagemodal/Show_img_modal";
import { dents_scratches_arr } from "@/components/equipments_status/equipment_status";
import { useRouter } from "next/router";
import Image from "next/image";

const Upload_dents = ({ modalvalue, onClose ,refresh }) => {
  
  const router = useRouter();
  const Ad_id = router.query.Ad_id;

  const fileInputRef = useRef(null);
  const { message, setMessage } = useContext(Context);
  const [imagestoshow, setImagestoshow] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState({
    imgurl: "",
    index: null,
  });
  const [isimgModalOpen, setIsimgModalOpen] = useState(false);

  const [faults_arr, setFaults_arr] = useState(() => dents_scratches_arr);
  const [faults, setFaults] = useState({
    type:'',
    type_name: '',
    status_mark:null,
    positions:null,
    part_name:''
  });

  //uploading images section///////////////////////////////////////////////////////////////////////////
  const handleImagePicked = async (event) => {
    setMessage({ loader: true });
    const file = event.target.files[0];
    try {
      const promises = [];
      if (file.size > 4 * 1024 * 1024) {
        setMessage({ loader: false });
        setMessage({
          success: false,
          msg: "Image size should not exceed 4MB. Upload your Images again",
        });
      }
      const reader = new FileReader();
      const promise = new Promise((resolve) => {
        reader.onload = (e) => {
          setImagestoshow({ img_url: e.target.result, filename: file.name });
          resolve();
        };
      });
      reader.readAsDataURL(file);
      promises.push(promise);
      await Promise.all(promises); // Wait for all file reading operations to complete
    } catch (error) {
      setMessage({
        success: false,
        msg: error.message,
      });
    } finally {
      setMessage({ loader: false }); // Set the loading state to false after all images are processed
    }
    fileInputRef.current.value = null;
  };

  function select_status(e){
    let v = e.target.value.split("&");
    if (v[1] == "") {
      setFaults({ ...faults, type: "", type_name: "",status_mark:null , positions:null });
      return;
    }
    setFaults({ ...faults, type: v[0], type_name: v[1], status_mark:Number(v[2]) , positions:modalvalue?.Positions , part_name: modalvalue.Part_name});

    if((modalvalue.Part_num_cut) && (v[0] == 'P') ){
      setFaults({ ...faults, type: v[0], type_name: v[1], 
        status_mark:modalvalue.Part_num_cut ,
        positions:modalvalue?.Positions ,
        part_name: modalvalue.Part_name });
    }
    // console.log(modalvalue.Part_num_cut)
  }
  // console.log(faults)
  const onSubmitHandler = async () => {
    
    let admin_token = JSON.parse(localStorage.getItem("admin_token"));

    let obj={
      imagestoshow,
      faults,
      Ad_id,
      admin_token,
    }
    setMessage({ loader: true });
    await axios
    .post(`/api/admin/inspection/start_inspec/body_Fualts/Add_faults`, obj)
    .then((res) => {
      setMessage({ loader: false });
      setMessage({ success: true, msg: res?.data.message });
      setImagestoshow(null);
      setFaults({ ...faults, type: "", type_name: "",status_mark:null , positions:null });
      refresh()
      onClose()
    })
    .catch((err) => {
      setMessage({ loader: false });
      setMessage({ success: false, msg: err?.response?.data.message });
    });
    // console.log(modalvalue)

  }
  // console.log(modalvalue)

  return (
    <>
      <div className="modal">
        <div className="modal-content">
          <div className="modal_head">
          <h3 style={{ fontSize: "large" }}>{modalvalue.Part_name}</h3> <br />
            {/* <h3 style={{ fontSize: "large" }}>Dents and Scratches</h3> */}
            <i className="bx bx-x modal-close" onClick={onClose}></i>
          </div>

          <div className="modal_content">
            <div className="images_upload" style={{ margin: "10px 0px" }}>
              <div className="map_imgs">
                {imagestoshow?.img_url ? (
                  <>
                    <div
                      style={{
                        width: "100px",
                        height: "80px",
                        margin: "10px",
                        overflow: "hidden",
                        cursor: "pointer",
                        border: "1px solid greenyellow",
                      }}
                      onClick={() => {
                        setSelectedImageUrl((s) => ({
                          ...s,
                          imgurl: imagestoshow.img_url,
                        }));
                        setIsimgModalOpen(true);
                      }}
                    >
                      <Image
                        src={imagestoshow.img_url}
                        alt={`Image`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        width={100}
                        height={100}
                      />
                    </div>
                  </>
                ) : null}
              </div>

              <div className="upload_img_btn">
                <input
                  className="main_img_input"
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImagePicked}
                  accept="image/*"
                />
              </div>
            </div>
            <div className="select_status" style={{ margin: "10px 0px" }}>
              <div>
                <label htmlFor="">Add status Faults</label>
                <br />
                <select
                  onChange={(e) => {
                    select_status(e);
                  }}
                  name=""
                  id=""
                >
                  {faults_arr?.map((v) => {
                    return (
                      <>
                        <option value={`${v.type}&${v.type_name}&${v.mark}`}>
                          {v.type_name}
                        </option>
                      </>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="submit_btn" style={{ textAlign: "end" }}>
              <button onClick={onSubmitHandler} type="submit">
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>

      {isimgModalOpen ? (
        <Show_img_modal
          onClose={setIsimgModalOpen}
          selectedimg={selectedImageUrl}
          delimages={() => {
            setImagestoshow(null);
          }}
          no_coverphoto={true}
        />
      ) : null}
    </>
  );
};

export default memo(Upload_dents);
