"use client";

import theme from "@/config/theme";
import { ConfigProvider } from "antd";
import { SessionProvider } from "next-auth/react";
import { FC } from "react";
import { SWRConfig } from "swr";

type IProps = {
  children: React.ReactNode;
};
export const Providers: FC<IProps> = ({ children }) => {
  return (
    <ConfigProvider theme={theme}>
      <SWRConfig
        value={{
          // refreshInterval: 3000,

          revalidateIfStale: false,
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
        }}
      >
        <SessionProvider>{children}</SessionProvider>
      </SWRConfig>
    </ConfigProvider>
  );
};
