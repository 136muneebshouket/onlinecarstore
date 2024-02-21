import React, { useState } from "react";
import Upload_equipment from "./Upload_equipment";

const Brakes = ({refresh,exist}) => {
  const [equip_parent, setEquip_parent] = useState("brakes");
  const [options, setOptions] = useState(["Front Right Disc","Parking / Hand Brake"]);

  return (
    <>
      <div className="properties">
        <div className="head">
          <h3>Brakes</h3>
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

export default Brakes;
