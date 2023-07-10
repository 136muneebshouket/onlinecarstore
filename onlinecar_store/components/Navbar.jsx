import React, { useReducer, useState, useRef } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Logo from "@/pages/z_icons/Logo";
import Link from "next/link";
import Image from "next/image";


import { useSession, signOut } from "next-auth/react";

const NavBar = () => {
  const { data: sessionData } = useSession();
  const isLoggedIn = sessionData?.user;



  const [profileDropDown, setProfileDropDown] = useState(false);
 

  const [toggleNavBar, setToggleNavBar] = useState(false);
  const [toggleul, setToggleul] = useState(false);
  var dropDownRef = useRef();
  var dropDownRef2 = useRef();
  var dropDownRef3 = useRef();
  var profileDrop = useRef();
  var arrowDown = useRef();

  return (
    <>
      <div className="NavBar">
        <div className="uppernav">
          <div className="profile" ref={arrowDown}>
            {isLoggedIn ? (
              <>
                <div
                 
                  // onClick={() => setProfileDropDown(!profileDropDown)}
                  className="arrowDown"
                >
                  <div className="username">
                  Welcome {sessionData?.user?.full_name}
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
              </>
            ) : (
              <>
                <div>
                  <Link href="/Authentication/Signup" className="username">
                    Sign up
                  </Link>
                  <Link href="/Authentication/Login" className="username">
                    Sign in
                  </Link>
                </div>
              </>
            )}
           

            {/* Profile Click DropDown */}
            <div ref={profileDrop}
              className={`profileDropDown ${profileDropDown ? "active" : ""}`}
            >
              <ul>
                <li>
                  <Link href={`/users/profile/${sessionData?.user?.full_name.replace(/\s/g, '')}`} >Profile</Link>
                </li>
                <li>
                  <Link href="/">Task Board</Link>
                </li>
                <li>
                  <Link href="/">Setting</Link>
                </li>
                <li>
                  <a href="/" onClick={() => {signOut()}}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <nav>
          <div className="logo">
            <Link href="/">
             {/* <Image width="120" height="70" src="images/next.svg" alt="logo" />  */}
             <Logo/>
            </Link>
          </div>
          <div className="navLinks">
            <ul style={{ left: toggleNavBar ? "-12.5%" : "-105%" }}>
              <li>
                <Link className="darkneon" href="/">
                  Used Cars
                </Link>
              </li>
              {/* <li className='services_one'>
                <Link href="">services
                <i  className="fa-solid fa-angle-down"></i>
                </Link>
                <ul className='dropDownList'>

                <li><Link style={{ color: '#161616', fontWeight:'500' }} href='/image_converter/Imagecompressor' className='drop-downitem' >Image Compressor</Link></li>
                <li><Link style={{ color: '#161616', fontWeight:'500' }} href='/image_converter/Webptojpg' className='drop-downitem' >Webp to Jpg</Link></li>
                <li><Link style={{ color: '#161616', fontWeight:'500' }} href='/image_converter/Webptopng' className='drop-downitem' >Webp to Png</Link></li>
                <li><Link style={{ color: '#161616', fontWeight:'500' }} href='/image_converter/jpgtowebp' className='drop-downitem' >Jpg to Webp</Link></li>
                <li><Link style={{ color: '#161616', fontWeight:'500' }} href='/image_converter/Pngtowebp' className='drop-downitem' >Png to Webp</Link></li>
                <li><Link style={{ color: '#161616', fontWeight:'500' }} href='/QRcode/QRcodegenrator' className='drop-downitem' >  Qr Code Genrator</Link></li>
                  
                  <li><Link style={{ color: '#161616', fontWeight:'500' }} href='/texttools/Texttools' className='drop-downitem' >  Text Tools</Link></li>
                  <li><Link style={{ color: '#161616', fontWeight:'500' }} href='/Unitconversion/Unitconvertion' className='drop-downitem' >  Unit converter</Link></li>
                  <li><Link style={{ color: '#161616', fontWeight:'500' }} href='/Converter/NumberConverterpage' className='drop-downitem' > Number Converter</Link></li>
                  <li><Link style={{ color: '#161616', fontWeight:'500' }} href='/finance/Financecalculators' className='drop-downitem' >Finance converter</Link></li>
                 
                  

                 

                </ul>
              </li> */}
              {/* <li className='services_two'>
                <Link ref={dropDownRef} onClick={() => setToggleul(!toggleul)} href="">What we Help
                <i ref={dropDownRef2} className="fa-solid fa-angle-down"></i>
                </Link>
                <ul style={{ display: toggleul ? 'block' : 'none', overflowY: 'scroll', border: '1px solid',borderRadius:'4px' }} ref={dropDownRef3} className='dropDownList'>
                <li ><Link href="/image_converter/Imagecompressor">Image Compressor</Link></li>
                <li ><Link href="/image_converter/Webptojpg">Webp to Jpg</Link></li>
                <li ><Link href="/image_converter/Webptopng">Webp to Png</Link></li>
                <li ><Link href="/image_converter/jpgtowebp">Jpg to Webp</Link></li>
                <li ><Link href="/image_converter/Pngtowebp">Png to Webp</Link></li>
                <li ><Link href="/QRcode/QRcodegenrator"> Qr Code Genrator</Link></li>
                <li ><Link href="/texttools/Texttools"> Text Tools</Link></li>
                  <li ><Link href="/finance/Financecalculators">Finance converter</Link></li>
                  
                  <li ><Link href="/Unitconversion/Unitconvertion"> Unit converter</Link></li>
                  
                 
                  <li ><Link href="/Converter/NumberConverterpage">Number Converter</Link></li>
                 
                </ul>
              </li> */}
              <li>
                <Link className="darkneon" href="/">
                  New Cars
                </Link>
              </li>
              <li>
                <Link className="darkneon" href="/">
                  Bikes
                </Link>
              </li>

              <Link className="postaddlink" href="/Used_cars/Sell">
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
                if(profileDrop.current != event.target 
                  // || arrowDown.current.contains(event.target)
                   ){
                 setProfileDropDown(false);
                }
                if(arrowDown.current.contains(event.target)){
                  setProfileDropDown(!profileDropDown);
                  // console.log('im clicked')
                }
              }}
            >
              <i
                onClick={() => setToggleNavBar(!toggleNavBar)}
                className="bx bx-menu"
              ></i>
            </OutsideClickHandler>
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
