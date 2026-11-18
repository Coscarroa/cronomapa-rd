import type { TriviaMapCoordinate } from '../../data/triviaQuestionsData';

export interface ClassroomTriviaModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentYear?: number;
  onFocusMapLocation?: (location: TriviaMapCoordinate) => void;
}

export default function ClassroomTriviaModal(
  props: ClassroomTriviaModalProps,
): JSX.Element | null;
