import { ExtendedUserType, authConfig } from "@/config/auth";
import { getServerSession } from "next-auth/next";

export const fetchWrapper = async (
  path: string,
  init?: RequestInit | undefined
): Promise<Response> => {
  // const session = await getServerSession(authConfig);
  console.log(`${process.env.BASE_URL}${path}`,process.env.BASE_URL)
  return fetch(`${process.env.BASE_URL}${path}`, {
    ...init,
    cache: "no-cache",
    // headers: {
    //   Authorization: `OAuth ${
    //     (session?.user as ExtendedUserType)?.accessToken
    //   }`,
    // },
  });
};
