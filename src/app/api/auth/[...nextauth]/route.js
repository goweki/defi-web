import NextAuth from "next-auth";

const options = {
  providers: [],
  // pages:{}
};

const handler = NextAuth({});

export { handler as GET, handler as POST };
