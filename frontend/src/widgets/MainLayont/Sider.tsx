"use client";
import { Flex, Layout, Menu } from "antd";
import { useState } from "react";
import {
  CloudServerOutlined,
  FileImageOutlined,
  FileZipOutlined,
  HomeOutlined,
  SearchOutlined,
  SlidersOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";

import { Profile } from "@/features/Profile";
import { useWindowSize } from "@/shared/hooks/useWindowSize";

const keysMenu = {
  "/": "1",
  "/fingerprint-match": "2",
  "/fingerprint-generator-by-params": "3",
  "/fingerprint-generator-by-vae": "4",
  "/fingerprint-fit-vae": "5",
  "/fingerprint-db": "6",
};

export const Sider = () => {
  const session = useSession();
  const pathname = usePathname();

  const { windowWidth } = useWindowSize();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      key: 1,
      label: <Link href={"/"}>Главная</Link>,
      icon: <HomeOutlined />,
    },
  ];

  if (session.data?.user) {
    menuItems.push(
      ...[
        {
          key: 2,
          label: (
            <Link href={"/fingerprint-match"}>
              Поиск схожего отпечатка пальца
            </Link>
          ),
          icon: <SearchOutlined />,
        },
        {
          key: 3,
          label: (
            <Link href={"/fingerprint-generator-by-params"}>
              Генерация изображений
            </Link>
          ),
          icon: <FileZipOutlined />,
        },
        {
          key: 4,
          label: (
            <Link href={"/fingerprint-generator-by-vae"}>
              Генерация изображений - VAE
            </Link>
          ),
          icon: <FileImageOutlined />,
        },
        {
          key: 5,
          label: <Link href={"/fingerprint-fit-vae"}>Обучение VAE</Link>,
          icon: <SlidersOutlined />,
        },
        {
          key: 6,
          label: <Link href={"/fingerprint-db"}>Набор отпечатков пальцев</Link>,
          icon: <CloudServerOutlined />,
        },
      ]
    );
  }

  const selectedKey = keysMenu[pathname as keyof typeof keysMenu];

  return (
    <Layout.Sider
      collapsible={windowWidth > 1000}
      collapsed={windowWidth > 1000 ? collapsed : true}
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
