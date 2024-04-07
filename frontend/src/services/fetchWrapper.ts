import { ExtendedUserType, authConfig } from "@/config/auth";
import { getServerSession } from "next-auth/next";
import { getSession } from "next-auth/react";

export enum FETCH_SIDE {
  CLIENT = "CLIENT",
  SERVER = "SERVER",
}

export const fetchWrapper = async (
  fetchSide = FETCH_SIDE.SERVER,
  path: string,
  init?: RequestInit | undefined
): Promise<Response> => {
  const session = await (fetchSide === FETCH_SIDE.SERVER
    ? getServerSession(authConfig)
    : getSession());

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
