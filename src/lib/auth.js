import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/controllers/authController";
import dbConnect from "@/lib/mongoDb";
import User from "@/models/userSchema";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        identifier: { label: "Email Or Username", type: "Text" },
        password: { label: "Password", type: "Text" },
      },
      async authorize(credentials) {
        try {
          const user = await loginUser(credentials);
          if (!user) throw new Error("No user found");
          return user;
        } catch (error) {
          console.log("Invalid Credentials", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.provider = user.provider;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.provider = token.provider;
      return session;
    },
    async signIn({ user, account }) {
      if (account.provider === "google") {
        try {
          await dbConnect();
          await User.findOneAndUpdate(
            { email: user.email },
            { $set: { provider: "google" } }
          );
        } catch (error) {
          console.log("Error Setting Google Provider", error);
          return false;
        }
      }
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
