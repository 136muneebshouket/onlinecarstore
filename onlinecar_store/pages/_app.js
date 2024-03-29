import "@/styles/globals.css";
import Layout from "../components/Layout";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import "@/styles/navbar.css";
import "@/styles/Login.css";
import "@/styles/profile.css";
import "@/styles/modal.css";
import "@/styles/fullloader.css";
import "@/styles/home.css";
import "@/styles/sell.css";
import "@/styles/Post_ad.css";
import "@/styles/Textareamodal.css";
import "@/styles/optionsmodal.css";
import "@/styles/show_img_modal.css";
import "@/styles/searchcar.css";
import "@/styles/filtermodal.css";
import "@/styles/doublerange.css";
import "@/styles/singlecarpage.css";
import "@/styles/Other_profilepages.css";
import "@/styles/car_cards_sliders.css";
import "@/styles/admin_page.css";
import "@/styles/utube.css";
import "@/styles/usedcar_drpdown.css";
import "@/styles/footer.css";
import "@/styles/Inspection_page.css";
import "@/styles/admin_inspection.css";
import "@/styles/Slots.css";
import "@/styles/start_inspection.css";
import "@/styles/ad_caroptions.css";
import "@/styles/shake_animations.css";
import "@/styles/client_Inspection_report.css";
import "@/styles/ad_new_blog.css";
import "@/styles/blogs_all.css";
import "@/styles/single_blogpage.css";
import "@/styles/aboutus.css";
import "@/styles/chatpage.css";

import Head from "next/head";
import Response_modal from "@/components/Modals/respnse_modal/Response_modal";
import { resobj } from "@/components/processing_functions/errors_gen";
import Context from "@/components/processing_functions/context";
// import { Message_data } from "@/Components/Layout";
// import { useContext } from "react";
import React, { useState, useEffect, useCallback } from "react";

// import FullLoader from '@/components/Modals/Loader/fullLoader'
import { useRouter } from "next/router";

import dynamic from "next/dynamic";
import { Nunito } from 'next/font/google'
 
const inter = Nunito({ subsets: ['latin'], variable: '--font-inter' })

// const Layout = dynamic(() => import('../components/Layout'), {
//   loading: () => <p>Loading...</p>,
// })
const FullLoader = dynamic(
  () => import("../components/Modals/Loader/FullLoader"),
  {
    loading: () => (
      <div className="loder">
        <h2>Loading...</h2>
      </div>
    ),
  }
);

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();
 
//  console.log(message)

  useEffect(() => {
    const handleRouteChange = (url) => {
      setLoading(true);
    };

    const handleRouteChangeComplete = () => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router.events]);


  return (
    <>
    <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
        <Context.Provider value={{message , setMessage}}>
        <main 
        className={inter.className}
        >
        <Layout >
         
          {loading ? <FullLoader /> : <Component {...pageProps} />}
          {message && <Response_modal res={message} onClose={()=>{setMessage()}}/>}
          <Footer/>
          <NavBar/>
          
        </Layout>
        </main>
        </Context.Provider>
   

      <Head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        ></link>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
          crossorigin="anonymous"
        ></link>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"
          integrity="sha384-fbbOQedDUMZZ5KreZpsbe1LCZPVmfTnH7ois6mU1QK+m14rQ1l2bGBq41eYeM/fS"
          crossorigin="anonymous"
        ></script>
      </Head>
    </>
  );
}
