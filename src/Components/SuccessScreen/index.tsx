// Components/SuccessScreen/index.tsx
import { ClipboardButton, Container, StickerPreview } from "./styles";

const SuccessScreen = ({ stickerUrl }: { stickerUrl: string }) => {
  const copyToClipboard = async () => {
    try {
      const response = await fetch(stickerUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob }),
      ]);
      alert("Figurinha copiada! Cole no WhatsApp!");
    } catch (error) {
      alert("Erro ao copiar!");
    }
  };

  return (
    <Container>
      <h2>Figurinha Criada!</h2>
      {stickerUrl ? (
        <>
          <StickerPreview src={stickerUrl} alt="Figurinha Final" />
          <ClipboardButton onClick={copyToClipboard}>
            Copiar Figurinha
          </ClipboardButton>
        </>
      ) : (
        <p>Erro ao carregar a figurinha.</p>
      )}
    </Container>
  );
};

export default SuccessScreen;
