"use client";
import React, { useState } from "react";
// import { signIn } from "next-auth/react";
import axios from "axios";
import Link from "next/link";
// import "./Login.css"

const Register = () => {

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [full_name, setfull_name] = useState("");
  const [password, setPassword] = useState("");
  const [showpass, setShowpass] = useState(false);
  const [email, setEmail] = useState("");
  // const [image, setImage] = useState(null);
  const [imagetoshow, setImagetoshow] = useState(null);
  // const [avatar, setAvatar] = useState("");

  // const onImageChange = (event) => {
  //   if (event.target.files && event.target.files[0]) {
  //     setImage(event.target.files[0]);
  //     setImagetoshow(URL.createObjectURL(event.target.files[0]));
  //   }
  // };


  // function for uploading avatar with the user data
  // const login = async (e) => {
  //   setLoading(true);
  //   e.preventDefault();

  //   if (image !== null) {
  //     const data = new FormData();
  //     data.append("file", image);
  //     data.append("upload_preset", "muneeb");
  //     data.append("cloud_name", "dgyh5n01r");
  //     // console.log(data)
  //     // console.log(image)

  //     await axios
  //       .post("https://api.cloudinary.com/v1_1/dgyh5n01r/image/upload", data)
  //       .then((res) => {
  //         console.log(res.data.secure_url);
  //         setAvatar(res.data.secure_url);
  //         setLoading(false);
  //         upload(res.data.secure_url);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         setLoading(false);
  //         return alert("error in uploading image");
  //       });
  //   } else {
  //     upload(null);
  //   }
  // };

  const upload = async (e) => {
       setLoading(true);
    e.preventDefault();
    let loginobj = {
      full_name,
      // username,
      password,
      email,
      // isadmin,
      // avatar: avatar,
    };

    await axios
      .post(`/api/register`, loginobj)
      .then((res) => {
        console.log(res);
        if (res.status == 201) {
          // localStorage.setItem("access_token", res.data.token)
          // localStorage.setItem("refresh_token", res.data.refreshToken)
          // localStorage.setItem("user_id", res.data.userid)
          setError("user has been sucsesfully created");

          setUsername("");
          setPassword("");
          setEmail("");
          setfull_name("");
          setIsadmin(false);
          setImage(null);
          setImagetoshow(null);
          setUsername("");
          setPassword("");
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        setError(error.response.data);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="login-body">
        <div className="main">
          <label htmlFor="chk" className="Login_text" aria-hidden="true">
           Sign Up
          </label>
          <div className="login">
            <div className="overlay">
              <form onSubmit={upload}>
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
                    {error.success == false ? (
                      <p
                        style={{ background: "white", color: "red" }}
                        className="errorPara"
                      >
                        {error.message}
                      </p>
                    ) : (
                      <p
                        style={{ background: "white", color: "green" }}
                        className="errorPara"
                      >
                        {error}
                      </p>
                    )}
                  </>
                )}
                 
                 <label className="inputlabels" htmlFor="full_name">Name</label>
                <input
                  type="text"
                  name="full_name"
                  placeholder="Type your Full_name here"
                  required
                  onChange={(e) => {
                    setfull_name(e.target.value);
                  }}
                  value={full_name}
                />
                 <label className="inputlabels" htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Type your valid Email here"
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                />
                {/* <input
                  style={{ height: "20px", padding: "10px" }}
                  type="file"
                  onChange={onImageChange}
                  className="filetype"
                  name="img"
                  placeholder="upload ur profile image"
                /> */}
                  <label className="inputlabels" htmlFor="pswd">Password</label>
                  <div>
                  <input
                   type={showpass ? "text" : "password"}
                  name="pswd"
                  placeholder="Type your Password here"
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                />
                 <div className="showpass_icon">
                {showpass ? (
                  <i
                    onClick={()=>{setShowpass(!showpass)}}
                    className="bx bx-show"
                  ></i>
                ) : (
                  <i
                  onClick={()=>{setShowpass(!showpass)}}
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
        {/* <div className="register_img">
          <img
            style={{ height: "auto", width: "400px" }}
            alt="preview image"
            src={imagetoshow}
          />
        </div> */}
      </div>
    </>
  );
};

export default Register;
