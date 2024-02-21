import React, { useState } from "react";
import Upload_equipment from "./Upload_equipment";

const Interior = ({ refresh, exist }) => {
  const [equip_parent, setEquip_parent] = useState("interior");
  const [options, setOptions] = useState([
    "Steering Wheel Condition",
    "Horn",
    "Lights Lever / Switch (High / Low Beams , Indicators)",
    "Wiper / Washer Lever (Washer, Speeds)",
    "Right Side Mirror",
    "Left Side Mirror",
    "Rear View Mirror Dimmer",
    "Right Seat Adjuster Recliner",
    "Left Seat Adjuster Recliner",
    "Right Seat Adjuster Lear Track",
    "Left Seat Adjuster Lear Track",
    "Right Seat Belt",
    "Left Seat Belt",
    "Rear Seat Belts",
    "Glove Box",
    "Front Right Power Window/Manual Lever",
    "Fornt Left Power Window/Manual Lever",
    "Rear Right Power Window/Manual Lever",
    "Rear Left Power Window/Manual Lever",
    "Window Safety Lock",
    "Interior Lightings",
    "Dash Controls - A/C",
    "Dash Controls - De-Fog",
    "Dash Controls - Hazzard Lights",
    "Dash Controls - Others",
    "Audio/Video",
    "Rear View Camera",
    "Trunk Release Lever / Button",
    "Fuel Cap Release Lever / Button",
    "Bonnet Release Lever / Button",
    "Roof Poshish",
    "Floor Mat",
    "Front Right Seat Poshish",
    "Front Left Seat Poshish",
    "Rear Seat Poshish",
    "Dashboard Condition",
    "Spare Tire",
    "Tools",
    "Jack",
  ]);

  return (
    <>
      <div className="properties">
        <div className="head">
          <h3>Interior</h3>
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

export default Interior;
