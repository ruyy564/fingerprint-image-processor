import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Layout from "@/components/Layout";
import { Providers } from "@/components/Providers";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import theme from "@/config/theme";

import "./globals.css";
import StyledComponentsRegistry from "@/components/AntdRegistry";

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
        <AntdRegistry>
          <StyledComponentsRegistry>
            <ConfigProvider theme={theme}>
              <Providers>
                <Layout>{children}</Layout>
              </Providers>
            </ConfigProvider>
          </StyledComponentsRegistry>
        </AntdRegistry>
      </body>
    </html>
  );
}
