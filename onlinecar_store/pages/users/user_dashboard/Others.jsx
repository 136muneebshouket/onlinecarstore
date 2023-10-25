import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";


const Others = () => {

  const [childcomponent, setChildcomponent] = useState('')

  useEffect(()=>{
    // const path= router.pathname;
    const pageurl= window.location.href.split('?');
    const path = pageurl[pageurl.length - 1]
    console.log(path)
    setChildcomponent(path)
  },[])

  const Childcomponent = dynamic(
    () => import(`@/components/child_components_of_others/${childcomponent}`),
    {
      loading: () => <p>Loading...</p>,
    }
  );


  return (
    <>
      <div className="main_others">
        <div className="links_section">
          <div> <Link href='/users/user_dashboard/Others/?My_Ads' className="links">My Ads</Link>
          <Link href='/users/user_dashboard/Others/?My_Saved_Ads' className="links">My Saved Ads</Link>
          <Link href='#' className="links">My Alerts</Link></div>
         <div>
         <Link href='#' className="links">My Messages</Link>
          <Link href='#' className="links">My Orders</Link>
          <Link href='#' className="links">My Payment</Link>
         </div>
         
        </div>

        <div className="child_component">
        { <Childcomponent/>}
        </div>

      </div>
    </>
  );
};

export default Others;
