import { Button } from "antd";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Обработка отпечатков пальцев | Сравнение отпечатков пальцев",
  description: "Обработка отпечатков пальцев",
};

export default function FingerprintMatch() {
  return (
    <>
      <h1>Поиск схожего отпечатка пальцев</h1>
      <Button type="primary">Button</Button>
    </>
  );
}
