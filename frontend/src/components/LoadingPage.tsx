import { Layout, Skeleton } from "antd";

export default function Loading() {
  return (
    <div style={{ minHeight: "100vh", padding: 20 }}>
      <Skeleton active />
    </div>
  );
}
