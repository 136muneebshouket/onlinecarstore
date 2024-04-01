import React, { useEffect, useState, useContext } from "react";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import Link from "next/link";
import axios from "axios";
import Context from "@/components/processing_functions/context";

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
  () =>
    import("@/components/Admin_components/admin_blogs/add_blogs/Ad_new_blog"),
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
const Complains = dynamic(
  () => import("@/components/Admin_components/Complains/All_complains"),
  {
    loading: () => (
      <div className="loder">
        <h2>Loading...</h2>
      </div>
    ),
  }
);

const Dashboard = () => {
  const { data: sessionData } = useSession();
  const { message, setMessage } = useContext(Context);
  let userId = sessionData?.user?._id 

  const [component, setComponent] = useState("");
  const [links, setLinks] = useState([
    "utube",
    "Inspection",
    "Ads_approve",
    "blogs",
    "Managed cars",
    "Complains"
  ]);
  const [roles, setRoles] = useState([]);
  const [navtoggle, setNavtoggle] = useState(false);

  useEffect(() => {
    let admin_token = JSON.parse(localStorage.getItem("admin_token"));
    if((roles.length < 1) || !admin_token){
      Authenticate();
    }
  }, [sessionData]);
  // console.log(sessionData?.user?._id);

  async function Authenticate() {
    let admin_token = JSON.parse(localStorage.getItem("admin_token"));
    let obj = {
      user_id: userId,
      admin_token,
    };
    setMessage({ loader: true });
    await axios
      .get(`/api/admin/admin_auths`, { params: obj })
      .then((result) => {
        setMessage({ loader: false });
        setRoles(result.data.payload.role);
        localStorage.setItem("admin_token" , JSON.stringify(result.data.payload.token.resetToken))
        // console.log(result.data)
      })
      .catch((err) => {
        setMessage({ loader: true });
        setMessage({ success: false, msg: err?.response?.data.message });
        console.log(err.response.data.message);
      });
  }
// console.log(roles)
  return (
    <>
      {/* <h1>dashboard</h1> */}
      <div className="admin_dashboard">
        <nav className="admin_nav" style={{ background: "white" }}>
          <div
            className="nav_links"
            style={{ overflow: `${navtoggle ? "visible" : "hidden"}` }}
          >
            <span
              className="hamburger"
              onClick={() => {
                setNavtoggle(!navtoggle);
              }}
            >
              &#x2630;
            </span>
            <ul
              className="nav_ul_admin"
              style={{ right: `${navtoggle ? "0" : "-100%"}` }}
            >
              {links?.map((v) => {
                if(roles.includes(v)){
                  return (
                    <>
                      <li>
                        <button
                          className="darkneon"
                          onClick={() => {
                            setComponent(v);
                            setNavtoggle(false);
                          }}
                        >
                          {v}
                        </button>
                      </li>
                    </>
                  );
                }
              
              })}
              {/* <li>
                <button
                  className="darkneon"
                  onClick={() => {
                    setComponent("utube");
                    setNavtoggle(false);
                  }}
                >
                  U tube
                </button>
              </li>
              <li>
                <button
                  className="darkneon"
                  onClick={() => {
                    setComponent("Inspection");
                    setNavtoggle(false);
                  }}
                >
                  Inspection
                </button>
              </li>
              <li>
                <button
                  className="darkneon"
                  onClick={() => {
                    setComponent("Ads_approve");
                    setNavtoggle(false);
                  }}
                >
                  Ads_Approve
                </button>
              </li>
              <li>
                <button
                  className="darkneon"
                  onClick={() => {
                    setComponent("blogs");
                    setNavtoggle(false);
                  }}
                >
                  blogs
                </button>
              </li>
              <li>
                <button
                  className="darkneon"
                  onClick={() => {
                    setComponent("Managed cars");
                    setNavtoggle(false);
                  }}
                >
                  Managed cars
                </button>
              </li> */}
            </ul>
          </div>
        </nav>
        <main>
          {component == "utube" && <Youtube />}
          {component == "Inspection" && <Inspection />}
          {component == "Ads_approve" && <Approval />}
          {component == "blogs" && <Ad_new_blog />}
          {component == "Managed cars" && <Mngdcars_cmpnent />}
          {component == "Complains" && <Complains />}
        </main>
      </div>
    </>
  );
};

export default Dashboard;
