import { ExtendedUserType } from "@/config/auth";
import { getSession } from "next-auth/react";

export const fetchWrapper = async (
  path: string,
  init?: RequestInit | undefined
): Promise<Response> => {
  const session = await getSession();

  return fetch(`${process.env.BASE_URL}${path}`, {
    ...init,
    cache: "reload",
    headers: {
      ...init?.headers,
      Authorization: `OAuth ${
        (session?.user as ExtendedUserType)?.accessToken
      }`,
    },
  });
};
