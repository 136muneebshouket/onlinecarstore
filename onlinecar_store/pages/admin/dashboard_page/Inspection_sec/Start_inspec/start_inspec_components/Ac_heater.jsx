import React, { useState } from "react";
import Upload_equipment from "./Upload_equipment";

const Ac_heater = () => {
  const [equip_parent, setEquip_parent] = useState("Ac_heater");
  const [options, setOptions] = useState(["AC Fitted"]);

  return (
    <>
      <div className="properties">
        <div className="head">
          <h3>Ac/Heater</h3>
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

export default Ac_heater;
