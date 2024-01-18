import React, { useState } from "react";
import Upload_equipment from "./Upload_equipment";

const Body_frame = () => {
  const [equip_parent, setEquip_parent] = useState("body_frame");
  const [options, setOptions] = useState(["Radiator Core Support","Right Strut Tower Apron"]);

  return (
    <>
      <div className="properties">
        <div className="head">
          <h3>Body frame</h3>
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

export default Body_frame;
