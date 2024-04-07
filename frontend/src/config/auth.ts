import { AuthOptions, User } from "next-auth";
import YandexProvider from "next-auth/providers/yandex";

export type ExtendedUserType = User & { uid?: string, accessToken?:string };
export const authConfig: AuthOptions = {
  providers: [
    YandexProvider({
      clientId: process.env.YANDEX_CLIENT_ID!,
      clientSecret: process.env.YANDEX_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      (session.user as ExtendedUserType).uid = token.sub;
      (session.user as ExtendedUserType).accessToken = token.access_token as string;
      return session;
    },
    async jwt({ account, token }) {
      if (account) {
        token = Object.assign({}, token, {
          access_token: account.access_token,
        });
      }

      return token;
    },
  },
  session: {
    strategy: "jwt",
    // maxAge: 5 * 60,
  },
};
