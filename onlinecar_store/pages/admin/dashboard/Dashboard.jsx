import React, { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const Youtube = dynamic(
  () => import("./Youtube/Youtube"),
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
      <nav className="admin_nav" style={{background:'black'}}>
        <div className="nav_links">
          <ul style={{display:'flex', justifyContent:'space-evenly'}} >
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
          
          </ul>
        </div>
      </nav>
      <main>
        {(component == 'utube') && <Youtube/>}
        {(component == 'Incpection') && 'Incpection'}
      </main>
      </div>
    </>
  );
};

export default Dashboard;
