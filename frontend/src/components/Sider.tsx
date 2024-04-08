"use client";
import { Flex, Layout, Menu } from "antd";
import { useState } from "react";
import {
  CloudServerOutlined,
  FileZipOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { Profile } from "./Profile";

const menuItems = [
  {
    key: 1,
    label: <Link href={"/"}>Поиск схожего отпечатка пальца</Link>,
    icon: <SearchOutlined />,
  },
  {
    key: 2,
    label: (
      <Link href={"/fingerprint-generator-by-params"}>
        Генерация изображенийная
      </Link>
    ),
    icon: <FileZipOutlined />,
  },
  {
    key: 3,
    label: <Link href={"/fingerprint-db"}>Наборы файлов</Link>,
    icon: <CloudServerOutlined />,
  },
];

export const Sider = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      theme="light"
      width={320}
    >
      <Flex
        gap="middle"
        vertical
        align="center"
        style={{ padding: "10px 0", width: "100%" }}
      >
        <Profile />
        <Menu
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={menuItems}
          style={{ width: "100%" }}
        />
      </Flex>
    </Layout.Sider>
  );
};
