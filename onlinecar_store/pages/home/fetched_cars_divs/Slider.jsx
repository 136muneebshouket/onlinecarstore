import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { bodyTypeArray, carBrands, cities, carModels,carPrices } from "../../../components/Filters/Options-sliders/optionsarray";
import Link from "next/link";

const Slider = ({ filterby }) => {
  const [array, setArray] = useState(bodyTypeArray);
  // let arr;
  //  console.log(array)
  const [gapoptions, setGapoptions] = useState(2);

  const [arraytodisplay, setArraytodisplay] = useState([]);

  useMemo(() => {
    const bodyTypeSubarrays = [];
    for (let i = 0; i < array.length; i += gapoptions) {
      const bodyTypeSubarray = Array.from(array.slice(i, i + gapoptions));
      bodyTypeSubarrays.push(bodyTypeSubarray);
    }
    setArraytodisplay(bodyTypeSubarrays);
  }, [array, gapoptions]);

  useEffect(() => {
    if (filterby.includes("Body Type")) {
      setArray(bodyTypeArray);
      setGapoptions(2);
    } else if (filterby.includes("Make")) {
      setArray(carBrands);
      setGapoptions(2);
    } else if (filterby.includes("City")) {
      setArray(cities);
      setGapoptions(4);
    } else if (filterby.includes("Model")) {
      setArray(carModels);
      setGapoptions(4);
    }else if (filterby.includes("Budget")) {
      setArray(carPrices);
      setGapoptions(4);
    }
  }, [filterby]);

  // console.log(arraytodisplay);
  return (
    <>
      <div className="options_icons">
        {arraytodisplay.map((val, index) => {
          if (Array.isArray(val)) {
            return (
              <>
                <div className="options_div">
                  {val.map((v, _i) => {
                    return (
                      <>
                        <Link href={`${v.link ? v.link : `#`}`} key={_i} className="icons">
                          {(array.includes(...bodyTypeArray) ||
                            array.includes(...carBrands)) && (
                            <img className="icon_img" src={`/images/icons_imgs/${v.img}`} alt="loading"/>
                          )}
                          <p>{v.name ? v.name : v}</p>
                        </Link>
                      </>
                    );
                  })}
                </div>
              </>
            );
          }
        })}
      </div>
    </>
  );
};

export default memo(Slider);
