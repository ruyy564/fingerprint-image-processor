"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useEffect } from "react";

type NavItem = {
  label: string;
  href: string;
};

type IProps = {
  navItems: NavItem[];
};

export const Navigation: FC<IProps> = (props) => {
  const { navItems } = props;

  const session = useSession();
  const pathname = usePathname();

  return (
    <nav>
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={isActive ? "active-link" : ""}
          >
            {item.label}
          </Link>
        );
      })}
      {session?.data && (
        <>
          <Link
            href={"/profile"}
            className={pathname === "/profile" ? "active-link" : ""}
          >
            Профиль
          </Link>
          <Link
            href={"#"}
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
          >
            Выйти
          </Link>
        </>
      )}
      {!session?.data && <Link href={"/api/auth/signin"}>Вход</Link>}
    </nav>
  );
};
