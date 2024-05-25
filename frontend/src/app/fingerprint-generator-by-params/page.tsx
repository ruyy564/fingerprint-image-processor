import CustomHeader from "@/shared/components/Header";
import MainLayout from "@/shared/components/MainLayout";
import Title from "antd/es/typography/Title";
import { Metadata } from "next";
import { FormFile } from "./components/FormFile";

export const metadata: Metadata = {
  title: "Обработка отпечатков пальцев | Аугментация данных",
  description: "Обработка отпечатков пальцев",
};

export default function FingerprintGeneratorByParams() {
  return (
    <>
      <CustomHeader>
        <Title ellipsis>Аугментация данных</Title>
      </CustomHeader>
      <MainLayout>
        <FormFile />
      </MainLayout>
    </>
  );
}
