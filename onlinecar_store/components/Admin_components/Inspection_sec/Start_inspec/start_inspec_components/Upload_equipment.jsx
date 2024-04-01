import React, {
  useMemo,
  useState,
  useRef,
  useContext,
  useCallback,
} from "react";
import Context from "@/components/processing_functions/context";
import Show_img_modal from "@/components/Modals/custom models/Showimagemodal/Show_img_modal";
// import Update_equip_modal from "@/components/Modals/admin/inspection/Update_equip_modal";
import Image from "next/image";
import { useRouter } from "next/router";
import { equip_status_arr } from "@/components/equipments_status/equipment_status";
import axios from "axios";
import dynamic from "next/dynamic";
const Update_equip_modal = dynamic(
  () => import("@/components/Modals/admin/inspection/Update_equip_modal"),
  {
    loading: () => (
      <div className="loder">
        <h2>Loading...</h2>
      </div>
    ),
  }
);

const Upload_equipment = ({ equip_name, equip_parent,uploded,refresh }) => {
  const { message, setMessage } = useContext(Context);
  const router = useRouter();
  const Ad_id = router.query.Ad_id;
  const fileInputRef = useRef(null);

  const [status_options, setStatus_options] = useState(() => equip_status_arr);
  const [imagestoshow, setImagestoshow] = useState([]);
  const [selectedImageUrl, setSelectedImageUrl] = useState({
    imgurl: "",
    index: null,
  });
  const [isimgModalOpen, setIsimgModalOpen] = useState(false);

  const [equip_status, setEquip_status] = useState({
    status: "",
    status_color: "",
    status_mark: null,
  });
  const [toggle, setToggle] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalvalue, setModalvalue] = useState("");

  //closing and opening modal /////////////////////////////////////////////////////////////////////////////////
  const handleOpenModal = useCallback((value) => {
    setIsModalOpen(true);
    setModalvalue(value);
  }, []);

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
              { url: e.target.result, filename: file.name },
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

  function select_status(e) {
    let v = e.target.value.split("&");
    if (v[1] == "") {
      setEquip_status({ ...equip_status, status: "", status_color: "",status_mark:null });
      return;
    }
    setEquip_status({ ...equip_status, status: v[0], status_color: v[1], status_mark: Number(v[2]) });
  }

  //  console.log(equip_status)

  async function upload_equipment() {
    let admin_token = JSON.parse(localStorage.getItem("admin_token"));
    let obj = {
      equip_parent,
      equip_name,
      imagestoshow,
      equip_status,
      admin_token,
      Ad_id,
    };
    setMessage({ loader: true });
    await axios
      .post(`/api/admin/inspection/start_inspec/Add_equip_detail`, obj)
      .then((res) => {
        setMessage({ loader: false });
        setMessage({ success: true, msg: res?.data.message });
        setImagestoshow([]);
        setEquip_status({ ...equip_status, status: "", status_color: "" });
        refresh()
      })
      .catch((err) => {
        setMessage({ loader: false });
        setMessage({ success: false, msg: err?.response?.data.message });
      });
  }

  return (
    <>
      <div
        className="upload_equip"
        style={{ height: `${toggle ? "auto" : ""}`,background:`${uploded?.includes(equip_name)? 'rgb(209 236 247)':''}` }}
      >
        <div className="property_head">
          <h4>{equip_name}</h4>
          <div style={{ display: "flex" }}>
            <button
              className="edit_btn"
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              Add
            </button>
            <i
            style={{color:'#e23f3f' , fontSize:'x-large'}}
              onClick={() => {
                handleOpenModal({ equip_parent, equip_name,Ad_id });
              }}
              className='bx bxs-edit'
            ></i>
          </div>
        </div>
        <div className="images_upload">
          <div className="map_imgs">
            {imagestoshow?.map((image, index) =>
              image.url ? (
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
                select_status(e);
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
            Upload
          </button>
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
      {isModalOpen && (
        <Update_equip_modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
          modalvalue={modalvalue}
        />
      )}
    </>
  );
};

export default React.memo(Upload_equipment);
