// Components/ConfigScreen/types.ts
export interface ConfigScreenProps {
  image: string | Blob;
  onBack: () => void;
  onProceed: (processedImage: string) => void;
}
