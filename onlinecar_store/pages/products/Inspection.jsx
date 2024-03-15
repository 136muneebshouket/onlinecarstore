import React, { useEffect, useState, useContext, useCallback } from "react";
// import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import axios from "axios";
import Context from "@/components/processing_functions/context";
import Order_service_form from "@/components/child_components_of_others/service_order_form/Order_service_form";

const Inspection = () => {
  const data = [
    {
      heading: "Book Inspection Slot",
      content:
        "Carselection Car Inspection services are available for your convenience. Schedule yours today!.",
      cardImage: "/images/book_inspec.jpg",
    },
    {
      heading: "CarSelection Conducts Inspection",
      content:
        "Experience the expertise of our inspectors through a comprehensive 200-point check, finished in a swift 45 minutes.",
      cardImage: "/images/12.jpg",
    },
    {
      heading: "Get Analysis Report",
      content:
        "This computer-generated report provides scores based on expert assessment.",
      cardImage: "/images/13.jpg",
    },
  ];

  return (
    <>
      <div className="main_inspection">
        <div className="header_inspection">
          <div className="img_div">
            <Image
              src="/images/car-inspection_header.webp"
              width={100}
              height={100}
              // quality={80}
              unoptimized={true}
              alt="inspectionbanner.png"
            />
          </div>
          <div className="formsection">
            <Order_service_form heading={'Shedule Carselection Car Inspection'} />
          </div>
        </div>

        <div className="second_div">
          <div className="inspec_includes">
            <h2>What our Inspection report includes ?</h2>
            <div className="cards">
              <div className="card">
                <Image
                  src={"/images/icons8-car-service-webp.webp"}
                  unoptimized={true}
                  width={100}
                  height={100}
                  alt="Overall Condition Analysis"
                />
                <p>
                  <strong>Overall Condition Analysis</strong>
                </p>
              </div>
              <div className="card">
                <Image
                  src={"/images/icons8-car-100.webp"}
                  unoptimized={true}
                  width={100}
                  height={100}
                  alt="Car Exterior and Interior"
                />
                <p>
                  <strong>Car Exterior and Interior</strong>
                </p>
              </div>
              <div className="card">
                <Image
                  src={"/images/icons8-car-inspection-webp.webp"}
                  unoptimized={true}
                  width={100}
                  height={100}
                  alt="Overall health of car"
                />
                <p>
                  <strong>Overall health of car</strong>
                </p>
              </div>
              <div className="card">
                <Image
                  src={"/images/icons8-car-check-webp.webp"}
                  unoptimized={true}
                  width={100}
                  height={100}
                  alt="Overall ranking per equipment"
                />
                <p>
                  <strong>Overall ranking per equipment</strong>
                </p>
              </div>
            </div>
          </div>

          <div className="who_it_works">
            <h2>How CarSelection Inspection works ?</h2>
            <div className="Cards">
              {data.map((d) => (
                <div key={d} className="card">
                  <Image
                    src={d.cardImage}
                    className="cardImage"
                    height={100}
                    width={300}
                    alt="Car Inspection Test"
                  />
                  <div className="cardData">
                    <h2 className="cardHeading">
                      <strong>{d.heading}</strong>
                    </h2>
                    <p className="cardContent">{d.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Inspection;
