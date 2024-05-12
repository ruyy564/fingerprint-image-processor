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
import { useGenerateFingerprints } from "@/entities/fingerprintDB";
import { DownloadOutlined } from "@ant-design/icons";

export const FormFile = () => {
  const { data, isLoading, trigger, downloadFile } = useGenerateFingerprints();

  const onFinish = (values: any) => {
    trigger(values);
  };

  return (
    <Flex vertical gap={15}>
      <Typography.Title level={5}>
        Форма для генерации изображений по параметрам:
      </Typography.Title>
      <Form
        style={{ maxWidth: 600 }}
        variant="filled"
        labelWrap
        onFinish={onFinish}
      >
        <UploadFingerprintImage />
        <Form.Item
          name="count_generated_image"
          label="Кол-во генерируемых изображений"
          rules={[{ required: true, message: "Пожалуйста, введите значение!" }]}
        >
          <InputNumber
            min="0"
            max="10"
            placeholder="Кол-во генерируемых изображений"
          />
        </Form.Item>
        <Form.Item name="rotation_range" label="rotation_range">
          <InputNumber min="0" max="360" placeholder="rotation_range" />
        </Form.Item>
        <Form.Item name="width_shift_range" label="width_shift_range">
          <InputNumber
            min="0"
            max="100"
            step="0.1"
            placeholder="width_shift_range"
          />
        </Form.Item>
        <Form.Item name="height_shift_range" label="height_shift_range">
          <InputNumber
            min="0"
            max="100"
            step="0.1"
            placeholder="height_shift_range"
          />
        </Form.Item>
        <Form.Item name="zoom_range" label="zoom_range">
          <InputNumber min="0" max="100" step="0.1" placeholder="zoom_range" />
        </Form.Item>
        <Form.Item
          name="horizontal_flip"
          label="horizontal_flip"
          valuePropName="checked"
        >
          <Switch />
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
