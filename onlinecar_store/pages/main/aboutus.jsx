import React from "react";
import Image from "next/image";
import Head from "next/head";

const aboutus = () => {
  return (
    <>
      <Head>
        <title>About Us | [Website Name]</title>
        <meta name="description" content="About Us" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="aboutus_page">
        <div className="container">
          <div className="row">
            <div className="content-column col-lg-6 col-md-12 col-sm-12 order-2">
              <div className="inner-column">
                <div className="sec-title">
                  <span className="title">About Us</span>
                  <h1>Fueling dreams on the road less traveled</h1>
                </div>
                <div className="text">
                  Welcome to Carselection.pk, your ultimate destination for all
                  things related to cars in Pakistan. My name is M Haroon Azam,
                  and I am a passionate car enthusiast with a deep love for all
                  things automotive. With years of experience in the industry, I
                  have dedicated myself to providing valuable information,
                  reviews, and recommendations to help you make the best car
                  selection decisions. Join me on this journey as we explore the
                  world of cars together and find the perfect
                  vehicle for your needs.
                </div>
                {/* <div className="text">
                  We are here to serve you next level tutorial that currently in
                  trend to match you with your expertise. Css3 transition is a
                  learning website. where you can find many good quality content
                  related to web development and tutorials about plugins. here
                  we are using html, html5, css, css3, jquery & javascript along
                  with inspirational UI design layout by professionals by using
                  Photoshop and adobe allustrator.
                </div> */}
                {/* <div className="btn-box">
                  <a href="" className="theme-btn btn-style-one">
                    Contact Us
                  </a>
                </div> */}
              </div>
            </div>

            {/* <!-- Image Column --> */}
            <div className="image-column col-lg-6 col-md-12 col-sm-12">
              <div className="inner-column wow fadeInLeft">
                <div className="author-desc">
                  <h2>M Haroon Azam</h2>
                  <span>C.E.O Carselection</span>
                </div>
                <figure className="image-1">
                  <a href="#" className="lightbox-image" data-fancybox="images">
                    <Image
                      title="M Haroon Azam"
                      src="/images/haroon.jpg"
                      alt="ceo"
                      unoptimized={true}
                      width={100}
                      height={100}
                    />
                  </a>
                </figure>
              </div>
            </div>
          </div>
          <div className="sec-title">
            <span className="title">Our Future Goal</span>
            <h2>We don't just sell cars, we ignite journeys.</h2>
          </div>
          <div className="text">
          Welcome to our car selling website! We are a team of passionate car
           for your needs. With years of experience in the automotive industry,
           enthusiasts who are dedicated to helping you find the perfect vehicle
           we have the knowledge and expertise to guide you through the car
           buying process. Whether you are looking for a reliable daily driver, a
           luxury vehicle, or a sporty performance car, we have a wide selection
           of vehicles to choose from. Our mission is to provide a seamless and
           enjoyable car buying experience for our customers. We strive to offer
           competitive prices, transparent information, and exceptional customer
           service to ensure that you are completely satisfied with your
           purchase. Thank you for visiting our website. We look forward to
           helping you find your dream car!
          </div>
          
        </div>
      </section>
    </>
    // <div className="aboutus">
    //   <div className="content">
    //     <h1>About Us</h1>
    //     <p>
    //       Welcome to our car selling website! We are a team of passionate car
    //       enthusiasts who are dedicated to helping you find the perfect vehicle
    //       for your needs. With years of experience in the automotive industry,
    //       we have the knowledge and expertise to guide you through the car
    //       buying process. Whether you are looking for a reliable daily driver, a
    //       luxury vehicle, or a sporty performance car, we have a wide selection
    //       of vehicles to choose from. Our mission is to provide a seamless and
    //       enjoyable car buying experience for our customers. We strive to offer
    //       competitive prices, transparent information, and exceptional customer
    //       service to ensure that you are completely satisfied with your
    //       purchase. Thank you for visiting our website. We look forward to
    //       helping you find your dream car!
    //     </p>

    //     <div className="about_logo">
    //       <Image
    //         src={"/images/logo.png"}
    //         unoptimized={true}
    //         alt="Logo"
    //         width={100}
    //         height={100}
    //       />
    //     </div>
    //   </div>
    // </div>
  );
};

export default aboutus;
