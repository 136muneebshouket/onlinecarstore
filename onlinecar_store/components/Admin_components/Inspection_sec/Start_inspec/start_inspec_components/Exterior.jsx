import React, { useState } from "react";
import Upload_equipment from "./Upload_equipment";

const Exterior = ({ exist, refresh }) => {
  const [equip_parent, setEquip_parent] = useState("Exterior");
  const [options, setOptions] = useState([
    "Trunk Lock",
    "Front Windshield Condition",
    "Rear Windshield Condition",
    "Front Right Door Window",
    "Front Left Door Window",
    "Rear Right Door Window",
    "Rear Left Door Window",
    "Windscreen Wiper",
    "Right Headlight",
    "Left Headlight",
    "Right Taillight",
    "Left Taillight",
  ]);

  return (
    <>
      <div className="properties">
        <div className="head">
          <h3>Exterior</h3>
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

export default Exterior;
