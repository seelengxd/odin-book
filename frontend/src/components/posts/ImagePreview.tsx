import { Box, Image, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Props {
  file: File;
}

function ImagePreview({ file }: Props) {
  const [preview, setPreview] = useState("");
  const isVideo = file.type.startsWith("video");
  useEffect(() => {
    const objectUrl = URL.createObjectURL(file);
    console.log({ objectUrl });
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
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
