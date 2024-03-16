import React, { useState } from "react";
import dynamic from "next/dynamic";

const Slots = dynamic(() => import("@/components/Admin_components/Inspection_sec/inspection_Slots/Slots"), {
  loading: () => (
    <div className="loder">
      <h2>Loading...</h2>
    </div>
  ),
});
const Inspect_requests = dynamic(() => import("@/components/Admin_components/Inspection_sec/insp_requests/Inspect_requests"), {
  loading: () => (
    <div className="loder">
      <h2>Loading...</h2>
    </div>
  ),
});
const Confirmed_inspec = dynamic(() => import("@/components/Admin_components/Inspection_sec/confirmed_inspections/Confirmed_inspec"), {
  loading: () => (
    <div className="loder">
      <h2>Loading...</h2>
    </div>
  ),
});


const Mngdcars_cmpnent = () => {
  const [sidebar, setSidebar] = useState(true);
  const [component, setComponent] = useState("");
  const [links, setLinks] = useState(["Slots", "Sell Requests",'Sell tasks','Completed requests']);

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
          {component == "Sell Requests" ? <Inspect_requests order_type={'sell-it-for-me'} /> : null}
          {component == "Sell tasks" ? <Confirmed_inspec order_type={'sell-it-for-me'} completed={false}/> : null}
          {component == "Completed requests" ? <Confirmed_inspec order_type={'sell-it-for-me'} completed={true}/> : null}
        
        </div>
      </div>
    </>
  );
};

export default Mngdcars_cmpnent;
