"use client";

// import NavBar from "./Navbar";
import { SessionProvider } from "next-auth/react";

import dynamic from 'next/dynamic'

const NavBar = dynamic(() => import('./Navbar'), {
  loading: () => <p>Loading...</p>,
})

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
