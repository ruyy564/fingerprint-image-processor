import { fetchWrapper } from "./fetchWrapper";

const awsPrefix = "/aws";

export const getListFilesFingerprints = async () => {
  const data = await fetchWrapper(`${awsPrefix}/list-fingerprints`);

  if(data.ok){
    return data.json();
  }

  throw new Error(data.statusText)
};

export const deleteFileFingerprint = async (filename: string) => {
  const data = await fetchWrapper(
    `${awsPrefix}/delete-file?filename=${filename}`,
    {
      method: "DELETE",
    }
  );

  if(data.ok){
    return data.body;
  }

  throw new Error(data.statusText)
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

  if(data.ok){
    return data.blob();
  }

  throw new Error(data.statusText)
};

export const uploadFileFingerprint = async (file: FormData) => {
  const data = await fetchWrapper(`${awsPrefix}/upload-file`, {
    method: "POST",
    body: file,
  });

  if(data.ok){
    return data.body;
  }

  throw new Error(data.statusText)
};
