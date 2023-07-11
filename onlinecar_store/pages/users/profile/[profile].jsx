import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

const profile = () => {
 






  return (
    <>
      <div className="main_container">
        <div className="profile_div">
          <div className="profile_avatar">
            <div className="profile_tag">
              <h2 style={{ margin: "0px" }}>My Profile</h2>
              <div className="profile_links">
                <Link href="#">Back to Dashboard</Link>{" "}
                <Link href="#">Edit Forum Settings</Link>
              </div>
            </div>
            <div className="avatar_section">
              <div>
              <Image
                src="/images/default-profile-image-.gif"
                className="profile_image"
                width={200}
                height={200}
              />
              {/* <button>Upload Image</button> */}
              </div>
              <span className="profile_warning">
                Picture can't be changed for unverified emails. Verify your
                email first
              </span>
            </div>
          </div>
          < hr />
          <div className="profile_form">
            <center>
              <form action="" style={{maxWidth:'590px'}}>
                <div className="inputs">
                  <label htmlFor="">Full Name</label>
                  <input type="text" />
                </div>
                <div className="inputs">
                  <label htmlFor="">Gender</label>
                  <select id="gender" name="gender" className="option">
                    <option value="" selected>
                      Select your Gender
                    </option>

                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="inputs">
                  <label htmlFor="">Date of Birth</label>
                  <input style={{textTransform:'uppercase'}} type="Date" />
                </div>
                <div className="inputs">
                  <label htmlFor="">Country</label>
                  <input type="text" />
                </div>
                <div className="inputs">
                  <label htmlFor="">Username</label>
                  <input type="text" />
                </div>
                <div className="inputs">
                  <label htmlFor="">Email</label>
                  <input type="text" />
                </div>
                <div className="inputs">
                  <label htmlFor="">Mobile Number</label>
                  <button className="btn">Add Number</button>
                </div>
              </form>
            </center>
          </div>
          < hr />
           <div className="savechanges">
           
            <button>
              Save changes
            </button>
           
           
           </div>
        </div>
      </div>
    </>
  );
};

export default profile;
