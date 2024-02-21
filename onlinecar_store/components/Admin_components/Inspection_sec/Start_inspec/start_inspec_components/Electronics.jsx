import React, { useState } from "react";
import Upload_equipment from "./Upload_equipment";

const Electronics = ({exist,refresh}) => {
  const [equip_parent, setEquip_parent] = useState("Electronics");
  const [options, setOptions] = useState(["Computer Check up","Computer Check up / Malfunction Check","Battery Warning Light","Oil Pressure Low Warning Light","Temperature Warning Light / Gauge","Power Steering Warning Light","Voltage","Terminals Condition","Charging","Alternator Operation","Gauges"]);

  return (
    <>
      <div className="properties">
        <div className="head">
          <h3>Electronics</h3>
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

export default Electronics;
