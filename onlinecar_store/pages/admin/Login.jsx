import React, { useState } from "react";
import Response_modal from "@/components/Modals/response_modal/Response_modal";

import dynamic from "next/dynamic";
import axios from "axios";

const FullLoader = dynamic(
  () => import("../../components/Modals/Loader/FullLoader"),
  {
    loading: () => (
      <div className="loder">
        <h2>Loading...</h2>
      </div>
    ),
  }
);
const Reset_admin = dynamic(
  () => import("../../components/Modals/admin/Reset_admin"),
  {
    loading: () => (
      <div className="loder">
        <h2>Loading...</h2>
      </div>
    ),
  }
);
const Forget_password = dynamic(
  () => import("../../components/Modals/admin/Forget_password_admin"),
  {
    loading: () => (
      <div className="loder">
        <h2>Loading...</h2>
      </div>
    ),
  }
);

const Login = () => {
  const [dberrors, setDberrors] = useState({
    msg: "",
    success: null,
  });
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [showpass, setShowpass] = useState(false);
  const [email, setEmail] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  // const [Open_reset_modal, setOpen_reset_modal] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  async function admin_login(e) {
    e.preventDefault();
    setLoading(true);
    let admin_data = {
      email,
      password,
    };

    await axios
      .post("/api/admin/auth/login_admin", admin_data)
      .then((res) => {
        console.log(res.data);
        setDberrors({ ...dberrors, msg: res?.data.message, success: true });
        setLoading(false);
        if (res.data.data) {
          localStorage.setItem("admin_token", JSON.stringify(res.data.data));
        }
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        console.log(err);
        setDberrors({
          ...dberrors,
          msg: err?.response?.data?.message || "Something went wrong!",
          success: false,
        });
        setLoading(false);
      });
  }

  return (
    <>
      <div className="login-body">
        <div className="main">
          <label htmlFor="chk" className="Login_text" aria-hidden="true">
            Admin Page
          </label>

          <div className="login">
            <div className="overlay">
              <form onSubmit={admin_login}>
                <label htmlFor="chk" aria-hidden="true"></label>
                <br />
                <br />

                <label className="inputlabels" htmlFor="email">
                  Email
                </label>
                <input
                  style={{ textTransform: "lowercase" }}
                  type="email"
                  name="email"
                  placeholder="Type your valid Email"
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
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
                  <i onClick={handleOpenModal} className="forget_password">
                    forgetpassword ? &#129300;
                  </i>
                </div>

                <button
                  type="submit"
                  className="login-button"
                  // disabled={loading && "true"}
                >
                  {" "}
                  {!loading ? "Submit" : "Processing..."}
                </button>
              </form>
            </div>
          </div>
        </div>
        {/* <p className="errorPara">{error}</p> */}
      </div>
      {dberrors.success != null && (
        <Response_modal
          onClose={() => {
            setDberrors({ ...dberrors, msg: "", success: null });
          }}
          res={dberrors}
        />
      )}

      {isModalOpen && (
        <Forget_password isOpen={isModalOpen} onClose={handleCloseModal}  />
      )}
      {/* {Open_reset_modal && (
        <Reset_admin isOpen={Open_reset_modal} onClose={()=>{setOpen_reset_modal(false)}} />
      )} */}

      {loading ? <FullLoader /> : <></>}
    </>
  );
};

export default Login;
