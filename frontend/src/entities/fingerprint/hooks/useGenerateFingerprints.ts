import { generateFingerprints } from "@/shared/api";
import { GetProp, UploadProps, message } from "antd";
import useSWRMutation from "swr/mutation";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export const useGenerateFingerprints = () => {
  const { data, trigger, isMutating } = useSWRMutation(
    `/generate-file`,
    (_: string, { arg }: any) => {
      const formData = new FormData();

      formData.append("file", arg.file.originFileObj as FileType);
      Object.keys(arg).forEach((key) => {
        if (key !== "file" && arg[key]) formData.append(key, arg[key]);
      });

      return generateFingerprints(formData);
    },
    {
      onError: (err) => {
        message.error(err.message);
      },
    }
  );

  const downloadFile = () => {
    if (data) {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");

      link.href = url;
      link.download = "file.zip";
      document.body.appendChild(link);
      link.click();
      link.parentNode!.removeChild(link);
    }
  };
  return { data, trigger, isLoading: isMutating, downloadFile };
};
