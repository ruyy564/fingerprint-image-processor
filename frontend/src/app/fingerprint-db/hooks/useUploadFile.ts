import { uploadFileFingerprint } from "@/services/fingerprintService";
import { GetProp, UploadFile, UploadProps } from "antd";
import { useState } from "react";
import { mutate, useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export const useUploadFile = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { mutate } = useSWRConfig();

  const { trigger } = useSWRMutation(
    `/upload-file`,
    () => {
      const formData = new FormData();
      console.log("test", fileList);
      formData.append("file", fileList[0] as FileType);

      uploadFileFingerprint(formData);
    },
    {
      onSuccess: () => {
        console.log("dfgdf");
        mutate("/list-fingerprints");
        setFileList([]);
      },
    }
  );
  console.log(fileList);
  const uploadFileHandler = () => {
    trigger();
  };

  const onRemoveFile = () => setFileList([]);

  return { uploadFileHandler, onRemoveFile, fileList, setFileList };
};
