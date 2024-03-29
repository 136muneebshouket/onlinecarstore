import React, { useState } from "react";
import dynamic from "next/dynamic";

const Slots = dynamic(() => import("./inspection_Slots/Slots"), {
  loading: () => (
    <div className="loder">
      <h2>Loading...</h2>
    </div>
  ),
});
const Inspect_requests = dynamic(() => import("./insp_requests/Inspect_requests"), {
  loading: () => (
    <div className="loder">
      <h2>Loading...</h2>
    </div>
  ),
});
const Confirmed_inspec = dynamic(() => import("./confirmed_inspections/Confirmed_inspec"), {
  loading: () => (
    <div className="loder">
      <h2>Loading...</h2>
    </div>
  ),
});
const Ad_caroptions = dynamic(() => import("../ad_options/Ad_caroptions/Ad_car_option"), {
  loading: () => (
    <div className="loder">
      <h2>Loading...</h2>
    </div>
  ),
});

const Inspection_page = () => {
  const [sidebar, setSidebar] = useState(true);
  const [component, setComponent] = useState("");
  const [links, setLinks] = useState(["Slots", "Inspections Requests",'Inspections tasks','Completed inspections','Ad Cars Options']);

  // console.log(component)
  return (
    <>
      <div className="sidebar_btn_div">
        <button
          onClick={() => {
            setSidebar(!sidebar);
          }}
          style={{ float: "right" }}
          className="sidebar_btn"
        >
          <span>&#10563;</span>
        </button>
      </div>
      <div className="admin_inspection">
        <div
          style={{ width: `${sidebar ? "300px" : "0px"}` }}
          className="sidebar"
        >
          {links.map((v) => {
            return (
              <>
                <div
                  className="single_ad"
                  onClick={() => {
                    setComponent(v);
                  }}
                >
                  <p className="ad_heading">{v}</p>
                </div>
              </>
            );
          })}
        </div>

        <div className="main_inspection">
          {component == "Slots" ? <Slots /> : null}
          {component == "Inspections Requests" ? <Inspect_requests order_type={'Inspection'} /> : null}
          {component == "Inspections tasks" ? <Confirmed_inspec order_type={'Inspection'} completed={false}/> : null}
          {component == "Completed inspections" ? <Confirmed_inspec order_type={'Inspection'} completed={true}/> : null}
          {component == "Ad Cars Options" ? <Ad_caroptions /> : null}
        </div>
      </div>
    </>
  );
};

export default Inspection_page;
