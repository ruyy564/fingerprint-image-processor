"use client";
import { testService } from "@/services/test";
import NextAuth from "next-auth";
export default function Home() {
  const handleDownload = async () => {
    // const blob = await testService();
    // const url = window.URL.createObjectURL(new Blob([blob]));
    // const link = document.createElement("a");
    // link.href = url;
    // link.download = "fileName.zip";
    // document.body.appendChild(link);
    // link.click();
    // link.parentNode!.removeChild(link);
  };

  return (
    <>
      <h1>Главная</h1>
      <button onClick={handleDownload}>down</button>
      {/* {JSON.stringify(test)} */}
    </>
  );
}
