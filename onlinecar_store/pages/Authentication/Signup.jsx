"use client";
import React, { useState } from "react";
// import { signIn } from "next-auth/react";
// import FullLoader from "@/components/Modals/Loader/fullLoader";
import axios from "axios";
import Link from "next/link";
import Context from "@/components/processing_functions/context";
import { useContext } from "react";

import dynamic from 'next/dynamic'

const FullLoader = dynamic(() => import('@/components/Modals/Loader/fullLoader'), {
  loading: () => <div className="loder"><h2>Loading...</h2></div>,
})

const Register = () => {


  const { message, setMessage } = useContext(Context);
  const [error, setError] = useState({
    success:true,
    message:''
  });
  const [loading, setLoading] = useState(false);
  const [full_name, setfull_name] = useState("");
  const [password, setPassword] = useState("");
  const [showpass, setShowpass] = useState(false);
  const [email, setEmail] = useState("");
  // const [image, setImage] = useState(null);
  const [imagetoshow, setImagetoshow] = useState(null);
  // const [avatar, setAvatar] = useState("");



  const upload = async (e) => {
       setLoading(true);
    e.preventDefault();
    let loginobj = {
      name:full_name,
      // username,
      password,
      email,
      // isadmin,
      // avatar: avatar,
    };

    await axios
      .post(`/api/auth/register`, loginobj)
      .then((res) => {

        if (res.status == 201) {
          // setError(res?.data);
          setError({...error, success: res?.data.success , message: res?.data.message});
          setMessage({success:true,msg:res?.data.message}); 
          setPassword("");
          setEmail("");
          setfull_name("");
          setLoading(false)
        }
      })
      .catch((err) => {
        setError({...error, success:err?.response?.data.success , message: err?.response?.data.message});
        setMessage({success:false,msg:err?.response?.data.message}); 
        setLoading(false);
      }).finally(()=>{
        console.log(error)
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
                        {error.message}
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
                  <div style={{position:'relative'}}>
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
               

                <button type="submit" style={{marginTop:'30px'}} className="login-button" disabled={loading && 'true'}> {!loading ? "Submit" : "Processing..."}</button>
              </form>
            </div>
   
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
         {/* loader fullpage */}
         {loading ? <FullLoader /> : '' } 
    </>
  );
};

export default Register;
