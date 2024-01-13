import React, { useState } from "react";
import Upload_equipment from "./Upload_equipment";

const Tyres = () => {
  const [equip_parent, setEquip_parent] = useState("Tyres");
  const [options, setOptions] = useState(["Front Right Tyre"]);

  return (
    <>
      <div className="properties">
        <div className="head">
          <h3>Tyres</h3>
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

export default Tyres;
