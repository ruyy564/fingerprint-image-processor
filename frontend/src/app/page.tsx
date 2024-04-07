"use client";
import {
  downloadFileFingerprint,
  deleteFileFingerprint,
  uploadFileFingerprint,
  getListFileFingerprints,
} from "@/services/fingerprintService";
import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  GetProp,
  List,
  Skeleton,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { useEffect, useState } from "react";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export default function Home() {
  const [fileList, setFileList] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);

    getListFileFingerprints().then((res) => {
      setLoading(false);
      console.log(res);
      Array.isArray(res) && setFileList(res);
    });
  }, []);

  const handleDownload = async (filename: string) => {
    setLoading(true);
    const blob = await downloadFileFingerprint(filename);
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement("a");

    link.href = url;
    link.download = filename;
    document.body.appendChild(link);

    link.click();
    link.parentNode!.removeChild(link);
    setLoading(false);
  };

  const handleDeleteFile = async (filename: string) => {
    setLoading(true);
    await deleteFileFingerprint(filename);
    setLoading(false);
  };

  const [file, setFile] = useState<UploadFile | null>(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file as FileType);
    console.log("file ", file, formData.get("file"));
    setLoading(true);
    await uploadFileFingerprint(formData);
    setLoading(false);
  };
  console.log("file", file);
  return (
    <div>
      <h1>Главная</h1>
      <List
        className="demo-loadmore-list"
        loading={loading}
        itemLayout="horizontal"
        dataSource={fileList}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Button key={"del"} onClick={() => handleDownload(item)}>
                download
              </Button>,
              <Button key={"dow"} onClick={() => handleDeleteFile(item)}>
                delete file
              </Button>,
            ]}
          >
            <div>{item}</div>
          </List.Item>
        )}
      />

      <Upload
        beforeUpload={(file) => {
          setFile(file);
        }}
        onRemove={(file) => {
          setFile(null);
        }}
      >
        <Button icon={<UploadOutlined />}>Выберете zip файл</Button>
      </Upload>
      {file && <Button onClick={handleUpload}>Загрузить</Button>}
    </div>
  );
}
