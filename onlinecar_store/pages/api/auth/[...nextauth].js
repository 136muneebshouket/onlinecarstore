import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


import User from '../../../models/user'
import bcrypt from "bcryptjs";
import dbConnect from "../../../config/dbConnect";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        dbConnect();

        const { email, password } = credentials;

        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("Invalid Email or Password");
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
          throw new Error("Invalid Email or Password");
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
      console.log(session)
      return session;
    },
  },
  pages: {
    signIn: "/Authentication/Login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});