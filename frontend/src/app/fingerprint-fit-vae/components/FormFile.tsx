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
import { useFitVae } from "@/entities/fingerprint";
import { DownloadOutlined } from "@ant-design/icons";
import { UploadFingerprintImage } from "./UploadFingerprintImage";

export const FormFile = () => {
  const { data, isLoading, trigger, downloadFile } = useFitVae();

  const onFinish = (values: any) => {
    trigger(values);
  };

  return (
    <Flex vertical gap={15}>
      <Typography.Title level={5}>Форма для обучения VAE:</Typography.Title>
      <Form
        style={{ maxWidth: 600 }}
        variant="filled"
        labelWrap
        onFinish={onFinish}
      >
        <UploadFingerprintImage />
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
