"use client";

import { DeleteOutlined, DownloadOutlined } from "@ant-design/icons";
import { Button, Flex, List, Spin } from "antd";
import { useDeleteFile } from "../hooks/useDeleteFile";
import { useGetFileList } from "../hooks/useGetFileList";
import { useDownloadFile } from "../hooks/useDownloadFile";

export const ListFile = () => {
  const { fileList, isLoadingFileList } = useGetFileList();

  const { deleteFileHandler } = useDeleteFile();
  const { downloadFileHandler, isLoadingDownloadFile } = useDownloadFile();

  return (
    <Flex vertical align="center">
      <Spin
        spinning={isLoadingDownloadFile}
        tip="...Идет скачивание файла"
        size="large"
      >
        <List
          loading={isLoadingFileList}
          itemLayout="horizontal"
          bordered
          dataSource={fileList}
          style={{
            minWidth: 600,
            maxWidth: 800,
            maxHeight: 400,
            overflow: "auto",
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
      </Spin>
    </Flex>
  );
};
