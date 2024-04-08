"use client";

import theme from "@/config/theme";
import { ConfigProvider } from "antd";
import { SessionProvider } from "next-auth/react";
import { FC } from "react";

type IProps = {
  children: React.ReactNode;
};
export const Providers: FC<IProps> = ({ children }) => {
  return (
    <ConfigProvider theme={theme}>
      <SessionProvider>{children}</SessionProvider>
    </ConfigProvider>
  );
};
