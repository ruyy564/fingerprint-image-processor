"use client";

import { Header } from "antd/es/layout/layout";
import { theme } from "antd";

export default function CustomHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Header
      style={{
        margin: "0 20px",
        padding: 15,
        background: colorBgContainer,
        borderRadius: "0 0 10px 10px",
      }}
    >
      {children}
    </Header>
  );
}
