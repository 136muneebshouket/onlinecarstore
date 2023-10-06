import React, { useState, useRef, useEffect,useCallback } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import Response_modal from "@/components/Modals/response_modal/Response_modal";

const FullLoader = dynamic(() => import("../Loader/FullLoader"), {
  loading: () => (
    <div className="loder">
      <h2>Loading...</h2>
    </div>
  ),
});
const Reset_admin = dynamic(
  () => import("../../../components/Modals/admin/Reset_admin"),
  {
    loading: () => (
      <div className="loder">
        <h2>Loading...</h2>
      </div>
    ),
  }
);

const Forget_password = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }
  var modalref = useRef();


  const [dberrors, setDberrors] = useState({
    msg: "",
    success: null,
  });
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [email_sent, setEmail_sent] = useState(false);
  const [timer, setTimer] = useState(120);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

    
    async function sendcode() {
      setLoading(true);
      await axios
        .get("/api/admin/auth/send_code")
        .then((res) => {
          if (res.status == 200) {
            setEmail_sent(true);
          }
          setLoading(false);
          console.log(res);
        })
        .catch((err) => {
          setDberrors({...dberrors ,msg : err?.response?.data?.message || 'Error in Sending Pincode to admin!',success: false})
          setLoading(false);
        });
    }



    // if (email_sent == true) {
    //   let starttime = setInterval(() => {
    //     setTimer(()=> timer + 1);
    //   }, 1000);
    //   if (timer == 120) {
    //     clearInterval(starttime);
    //     setTimer("expired Pin Code.. CLick 'Forget password' to try again");
    //   }
    // }

 


  async function reset_admin_func(e) {
    e.preventDefault() 
    setLoading(true);
    await axios
      .post("/api/admin/auth/Check_Pincode", { resetToken: code })
      .then((res) => {
        console.log(res.data)
        if (res.data.data != "") {
          localStorage.setItem("admin_token", JSON.stringify(res.data.data));
        }
        setDberrors({ ...dberrors, msg: res?.data.message, success: true });
        setCode('')
        setEmail_sent(false)
        setLoading(false);
      
      })
      .catch((err) => {
        setDberrors({...dberrors ,msg : err?.response?.data?.message || 'False or expired Pin Code.. CLick "Forget password" to try again',success: false})
        setLoading(false);
        // onClose();
      });
  }

  return (
    <>
      <div className="modal">
        <div ref={modalref} className="modal-content">
          <i className="bx bx-x modal-close" onClick={onClose}></i>

          <div className="modal_innercontent">
          
            {email_sent ? (
              <>
                <div style={{ textAlign: "center" }} className="modal_title">
                  <h4>Pin code has sended to you &#128512;</h4>
                  <p style={{ color: "red" }}>
                    Pin Code will expire after <b>{timer}</b> seconds
                  </p>
                </div>
                {/* displaying response */}

                <form onSubmit={reset_admin_func}>
                  <label
                    style={{ width: "30%" }}
                    className="inputlabels"
                    htmlFor="email"
                  >
                    Enter Pin Code
                  </label>
                  <input
                    type="text"
                    name="code"
                    placeholder="Type your valid Pin Code"
                    onChange={(e) => {
                      setCode(e.target.value);
                    }}
                    value={code}
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
              </>
            ) : (
              <>
                <button
                    onClick={()=>{sendcode()}}
                    className="login-button"
                    disabled={loading && "true"}
                  >
                    {!loading ? "Send Pin Code" : "Processing..."}
                  </button>
              </>
            )}
          </div>
        </div>
      </div>
    
      {loading && <FullLoader />}
      {dberrors.success != null && (
        <Response_modal
          onClose={()=>{setDberrors({...dberrors,msg:'',success:null})}}
          res={dberrors}
        />
      )}
       {isModalOpen && (
        <Reset_admin isOpen={isModalOpen} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default Forget_password;
