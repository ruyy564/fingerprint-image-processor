import { uploadFileFingerprint } from "@/shared/api/fingerprintsDB";
import { GetProp, UploadFile, UploadProps, message } from "antd";
import { useState } from "react";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export const useUploadFile = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { mutate } = useSWRConfig();

  const { trigger, isMutating } = useSWRMutation(
    `/upload-file`,
    () => {
      const formData = new FormData();
      formData.append("file", fileList[0] as FileType);

      return uploadFileFingerprint(formData);
    },
    {
      onSuccess: () => {
        mutate("/list-fingerprints");
        setFileList([]);
      },
      onError: (err) => {
        message.error(err?.message);
      },
    }
  );

  const uploadFileHandler = () => {
    trigger();
  };

  const onRemoveFile = () => setFileList([]);

  return {
    uploadFileHandler,
    onRemoveFile,
    fileList,
    setFileList,
    isLoading: isMutating,
  };
};
