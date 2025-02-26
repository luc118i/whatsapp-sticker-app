// Components/ConfigScreen/types.ts
export interface ConfigScreenProps {
  image: File;
  onBack: () => void;
  onProceed: (processedImage: string) => void;
}
