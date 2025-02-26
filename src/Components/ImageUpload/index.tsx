import React, { useCallback, useState } from "react";
import { useDropzone, Accept } from "react-dropzone";
import { Container, Message, UploadIcon } from "./styles";
import { FiUploadCloud } from "react-icons/fi";

// Função para converter a imagem para WebP no backend
const convertImageToWebP = async (file: File): Promise<string | null> => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch("http://localhost:5000/convert", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data.url; // URL da imagem convertida
  } catch (error) {
    console.error("Erro ao converter imagem:", error);
    return null;
  }
};

interface ImageUploadProps {
  onImageUpload: (file: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];

        setIsUploading(true);
        const webpUrl = await convertImageToWebP(file);
        setIsUploading(false);

        if (webpUrl) {
          onImageUpload(webpUrl);
        }
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
      <Message>
        {isUploading
          ? "Convertendo imagem..."
          : "Clique ou arraste uma imagem para enviar"}
      </Message>
    </Container>
  );
};

export default ImageUpload;
