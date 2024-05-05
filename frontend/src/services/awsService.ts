import { fetchWrapper } from "./fetchWrapper";

const awsPrefix = "/aws";

export const getListFilesFingerprints = async () => {
  const data = await fetchWrapper(`${awsPrefix}/list-fingerprints`);

  return data.json();
};

export const deleteFileFingerprint = async (filename: string) => {
  const data = await fetchWrapper(
    `${awsPrefix}/delete-file?filename=${filename}`,
    {
      method: "DELETE",
    }
  );

  return data.body;
};

export const downloadFileFingerprint = async (filename: string) => {
  const data = await fetchWrapper(
    `${awsPrefix}/download-file?filename=${filename}`,
    {
      headers: {
        "Content-Type": "application/octet-stream",
      },
    }
  );

  return data.blob();
};

export const uploadFileFingerprint = async (file: FormData) => {
  const data = await fetchWrapper(`${awsPrefix}/upload-file`, {
    method: "POST",
    body: file,
  });

  return data.body;
};
