"use client";

import { theme } from "antd";
import { Content } from "antd/es/layout/layout";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Content
      style={{
        margin: "0 20px",
        padding: 15,
        height: "100%",
        background: colorBgContainer,
        borderRadius: "10px 10px 0 0",
        overflow:'auto'
      }}
    >
      {children}
    </Content>
  );
}
