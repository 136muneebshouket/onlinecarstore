import React, { useState } from "react";
import Upload_equipment from "./Upload_equipment";

const Electronics = () => {
  const [equip_parent, setEquip_parent] = useState("Electronics");
  const [options, setOptions] = useState(["Computer Check up"]);

  return (
    <>
      <div className="properties">
        <div className="head">
          <h3>Electronics</h3>
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

export default Electronics;
