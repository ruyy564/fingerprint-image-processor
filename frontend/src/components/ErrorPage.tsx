import { Button, Flex, Result } from "antd";
import { useEffect } from "react";

export default function Error({
  error,
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
