import React, { useState, useEffect } from "react";
import axios from "axios";
// import FullLoader from "@/components/Modals/Loader/fullLoader";
import dynamic from 'next/dynamic'
import Context from "@/components/processing_functions/context";
import { useContext } from "react";

const FullLoader = dynamic(() => import('@/components/Modals/Loader/fullLoader'), {
  loading: () => <div className="loder"><h2>Loading...</h2></div>,
})
const Resetpasswordpage = () => {

  const { message, setMessage } = useContext(Context);

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [Tokken, setTokken] = useState("");
  const [showpass, setShowpass] = useState(false);
  const [Done, setDone] = useState('');

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get('token');
    setTokken(token);
  }, []);

  const resetpassword = async (e) => {
    setLoading(true);
    e.preventDefault();
    let obj = {
      newpassword: password,
      resettokken: Tokken,
    };
    axios
      .post(`/api/auth/Resetpassword`, obj)
      .then((res) => {
       
        setDone(res.data.message);
        setMessage({success:true,msg:res.data.message}); 
        
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setDone(err.response.data.message);
        setMessage({success:false,msg:err.response.data.message}); 
      }).finally(()=>{
        setLoading(false);
      });
    setPassword("");
  };

  return (
    <>
      <div className="modal" style={{background:'white'}}>
        <div className="modal_content" style={{boxShadow:'1px 1px 35px 0px #8b8b8b'}}>
          <div className="modal_title">
            <h2>Forget Password ? &#129300;</h2>
            <p>
              Enter Your active/vaild email address <br /> where you will get
              the link to reset your password
            </p>
          </div >
         
              <form onSubmit={resetpassword}>
                <label className="inputlabels" htmlFor="pswd">
                  Password
                </label>
                <div style={{position:'relative'}}>
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

                <button type="submit" className="login-button">
                  Submit
                </button>
              </form>
          
         <p style={{textAlign:'center'}}>{ Done }</p> 
        </div>

      </div>
        {/* loader fullpage */}
        {loading ? <FullLoader /> : '' } 
    </>
  );
};

export default Resetpasswordpage;
