import type { PrimarySourceCapsule } from '../../data/primarySourcesData';

export interface PrimarySourceCapsuleContentProps {
  capsule: PrimarySourceCapsule;
  onOpenWorksheetModal?: (epochKey?: string) => void;
  onSyncMapYear?: (year: number) => void;
  compact?: boolean;
}

export declare function PrimarySourceCapsuleContent(
  props: PrimarySourceCapsuleContentProps,
): JSX.Element | null;

export interface PrimarySourceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentYear?: number;
  onSelectYear?: (year: number) => void;
  onOpenWorksheetModal?: (epochKey?: string) => void;
}

export default function PrimarySourceDrawer(
  props: PrimarySourceDrawerProps,
): JSX.Element | null;
