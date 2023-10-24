import React from "react";
import Link from "next/link";
import { carBrands, cities ,bodyTypeArray,carModels} from "./Filters/Options-sliders/optionsarray";
import colors from "./carsdata/colors";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="contain">
          <div className="col">
            <h1>Cars By Make</h1>
            <ul>
              {carBrands.map((v, index) => {
                if (index < 10) {
                  return (
                    <>
                      <li key={index}>
                        <Link href={v.link}>{v.name} Cars for Sale</Link>
                      </li>
                    </>
                  );
                }
              })}
            </ul>
          </div>
          <div className="col">
            <h1>Cars By City</h1>
            <ul>
              {cities.map((v, index) => {
                if (index < 10) {
                  return (
                    <>
                      <li key={index}>
                        <Link href={v.link}>Cars in {v.name}</Link>
                      </li>
                    </>
                  );
                }
              })}
            </ul>
          </div>
          <div className="col">
          <h1>Cars By BodyType</h1>
            <ul>
              {bodyTypeArray.map((v, index) => {
                if (index < 10) {
                  return (
                    <>
                      <li key={index}>
                        <Link href={v.link}>{v.name} Cars for Sale</Link>
                      </li>
                    </>
                  );
                }
              })}
            </ul>
          </div>
          <div className="col">
          <h1>Cars By Models</h1>
            <ul>
              {carModels.map((v, index) => {
                if (index < 10) {
                  return (
                    <>
                      <li key={index}>
                        <Link href={v.link}>{v.name} Cars for Sale</Link>
                      </li>
                    </>
                  );
                }
              })}
            </ul>
          </div>
          <div className="col">
          <h1>Cars By Colors</h1>
            <ul>
              {colors.map((v, index) => {
                if (index < 10) {
                  return (
                    <>
                      <li key={index}>
                        <Link href={`/used_cars/Search_car?filters={"color":["${v.colorname}"]}`}>{v.colorname} Cars for Sale</Link>
                      </li>
                    </>
                  );
                }
              })}
            </ul>
          </div>
          
        </div>
        <hr />
        <div className="clearfix">
          <div className="other_pages">
            <Link href={"#"}>About</Link>
            <Link href={"#"}>About</Link>
            <Link href={"#"}>About</Link>
            <Link href={"#"}>About</Link>
            <Link href={"#"}>About</Link>
          </div>
          <hr />
          <div className="last_p">
            <p>
              Copyright © 2003 - 2023 CarSelection (Pvt) Ltd. - All Rights
              Reserved.
            </p>

            <p> Terms of Service | Privacy Policy </p>
            <p>
              {" "}
              Reproduction of material from any CarSelection.com pages without
              permission is strictly prohibited.{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
