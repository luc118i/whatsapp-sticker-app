// Components/ConfigScreen/types.ts
export interface ConfigScreenProps {
  image: string;
  onBack: () => void;
  onProceed: (processedImage: string) => void;
}
