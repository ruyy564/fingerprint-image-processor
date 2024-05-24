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
      label="Выберете h5-файл"
    >
      <Upload multiple={false} maxCount={1} accept={".h5"}>
        <Button icon={<UploadOutlined />}>
          Выберете h5-файл с весовыми коэффициентами
        </Button>
      </Upload>
    </Form.Item>
  );
};
