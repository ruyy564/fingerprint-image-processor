"use client";

import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Upload, message } from "antd";

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList[0];
};

const acceptFileTypes = ["image/png", "image/bmp", "image/jpeg", "image/jpg"];

export const UploadFingerprintImage = () => {
  return (
    <Form.Item
      label="Выберете искомое изображение"
      name="file"
      valuePropName="file"
      getValueFromEvent={normFile}
      rules={[{ required: true, message: "Пожалуйста, введите значение!" }]}
    >
      <Upload
        multiple={false}
        maxCount={1}
        listType="picture"
        beforeUpload={(file) => {
          const isImage = acceptFileTypes.includes(file.type);

          if (!isImage) {
            message.error(`${file.name} это не png-файл`);
            return false;
          }

          return false;
        }}
        accept={".png,.BMP,.jpeg,.jpg"}
      >
        <Button icon={<UploadOutlined />}>
          Выберете png-файл для сравнения
        </Button>
      </Upload>
    </Form.Item>
  );
};
