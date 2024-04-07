"use client";

import { SessionProvider } from "next-auth/react";
import { FC } from "react";

type IProps = {
  children: React.ReactNode;
};
export const Providers: FC<IProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
