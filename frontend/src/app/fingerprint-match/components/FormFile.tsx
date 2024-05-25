"use client";

import { Button, Flex, Form, Select, Space, Switch, Typography } from "antd";

import { UploadFingerprintImage } from "./UploadFingerprintImage";

import { useGetFileList, useMatchFingerprint } from "@/entities/fingerprint";
import { useMemo, useState } from "react";
import { ResultMatches } from "./ResultMatches";

export const FormFile = () => {
  const { data, isLoading, trigger } = useMatchFingerprint();
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
        Форма выбора данных для поиска наиболее похожего изображения:
      </Typography.Title>
      <Form
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        variant="filled"
        labelWrap
      >
        <Form.Item label="Изображения из файла">
          <Switch value={selectedUploadFile} onChange={setSelectedUploadFile} />
        </Form.Item>
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
        <UploadFingerprintImage />
        <Form.Item>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading || isLoadingFileList}
              disabled={isLoading || isLoadingFileList}
            >
              Найти похожее
            </Button>
            <Button danger htmlType="reset">
              Сбросить
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <ResultMatches data={data} />
    </Flex>
  );
};
