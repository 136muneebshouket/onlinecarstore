import React, { useState, memo } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useSession } from "next-auth/react";
import Context from "@/components/processing_functions/context";
import { useContext } from "react";

const Report_modal = ({ onClose, seller, ad_id,type }) => {
  const { message, setMessage } = useContext(Context);
  const { data: sessionData } = useSession();
  const userid = sessionData?.user?._id;
  const [value, setValue] = useState("");

  function chnagehndler(e) {
    setValue(e.target.value);
  }
  // console.log(type)
  async function report_ad() {
    if (userid) {
      let obj = {
        ad_id,
        seller,
        userid,
        reason: value,
        type:type
      };
      
      setMessage({ loader: true });
      await axios
        .post(`/api/report_Ads/report_ads_post`, obj)
        .then((res) => {
          setMessage({ loader: false });
          setMessage({
            success: true,
            msg: "You Report has been Recieved. Carselection will investigate this",
          });
          onClose();
        })
        .catch((err) => {
          setMessage({ loader: false });
          setMessage({ success: false, msg: err?.response?.data.message });
        });
    }

    if (!userid) {
      setMessage({ success: false, msg: "Please Sign in first" });
    }
  }

  return (
    <>
      <div className="modal">
        <div className="modal-content">
          <div className="modal_head">
            <h3 style={{ fontSize: "large" }}>Reason of Reporting this Ad</h3>
            <i className="bx bx-x modal-close" onClick={onClose}></i>
          </div>
          <div className="reportad_content">
            <div>
              <input
                id="option1"
                type="radio"
                value={"Duplicate Ad"}
                onChange={chnagehndler}
                name="selection"
              />
              <label htmlFor="option1">
                <strong>Duplicate</strong>: There's already a listing posted
                just like this one.
              </label>
              <br />
            </div>
            <div>
              <input
                id="option2"
                value={"Spam Ad"}
                type="radio"
                onChange={chnagehndler}
                name="selection"
              />
              <label htmlFor="option2">
                <strong>Spam</strong>: It's a Junk Ad.
              </label>
              <br />
            </div>
            <div>
              <input
                id="option3"
                value={"Wrong Contact Information"}
                type="radio"
                onChange={chnagehndler}
                name="selection"
              />
              <label htmlFor="option3">
                <strong>Wrong Contact Info</strong>:Contact information is
                incorrect.
              </label>
              <br />
            </div>
            <div>
              <input
                id="option5"
                value={"Already Sold Ad"}
                type="radio"
                onChange={chnagehndler}
                name="selection"
              />
              <label htmlFor="option5">
                <strong>Already Sold</strong>: The seller has already sold this
                item.
              </label>
              <br />
            </div>
            <div>
              <input
                id="option6"
                value={"Fake Ads"}
                type="radio"
                onChange={chnagehndler}
                name="selection"
              />
              <label htmlFor="option6">
                <strong>Fake Ads</strong>: Fake phone number, item doesn't
                exist, false details etc.
              </label>
              <br />
            </div>
            <div>
              <input
                id="option7"
                value={"Wrong Category"}
                type="radio"
                onChange={chnagehndler}
                name="selection"
              />
              <label htmlFor="option7">
                <strong>Wrong Category</strong>: It doesn't belong in this
                category.
              </label>
              <br />
            </div>
            <div>
              <input
                id="option8"
                value={"Prohibited/Explicit Content"}
                type="radio"
                onChange={chnagehndler}
                name="selection"
              />
              <label htmlFor="option8">
                <strong>Prohibited/Explicit Content</strong>: It's got abusive,
                explicit/ content etc.
              </label>
              <br />
            </div>
          </div>
          <hr />

          <button onClick={report_ad} className="reportad_btn">
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default memo(Report_modal);
