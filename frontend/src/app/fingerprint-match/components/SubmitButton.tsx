import { Button, Form } from "antd";

export const SubmitButton = () => {
  return (
    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Найти похожее
      </Button>
    </Form.Item>
  );
};
