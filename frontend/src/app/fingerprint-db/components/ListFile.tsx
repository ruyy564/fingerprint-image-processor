"use client";

import { DeleteOutlined, DownloadOutlined } from "@ant-design/icons";
import { Alert, Button, Flex, List, Spin } from "antd";
import {
  useDeleteFile,
  useGetFileList,
  useDownloadFile,
} from "@/entities/fingerprintDB/hooks";

import styles from "./ListFIle.module.css";

export const ListFile = () => {
  const { fileList, isLoadingFileList, error } = useGetFileList();

  const { deleteFileHandler } = useDeleteFile();
  const { downloadFileHandler, isLoadingDownloadFile } = useDownloadFile();

  return (
    <Flex
      vertical
      justify="center"
      align="center"
      gap="small"
      style={{
        minWidth: 600,
      }}
    >
      {error && <Alert message={error?.message} type={"error"} />}
      <Spin
        spinning={isLoadingDownloadFile}
        tip="...Идет скачивание файла"
        size="large"
        wrapperClassName={styles.file_list_spin}
      />
      <List
        loading={isLoadingFileList}
        bordered
        dataSource={fileList}
        style={{
          minWidth: 600,
          maxWidth: 800,
          padding: 15,
          maxHeight: 400,
        }}
        header={"Названия файлов"}
        renderItem={(filename, index) => (
          <List.Item
            actions={[
              <Button
                key={"download" + index}
                type="primary"
                shape="round"
                icon={<DownloadOutlined />}
                onClick={() => downloadFileHandler(filename)}
              >
                Скачать
              </Button>,
              <Button
                key={"delete" + index}
                type="primary"
                shape="round"
                danger
                icon={<DeleteOutlined />}
                onClick={() => {
                  deleteFileHandler(filename);
                }}
              >
                Удалить
              </Button>,
            ]}
          >
            <div>{filename}</div>
          </List.Item>
        )}
      />
    </Flex>
  );
};
