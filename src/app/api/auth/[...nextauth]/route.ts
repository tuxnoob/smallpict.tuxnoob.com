import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

const LAMBDA_API = process.env.NEXT_PUBLIC_LAMBDA_API_URL || "https://api.tuxnoob.com/v1";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;

      try {
        const res = await fetch(`${LAMBDA_API}/admin/auth/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email }),
        });

        if (res.ok) {
          const data = await res.json();
          // Attach role from allowlist to user object for JWT callback
          (user as any).role = data.role || "editor";
          return true;
        }

        return "/admin/login?error=AccessDenied";
      } catch (error) {
        console.error("Allowlist verification failed:", error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
});

export { handler as GET, handler as POST };
