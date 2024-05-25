import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import { Metadata } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth/next";

import CustomHeader from "@/shared/components/Header";
import MainLayout from "@/shared/components/MainLayout";

import { authConfig } from "@/shared/config/auth";

export const metadata: Metadata = {
  title: "Обработка отпечатков пальцев | Главная",
  description: "Обработка отпечатков пальцев",
};

export default async function FingerprintMatch() {
  const session = await getServerSession(authConfig);

  return (
    <>
      <CustomHeader>
        <Title ellipsis>Главная страница</Title>
      </CustomHeader>
      <MainLayout>
        <Paragraph>
          Добро пожаловать в наше приложение! Здесь вы можете легко и быстро
          обработать изображения отпечатков пальцев, сравнить их и даже
          сгенерировать новые.
        </Paragraph>
        <Title level={4}>Функции приложения:</Title>
        <Paragraph>
          <ol>
            <li>
              Обучение генаратора: обучите генератор изображений на собственной
              выборке.
            </li>
            <li>
              Сравнение отпечатков: сравните два отпечатка пальца, чтобы
              определить их сходство.
            </li>
            <li>
              Генерация отпечатков: сгенерируйте новые отпечатки пальцев для
              использования в целях тестирования или обучения.
            </li>
          </ol>
        </Paragraph>
        <Paragraph>Начните работу с приложением прямо сейчас!</Paragraph>
        {!session?.user && (
          <Link href={"/api/auth/signin"}>Авторизаваться в системе</Link>
        )}
      </MainLayout>
    </>
  );
}
