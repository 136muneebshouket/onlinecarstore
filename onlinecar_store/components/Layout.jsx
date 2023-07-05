"use client";

import NavBar from "./Navbar";
import { SessionProvider } from "next-auth/react";

const Layout = ({children}) => {


  return (
    <>
      <SessionProvider>
      
    <NavBar></NavBar>
    {children}
    </SessionProvider>

  
    </>
  )
}

export default Layout
