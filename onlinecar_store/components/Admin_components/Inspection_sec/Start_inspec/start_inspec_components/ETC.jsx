import React, { useState } from "react";
import Upload_equipment from "./Upload_equipment";

const ETC = ({ exist, refresh }) => {
  const [equip_parent, setEquip_parent] = useState("ETC");
  const [options, setOptions] = useState([
    "Engine Oil Level",
    "Engine Oil Leakage",
    "Transmission Oil Leakage",
    "Coolant Leakage",
    "Brake Oil Leakage",
    "Belts (Fan)",
    "Wires (Wiring Harness)",
    "Engine Blow (Manual Check)",
    "Engine Noise",
    "Engine Vibration",
    "Engine Mounts",
    "Pulleys (Adjuster)",
    "Hoses",
    "Exhaust Sound",
    "Radiator",
    "Suction Fan",
    "Starter Operation",
  ]);

  return (
    <>
      <div className="properties">
        <div className="head">
          <h3>Engine/Transmission/Clutch</h3>
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

export default ETC;
