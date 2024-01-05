import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Link from "next/link";


const Others = () => {
    const router = useRouter()
  const [childcomponent, setChildcomponent] = useState('My_Ads')

  useEffect(()=>{
    const url= router.asPath;
    const pageurl= url.split('?');
    const path = pageurl[pageurl.length - 1]
    // console.log(pageurl)
    setChildcomponent(path)
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <Link href='/users/user_dashboard/Others/?My_Rides' className="links">My Rides</Link>
          <Link href='#' className="links">My Alerts</Link></div>
         <div>
         {/* <Link href='#' className="links">My Messages</Link> */}
          <Link href='#' className="links">My Orders</Link>
          <Link href='#' className="links">My Payment</Link>
         </div>
         
        </div>

        <div className="child_component">
         {childcomponent &&   <Childcomponent/>}
        </div>

      </div>
    </>
  );
};

export default Others;
