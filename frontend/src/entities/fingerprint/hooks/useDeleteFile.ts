import { deleteFileFingerprint } from "@/shared/api/fingerprintsDB";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { FetchFileParams } from "../../../app/fingerprint-db/types";
import { message } from "antd";

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
      onError: (err) => {
        message.error(err?.message);
      },
    }
  );

  const deleteFileHandler = (item: string) => {
    trigger({ filename: item });
  };

  return { deleteFileHandler };
};
