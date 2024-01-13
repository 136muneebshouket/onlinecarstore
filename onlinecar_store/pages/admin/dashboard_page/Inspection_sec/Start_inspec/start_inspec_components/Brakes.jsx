import React, { useState } from "react";
import Upload_equipment from "./Upload_equipment";

const Brakes = () => {
  const [equip_parent, setEquip_parent] = useState("brakes");
  const [options, setOptions] = useState(["Front Right Disc"]);

  return (
    <>
      <div className="properties">
        <div className="head">
          <h3>Brakes</h3>
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

export default Brakes;
