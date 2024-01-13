import React, { useState } from "react";
import Upload_equipment from "./Upload_equipment";

const SUS_STR = () => {
  const [equip_parent, setEquip_parent] = useState("susp_steering");
  const [options, setOptions] = useState(["Steering Wheel Play"]);

  return (
    <>
      <div className="properties">
        <div className="head">
          <h3>Suspension and Steering</h3>
        </div>

        {/* map here */}
        {options.map((name) => {
          return (
            <>
              <Upload_equipment equip_name={name} equip_parent={equip_parent} />
            </>
          );
        })}
      </div>
    </>
  );
};

export default SUS_STR;
