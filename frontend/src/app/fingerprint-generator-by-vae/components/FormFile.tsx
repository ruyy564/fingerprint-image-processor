"use client";

import {
  Button,
  Flex,
  Form,
  InputNumber,
  Space,
  Switch,
  Typography,
} from "antd";
import { UploadFingerprintImage } from "./UploadFingerprintImage";
import { useGenerateFingerprintsByVae } from "@/entities/fingerprint";
import { DownloadOutlined } from "@ant-design/icons";

export const FormFile = () => {
  const { data, isLoading, trigger, downloadFile } =
    useGenerateFingerprintsByVae();

  const onFinish = (values: any) => {
    trigger(values);
  };

  return (
    <Flex vertical gap={15}>
      <Typography.Title level={5}>
        Форма для генерации изображений:
      </Typography.Title>
      <Form
        style={{ maxWidth: 600 }}
        variant="filled"
        labelWrap
        onFinish={onFinish}
      >
        <UploadFingerprintImage />
        <Form.Item
          name="count"
          label="Кол-во генерируемых изображений"
          rules={[{ required: true, message: "Пожалуйста, введите значение!" }]}
        >
          <InputNumber
            min="0"
            max="10000"
            placeholder="Кол-во генерируемых изображений"
          />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              disabled={isLoading}
            >
              Сгенерировать изображения
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
          Скачать сгенерированные изображения
        </Button>
      )}
    </Flex>
  );
};
