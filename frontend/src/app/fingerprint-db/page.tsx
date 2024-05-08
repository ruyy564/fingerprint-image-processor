import CustomHeader from "@/shared/components/Header";
import MainLayout from "@/shared/components/MainLayout";

import Title from "antd/es/typography/Title";
import { Metadata } from "next";
import { ListFile } from "./components/ListFile";
import { UploadFiles } from "./components/UploadFile";
import { Flex } from "antd";

export const metadata: Metadata = {
  title: "Обработка отпечатков пальцев | Набор отпечатков",
  description: "Обработка отпечатков пальцев",
};

export default function Home() {
  return (
    <>
      <CustomHeader>
        <Title ellipsis>Набор отпечатков пальцев</Title>
      </CustomHeader>
      <MainLayout>
        <Flex vertical gap={30}>
          <Flex gap={30}>
            <UploadFiles />
          </Flex>
          <ListFile />
        </Flex>
      </MainLayout>
    </>
  );
}
