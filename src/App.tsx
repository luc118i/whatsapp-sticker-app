import { useState } from "react";
import ImageUpload from "./Components/ImageUpload";
import ConfigScreen from "./Components/ConfigScreen";
import SuccessScreen from "./Components/SuccessScreen";

function App() {
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [stickerUrl, setStickerUrl] = useState<string | null>(null);

  const handleImageUpload = (dataUrl: string) => {
    setImageFile(dataUrl);
  };

  const handleStickerCreated = (url: string) => {
    setStickerUrl(url);
  };

  const handleBack = () => {
    setImageFile(null);
    setStickerUrl(null);
  };

  return (
    <>
      {!stickerUrl ? (
        !imageFile ? (
          <ImageUpload onImageUpload={handleImageUpload} />
        ) : (
          <ConfigScreen
            image={imageFile as string}
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
