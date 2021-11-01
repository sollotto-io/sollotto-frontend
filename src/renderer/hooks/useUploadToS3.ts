import { useState } from "react";
import axios from "axios";

interface IData {
  key: string;
  url: string;
}

type TData = IData | null;

export default function useUploadToS3(
  file: File,
  dir: string
): [TData, () => void] {
  const [data, setData] = useState(null);

  const uploadToS3 = () => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async function () {
      const token = localStorage.getItem("token");
      await axios
        .post(
          process.env.REACT_APP_UPLOAD_TO_S3 as string,
          {
            dir: dir,
            file: (reader.result! as string)
              .replace("data:", "")
              .replace(/^.+,/, ""),
            name: file.name,
          },
          {
            headers: {
              authorization: token ? `Bearer ${token}` : "",
            },
          }
        )
        .then((res) => setData(res.data.body))
        .catch((err) => err);
    };
  };
  return [data, uploadToS3];
}
