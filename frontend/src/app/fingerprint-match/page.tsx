import { Skeleton } from "antd";
import Title from "antd/es/typography/Title";
import { Metadata } from "next";
import Image from "next/image";

import CustomHeader from "@/shared/components/Header";
import MainLayout from "@/shared/components/MainLayout";

export const metadata: Metadata = {
  title: "Обработка отпечатков пальцев | Сравнение отпечатков пальцев",
  description: "Обработка отпечатков пальцев",
};

export default function FingerprintMatch() {
  const data = "";

  return (
    <>
      <CustomHeader>
        <Title ellipsis>Поиск схожего отпечатка пальцев</Title>
      </CustomHeader>
      <MainLayout>
        <Image
          src={`data:image/jpeg;base64,${data}`}
          width={60}
          height={60}
          priority
          alt={"результат сравенения изображений"}
        />
        <Skeleton />
      </MainLayout>
    </>
  );
}
