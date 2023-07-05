import React, { useState } from "react";
import { signIn } from "next-auth/react";
import axios from "axios";
import Link from "next/link";

// import "./Login.css"

const Login = () => {

 
  const [showpass, setShowpass] = useState(false);

  const [error, setError] = useState("");
  const [errorstatus, setErrorstatus] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
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
       
      } else {
        setErrorstatus(data.status);
        setError(data.error);
      }
      // setError(data);
      // setError(data);

      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
      setError(error.response.data);
    }
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
                {errorstatus !== 200 ? (
                  <p
                    style={{ background: "white", color: "red" }}
                    className="errorPara"
                  >
                    {error}
                  </p>
                ) : (
                  <p
                    style={{ background: "white", color: "green" }}
                    className="errorPara"
                  >
                    {error}
                  </p>
                )}
                <label className="inputlabels" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Type your valid Email"
                  required=""
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                />
                <label className="inputlabels" htmlFor="pswd">
                  Password
                </label>
                <div>
                  <input
                    type={showpass ? "text" : "password"}
                    name="pswd"
                    placeholder="Type your Password"
                    required=""
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

                <button className="login-button">Submit</button>
              </form>
            </div>
            <Link className="forget_password" href="/forgetpassword">
              forgetpassword
            </Link>
          </div>
        </div>
        {/* <p className="errorPara">{error}</p> */}
      </div>
    </>
  );
};

export default Login;
