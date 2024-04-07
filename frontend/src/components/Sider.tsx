"use client";
import { Layout, Menu, theme } from "antd";
import { useState } from "react";
import type { MenuProps } from "antd";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link href={"/"}>Главная</Link>, "10", <PieChartOutlined />),
  getItem(
    <Link href={"/fingerprint-generator-by-params"}>
      Генерация изображенийная
    </Link>,
    "20",
    <PieChartOutlined />
  ),
  getItem(
    <Link href={"/fingerprint-match"}>Поиск схожего отпечатка пальца</Link>,
    "30",
    <PieChartOutlined />
  ),
];

const authItems: MenuItem[] = [
  getItem("Пользователь", "1", <PieChartOutlined />, [
    getItem(<Link href={"/profile"}>Профиль</Link>, "2", <PieChartOutlined />),
    getItem(
      <Link
        href={"#"}
        onClick={() =>
          signOut({
            callbackUrl: "/",
          })
        }
      >
        Выйти
      </Link>,
      "60",
      <PieChartOutlined />
    ),
  ]),
];
const notAuthItems: MenuItem[] = [
  getItem(
    <Link href={"/api/auth/signin"}>Вход</Link>,
    "50",
    <PieChartOutlined />
  ),
];

export const Sider = () => {
  const [collapsed, setCollapsed] = useState(false);
  const session = useSession();

  return (
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="demo-logo-vertical" />
      {session?.data && <Menu theme="dark" mode="inline" items={authItems} />}
      <Menu
        theme="dark"
        defaultSelectedKeys={["10"]}
        mode="inline"
        items={items}
      />
      {!session?.data && (
        <Menu theme="dark" mode="inline" items={notAuthItems} />
      )}
    </Layout.Sider>
  );
};
