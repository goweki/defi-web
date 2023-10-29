import NextAuth from "next-auth";
import { providers } from "./options";

const postHandler = NextAuth({
  providers: providers,
});

const getHandler = NextAuth({
  providers: providers,
});

export { postHandler as POST, getHandler as GET };
