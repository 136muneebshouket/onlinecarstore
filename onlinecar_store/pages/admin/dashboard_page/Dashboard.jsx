import React, { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const Youtube = dynamic(
  () => import("@/components/Admin_components/utube_sec/Youtube"),
  {
    loading: () => (
      <div className="loder">
        <h2>Loading...</h2>
      </div>
    ),
  }
);
const Approval = dynamic(
  () => import("@/components/Admin_components/Ads_approval_sec/Approval"),
  {
    loading: () => (
      <div className="loder">
        <h2>Loading...</h2>
      </div>
    ),
  }
);
const Inspection = dynamic(
  () => import("@/components/Admin_components/Inspection_sec/Inspection_page"),
  {
    loading: () => (
      <div className="loder">
        <h2>Loading...</h2>
      </div>
    ),
  }
);

const Dashboard = () => {
    
  const [component, setComponent] = useState('utube');
  return (
    <>
    {/* <h1>dashboard</h1> */}
    <div className="admin_dashboard">
      <nav className="admin_nav" style={{background:'white'}}>
        <div className="nav_links">
          <ul style={{display:'flex', justifyContent:'space-evenly',margin:'0',padding:'0'}} >
            <li >
              <button  className="darkneon" onClick={()=>{setComponent('utube')}}>
                U tube
              </button>
            </li>
            <li>
              <button className="darkneon"  onClick={()=>{setComponent('Incpection')}}>
              Incpection
              </button>
            </li>
            <li>
              <button className="darkneon"  onClick={()=>{setComponent('Ads_approve')}}>
              Ads_Approve
              </button>
            </li>
          
          </ul>
        </div>
      </nav>
      <main>
        {(component == 'utube') && <Youtube/>}
        {(component == 'Incpection') && <Inspection/>}
        {(component == 'Ads_approve') && <Approval/>}
      </main>
      </div>
    </>
  );
};

export default Dashboard;
