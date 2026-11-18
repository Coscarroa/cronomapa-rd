import type { WhiteboardToolMode } from '../ui/TeacherToolbar';

export interface WhiteboardCanvasOverlayProps {
  tool: WhiteboardToolMode;
  strokeColor: string;
  clearNonce?: number;
  undoNonce?: number;
  onStrokesChange?: (count: number) => void;
  onSelectTool?: (tool: WhiteboardToolMode) => void;
  onSelectColor?: (hex: string) => void;
  onRequestClear?: () => void;
  onRequestUndo?: () => void;
}

export default function WhiteboardCanvasOverlay(
  props: WhiteboardCanvasOverlayProps,
): JSX.Element;
