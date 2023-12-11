import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Card, HStack, IconButton, Text } from "@chakra-ui/react";
import { useState } from "react";
import ImagePreview from "./ImagePreview";
import { File as UploadedFile } from "../../types/post";

interface Props {
  files: (UploadedFile | File)[];
  hideIfEmpty?: boolean;
}
function Gallery({ files, hideIfEmpty = false }: Props) {
  const numFiles = files.length;
  const [index, setIndex] = useState(1);
  if (!numFiles) {
    return hideIfEmpty ? <></> : <Text>No images or videos yet...</Text>;
  }
  const currentFile = files[index - 1];
  return (
    <Card>
      <HStack justify={"center"}>
        <IconButton
          icon={<ArrowLeftIcon />}
          aria-label="previous"
          onClick={() => setIndex(((index - 2 + numFiles) % numFiles) + 1)}
          disabled={numFiles === 1}
        />
        <ImagePreview file={currentFile} />
        <IconButton
          icon={<ArrowRightIcon />}
          aria-label="next"
          onClick={() => setIndex(((index + numFiles) % numFiles) + 1)}
          disabled={numFiles === 1}
        />
      </HStack>
      <HStack justify={"center"}>
        <Text>
          {index} of {numFiles}
        </Text>
      </HStack>
    </Card>
  );
}

export default Gallery;
