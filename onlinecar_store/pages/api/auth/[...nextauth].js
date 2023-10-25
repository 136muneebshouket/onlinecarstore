import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { google_auth } from "./auth_func";

import User from "../../../models/user";
import bcrypt from "bcrypt";

import dbConnect from "../../../config/dbConnect";

let google_auth_check = false;
let user_google_id = undefined;
export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      async authorize(credentials, req) {
        dbConnect();

        const { email, password } = credentials;

        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("Invalid Email ");
        }
        // console.log(user.password,password)
        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
          throw new Error("Invalid  Password");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);

      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;

      // delete password from session
      delete session?.user?.password;
      
      if (google_auth_check == false) {
        if(session?.user?.id){
          let userid = await google_auth(session?.user);
          if (userid) { 
            for(var i=0; i<=3; i++){
              user_google_id = userid;
            } 
            google_auth_check = true;
          }
        }
      }
      delete session?.user?.id;
      
      if(user_google_id != undefined){
        session.user['_id'] = await user_google_id;
      }
     

      // console.log(session)
      return session;
    },
  },
  pages: {
    signIn: "/authentication/Login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
