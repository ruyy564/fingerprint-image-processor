import { FETCH_SIDE, fetchWrapper } from "./fetchWrapper";

export const getListFileFingerprints = async () => {
  const data = await fetchWrapper(FETCH_SIDE.CLIENT, "/list-fingerprints");

  return data.json();
};

export const deleteFileFingerprint = async (filename: string) => {
  const data = await fetchWrapper(
    FETCH_SIDE.CLIENT,
    `/delete-file?filename=${filename}`,
    {
      method: "DELETE",
    }
  );

  return data.blob();
};

export const downloadFileFingerprint = async (filename: string) => {
  const data = await fetchWrapper(
    FETCH_SIDE.CLIENT,
    `/download-file?filename=${filename}`,
    {
      headers: {
        "Content-Type": "application/octet-stream",
      },
    }
  );

  return data.blob();
};

export const uploadFileFingerprint = async (file: FormData) => {
  const data = await fetchWrapper(FETCH_SIDE.CLIENT, "/upload-file", {
    method: "POST",
    body: file,
  });

  return data.json();
};
