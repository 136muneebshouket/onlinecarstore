import React, { useState } from "react";
import Upload_equipment from "./Upload_equipment";

const Test_drive = ({ refresh, exist }) => {
  const [equip_parent, setEquip_parent] = useState("Test_drive");
  const [options, setOptions] = useState([
    "Engine Pick",
    "Clutch Operation (While Driving)",
    "Gear Shifting (Manual)",
    "Drive Shaft Noise",
    "Brake Pedal Operation",
    "Front Suspension (While Driving)",
    "Rear Suspension (While Driving)",
    "Steering Operation (While Driving)",
    "Steering Wheel Alignment (While Driving)",
    "AC Operation (While Driving)",
    "Heater Operation (While Driving)",
    "Speedometer (While Driving)",
    "Test Drive Done By",
  ]);

  return (
    <>
      <div className="properties">
        <div className="head">
          <h3>Test drive</h3>
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

export default Test_drive;
