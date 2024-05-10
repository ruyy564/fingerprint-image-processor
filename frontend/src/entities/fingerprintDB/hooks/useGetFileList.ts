import { getListFilesFingerprints } from "@/shared/api/fingerprintsDB";
import { message } from "antd";
import useSWR from "swr";

export const useGetFileList = () => {
  const {
    data: fileList,
    isLoading: isLoadingFileList,
    isValidating,
  } = useSWR<string[]>("/list-fingerprints", getListFilesFingerprints, {
    onError: (err) => {
      message.error(err?.message);
    },
  });

  return {
    fileList,
    isLoadingFileList: isLoadingFileList || isValidating,
  };
};
