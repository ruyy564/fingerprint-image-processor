"use client";

import { UploadOutlined } from "@ant-design/icons";
import { Button, Flex, Upload, message } from "antd";

import { useUploadFile } from "@/entities/fingerprint/hooks";

export const UploadFiles = () => {
  const { fileList, isLoading, setFileList, uploadFileHandler, onRemoveFile } =
    useUploadFile();

  return (
    <Flex gap={15}>
      <Upload
        onRemove={onRemoveFile}
        fileList={fileList}
        multiple={false}
        maxCount={1}
        beforeUpload={(file) => {
          const isZIP = file.type === "application/x-zip-compressed";

          if (!isZIP) {
            message.error(`${file.name} is not a ZIP file`);

            return false;
          }

          setFileList([file]);
        }}
        accept={".zip"}
      >
        <Button icon={<UploadOutlined />}>
          Выберете zip-файл для добавления в БД
        </Button>
      </Upload>
      {fileList.length !== 0 && (
        <Button type="primary" onClick={uploadFileHandler} loading={isLoading}>
          Загрузить в БД
        </Button>
      )}
    </Flex>
  );
};
