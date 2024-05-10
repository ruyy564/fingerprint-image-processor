import { matchFingerprints } from "@/shared/api";
import { GetProp, UploadProps, message } from "antd";
import useSWRMutation from "swr/mutation";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export const useMatchFingerprint = () => {
  const { data, trigger, isMutating } = useSWRMutation(
    `/upload-file`,
    (_: string, { arg }: any) => {
      const formData = new FormData();
      formData.append("file", arg.file.originFileObj as FileType);

      const body = {
        filename: arg.filename,
        file: formData,
      };

      return matchFingerprints(body);
    },
    {
      onError: (err) => {
        message.error(err.message);
      },
    }
  );

  return { data, trigger, isLoading: isMutating };
};
