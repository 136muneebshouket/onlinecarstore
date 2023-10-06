import axios from "axios";
import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import Response_modal from "@/components/Modals/response_modal/Response_modal";


const FullLoader = dynamic(() => import("../../../components/Modals/Loader/FullLoader"), {
  loading: () => <div className="loder"><h2>Loading...</h2></div>,
});


const Reset_admin = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }
  var modalref = useRef();


  const [dberrors, setDberrors] = useState({
    msg: "",
    success: null,
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [showpass, setShowpass] = useState(false);

  async function upload_admin(e){
    e.preventDefault()    
    setLoading(true);
    let admin_token = localStorage.getItem('admin_token')
    let admin_data={
      email,
      password,
      phone:Phone,
      token:admin_token
    }
    await axios.post('/api/admin/auth/reset_admin',admin_data)
    .then((res)=>{
      setDberrors({ ...dberrors, msg: res?.data.message, success: true });
      setLoading(false)
      setTimeout(()=>{
        onClose()
      },2000)
    }).catch((err)=>{
      console.log(err)
      setDberrors({...dberrors ,msg : err?.response?.data?.message || 'Something went wrong!',success: false})
      setLoading(false);
    })

  }



  return (
    <>
      <div className="modal">
        <div ref={modalref} className="modal-content">
          <i className="bx bx-x modal-close" onClick={onClose}></i>

          <div className="modal_innercontent">
            <div className="modal_title">
              <h4 style={{ textAlign: "center" }}>
                Reset Password and others ? &#129300;
              </h4>
            </div>
            {/* displaying response */}

            <form onSubmit={upload_admin}>
              <label className="inputlabels" htmlFor="email">
                Email
              </label>
              <input
                style={{ textTransform: "lowercase" }}
                type="email"
                name="email"
                placeholder="Type your valid Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                required
              />
              <label className="inputlabels" htmlFor="pswd">
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showpass ? "text" : "password"}
                  name="pswd"
                  placeholder="Type your Password"
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                />
                <div className="showpass_icon">
                  {showpass ? (
                    <i
                      onClick={() => {
                        setShowpass(!showpass);
                      }}
                      className="bx bx-show"
                    ></i>
                  ) : (
                    <i
                      onClick={() => {
                        setShowpass(!showpass);
                      }}
                      className="bx bx-hide"
                    ></i>
                  )}
                </div>
              </div>
              <label className="inputlabels" htmlFor="email">
                Phone_number
              </label>
              <input
                style={{ textTransform: "lowercase" }}
                type="tel"
                name="phone"
                placeholder="Type your valid phone number"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                value={Phone}
                required
              />
              <button
                type="submit"
                className="login-button"
                disabled={loading && "true"}
              >
                {!loading ? "Reset" : "Processing..."}
              </button>
            </form>
          </div>
        </div>
      </div>
      {dberrors.success != null && (
        <Response_modal
          onClose={()=>{setDberrors({...dberrors,msg:'',success:null})}}
          res={dberrors}
        />
      )}
      {loading ? <FullLoader /> : <></>}
    </>
  );
};

export default Reset_admin;
