import React, { useCallback } from "react";
import { useDropzone, Accept } from "react-dropzone";
import { Container, Message, UploadIcon } from "./styles";
import { FiUploadCloud } from "react-icons/fi";

interface ImageUploadProps {
  onImageUpload: (dataUrl: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.result) {
            onImageUpload(reader.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    },
    [onImageUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] } as Accept,
  });

  return (
    <Container {...getRootProps()}>
      <input {...getInputProps()} />
      <UploadIcon>
        <FiUploadCloud />
      </UploadIcon>
      <Message> Clique ou arraste uma imagem para enviar </Message>
    </Container>
  );
};

export default ImageUpload;
