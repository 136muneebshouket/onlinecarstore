import React from "react";
import Image from "next/image";

const aboutus = () => {
  return (
    <div className="aboutus">
      <div className="content">
        <h1>About Us</h1>
        <p>
          Welcome to our car selling website! We are a team of passionate car
          enthusiasts who are dedicated to helping you find the perfect vehicle
          for your needs. With years of experience in the automotive industry,
          we have the knowledge and expertise to guide you through the car
          buying process. Whether you are looking for a reliable daily driver, a
          luxury vehicle, or a sporty performance car, we have a wide selection
          of vehicles to choose from. Our mission is to provide a seamless and
          enjoyable car buying experience for our customers. We strive to offer
          competitive prices, transparent information, and exceptional customer
          service to ensure that you are completely satisfied with your
          purchase. Thank you for visiting our website. We look forward to
          helping you find your dream car!
        </p>

        <div className="about_logo">
          <Image
            src={"/images/logo.png"}
            unoptimized={true}
            alt="Logo"
            width={100}
            height={100}
          />
        </div>
      </div>
    </div>
  );
};

export default aboutus;
