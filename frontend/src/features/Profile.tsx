/* eslint-disable @next/next/no-img-element */
"use client";

import { Avatar, Button, List, Menu, Popover } from "antd";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

const menuItems = [
  {
    key: 4,
    label: <Link href={"/api/auth/signin"}>Вход в систему</Link>,
    icon: (
      <Image
        priority
        src="/yandex.svg"
        height={16}
        width={16}
        alt="Лого яндекса"
      />
    ),
  },
];

const profileItems = [
  {
    key: 5,
    label: "Профиль",
    icon: (
      <Image
        priority
        src="/yandex.svg"
        height={16}
        width={16}
        alt="Лого яндекса"
      />
    ),
  },
];

export const Profile = () => {
  const session = useSession();

  if (!session.data?.user) {
    return (
      <Menu
        items={menuItems}
        style={{
          width: "100%",
        }}
      />
    );
  }

  const hide = () => {
    signOut({
      callbackUrl: "/",
    });
  };

  return (
    <Popover
      content={
        <List
          style={{
            width: "350px",
          }}
        >
          <List.Item style={{ display: "flex", justifyContent: "center" }}>
            <Avatar
              size={64}
              icon={
                <img src={session.data?.user?.image as string} alt="Профиль" />
              }
            />
          </List.Item>

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
      <Menu
        items={profileItems}
        mode="inline"
        selectable={false}
        style={{
          width: "100%",
        }}
      />
    </Popover>
  );
};
