import React, { useState } from "react";
import { signIn } from "next-auth/react";
import axios from "axios";
import Link from "next/link";
import ForgetpasswordModal from "@/components/Modals/ForgetpasswordModal";
import FullLoader from "@/components/Modals/Loader/fullLoader";
import { useRouter } from "next/router";
// import "./Login.css"

const Login = () => {
  const router = useRouter();

  const [showpass, setShowpass] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorstatus, setErrorstatus] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const data = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (data.status == 200) {
        setErrorstatus(data.status);
        setError(data.error);
        setEmail("");
        setPassword("");
        router.back();
        setLoading(false);
      } else {
        setLoading(false);
        setErrorstatus(data.status);
        setError(data.error);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError(error.response.data);
    }
  };

  // modal for forget password
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="login-body">
        <div className="main">
          <label htmlFor="chk" className="Login_text" aria-hidden="true">
            User Login
          </label>

          <div className="login">
            <div className="overlay">
              <form onSubmit={login}>
                <label htmlFor="chk" aria-hidden="true"></label>
                <br />
                <br />
                {loading ? (
                  <>
                    <p
                      style={{ background: "white", color: "red" }}
                      className="errorPara"
                    >
                      Loading
                    </p>
                  </>
                ) : (
                  <>
                    {errorstatus !== 200 ? (
                      <p style={{ color: "red" }} className="errorPara">
                        {error}
                      </p>
                    ) : (
                      <p style={{ color: "green" }} className="errorPara">
                        {error}
                      </p>
                    )}
                  </>
                )}

                <label className="inputlabels" htmlFor="email">
                  Email
                </label>
                <input
                style={{textTransform:'lowercase'}}
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
                  disabled={loading && "true"}
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
      {/* modal for forget password */}
      <ForgetpasswordModal isOpen={isModalOpen} onClose={handleCloseModal} />
      {/* loader fullpage */}
      {loading ? <FullLoader /> : ""}
    </>
  );
};

export default Login;
