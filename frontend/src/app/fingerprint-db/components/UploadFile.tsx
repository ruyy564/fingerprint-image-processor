"use client";

import { uploadFileFingerprint } from "@/services/fingerprintService";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Flex, GetProp, Upload, UploadFile, UploadProps } from "antd";

import { useState } from "react";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export const UploadFiles = () => {
  const [file, setFile] = useState<UploadFile | null>(null);

  const { trigger } = useSWRMutation(
    `/upload-file`,
    () => {
      const formData = new FormData();
      formData.append("file", file as FileType);

      uploadFileFingerprint(formData);
    },
    {
      onSuccess: () => {
        mutate("/list-fingerprints");
      },
    }
  );

  const handleUpload = async () => {
    trigger();
  };
  return (
    <Flex gap={15}>
      <Upload
        beforeUpload={(file) => {
          setFile(file);
        }}
        onRemove={(file) => {
          setFile(null);
        }}
      >
        <Button icon={<UploadOutlined />}>Выберете zip файл</Button>
      </Upload>
      {file && <Button onClick={handleUpload}>Загрузить</Button>}
    </Flex>
  );
};
