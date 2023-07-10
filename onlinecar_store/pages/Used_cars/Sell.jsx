import React, {} from "react";

import Head from "next/head";
import Link from "next/link";

const Sell = () => {
 

  return (
    <>
      <Head>
        <title>Sell my car</title>
        <meta name="description" content="Sell my car" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Link className="postaddlink" href="/Used_cars/Sell/Post_ad">
        <p>Post an add</p>
      </Link>

    
    </>
  );
};

export default Sell;
