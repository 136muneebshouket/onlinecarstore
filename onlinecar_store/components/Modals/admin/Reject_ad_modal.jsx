import React,{useState,useContext} from "react";
import Context from "@/components/processing_functions/context";
import axios from "axios";

const Reject_ad_modal = ({ onClose,Ad_id,SellerEmail }) => {

  const { message, setMessage } = useContext(Context);

const [value, setValue] = useState([]);

  function chnagehndler(e) {
    if(!value.includes(e.target.value)){
      setValue(()=>([...value,e.target.value]))
    }else{
      setValue(value.filter(item=>item!==e.target.value))
    }
  }
 
  async function reject() {
    if(value.length == 0){
      setMessage({ success: false, msg: 'Please provide rejection reason' });
      return
    }
       setMessage({ loader: true });
    let admin_token = JSON.parse(localStorage.getItem('admin_token'))
    if(!admin_token){
      setMessage({ success: false, msg: 'Admin credentials are not given please Login Again as Admin' });
      setMessage({ loader: false });
      return
    }
    if(!Ad_id){
      setMessage({ success: false, msg: 'Ad id is not provided' });
      setMessage({ loader: false });
      return
    }
    let data={
      Ad_id,
      value,
      SellerEmail,
      admin_token
    }
    // console.log(data)
    // onClose();
   
    await axios.post(`/api/admin/Ad_approval/review_ad/reject_ad`,data)
    .then((res) => {
      setMessage({ loader: false });
      setMessage({ success: true, msg: res.data.msg });
      onClose();
    }).catch((err) => {
      setMessage({ loader: false });
      setMessage({ success: false, msg: err.response.data.msg });
    });
    // setMessage({ loader: true });
  }

  return (
    <>

      <div className="modal">
        <div className="modal-content">
          <div className="modal_head">
            <h3 style={{ fontSize: "large" }}>Reason of Rejecting this Ad</h3>
            <i className="bx bx-x modal-close" onClick={onClose}></i>
          </div>

          <div className="reportad_content">
            <div>
              <input
                id="option1"
                type="checkbox"
                value={"Images does'nt match with the Carselection ad policy please upload relevant/geniune images of your Ad."}
                onChange={chnagehndler}
                name="selection"
              />
              <label htmlFor="option1">
                <strong>Wrong Images</strong>: Images does'nt match with the Carselection ad policy
                please upload relevant/geniune images of your Ad.
              </label>
              <br />
            </div>
            <div>
              <input
                id="option2"
                value={"Spam Ad"}
                type="checkbox"
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
                type="checkbox"
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
                type="checkbox"
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
                type="checkbox"
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
                type="checkbox"
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
                type="checkbox"
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

          <button onClick={reject} className="reportad_btn">Submit</button>
        </div>
      </div>
    </>
  );
};

export default Reject_ad_modal;
