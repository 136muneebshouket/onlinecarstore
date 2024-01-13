import React, { useState } from "react";
import Upload_equipment from "./Upload_equipment";

const Exterior = () => {
  const [equip_parent, setEquip_parent] = useState("Exterior");
  const [options, setOptions] = useState(["Trunk Lock"]);

  return (
    <>
      <div className="properties">
        <div className="head">
          <h3>Exterior</h3>
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

export default Exterior;
