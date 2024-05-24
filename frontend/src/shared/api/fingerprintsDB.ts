import { fetchWrapper } from "./fetchWrapper";

const awsPrefix = "/aws";
const analyzePrefix = "/analyze";
const vaePrefix = "/vae";

export const getListFilesFingerprints = async () => {
  const data = await fetchWrapper(`${awsPrefix}/list-fingerprints`);

  if (data.ok) {
    return data.json();
  }

  throw new Error(data.statusText);
};

export const deleteFileFingerprint = async (filename: string) => {
  const data = await fetchWrapper(
    `${awsPrefix}/delete-file?filename=${filename}`,
    {
      method: "DELETE",
    }
  );

  if (data.ok) {
    return data.body;
  }

  throw new Error(data.statusText);
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

  if (data.ok) {
    return data.blob();
  }

  throw new Error(data.statusText);
};

export const uploadFileFingerprint = async (file: FormData) => {
  const data = await fetchWrapper(`${awsPrefix}/upload-file`, {
    method: "POST",
    body: file,
  });

  if (data.ok) {
    return data.body;
  }

  throw new Error(data.statusText);
};

export const matchFingerprints = async (body: {
  filename: string;
  file: FormData;
}) => {
  const data = await fetchWrapper(
    `${analyzePrefix}/match-fingerprints?filename=${body.filename}`,
    {
      method: "POST",
      body: body.file,
    }
  );

  if (data.ok) {
    return data.json();
  }

  throw new Error(data.statusText);
};

export const generateFingerprints = async (body: any) => {
  const data = await fetchWrapper(`${analyzePrefix}/generate-fingerprints`, {
    method: "POST",
    body: body,
  });

  if (data.ok) {
    return data.blob();
  }

  throw new Error(data.statusText);
};

export const generateFingerprintsByVAE = async (body: any) => {
  const data = await fetchWrapper(`${vaePrefix}/predict`, {
    method: "POST",
    body: body,
  });

  if (data.ok) {
    return data.blob();
  }

  throw new Error(data.statusText);
};

export const fitVAE = async (body: any) => {
  const data = await fetchWrapper(`${vaePrefix}/fit`, {
    method: "POST",
    body: body,
  });

  if (data.ok) {
    return data.blob();
  }

  throw new Error(data.statusText);
};
