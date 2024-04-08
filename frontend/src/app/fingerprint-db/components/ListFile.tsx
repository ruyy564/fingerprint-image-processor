"use client";
import {
  deleteFileFingerprint,
  downloadFileFingerprint,
  getListFileFingerprints,
} from "@/services/fingerprintService";
import { Button, List } from "antd";
import Title from "antd/es/typography/Title";
import useSWR, { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

export const ListFile = () => {
  const { mutate } = useSWRConfig();
  const { data: fileList, isLoading: isLoadingFileList } = useSWR(
    "/list-fingerprints",
    getListFileFingerprints
  );

  const { trigger: triggerDelete } = useSWRMutation(
    `/delete-file`,
    (_: string, { arg }: { arg: { filename: string } }) => {
      deleteFileFingerprint(arg.filename);
    },
    {
      onSuccess: () => {
        mutate("/list-fingerprints");
      },
    }
  );

  const { trigger } = useSWRMutation(
    `/download-file`,
    (_: string, { arg }: { arg: { filename: string } }) => {
      downloadFileFingerprint(arg.filename);
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

  return (
    <>
      <List
        className="demo-loadmore-list"
        loading={isLoadingFileList}
        itemLayout="horizontal"
        dataSource={fileList}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Button key={"del"} onClick={() => trigger({ filename: item })}>
                download
              </Button>,
              <Button
                key={"dow"}
                onClick={() => {
                  triggerDelete({ filename: item });
                }}
              >
                delete file
              </Button>,
            ]}
          >
            <div>{item}</div>
          </List.Item>
        )}
      />
    </>
  );
};
