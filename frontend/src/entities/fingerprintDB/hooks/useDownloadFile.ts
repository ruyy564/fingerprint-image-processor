import { downloadFileFingerprint } from "@/shared/api/fingerprintsDB";
import useSWRMutation from "swr/mutation";
import { FetchFileParams } from "../../../app/fingerprint-db/types";

export const useDownloadFile = () => {
  const { trigger, isMutating } = useSWRMutation(
    `/download-file`,
    (_: string, { arg }: FetchFileParams) => {
      return downloadFileFingerprint(arg.filename);
    },
    {
      onSuccess: (blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");

        link.href = url;
        link.download = "file.zip";
        document.body.appendChild(link);
        link.click();
        link.parentNode!.removeChild(link);
      },
    }
  );
  const downloadFileHandler = (filename: string) => trigger({ filename });

  return { downloadFileHandler, isLoadingDownloadFile: isMutating };
};
