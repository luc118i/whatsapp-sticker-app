import { useState } from "react";
import ImageUpload from "./Components/ImageUpload";
import ConfigScreen from "./Components/ConfigScreen";
import SuccessScreen from "./Components/SuccessScreen";

function App() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [stickerUrl, setStickerUrl] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    setImageFile(file);
  };

  const handleStickerCreated = (url: string) => {
    setStickerUrl(url);
  };

  const handleBack = () => {
    setImageFile(null); // Resetar a imagem
    setStickerUrl(null); // Resetar a figurinha gerada
  };

  return (
    <>
      {!stickerUrl ? (
        !imageFile ? (
          <ImageUpload onImageUpload={handleImageUpload} />
        ) : (
          <ConfigScreen
            image={imageFile}
            onBack={handleBack}
            onProceed={handleStickerCreated}
          />
        )
      ) : (
        <SuccessScreen stickerUrl={stickerUrl} />
      )}
    </>
  );
}

export default App;
