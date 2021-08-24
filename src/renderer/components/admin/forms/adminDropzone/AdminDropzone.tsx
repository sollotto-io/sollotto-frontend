import "./index.scss";
import Dropzone from "react-dropzone";
import axios from "axios";
import { useState } from "react";
import useDidUpdateEffect from "../../../../hooks/useDidUpdateEffect";

interface IAdminDropzone {
  endpoint: string;
  onDrop: (url: string) => void;
  dirName: string;
  error?: boolean;
  initialImage?: string;
  style?: React.CSSProperties;
}

export default function AdminDropZone({
  endpoint,
  onDrop,
  dirName,
  error,
  initialImage,
  style,
}: IAdminDropzone): JSX.Element {
  const [image, setImage] = useState(initialImage ?? "");
  useDidUpdateEffect(() => {
    if (image !== "") {
      onDrop(image);
    }
  }, [image]);
  return (
    <span className="ad-dropzone" style={style ?? {}}>
      <Dropzone
        onDrop={(acceptedFiles) => {
          const data = new FormData();
          data.append("file", acceptedFiles[0]);
        
          axios
            .post(`${process.env.REACT_APP_IMAGE_LINK}/${endpoint}`, data)
            .then((res) => {
              setImage(`/static/${dirName}/${res.data.originalname}`);
            });
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <section className="ad-dropzone-field">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag n drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>
      {image === "" ? (
        <p>Preview Image</p>
      ) : (
        <img src={`${process.env.REACT_APP_IMAGE_LINK}${image}`} alt="" />
      )}
      {error && <p className="ad-dropzone-err">Please select an image</p>}
    </span>
  );
}
