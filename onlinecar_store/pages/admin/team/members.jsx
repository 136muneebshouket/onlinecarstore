import React, { useState, useContext } from "react";
import axios from "axios";
import Context from "@/components/processing_functions/context";
import ALL_members from "@/components/Admin_components/team/get_members/ALL_members";

const members = () => {
  const { message, setMessage } = useContext(Context);
  // setMessage({ success: false, msg: err?.response?.data.message });
  // setMessage({ loader: false });

  const [email, setEmail] = useState("");
  const [member, setMember] = useState();

  let obj = {
    user_id: "",
    role: [],
  };

  const [adduser, setAdduser] = useState(obj);

  async function search_member() {
    setMessage({ loader: true });
    let admin_token = JSON.parse(localStorage.getItem("admin_token"));
    await axios
      .get("/api/admin/team/search_member", { params: { email, admin_token } })
      .then((result) => {
        setMessage({ loader: false });
        setMember(result.data.member);
        setAdduser({ ...adduser, user_id : result.data.member._id  });
      })
      .catch((err) => {
        setMessage({ loader: false });
        setMessage({ success: false, msg: err?.response?.data.message });
      });
  }

  function handler(e) {
    if (adduser.role.includes(e.target.value)) {
      let newroles = adduser.role.filter((v, i) => v != e.target.value);
      setAdduser({ ...adduser, role: newroles });
      return;
    }
    setAdduser({ ...adduser, role: [...adduser.role, e.target.value] });

  }

  async function add_member() {
    setAdduser({ ...adduser, user_id : member._id  });
    setMessage({ loader: true });
    let admin_token = JSON.parse(localStorage.getItem("admin_token"));
    
    // console.log(member)
    await axios
      .post("/api/admin/team/ad_member", { adduser, admin_token })
      .then((result) => {
        setMessage({ loader: false });
        setMessage({ success: true, msg: result.data.message });
        setAdduser(obj)
        setEmail('')
        setMember()
      })
      .catch((err) => {
        setMessage({ loader: false });
        setMessage({ success: false, msg: err?.response?.data.message });
      });
  }
    // console.log(adduser);

  return (
    <>
      <div className="team_members">
        <h2>Add Members</h2>

        <div className="add_members">
          <div className="search">
            <input
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              placeholder="Add new members type email"
            />
            <button onClick={search_member}>
              <i className="bx bx-search-alt-2"></i>
            </button>
          </div>
          <div className="members">
            {member ? (
              <>
                <div className="card">
                    {member?.avatar ? <img src={member?.avatar} alt="avatar" /> : null}
                  
                  <div className="">
                    <p>{member?.name}</p>
                    <p>{member?.email}</p>
                  </div>
                </div>
                <div className="add_btn">
                  <ul style={{ listStyle: "none" }}>
                    <li>
                      <span>Youtube</span>{" "}
                      <input
                        type="checkbox"
                        onChange={handler}
                        value={"utube"}
                      />
                    </li>
                    <li>
                      <span>Inspection</span>{" "}
                      <input
                        type="checkbox"
                        onChange={handler}
                        value={"Inspection"}
                      />
                    </li>
                    <li>
                      <span>Ads approve</span>{" "}
                      <input
                        type="checkbox"
                        onChange={handler}
                        value={"Ads_approve"}
                      />
                    </li>
                    <li>
                      <span>Managed cars</span>{" "}
                      <input
                        type="checkbox"
                        onChange={handler}
                        value={"Managed cars"}
                      />
                    </li>
                    <li>
                      <span>Inspection officer</span>{" "}
                      <input
                        type="checkbox"
                        onChange={handler}
                        value={"Inspection officer"}
                      />
                    </li>
                    <li>
                      <span>blogs</span>{" "}
                      <input
                        type="checkbox"
                        onChange={handler}
                        value={"blogs"}
                      />
                    </li>
                  </ul>
                  <button onClick={add_member}>Ad user</button>
                </div>
              </>
            ) : null}
          </div>
        </div>

        <ALL_members />
      </div>
    </>
  );
};

export default members;
