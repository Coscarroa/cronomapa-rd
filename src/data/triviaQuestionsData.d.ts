export type TriviaEpochId =
  | 'all'
  | '1492'
  | 'colonia'
  | '1844'
  | 'restauracion'
  | 'siglo_xx'
  | 'actualidad';

export interface TriviaMapCoordinate {
  lat: number;
  lng: number;
  zoom: number;
  label?: string;
}

export interface TriviaQuestionItem {
  id: string;
  epocaId: Exclude<TriviaEpochId, 'all'>;
  epocaLabel: string;
  tema: string;
  pregunta: string;
  opciones: [string, string, string, string];
  respuestaCorrecta: number;
  explicacionDidactica: string;
  coordenadasMapa?: TriviaMapCoordinate;
}

export declare const TRIVIA_EPOCH_OPTIONS: {
  id: TriviaEpochId;
  label: string;
  shortLabel: string;
}[];

export declare const TRIVIA_QUESTIONS: TriviaQuestionItem[];

export declare function getSuggestedTriviaEpochForYear(year: number): TriviaEpochId;

export declare function buildTriviaRoundQuestions(
  epocaId?: TriviaEpochId,
  count?: number,
): TriviaQuestionItem[];
