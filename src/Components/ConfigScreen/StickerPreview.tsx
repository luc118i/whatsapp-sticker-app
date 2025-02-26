// Components/ConfigScreen/StickerPreview.tsx
import { PreviewImage, BorderOverlay } from "./styles";

interface StickerPreviewProps {
  imageUrl: string;
  showBorder: boolean;
}

const StickerPreview = ({ imageUrl, showBorder }: StickerPreviewProps) => {
  return (
    <>
      <PreviewImage src={imageUrl} alt="Prévia da Figurinha" />
      {showBorder && <BorderOverlay />}
    </>
  );
};

export default StickerPreview;
