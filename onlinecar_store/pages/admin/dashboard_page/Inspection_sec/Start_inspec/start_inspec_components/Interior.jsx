import React, { useState } from "react";
import Upload_equipment from "./Upload_equipment";

const Interior = () => {
  const [equip_parent, setEquip_parent] = useState("interior");
  const [options, setOptions] = useState(["Steering Wheel Condition"]);

  return (
    <>
      <div className="properties">
        <div className="head">
          <h3>Interior</h3>
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

export default Interior;

