"use client";

import { DeleteOutlined, DownloadOutlined } from "@ant-design/icons";
import { Button, Flex, List, Spin } from "antd";
import {
  useDeleteFile,
  useGetFileList,
  useDownloadFile,
} from "@/entities/fingerprintDB/hooks";

import style from "./ListFIle.module.css";

export const ListFile = () => {
  const { fileList, isLoadingFileList } = useGetFileList();

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
      <Spin
        spinning={isLoadingDownloadFile}
        tip="Идет скачивание файла"
        size="large"
      >
        <List
          loading={isLoadingFileList}
          bordered
          dataSource={fileList}
          className={style.fingerprint_list}
          header={"Названия файлов"}
          renderItem={(filename) => (
            <List.Item
              actions={[
                <Button
                  key={"download"}
                  type="primary"
                  shape="round"
                  icon={<DownloadOutlined />}
                  onClick={() => downloadFileHandler(filename)}
                >
                  Скачать
                </Button>,
                <Button
                  key={"delete"}
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
      </Spin>
    </Flex>
  );
};
