import React, { useCallback, useState } from "react";
import { useDropzone, Accept } from "react-dropzone";
import { Container, Message, UploadIcon, ErrorMessage } from "./styles";
import { FiUploadCloud } from "react-icons/fi";

// Função para converter a imagem para WebP no backend
const convertImageToWebP = async (file: File): Promise<string | null> => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    // 1. Fazer upload da imagem
    const uploadResponse = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });
    if (!uploadResponse.ok) {
      throw new Error("Falha no upload da imagem");
    }
    const uploadData = await uploadResponse.json();
    if (!uploadData.fileName) {
      throw new Error("Erro ao obter o fileName após upload");
    }

    // 2. Chamar a rota de edição/conversão utilizando o fileName
    const convertResponse = await fetch(
      `http://localhost:5000/edit/${uploadData.fileName}`,
      { method: "POST" }
    );
    if (!convertResponse.ok) {
      throw new Error("Falha ao converter a imagem");
    }
    const convertData = await convertResponse.json();
    if (convertData?.url) {
      return convertData.url; // URL da imagem convertida
    } else {
      console.error("A resposta não contém a chave 'url'.");
      return null;
    }
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
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];

        // Verificação de tipo de arquivo
        if (!file.type.startsWith("image/")) {
          setError("Por favor, envie apenas arquivos de imagem.");
          return;
        }

        setIsUploading(true);
        setError(null); // Limpa qualquer erro anterior
        const webpUrl = await convertImageToWebP(file);
        setIsUploading(false);

        if (webpUrl) {
          onImageUpload(webpUrl);
        } else {
          setError("Erro ao converter a imagem.");
        }
      }
    },
    [onImageUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] } as Accept,
    disabled: isUploading, // Desabilitar durante o upload
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
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};

export default ImageUpload;
