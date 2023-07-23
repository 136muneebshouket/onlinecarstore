// Modal.js
import React, { useRef, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
// import FullLoader from "./Loader/FullLoader";
import axios from "axios";
import dynamic from 'next/dynamic'

const FullLoader = dynamic(() => import('./Loader/FullLoader'), {
  loading: () => <p>Loading...</p>,
})

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  var modalref = useRef();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorstatus, setErrorstatus] = useState();

  // for sending email to backend
  const forgetpassword = async (e) => {
    setLoading(true);
    e.preventDefault();

    const protocol = window.location.protocol;
    const domain = window.location.href.split("/")[2];

   
    let emailobj = {
      email,
      protocol,
      domain,
    };
    // console.log(email);
   await axios.post(`/api/auth/Forgetpassword`, emailobj)
      .then((res) => {
        setLoading(false);
        // console.log(res.data.message);
        setErrorstatus(res.data.status)
        setError(res.data.message);
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err.response.data.message);
        setErrorstatus(err.response.data.status)
        setError(err.response.data.message);
      });
    setEmail("");
  };

  return (
    <>
      <div className="modal">
        <div ref={modalref} className="modal-content">
     
          <i className="bx bx-x modal-close" onClick={onClose}></i>

          <div className="modal_innercontent">
            <div className="modal_title">
              <h2>Forget Password ? &#129300;</h2>
              <p>
                Enter Your active/vaild email address <br /> where you will get
                the link to reset your password
              </p>
            </div>
            {/* displaying response */}
            {loading ? (
                  <>
                    <p
                      style={{ background: "white", color: "red" }}
                      className="modalerror"
                    >
                      Loading
                    </p>
                  </>
                ) : (
                  <>
                    {errorstatus !== 200 ? (
                      <p
                        style={{ color: "red" }}
                        className="modalerror"
                      >
                        {error}
                      </p>
                    ) : (
                      <p
                        style={{  color: "green" }}
                        className="modalerror"
                      >
                        {error}
                      </p>
                    )}
                  </>
                )}


            <form onSubmit={forgetpassword}>
              <label className="inputlabels" htmlFor="email">
                Email
              </label>
              <input
              style={{textTransform:'lowercase'}}
                type="email"
                name="email"
                placeholder="Type your valid Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
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

      <OutsideClickHandler
        onOutsideClick={(event) => {
          if (!modalref.current.contains(event.target)) {
            onClose();
          }
        }}
      ></OutsideClickHandler>
      {loading ? <FullLoader /> : '' } 
    </>
  );
};

export default Modal;
