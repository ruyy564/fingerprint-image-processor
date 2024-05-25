"use client";

import {
  Button,
  Flex,
  Form,
  InputNumber,
  Radio,
  Select,
  Space,
  Switch,
  Typography,
} from "antd";
import { UploadFingerprintImage } from "./UploadFingerprintImage";
import {
  useGenerateFingerprints,
  useGetFileList,
} from "@/entities/fingerprint";
import { DownloadOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";

export const FormFile = () => {
  const { data, isLoading, trigger, downloadFile } = useGenerateFingerprints();
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
        Форма для генерации изображений по параметрам:
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
        <Form.Item name="rotation_range" label="Угол поворота">
          <InputNumber min="0" max="360" placeholder="Угол поворота" />
        </Form.Item>
        <Form.Item name="width_shift_range" label="Сдвиг по горизонтали">
          <InputNumber
            min="-100"
            max="100"
            step="0.1"
            placeholder="Сдвиг по горизонтали"
          />
        </Form.Item>
        <Form.Item name="height_shift_range" label="Сдвиг по вертикали">
          <InputNumber
            min="0"
            max="100"
            step="0.1"
            placeholder="Сдвиг по вертикали"
          />
        </Form.Item>
        <Form.Item name="zoom_range" label="Масштабирование">
          <InputNumber
            min="0"
            max="100"
            step="0.1"
            placeholder="Масштабирование"
          />
        </Form.Item>
        <Form.Item
          name="horizontal_flip"
          label="Горизонтальный переворот"
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
