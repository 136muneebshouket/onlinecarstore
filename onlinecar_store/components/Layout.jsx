"use client";

// import NavBar from "./Navbar";
import { SessionProvider } from "next-auth/react";

import dynamic from "next/dynamic";

const NavBar = dynamic(() => import("./Navbar"), {
  loading: () => <p>Loading...</p>,
});
import { resobj } from "./processing_functions/errors_gen";
import { useEffect,useState } from "react";
import { createContext } from "react";



// export const Message_data = createContext(null);

const Layout = ({ children }) => {
 

  return (
    <>
    
      <SessionProvider>
      {/* <Message_data.Provider value={{ message, setMessage }}> */}
          <NavBar></NavBar>
          {children}
          {/* </Message_data.Provider> */}
      </SessionProvider>
     
    </>
  );
};

export default Layout;
