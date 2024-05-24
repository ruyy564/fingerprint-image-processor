import { fitVAE } from "@/shared/api";
import { GetProp, UploadProps, message } from "antd";
import useSWRMutation from "swr/mutation";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export const useFitVae = () => {
  const { data, trigger, isMutating } = useSWRMutation(
    `/fit-vae`,
    (_: string, { arg }: any) => {
      const formData = new FormData();

      formData.append("file", arg.file.originFileObj as FileType);
      Object.keys(arg).forEach((key) => {
        if (key !== "file" && arg[key]) formData.append(key, arg[key]);
      });

      return fitVAE(formData);
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
      link.download = "file.h5";
      document.body.appendChild(link);
      link.click();
      link.parentNode!.removeChild(link);
    }
  };
  return { data, trigger, isLoading: isMutating, downloadFile };
};
