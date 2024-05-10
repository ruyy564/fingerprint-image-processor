"use client";

import { UploadOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Upload, UploadFile, message } from "antd";
import { useState } from "react";

const normFile = (e: any) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList[0];
};

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
        beforeUpload={(file) => {
          const isImage = file.type === "image/png";

          // if (!isImage) {
          //   message.error(`${file.name} это не png-файл`);
          //   return false;
          // }
        }}
        // accept={".png"}
      >
        <Button icon={<UploadOutlined />}>
          Выберете png-файл для сравнения
        </Button>
      </Upload>
    </Form.Item>
  );
};
