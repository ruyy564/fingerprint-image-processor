"use client"; // Error components must be Client Components

import { Button, Flex, Result } from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Flex
      vertical
      align="center"
      justify="center"
      style={{
        height: "100vh",
      }}
    >
      <Result
        status="500"
        title="500"
        subTitle="Извените, попробуйте позже..."
        extra={
          <Button
            type="primary"
            onClick={() => {
              window.location.replace("/");
            }}
          >
            На главную
          </Button>
        }
      />
    </Flex>
  );
}
