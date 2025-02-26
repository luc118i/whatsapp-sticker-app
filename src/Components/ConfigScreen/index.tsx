// Components/ConfigScreen/index.tsx
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
  const [processedImage, setProcessedImage] = useState<string>(initialImage);
  const [showBorder, setShowBorder] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleRemoveBackground = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      const file =
        image instanceof Blob
          ? image
          : await fetch(image).then((r) => r.blob());
      formData.append("image_file", file);
      formData.append("size", "auto");

      const response = await axios.post(
        "https://api.remove.bg/v1.0/removebg",
        formData,
        {
          headers: {
            "X-Api-Key": import.meta.env.VITE_REMOVE_BG_API_KEY,
          },
          responseType: "blob",
        }
      );

      const imageUrl = URL.createObjectURL(response.data);
      setProcessedImage(imageUrl);
    } catch (err) {
      setError(
        `Erro ao remover fundo: ${
          err instanceof Error ? err.message : "Erro desconhecido"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleProceed = () => {
    // Passa a URL da figurinha processada para o componente pai
    onProceed(processedImage);
  };

  return (
    <Container>
      <PreviewWrapper ref={previewRef}>
        <StickerPreview imageUrl={processedImage} showBorder={showBorder} />

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
