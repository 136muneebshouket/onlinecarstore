import React, { useEffect, useState, useContext, memo } from "react";
import axios from "axios";
import Context from "@/components/processing_functions/context";
import Image from "next/image";
import { useRouter } from "next/router";

const Del_faults = ({ onClose, delindex ,refresh}) => {
  const { message, setMessage } = useContext(Context);
  const [img, setImg] = useState(null);
  const router = useRouter();
  const Ad_id = router.query.Ad_id;
  //   console.log(delindex)
  useEffect(() => {
    get_faults();
  }, []);

  async function get_faults() {
    setMessage({ loader: true });
    await axios
      .get(
        `/api/admin/inspection/start_inspec/body_Fualts/get_faults?del=${delindex.index}&Ad_id=${Ad_id}`
      )
      .then((res) => {
        setMessage({ loader: false });
        setImg(res.data.payload[0]);

      })
      .catch((err) => {
        setMessage({ loader: false });
        setMessage({ success: false, msg: err?.response?.data.message });
      });
  }

  async function del_fault() {
    setMessage({ loader: true });
    let q={
      Ad_id:Ad_id,
      delindex:delindex.index
    }
    if(img?.img_id){
     q.img = img.img_id
    }
    await axios
      .delete(`/api/admin/inspection/start_inspec/body_Fualts/del_fault`,{params: q})

      .then((result) => {
        setMessage({ loader: false });
        refresh()
        onClose()
      })
      .catch((err) => {
        setMessage({ loader: false });
        setMessage({ success: false, msg: err?.response?.data.message });
      });
  }

  // console.log(img)

  return (
    <>
      <div className="modal">
        <div className="modal-content">
          <div className="modal_head">
            <h3 style={{ fontSize: "large" }}>Delete Faults</h3>
            <i className="bx bx-x modal-close" onClick={onClose}></i>
          </div>

          <div className="modal_content">
            <div className="map_imgs">
              {img?.img_url ? (
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
                  >
                    <Image
                      src={img?.img_url}
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
            <p style={{margin:'10px'}}>{delindex?.v?.type}</p>
            <p style={{margin:'10px'}}>{delindex?.v?.type_name}</p>
            <p style={{margin:'10px'}}>{delindex?.v?.status_mark}</p>

            <div className="submit_btn" style={{ textAlign: "end" }}>
              <button
                onClick={del_fault}
                style={{ background: "red" }}
                type="submit"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Del_faults);
