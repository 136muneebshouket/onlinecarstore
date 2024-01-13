import React, { useState } from "react";
import Upload_equipment from "./Upload_equipment";

const ETC = () => {
  const [equip_parent, setEquip_parent] = useState("ETC");
  const [options, setOptions] = useState(["Engine Oil Level"]);

  return (
    <>
      <div className="properties">
        <div className="head">
          <h3>Engine/Transmission/Clutch</h3>
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

export default ETC;
