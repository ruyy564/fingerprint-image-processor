"use client";

import { useGetFileList } from "@/entities/fingerprintDB";
import { Form, Select } from "antd";
import { useMemo } from "react";

export const SelectFilelist = () => {
  const { fileList, isLoadingFileList } = useGetFileList();

  const options = useMemo(() => {
    return fileList?.map((item) => ({ value: item, label: item }));
  }, [fileList]);

  return (
    <Form.Item
      label="Выберете png-файл для сравнения"
      name="filename"
      rules={[
        { required: true, message: "Пожалуйста, загрузите изображение!" },
      ]}
    >
      <Select
        loading={isLoadingFileList}
        disabled={isLoadingFileList}
        options={options}
        placeholder={"Выберете файл с отпечатками пальцев для сравения"}
        style={{ width: 300 }}
      />
    </Form.Item>
  );
};
