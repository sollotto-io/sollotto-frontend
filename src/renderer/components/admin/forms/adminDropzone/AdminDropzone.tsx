import "./index.scss";
import Dropzone from "react-dropzone";
import axios from "axios";
import { useState } from "react";
import useDidUpdateEffect from "../../../../hooks/useDidUpdateEffect";

interface IAdminDropzone {
  endpoint: string;
  onDrop: (image: IImage) => void;
  dirName: string;
  error?: boolean;
  initialImage?: string;
  style?: React.CSSProperties;
}
interface IImage {
  image: File | null;
  path: string;
}

export default function AdminDropZone({
  endpoint,
  onDrop,
  dirName,
  error,
  initialImage,
  style,
}: IAdminDropzone): JSX.Element {
  const [image, setImage] = useState<IImage>(
    initialImage
      ? {
          image: null,
          path: initialImage,
        }
      : {
          image: null,
          path: "",
        }
  );
  const [imagePath, setImagePath] = useState("");
  useDidUpdateEffect(() => {
    if (image.path !== "") {
      onDrop(image);
    }
  }, [image]);
  return (
    <span className="ad-dropzone" style={style ?? {}}>
      <Dropzone
        onDrop={(acceptedFiles) => {
          setImage({
            path: URL.createObjectURL(acceptedFiles[0]),
            image: acceptedFiles[0],
          });
          setImagePath(URL.createObjectURL(acceptedFiles[0]));
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
      {image.path === "" && initialImage === "" ? (
        <p>Preview Image</p>
      ) : (
        <img
          src={
            imagePath
              ? image.path
              : `${process.env.REACT_APP_IMAGE_LINK}${initialImage}`
          }
          alt=""
        />
      )}
      {error && <p className="ad-dropzone-err">Please select an image</p>}
    </span>
  );
}
