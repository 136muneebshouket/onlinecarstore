import React, { useState } from "react";
import Upload_equipment from "./Upload_equipment";

const SUS_STR = ({ exist, refresh }) => {
  const [equip_parent, setEquip_parent] = useState("susp_steering");
  const [options, setOptions] = useState([
    "Steering Wheel Play",
    "Right Ball Joint",
    "Left Ball Joint",
    "Right Z Links",
    "Left Z Links",
    "Right Tie Rod End",
    "Left Tie Rod End",
    "Front Right Boots",
    "Front Left Boots",
    "Front Right Bushes",
    "Front Left Bushes",
    "Front Right Shock",
    "Front Left Shock",
    "Rear Right Bushes",
    "Rear Left Bushes",
    "Rear Right Shock",
    "Rear Left Shock",
  ]);

  return (
    <>
      <div className="properties">
        <div className="head">
          <h3>Suspension and Steering</h3>
        </div>

        {/* map here */}
        {options.map((name,index) => {
          return (
            <>
              <div key={index}>
                <Upload_equipment
                  equip_name={name}
                  equip_parent={equip_parent}
                  uploded={exist}
                  refresh={refresh}
                />
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default SUS_STR;
