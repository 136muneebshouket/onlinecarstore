import axios from "axios";
import User from "../../../models/user";
import dbConnect from "../../../config/dbConnect";
// import mongoose from "mongoose";

async function google_auth(session) {
  dbConnect();
  // console.log(session)
  if (session) {
    const user = await User.findOne({
      email: session.email,
      // auth_type: "google_auth",
    });
    // console.log(user)
    if(user){   
      console.log("user exist");
      return user._id;
    }
    if (!user) {
      let obj = {
        name: session.name,
        password: session.image,
        email: session.email,
        auth_type:'google_auth'
      };
      try {
        let usercreated = await User.create(obj);
        if (usercreated) {
          console.log("usercreated");
          return usercreated._id;
        }
      } catch (error) {
        console.log(error);
        return;
      }
    }
  }
}

export { google_auth };
