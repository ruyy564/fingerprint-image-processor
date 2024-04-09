import CustomHeader from "@/components/Header";
import MainLayout from "@/components/MainLayout";
import { Button } from "antd";
import Title from "antd/es/typography/Title";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Обработка отпечатков пальцев | Генерация изображений отпечатков пальцев по параметрам",
  description: "Обработка отпечатков пальцев",
};

export default function FingerprintGeneratorByParams() {
  return (
    <>
      <CustomHeader>
        <Title ellipsis>
          Генерация изображений отпечатков пальцев по параметрам
        </Title>
      </CustomHeader>
      <MainLayout>
        <Button type="primary">Button</Button>
      </MainLayout>
    </>
  );
}
