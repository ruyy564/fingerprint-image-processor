"use client";

import {
  Button,
  Flex,
  Form,
  InputNumber,
  Select,
  Space,
  Switch,
  Typography,
} from "antd";
import { useFitVae, useGetFileList } from "@/entities/fingerprint";
import { DownloadOutlined } from "@ant-design/icons";
import { UploadFingerprintImage } from "./UploadFingerprintImage";
import { useMemo, useState } from "react";

export const FormFile = () => {
  const { data, isLoading, trigger, downloadFile } = useFitVae();
  const { fileList, isLoadingFileList } = useGetFileList();

  const [selectedUploadFile, setSelectedUploadFile] = useState(false);

  const options = useMemo(() => {
    return fileList?.map((item) => ({ value: item, label: item }));
  }, [fileList]);

  const onFinish = (values: any) => {
    trigger(values);
  };

  return (
    <Flex vertical gap={15}>
      <Typography.Title level={5}>
        Форма выбора данных для обучения VAE:
      </Typography.Title>
      <Form
        style={{ maxWidth: 600 }}
        variant="filled"
        labelWrap
        onFinish={onFinish}
      >
        <Form.Item label="Изображения из файла">
          <Switch value={selectedUploadFile} onChange={setSelectedUploadFile} />
        </Form.Item>
        {selectedUploadFile && <UploadFingerprintImage />}
        {!selectedUploadFile && (
          <Form.Item
            label="Выберете файл из набора отпечатков пальцев"
            name="filename"
            rules={[{ required: true, message: "Пожалуйста, выберете файл!" }]}
          >
            <Select
              loading={isLoadingFileList}
              disabled={isLoadingFileList}
              options={options}
              placeholder={"Выберете файл с отпечатками пальцев для сравения"}
              style={{ width: 300 }}
            />
          </Form.Item>
        )}
        <Form.Item name="epoche" label="Кол-во эпох">
          <InputNumber min="0" max="10000" placeholder="Кол-во эпох" />
        </Form.Item>
        <Form.Item name="batch_size" label="Batch size">
          <InputNumber min="0" max="1000" placeholder="Batch size" />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              disabled={isLoading}
            >
              Обучить VAE
            </Button>
            <Button danger htmlType="reset">
              Сбросить
            </Button>
          </Space>
        </Form.Item>
      </Form>
      {data && (
        <Button
          type="primary"
          shape="round"
          icon={<DownloadOutlined />}
          onClick={downloadFile}
        >
          Скачать весовые коэффициенты модели
        </Button>
      )}
    </Flex>
  );
};
