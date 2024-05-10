import { Typography } from "antd";
import { FC } from "react";
import Image from "next/image";

type ResultMatchesProps = {
  data: Data;
};

type Data = {
  score: number;
  matchesImageBase64: string;
  foundImage: string;
};
export const ResultMatches: FC<ResultMatchesProps> = ({ data }) => {
  if (!data) {
    return null;
  }

  return (
    <>
      <Typography.Title>Результат:</Typography.Title>

      <Typography.Text>Score: {data.score}</Typography.Text>
      <Typography.Text>
        Название похожего файла: {data.foundImage}
      </Typography.Text>
      <Image
        src={`data:image/jpeg;base64,${data.matchesImageBase64
          .replace("b'", "")
          .replace("'", "")}`}
        width={200}
        height={150}
        priority
        alt={"Результат сравенения изображений"}
      />
    </>
  );
};
