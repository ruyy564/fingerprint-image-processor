import { Flex, Layout } from "antd";

import { Sider } from "./Sider";

export function Mainlayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Layout hasSider style={{ minHeight: "100vh" }}>
      <Sider />
      <Layout style={{ minHeight: "100vh" }}>
        <Flex vertical gap={20} style={{ minHeight: "100vh" }}>
          {children}
        </Flex>
      </Layout>
    </Layout>
  );
}
