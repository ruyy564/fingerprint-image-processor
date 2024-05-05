import { getListFilesFingerprints } from "@/services/awsService";
import useSWR from "swr";

export const useGetFileList = () => {
  const {
    data: fileList,
    isLoading: isLoadingFileList,
    isValidating,
    error
  } = useSWR<string[]>("/list-fingerprints", getListFilesFingerprints);

  return { fileList, isLoadingFileList: isLoadingFileList || isValidating,error };
};
