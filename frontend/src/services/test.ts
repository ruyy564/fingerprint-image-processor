import { fetchWrapper } from "./fetchWrapper";

export const testService =  async() => {
  const data = await fetch("http://127.0.0.1:8080/list-fingerprints", {
    cache: "no-cache",
    headers: {
      'Content-Type': 'application/octet-stream',
    },
  });
  
  return data.blob();
};
