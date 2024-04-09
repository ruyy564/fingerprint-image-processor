import { getListFileFingerprints } from "@/services/fingerprintService";
import useSWR from "swr";

export const useGetFileList = () => {
  const {
    data: fileList,
    isLoading: isLoadingFileList,
    isValidating,
  } = useSWR<string[]>("/list-fingerprints", getListFileFingerprints);

  return { fileList, isLoadingFileList: isLoadingFileList || isValidating };
};
