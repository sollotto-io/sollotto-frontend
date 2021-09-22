import axios from "axios";

interface IUploadtoS3 {
  url: string;
  key: string;
}

export const uploadToS3 = async (
  file: File,
  dir: string
): Promise<IUploadtoS3 | any> => {
  return new Promise((resolve, reject) => {
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
        .then((res) => resolve(res.data.body))
        .catch((err) => reject(err));
    };
  });
};
