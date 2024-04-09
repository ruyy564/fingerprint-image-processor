import { deleteFileFingerprint } from "@/services/fingerprintService";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { FetchFileParams } from "../types";

export const useDeleteFile = () => {
  const { mutate } = useSWRConfig();

  const { trigger } = useSWRMutation(
    `/delete-file`,
    (_: string, { arg }: FetchFileParams) => {
      deleteFileFingerprint(arg.filename);
    },
    {
      onSuccess: () => {
        mutate("/list-fingerprints");
      },
    }
  );

  const deleteFileHandler = (item: string) => {
    trigger({ filename: item });
  };

  return { deleteFileHandler };
};
