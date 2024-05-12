"use client";

import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Upload, message } from "antd";

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList[0];
};

export const UploadFingerprintImage = () => {
  return (
    <Form.Item
      name="file"
      valuePropName="file"
      getValueFromEvent={normFile}
      label="Выберете zip-файл"
      rules={[{ required: true, message: "Пожалуйста, введите значение!" }]}
    >
      <Upload
        multiple={false}
        maxCount={1}
        listType="picture"
        beforeUpload={(file) => {
          const isZIP = file.type === "application/x-zip-compressed";

          if (!isZIP) {
            message.error(`${file.name} is not a ZIP file`);

            return false;
          }
        }}
        accept={".zip"}
      >
        <Button icon={<UploadOutlined />}>
          Выберете zip-файл для генерации изображений
        </Button>
      </Upload>
    </Form.Item>
  );
};
