import { Box, Image, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { File as UploadedFile } from "../../types/post";

interface Props {
  file: UploadedFile | File;
}

function ImagePreview({ file }: Props) {
  const [preview, setPreview] = useState("");
  const isVideo =
    file instanceof File
      ? file.type.startsWith("video")
      : !file.name.match(/\.(jpg|jpeg|png|gif)/);
  useEffect(() => {
    if (file instanceof File) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(`${process.env.REACT_APP_BACKEND_URL}/${file.url}`);
    }
  }, [file, setPreview]);

  return preview === "" ? (
    <Spinner />
  ) : isVideo ? (
    <Box as="video" controls src={preview} objectFit="contain" width={"40%"} />
  ) : (
    <Image src={preview} />
  );
}

export default ImagePreview;
