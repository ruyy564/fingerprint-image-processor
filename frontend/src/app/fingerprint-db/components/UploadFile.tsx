"use client";

import { UploadOutlined } from "@ant-design/icons";
import { Button, Flex, Upload, message } from "antd";

import { useUploadFile } from "@/entities/fingerprintDB/hooks";

export const UploadFiles = () => {
  const { fileList, setFileList, uploadFileHandler, onRemoveFile } =
    useUploadFile();

  return (
    <Flex gap={15}>
      <Upload
        onRemove={onRemoveFile}
        fileList={fileList}
        multiple={false}
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
          Выберете zip-файл для дабавления в БД
        </Button>
      </Upload>
      {fileList.length !== 0 && (
        <Button type="primary" onClick={uploadFileHandler}>
          Загрузить в БД
        </Button>
      )}
    </Flex>
  );
};
