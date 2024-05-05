import { getListFilesFingerprints } from "@/services/awsService";
import useSWR from "swr";

export const useGetFileList = () => {
  const {
    data: fileList,
    isLoading: isLoadingFileList,
    isValidating,
  } = useSWR<string[]>("/list-fingerprints", getListFilesFingerprints);

  return { fileList, isLoadingFileList: isLoadingFileList || isValidating };
};
