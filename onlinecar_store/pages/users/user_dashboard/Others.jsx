import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Link from "next/link";

const Others = () => {
  const router = useRouter();
  const [childcomponent, setChildcomponent] = useState("My_Ads");
  const [links, setLinks] = useState([
    {
      link: "/users/user_dashboard/Others/?My_Ads",
      name: "My Ads",
      hint:'My_Ads'
    },
    {
      link: "/users/user_dashboard/Others/?My_Saved_Ads",
      name: "My Saved Ads",
      hint:'My_Saved_Ads'
    },
    {
      link: "/users/user_dashboard/Others/?My_Rides",
      name: "My Rides",
      hint:'My_Rides'
    },
    {
      link: "/users/user_dashboard/Others/?All_chats",
      name: "Chats",
      hint:'All_chats'
    },
    {
      link: "#",
      name: "My Orders",
    },
    {
      link: "#",
      name: "My Payment",
    },
  ]);

  useEffect(() => {
    const url = router.asPath;
    const pageurl = url.split("?");
    const path = pageurl[pageurl.length - 1];
    // console.log(pageurl)
    setChildcomponent(path);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Childcomponent = dynamic(
    () =>
      import(`@/components/child_components_of_others/user/${childcomponent}`),
    {
      loading: () => <p>Loading...</p>,
    }
  );

  return (
    <>
      <div className="main_others">
        <div className="links_section">
          <div>
            {links.map((v, index) => {
              if (index < 3) {
                return (
                  <>
                    <Link
                      href={v.link}
                      className="links"
                      style={childcomponent == v.hint ? {background:'#283949', color:'white'}:{}}
                    >
                      {v.name}
                    </Link>
                  </>
                );
              }
            })}
          </div>
          <div>
          {links.map((v, index) => {
              if (index > 2) {
                return (
                  <>
                    <Link
                      href={v.link}
                      className="links"
                      style={childcomponent == v.hint ? {background:'#283949', color:'white'}:{}}
                    >
                      {v.name}
                    </Link>
                  </>
                );
              }
            })}
          
          </div>
        </div>

        <div className="child_component">
          {childcomponent && <Childcomponent />}
        </div>
      </div>
    </>
  );
};

export default Others;
