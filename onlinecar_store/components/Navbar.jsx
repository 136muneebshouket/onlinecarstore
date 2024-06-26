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
  const [visible, setVisible] = useState(false);
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
  var arrowDown2 = useRef();
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
    const currentScrollPos = window.scrollY;

    if (currentScrollPos > prevScrollPos) {
      setVisible(true);
    } else {
      setVisible(false);
    }

    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <>
      <div className={`NavBar ${visible && "NavBar_hide"}`}>
        <div className="uppernav">
          <div className="profile" ref={arrowDown}>
            {/* {isLoggedIn ? (
              <> */}
            <div
              // onClick={() => setProfileDropDown(!profileDropDown)}
              className="arrowDown"
            >
              <div className="username">Welcome {sessionData?.user?.name}</div>
              <i
                style={{
                  transform: `rotate(${profileDropDown ? "180deg" : "0deg"})`,
                }}
                className="bx bx-chevron-down"
              ></i>
            </div>

            {/* Profile Click DropDown */}
            {isLoggedIn ? (
              <>
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
                      <Link href="/users/user_dashboard/Others/?My_Ads">
                        My ads
                      </Link>
                    </li>
                    <li>
                      <Link href="/users/user_dashboard/Others/?My_Saved_Ads">
                        My Saved Ads
                      </Link>
                    </li>
                    <li>
                      <Link href="/users/user_dashboard/Others/?All_chats">
                        My Chats
                      </Link>
                    </li>
                    <li>
                      <a
                        href="#"
                        onClick={() => {
                          signOut();
                        }}
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div
                  ref={profileDrop}
                  className={`profileDropDown ${
                    profileDropDown ? "active" : ""
                  }`}
                >
                  <ul>
                    <li>
                      <Link
                        href="/authentication/user-register/Signup"
                        className="username"
                      >
                        Sign up
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/authentication/user-login/Login"
                        className="username"
                      >
                        Sign in
                      </Link>
                    </li>
                  </ul>
                </div>
                <div></div>
              </>
            )}

            {isLoggedIn ? (
              <></>
            ) : (
              <>
                <div className="signup_desktop">
                  <Link
                    href="/authentication/user-register/Signup"
                    className="username"
                  >
                    Sign up
                  </Link>
                  <Link
                    href="/authentication/user-login/Login"
                    className="username"
                  >
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
            <ul style={{ left: toggleNavBar ? "0%" : "-130%" }}>
              <li>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Link className="darkneon" href="/used-cars/search-car">
                    Used Cars
                  </Link>
                  <span>
                    <i
                      ref={dropDownRef2}
                      onClick={() => {
                        setUsedcardropdown(!usedcardropdown);
                      }}
                      className="bx bx-chevron-down"
                    ></i>
                  </span>
                </div>
                <Usedcar_dropdown toggle={usedcardropdown} />
              </li>
              <li>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Link className="darkneon" href="/used-bikes/search-bikes">
                    Bikes
                  </Link>
                  <span>
                    <i
                      ref={dropDownRef3}
                      onClick={() => {
                        setUsedbikedropdown(!usedbikedropdown);
                      }}
                      className="bx bx-chevron-down"
                    ></i>
                  </span>
                </div>
                <Usedbike_dropdown toggle={usedbikedropdown} />
              </li>

              <li>
                <Link className="darkneon" href="/videos_page/Videos">
                  Videos
                </Link>
              </li>
              <li>
                <Link className="darkneon" href="/blog">
                  Blogs
                </Link>
              </li>

              <Link className="postaddlink" href="/used-cars/-/sell">
                <p>Post an add</p>
              </Link>
            </ul>

            {/* bottom bar links */}
            <div className="bottom_bar_links">
              <div>
                <Link href={"/"}>
                  <div className="link">
                    <i class="bx bxs-home"></i>
                    <p>Home</p>
                  </div>
                </Link>

                <Link href={"/used-cars/search-car"}>
                  <div className="link">
                    <i class="bx bxs-car"></i>
                    <p>cars</p>
                  </div>
                </Link>
              </div>

              <Link href={"/used-cars/-/sell"}>
                <div className="link center_link">
                  <p>Sell</p>
                </div>
              </Link>

              <div>
                <div className="link" ref={arrowDown2}>
                  <i class="bx bxs-user-detail"></i>
                  <p>Profile</p>
                </div>

                <div className="link">
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
                      if (
                        arrowDown2.current.contains(event.target) ||
                        arrowDown.current.contains(event.target)
                      ) {
                        setProfileDropDown(!profileDropDown);
                        // console.log("im clicked");
                      }
                    }}
                  >
                    <span
                      onClick={() => setToggleNavBar(!toggleNavBar)}
                      // className="bx bx-menu"
                    >
                      {toggleNavBar ? <>&#x2716;</> : <>&#x2630;</>}
                    </span>
                  </OutsideClickHandler>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
