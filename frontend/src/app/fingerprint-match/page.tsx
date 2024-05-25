import Title from "antd/es/typography/Title";
import { Metadata } from "next";

import CustomHeader from "@/shared/components/Header";
import MainLayout from "@/shared/components/MainLayout";
import { FormFile } from "./components/FormFile";

export const metadata: Metadata = {
  title: "Обработка отпечатков пальцев | Сравнение отпечатков пальцев",
  description: "Обработка отпечатков пальцев",
};

export default function FingerprintMatch() {
  return (
    <>
      <CustomHeader>
        <Title ellipsis>Поиска наиболее похожего изображения</Title>
      </CustomHeader>
      <MainLayout>
        <FormFile />
      </MainLayout>
    </>
  );
}
