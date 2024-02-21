import React, { useState } from "react";
import Upload_equipment from "./Upload_equipment";

const Accident_checklist = ({exist , refresh}) => {
  
  const [equip_parent, setEquip_parent] = useState("accident_checklist");
  const [options, setOptions] = useState(["Radiator Core Support","Right Strut Tower Apron","Left Strut Tower Apron","Right Front Rail","Left Front Rail","Cowl Panel Firewall","Right A Pillar","Left A Pillar","Right B Pillar","Left B Pillar","Right C Pillar","Left C Pillar","Boot Floor","Boot Lock Pillar","Rear Sub Frame","Front Sub Frame"]);
// console.log(exist)
  return (
    <>
      <div className="properties">
        <div className="head">
          <h3>Body frame</h3>
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

export default Accident_checklist;
