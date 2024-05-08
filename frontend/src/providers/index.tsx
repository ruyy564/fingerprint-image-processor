"use client";

import { ConfigProvider } from "antd";
import { SessionProvider } from "next-auth/react";
import { FC } from "react";
import { SWRConfig } from "swr";

import theme from "@/shared/config/theme";

import StyledComponentsRegistry from "./AntdRegistry";

type IProps = {
  children: React.ReactNode;
};
export const Providers: FC<IProps> = ({ children }) => {
  return (
    <StyledComponentsRegistry>
      <ConfigProvider theme={theme}>
        <SWRConfig
          value={{
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
          }}
        >
          <SessionProvider>{children}</SessionProvider>
        </SWRConfig>
      </ConfigProvider>
    </StyledComponentsRegistry>
  );
};
