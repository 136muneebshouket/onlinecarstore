import React, { useState } from "react";
import Upload_equipment from "./Upload_equipment";

const Tyres = ({exist,refresh}) => {
  const [equip_parent, setEquip_parent] = useState("Tyres");
  const [options, setOptions] = useState(["Front Right Tyre","Front Right Tyre Brand","Front Left Tyre Brand","Front Left Tyre","Rear Right Tyre Brand","Rear Right Tyre","Rear Left Tyre Brand","Rear Left Tyre","Tyre Size","Rims","Wheel Caps"]);

  return (
    <>
      <div className="properties">
        <div className="head">
          <h3>Tyres</h3>
        </div>

        {/* map here */}
        {options.map((name,index) => {
          return (
            <>
              <div key={index}>
                <Upload_equipment
                  equip_name={name}
                  equip_parent={equip_parent}
                  uploded={exist}
                  refresh={refresh}
                />
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Tyres;
