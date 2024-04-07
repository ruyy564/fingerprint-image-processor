/* eslint-disable @next/next/no-img-element */
import { authConfig } from "@/config/auth";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";

export const metadata: Metadata = {
  title: "Обработка отпечатков пальцев | Профиль",
  description: "Обработка отпечатков пальцев",
};

export default async function Profile() {
  const session = await getServerSession(authConfig);

  return (
    <>
      <h1>Профиль </h1>
      <div>
        <div>
          Аватар:{" "}
          {session?.user?.image && (
            <img
              src={session?.user?.image}
              alt="аватар"
              width={100}
              height={100}
            />
          )}
        </div>

        {session?.user?.name && <p>Имя: {session?.user?.name}</p>}
        {session?.user?.email && <p>Email: {session?.user?.email}</p>}
      </div>
    </>
  );
}
