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

const Ad_new_blog = dynamic(
  () => import("@/components/Admin_components/admin_blogs/add_blogs/Ad_new_blog"),
  {
    loading: () => (
      <div className="loder">
        <h2>Loading...</h2>
      </div>
    ),
  }
);
const Mngdcars_cmpnent = dynamic(
  () => import("@/components/Admin_components/Managed_cars/Mngdcars_cmpnent"),
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
  const [navtoggle, setNavtoggle] = useState(false);
  return (
    <>
    {/* <h1>dashboard</h1> */}
    <div className="admin_dashboard">
      <nav className="admin_nav" style={{background:'white'}}>
        <div className="nav_links" style={{overflow:`${navtoggle ? 'visible' : 'hidden'}`}}>
        <span className="hamburger" onClick={()=>{setNavtoggle(!navtoggle)}}>&#x2630;</span>
          <ul className="nav_ul_admin" style={{right:`${navtoggle ? '0' : '-100%'}`}} >
          
            <li >
              <button  className="darkneon" onClick={()=>{setComponent('utube'); setNavtoggle(false) }}>
                U tube
              </button>
            </li>
            <li>
              <button className="darkneon"  onClick={()=>{setComponent('Incpection'); setNavtoggle(false)}}>
              Incpection
              </button>
            </li>
            <li>
              <button className="darkneon"  onClick={()=>{setComponent('Ads_approve'); setNavtoggle(false)}}>
              Ads_Approve
              </button>
            </li>
            <li>
              <button className="darkneon"  onClick={()=>{setComponent('Add new blog'); setNavtoggle(false)}}>
              Add new blog
              </button>
            </li>
            <li>
              <button className="darkneon"  onClick={()=>{setComponent('Mngdcars_cmpnent'); setNavtoggle(false)}}>
              Managed cars
              </button>
            </li>
          
          </ul>
        </div>
      </nav>
      <main>
        {(component == 'utube') && <Youtube/>}
        {(component == 'Incpection') && <Inspection/>}
        {(component == 'Ads_approve') && <Approval/>}
        {(component == 'Add new blog') && <Ad_new_blog/>}
        {(component == 'Mngdcars_cmpnent') && <Mngdcars_cmpnent/>}
      </main>
      </div>
    </>
  );
};

export default Dashboard;
