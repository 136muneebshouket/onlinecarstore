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

    <div className="sell_main">
      <div className="sell_header">
        <div className="header_title">
          <h1>Sell Your Car Online in Pakistan Instantly!</h1>
          <h1>Choose How To Sell Your Car</h1>
        </div>
        <div className="header_cards">
          <div className="card">
            <div>
            <h2>Post your Ad on PakWheels</h2>
            <img src="https://wsa2.pakwheels.com/assets/postad-img-58f5eb96777aff56872a2ee71b6475fd.png" alt="loading" />
            <ul>
              <li><i class='bx bx-check'></i> <span>Post your Ad for Free in 3 Easy Steps</span></li>
              <li><i class='bx bx-check'></i> <span>Post your Ad for Free in 3 Easy Steps</span></li>
              <li><i class='bx bx-check'></i> <span>Post your Ad for Free in 3 Easy Steps</span></li> 
            </ul>
            <button>
            
              Post an Ad
            </button>
            </div>
            
          </div>
          <div className="card">
            <div>
            <h2>Post your Ad on PakWheels</h2>
            <img src="https://wsa2.pakwheels.com/assets/postad-img-58f5eb96777aff56872a2ee71b6475fd.png" alt="loading" />
            <ul>
              <li><i class='bx bx-check'></i> <span>Post your Ad for Free in 3 Easy Steps</span></li>
              <li><i class='bx bx-check'></i> <span>Post your Ad for Free in 3 Easy Steps</span></li>
              <li><i class='bx bx-check'></i> <span>Post your Ad for Free in 3 Easy Steps</span></li> 
            </ul>
            <button>
            
              post an add
            </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>

    
    </>
  );
};

export default Sell;
