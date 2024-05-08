import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Mainlayout } from "@/widgets/MainLayont";
import { Providers } from "@/providers";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Обработка отпечатков пальцев",
  description: "Обработка отпечатков пальцев",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Providers>
          <Mainlayout>{children}</Mainlayout>
        </Providers>
      </body>
    </html>
  );
}
