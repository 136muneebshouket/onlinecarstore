"use client";
import React, { useReducer, useState, useRef, useEffect } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Logo from "../pages/z_icons/Logo";
import Link from "next/link";

import Context from "./processing_functions/context";
import { useContext } from "react";
import Usedcar_dropdown from "./stylecomponents/Usedcar_dropdown";
import Usedbike_dropdown from "./stylecomponents/Usedbike_dropdown";
// import {google_auth} from "../components/processing_functions/auth_func";
// import Image from "next/image";

import { useSession, signOut } from "next-auth/react";
import axios from "axios";

const NavBar = () => {
  const { data: sessionData } = useSession();
 
  // console.log(sessionData)
  const isLoggedIn = sessionData?.user;
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(false)
  const [profileDropDown, setProfileDropDown] = useState(false);
  const [usedcardropdown, setUsedcardropdown] = useState(false);
  const [usedbikedropdown, setUsedbikedropdown] = useState(false);

  const [toggleNavBar, setToggleNavBar] = useState(false);
  const [toggleul, setToggleul] = useState(false);
  var dropDownRef = useRef();
  var dropDownRef2 = useRef();
  var dropDownRef3 = useRef();
  var profileDrop = useRef();
  var arrowDown = useRef();
  // console.log(profileDropDown);
  // console.log(sessionData?.user)
  // useEffect(()=>{
    
  //   async function func(){
  //     if(sessionData?.user){
  //       await google_auth(sessionData?.user)
  //     }
  //   }
  //   func()

  // },[sessionData?.user])
  const handleScroll = () => {
    const currentScrollPos = window.scrollY

    if(currentScrollPos > prevScrollPos){
     setVisible(true)
    }else{
      setVisible(false)
    }

    setPrevScrollPos(currentScrollPos)
}

useEffect( () => {
  window.addEventListener('scroll', handleScroll);

  return () => window.removeEventListener('scroll', handleScroll)
},[prevScrollPos])

  return (
    <>
      <div className={`NavBar ${visible && 'NavBar_hide' }`} >
        <div className="uppernav">
          <div className="profile" ref={arrowDown}>
            {isLoggedIn ? (
              <>
                <div
                  // onClick={() => setProfileDropDown(!profileDropDown)}
                  className="arrowDown"
                >
                  <div className="username">
                    Welcome {sessionData?.user?.name}
                  </div>
                  <i
                    style={{
                      transform: `rotate(${
                        profileDropDown ? "180deg" : "0deg"
                      })`,
                    }}
                    className="bx bx-chevron-down"
                  ></i>
                </div>

                {/* Profile Click DropDown */}
                <div
                  ref={profileDrop}
                  className={`profileDropDown ${
                    profileDropDown ? "active" : ""
                  }`}
                >
                  <ul>
                    <li>
                      <Link
                        href={`/users/profile/${sessionData?.user?.name.replace(
                          /\s/g,
                          ""
                        )}`}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link href="/users/user_dashboard/Others/?My_Ads">My ads</Link>
                    </li>
                    <li>
                      <Link href="/users/user_dashboard/Others/?My_Saved_Ads">My Saved Ads</Link>
                    </li>
                    <li>
                      <Link href="#">Setting</Link>
                    </li>
                    <li>
                      <a
                        href="#"
                        onClick={()=>{signOut()}}
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div>
                  <Link href="/authentication/Signup" className="username">
                    Sign up
                  </Link>
                  <Link href="/authentication/Login" className="username">
                    Sign in
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
        <nav>
          <div className="logo">
            <Link href="/">
              {/* <Image width="120" height="70" src="images/next.svg" alt="logo" />  */}
              <Logo />
            </Link>
          </div>
          <div className="navLinks">
            <ul style={{ left: toggleNavBar ? "-12.5%" : "-130%" }}>
              <li>
                <div style={{display:'flex',justifyContent:'space-between',width:'100%'}}>
                <Link className="darkneon" href="/used_cars/Search_car">
                  Used Cars
                </Link>
                <span><i ref={dropDownRef2} onClick={()=>{setUsedcardropdown(!usedcardropdown)}}  className="bx bx-chevron-down"></i></span>
                </div>     
                <Usedcar_dropdown toggle={usedcardropdown}/>  
              </li>
              <li>
                <div style={{display:'flex',justifyContent:'space-between',width:'100%'}}>
                <Link className="darkneon" href="/used_bikes/Search_bikes">
                  Bikes
                </Link>
                <span><i ref={dropDownRef3} onClick={()=>{setUsedbikedropdown(!usedbikedropdown)}}  className="bx bx-chevron-down"></i></span>
                </div>     
                <Usedbike_dropdown toggle={usedbikedropdown}/>  
              </li>
          
              
              <li>
                <Link className="darkneon" href="/videos_page/Videos">
                  Videos
                </Link>
              </li>
              <li>
                <Link className="darkneon" href="/">
                  Blogs
                </Link>
              </li>

              <Link className="postaddlink" href="/used_cars/Sell">
                <p>Post an add</p>
              </Link>
            </ul>
            <OutsideClickHandler
              onOutsideClick={(event) => {
                if (
                  dropDownRef.current != event.target &&
                  dropDownRef2.current != event.target &&
                  dropDownRef3.current != event.target
                ) {
                  setToggleNavBar(false);
                  setToggleul(false);
                }
                if (
                  profileDrop.current != event.target
                  // || arrowDown.current.contains(event.target)
                ) {
                  setProfileDropDown(false);
                }
                if (arrowDown.current.contains(event.target)) {
                  setProfileDropDown(!profileDropDown);
                  // console.log("im clicked");
                }
              }}
            >
              <i
                onClick={() => setToggleNavBar(!toggleNavBar)}
                // className="bx bx-menu"
              >{toggleNavBar ? <>&#x2716;</>:<>&#x2630;</>}</i>
            </OutsideClickHandler>
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
