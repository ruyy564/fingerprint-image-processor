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
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";

const keysMenu = {
  "/": "1",
  "/fingerprint-generator-by-params": "2",
  "/fingerprint-db": "3",
};

export const Sider = () => {
  const session = useSession();
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);

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
          Генерация изображений
        </Link>
      ),
      icon: <FileZipOutlined />,
    },
  ];

  if (session.data?.user) {
    menuItems.push({
      key: 3,
      label: <Link href={"/fingerprint-db"}>Набор отпечатков пальцев</Link>,
      icon: <CloudServerOutlined />,
    });
  }

  const selectedKey = keysMenu[pathname as keyof typeof keysMenu];

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
        style={{ padding: "10px 0", width: "100%", height: "100%" }}
      >
        <Link href={"/"}>
          <Image priority src="/logo.svg" height={64} width={64} alt="Лого" />
        </Link>
        <Flex
          gap="middle"
          vertical
          align="center"
          justify="space-between"
          style={{ padding: "10px 0", width: "100%", height: "100%" }}
        >
          <Menu
            selectedKeys={[selectedKey]}
            mode="inline"
            items={menuItems}
            style={{ width: "100%" }}
          />
          <Profile />
        </Flex>
      </Flex>
    </Layout.Sider>
  );
};
