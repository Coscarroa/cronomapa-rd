export type WhiteboardToolMode = 'navigate' | 'pen' | 'highlighter';

export interface TeacherToolbarProps {
  sidebarOpen?: boolean;
  isPdiMode?: boolean;
  onTogglePdiMode: () => void;
  whiteboardTool: WhiteboardToolMode;
  onChangeWhiteboardTool: (tool: WhiteboardToolMode) => void;
  strokeColor: string;
  onChangeStrokeColor: (hex: string) => void;
  onClearWhiteboard: () => void;
  onUndoWhiteboard?: () => void;
  hasStrokes?: boolean;
  primarySourceOpen?: boolean;
  onTogglePrimarySource: () => void;
  onOpenWorksheetModal: () => void;
  onOpenTriviaModal?: () => void;
  activeEpochLabel?: string;
}

export declare const TACTICAL_COLORS: {
  id: string;
  hex: string;
  label: string;
  shortLabel: string;
}[];

export default function TeacherToolbar(props: TeacherToolbarProps): JSX.Element;
