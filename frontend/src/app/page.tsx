import CustomHeader from "@/components/Header";
import MainLayout from "@/components/MainLayout";
import { Button } from "antd";
import Title from "antd/es/typography/Title";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Обработка отпечатков пальцев | Сравнение отпечатков пальцев",
  description: "Обработка отпечатков пальцев",
};

export default function FingerprintMatch() {
  return (
    <>
      <CustomHeader>
        <Title>Поиск схожего отпечатка пальцев</Title>
      </CustomHeader>
      <MainLayout>
        <Button type="primary">Button</Button>
      </MainLayout>
    </>
  );
}
