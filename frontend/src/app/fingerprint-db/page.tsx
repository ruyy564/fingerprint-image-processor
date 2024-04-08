import CustomHeader from "@/components/Header";
import MainLayout from "@/components/MainLayout";

import Title from "antd/es/typography/Title";
import { Metadata } from "next";
import { ListFile } from "./components/ListFile";
import { UploadFiles } from "./components/UploadFile";
import { Flex, Space } from "antd";

export const metadata: Metadata = {
  title: "Обработка отпечатков пальцев | Набор отпечатков",
  description: "Обработка отпечатков пальцев",
};

export default function Home() {
  return (
    <>
      <CustomHeader>
        <Title>Набор отпечатков пальцев</Title>
      </CustomHeader>
      <MainLayout>
        <Flex vertical gap={30}>
          <Title>Набор файлов</Title>
          <UploadFiles />
          <ListFile />
        </Flex>
      </MainLayout>
    </>
  );
}
