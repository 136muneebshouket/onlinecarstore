import axios from "axios";
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
  useRef,
} from "react";
import Context from "@/components/processing_functions/context";
import { equip_status_arr } from "@/components/equipments_status/equipment_status";
import Show_img_modal from "@/components/Modals/custom models/Showimagemodal/Show_img_modal";
import Image from "next/image";

const Update_equip_modal = ({ modalvalue, onClose }) => {
  const { message, setMessage } = useContext(Context);
  const [imagestoshow, setImagestoshow] = useState([]);
  const [Oldimages, setOldimages] = useState([]);
  const fileInputRef = useRef(null);
  const [status_options, setStatus_options] = useState(() => equip_status_arr);
  const [isimgModalOpen, setIsimgModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState({
    imgurl: "",
    index: null,
  });
  const [equip_status, setEquip_status] = useState({
    status: "",
    status_color: "",
    status_mark: null,
  });

  async function getequip() {
    setMessage({ loader: true });
    await axios
      .get(`/api/admin/inspection/start_inspec/get_equip`, {
        params: modalvalue,
      })
      .then((res) => {
        setMessage({ loader: false });
        setImagestoshow(res?.data.payload.imgs);
        setOldimages(res?.data.payload.imgs);
        setEquip_status({
          ...equip_status,
          status: res?.data.payload.equip_status,
          status_mark: res?.data.payload.status_mark,
        });
      })
      .catch((err) => {
        setMessage({ loader: false });
        setMessage({ success: false, msg: err?.response?.data.message });
      });
  }

  useEffect(() => {
    getequip();
  }, []);

  //uploading images section///////////////////////////////////////////////////////////////////////////
  const handleImagePicked = async (event) => {
    setMessage({ loader: true });
    const files = event.target.files;
    if (files.length > 6 || imagestoshow.length >= 6) {
      setMessage({ loader: false });
      setMessage({ success: false, msg: "Maximum 5 images are allowed" });
      return;
    }

    try {
      const promises = [];

      // Loop through the selected files
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // console.log(file);
        // Check if the size of the current image exceeds the limit (4MB)
        if (file.size > 4 * 1024 * 1024) {
          setMessage({ loader: false });
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
              { img_url: e.target.result, filename: file.name },
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
      setMessage({
        success: false,
        msg: error.message,
      });
    } finally {
      setMessage({ loader: false }); // Set the loading state to false after all images are processed
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

  function select_status(a) {
    let v = a.split("&");
    if (v[1] == "") {
      setEquip_status({
        ...equip_status,
        status: "",
        status_color: "",
        status_mark: 0,
      });
      return;
    }
    setEquip_status({
      ...equip_status,
      status: v[0],
      status_color: v[1],
      status_mark: Number(v[2]),
    });
  }

  //  console.log(equip_status)

  async function upload_equipment() {
    let update_obj = {
      modalvalue,
      equip_status,
    };
    let imagesto_delete = Oldimages.map((imgs) => {
      if (!imagestoshow.includes(imgs)) {
        return imgs.img_id;
      }
    }).filter((x) => x != undefined);

    const imgs_to_uplod = imagestoshow
      .map((imgs) => {
        if (!Oldimages.includes(imgs)) {
          return imgs;
        }
      })
      .filter((x) => x != undefined);
    if (imagesto_delete.length > 0) {
      update_obj.imgs_to_del = imagesto_delete;
    }
    if (imgs_to_uplod.length > 0) {
      update_obj.imgs_to_upload = imgs_to_uplod;
    }
    setMessage({ loader: true });
    await axios
      .post(`/api/admin/inspection/start_inspec/update_equipment`, update_obj)
      .then((res) => {
        setMessage({ loader: false });
        setMessage({ success: true, msg: res?.data.message });
      })
      .catch((err) => {
        setMessage({ loader: false });
        setMessage({ success: false, msg: err?.response?.data.message });
      });
  }

  return (
    <>
      <div className="modal">
        <div className="modal-content">
          <div className="modal_head">
            <h3 style={{ fontSize: "large" }}>Edit Equipment</h3>
            <i className="bx bx-x modal-close" onClick={onClose}></i>
          </div>
          {equip_status?.status ? (
            <>
              <div>
                <div className="images_upload">
                  <div className="map_imgs">
                    {imagestoshow?.map((image, index) =>
                      image.img_url ? (
                        <div
                          key={index}
                          style={{
                            width: "100px",
                            height: "80px",
                            margin: "10px",
                            overflow: "hidden",
                            cursor: "pointer",
                            border: "1px solid greenyellow",
                          }}
                          // className={index == 0 && "coverphototag"}
                          onClick={() => {
                            setSelectedImageUrl((s) => ({
                              ...s,
                              imgurl: image.img_url,
                              index: index,
                            }));
                            setIsimgModalOpen(true);
                          }}
                        >
                          <Image
                            src={image.img_url}
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

                  <div className="upload_img_btn">
                    <input
                      className="main_img_input"
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImagePicked}
                      accept="image/*"
                      multiple
                    />
                  </div>
                </div>

                <div className="select_status">
                  <div>
                    <label htmlFor="">Add status of equipment</label>
                    <br />
                    <select
                      style={{ background: `${equip_status?.status_color}` }}
                      onChange={(e) => {
                        select_status(e.target.value);
                      }}
                      name=""
                      id=""
                    >
                      {status_options?.map((v) => {
                        return (
                          <>
                            <option
                              style={{ background: `${v.status_color}` }}
                              value={`${v.status}&${v.status_color}&${v.status_marks}`}
                              selected={
                                v.status == equip_status.status ? true : false
                              }
                            >
                              {v.status}
                            </option>
                          </>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="submit_btn" style={{ textAlign: "end" }}>
                  <button onClick={upload_equipment} type="submit">
                    Edit
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <h2>Not yet uploaded</h2>
            </>
          )}
        </div>
      </div>

      {isimgModalOpen && (
        <Show_img_modal
          onClose={setIsimgModalOpen}
          selectedimg={selectedImageUrl}
          delimages={delimages}
          no_coverphoto={true}
        />
      )}
    </>
  );
};

export default React.memo(Update_equip_modal);
