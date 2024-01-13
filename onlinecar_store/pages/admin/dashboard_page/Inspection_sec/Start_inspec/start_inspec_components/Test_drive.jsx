import React, { useState } from "react";
import Upload_equipment from "./Upload_equipment";

const Test_drive = () => {
  const [equip_parent, setEquip_parent] = useState("Test_drive");
  const [options, setOptions] = useState(["Engine Pick"]);

  return (
    <>
      <div className="properties">
        <div className="head">
          <h3>Test drive</h3>
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

export default Test_drive;
