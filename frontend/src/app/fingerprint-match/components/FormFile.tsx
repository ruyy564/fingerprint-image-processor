"use client";

import { Flex, Form, Typography } from "antd";
import Image from "next/image";

import { SelectFilelist } from "./SelectFilelist";
import { UploadFingerprintImage } from "./UploadFingerprintImage";
import { SubmitButton } from "./SubmitButton";

import { useMatchFingerprint } from "@/entities/fingerprintDB";

export const FormFile = () => {
  const { data, isLoading, trigger } = useMatchFingerprint();

  const onFinish = (values: any) => {
    trigger(values);
  };

  return (
    <Flex vertical gap={15}>
      <Form onFinish={onFinish}>
        <SelectFilelist />
        <UploadFingerprintImage />
        <SubmitButton />
      </Form>

      {data && <Typography.Text>Score: {data.score}</Typography.Text>}
      {data && (
        <Typography.Text>
          Название похожего файла: {data.foundImage}
        </Typography.Text>
      )}
      {data && (
        <Image
          src={`data:image/jpeg;base64,${data.matchesImageBase64
            .replace("b'", "")
            .replace("'", "")}`}
          width={150}
          height={150}
          priority
          alt={"результат сравенения изображений"}
        />
      )}
    </Flex>
  );
};
