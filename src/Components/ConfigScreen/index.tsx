import { useState, useRef } from "react";
import axios from "axios";
import {
  Container,
  PreviewWrapper,
  ControlsWrapper,
  Button,
  ToggleWrapper,
  LoadingOverlay,
  ErrorMessage,
} from "./styles";
import StickerPreview from "./StickerPreview";
import { ConfigScreenProps } from "./types";

const ConfigScreen = ({ image, onProceed }: ConfigScreenProps) => {
  const initialImage =
    image instanceof Blob ? URL.createObjectURL(image) : image;

  const [showBorder, setShowBorder] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [processedImage, setProcessedImage] = useState<string | Blob>(
    initialImage
  );

  const convertToBlob = async (imageSource: string | Blob): Promise<Blob> => {
    return imageSource instanceof Blob
      ? imageSource
      : await fetch(imageSource).then((r) => r.blob());
  };

  const handleError = (err: unknown, customMessage: string) => {
    const message = err instanceof Error ? err.message : "Erro desconhecido";
    setError(`${customMessage}: ${message}`);
  };

  const handleRemoveBackground = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image_file", await convertToBlob(image));
      formData.append("size", "auto");

      const { data } = await axios.post(
        "https://api.remove.bg/v1.0/removebg",
        formData,
        {
          headers: { "X-Api-Key": import.meta.env.VITE_REMOVE_BG_API_KEY },
          responseType: "blob",
        }
      );

      setProcessedImage(URL.createObjectURL(data));
    } catch (err) {
      handleError(err, "Erro ao remover fundo");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProceed = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image_file", await convertToBlob(processedImage));

      const { data } = await axios.post(
        "http://localhost:5000/convert",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (data?.url) {
        onProceed(data.url);
      } else {
        setError("Erro na conversão da imagem.");
      }
    } catch (err) {
      handleError(err, "Erro ao converter imagem");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <PreviewWrapper ref={previewRef}>
        <StickerPreview
          imageUrl={
            typeof processedImage === "string"
              ? processedImage
              : URL.createObjectURL(processedImage)
          }
          showBorder={showBorder}
        />

        {isLoading && <LoadingOverlay>Processando...</LoadingOverlay>}
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </PreviewWrapper>

      <ControlsWrapper>
        <Button onClick={handleRemoveBackground} disabled={isLoading}>
          Remover Fundo
        </Button>

        <ToggleWrapper>
          <label>
            <input
              type="checkbox"
              checked={showBorder}
              onChange={(e) => setShowBorder(e.target.checked)}
            />
            Borda Branca
          </label>
        </ToggleWrapper>

        <Button onClick={handleProceed} $primary>
          Pronto, Criar Figurinha!
        </Button>
      </ControlsWrapper>
    </Container>
  );
};

export default ConfigScreen;
