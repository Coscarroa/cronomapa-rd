export interface MinerdWorksheetGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
  currentYear?: number;
  initialEpochKey?: string | null;
  activeFeatureTitle?: string | null;
  activeProvinceName?: string | null;
}

export default function MinerdWorksheetGenerator(
  props: MinerdWorksheetGeneratorProps,
): JSX.Element | null;
