/* eslint-disable @next/next/no-img-element */
"use client";

import { LoginOutlined } from "@ant-design/icons";
import { Avatar, Button, List, Menu, Popover, Skeleton } from "antd";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const menuItems = [
  {
    key: 4,
    label: <Link href={"/api/auth/signin"}>Вход</Link>,
    icon: <LoginOutlined />,
  },
];

export const Profile = () => {
  const session = useSession();

  if (session.status === "loading") {
    return <Skeleton.Avatar active size={64} shape={"circle"} />;
  }

  if (!session.data?.user) {
    return <Menu mode="inline" items={menuItems} />;
  }

  const hide = () => {
    signOut({
      callbackUrl: "/",
    });
  };

  return (
    <Popover
      content={
        <List>
          <List.Item>ФИО: {session.data?.user?.name}</List.Item>
          <List.Item>Email: {session.data?.user?.email}</List.Item>
          <List.Item>
            <Button danger onClick={hide} style={{ width: "100%" }}>
              Выйти
            </Button>
          </List.Item>
        </List>
      }
      title="Профиль"
      trigger="click"
      placement="rightBottom"
    >
      <Avatar
        size={64}
        icon={<img src={session.data?.user?.image as string} alt="Профиль" />}
        style={{
          cursor: "pointer",
        }}
      />
    </Popover>
  );
};
