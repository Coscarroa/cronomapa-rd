import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Award,
  CheckCircle2,
  Clock,
  Flame,
  HelpCircle,
  MapPin,
  Pause,
  Play,
  Plus,
  RotateCcw,
  Shield,
  Swords,
  Trophy,
  Users,
  X,
  XCircle,
  Zap,
} from 'lucide-react';
import {
  buildTriviaRoundQuestions,
  getSuggestedTriviaEpochForYear,
  TRIVIA_EPOCH_OPTIONS,
} from '../../data/triviaQuestionsData.js';

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];
const QUESTION_TIME_LIMIT = 30;

export default function ClassroomTriviaModal({
  isOpen,
  onClose,
  currentYear = 2026,
  onFocusMapLocation,
}) {
  const suggestedEpoch = useMemo(
    () => getSuggestedTriviaEpochForYear(currentYear),
    [currentYear],
  );

  // Fase: 'setup' | 'playing' | 'podium'
  const [stage, setStage] = useState('setup');
  const [selectedEpoch, setSelectedEpoch] = useState(suggestedEpoch);
  const [gameMode, setGameMode] = useState('teams'); // 'individual' | 'teams'
  const [questionCount, setQuestionCount] = useState(5);
  const [timerEnabled, setTimerEnabled] = useState(true);

  // Estado de la partida activa
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null); // 0..3 | 'timeout' | null
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_LIMIT);
  const [isTimerPaused, setIsTimerPaused] = useState(false);

  // Puntajes y seguimiento pedagógico
  const [individualScore, setIndividualScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [teamBlueScore, setTeamBlueScore] = useState(0); // Trinitarios
  const [teamRedScore, setTeamRedScore] = useState(0); // Restauradores
  const [activeTeamTurn, setActiveTeamTurn] = useState('blue'); // 'blue' | 'red'
  const [masteredTopics, setMasteredTopics] = useState([]);
  const [reviewTopics, setReviewTopics] = useState([]);

  useEffect(() => {
    if (isOpen && stage === 'setup') {
      setSelectedEpoch(getSuggestedTriviaEpochForYear(currentYear));
    }
  }, [isOpen, currentYear, stage]);

  const currentQuestion = questions[currentIndex] || null;
  const isAnswered = selectedOption !== null;

  const startNewRound = useCallback(() => {
    const roundList = buildTriviaRoundQuestions(selectedEpoch, questionCount);
    setQuestions(roundList);
    setCurrentIndex(0);
    setSelectedOption(null);
    setTimeLeft(QUESTION_TIME_LIMIT);
    setIsTimerPaused(false);
    setIndividualScore(0);
    setStreak(0);
    setTeamBlueScore(0);
    setTeamRedScore(0);
    setActiveTeamTurn('blue');
    setMasteredTopics([]);
    setReviewTopics([]);
    setStage('playing');
  }, [selectedEpoch, questionCount]);

  const handleSelectOption = useCallback(
    (optionIndex) => {
      if (stage !== 'playing' || !currentQuestion || selectedOption !== null) return;

      setSelectedOption(optionIndex);
      setIsTimerPaused(true);

      const isCorrect = optionIndex === currentQuestion.respuestaCorrecta;
      if (isCorrect) {
        setIndividualScore((s) => s + 100);
        setStreak((st) => st + 1);
        if (gameMode === 'teams') {
          if (activeTeamTurn === 'blue') {
            setTeamBlueScore((s) => s + 100);
          } else {
            setTeamRedScore((s) => s + 100);
          }
        }
        setMasteredTopics((prev) =>
          prev.includes(currentQuestion.tema) ? prev : [...prev, currentQuestion.tema],
        );
      } else {
        setStreak(0);
        setReviewTopics((prev) =>
          prev.includes(currentQuestion.tema) ? prev : [...prev, currentQuestion.tema],
        );
      }
    },
    [stage, currentQuestion, selectedOption, gameMode, activeTeamTurn],
  );

  const handleNextQuestion = useCallback(() => {
    if (stage !== 'playing') return;
    if (currentIndex + 1 >= questions.length) {
      setStage('podium');
      return;
    }
    setCurrentIndex((idx) => idx + 1);
    setSelectedOption(null);
    setTimeLeft(QUESTION_TIME_LIMIT);
    setIsTimerPaused(false);
    if (gameMode === 'teams') {
      setActiveTeamTurn((turn) => (turn === 'blue' ? 'red' : 'blue'));
    }
  }, [stage, currentIndex, questions.length, gameMode]);

  // Temporizador visual de 30 segundos
  useEffect(() => {
    if (!isOpen || stage !== 'playing' || !timerEnabled || isTimerPaused || isAnswered) {
      return;
    }
    if (timeLeft <= 0) {
      setSelectedOption('timeout');
      setStreak(0);
      if (currentQuestion) {
        setReviewTopics((prev) =>
          prev.includes(currentQuestion.tema) ? prev : [...prev, currentQuestion.tema],
        );
      }
      return;
    }

    const timer = window.setTimeout(() => {
      setTimeLeft((t) => Math.max(0, t - 1));
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [isOpen, stage, timerEnabled, isTimerPaused, isAnswered, timeLeft, currentQuestion]);

  // Atajos de teclado para el docente (1-4 / A-D para elegir opción, Espacio/Enter para avanzar)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (stage !== 'playing') return;

      const key = e.key.toUpperCase();
      if (!isAnswered) {
        if (key === '1' || key === 'A') {
          e.preventDefault();
          handleSelectOption(0);
        } else if (key === '2' || key === 'B') {
          e.preventDefault();
          handleSelectOption(1);
        } else if (key === '3' || key === 'C') {
          e.preventDefault();
          handleSelectOption(2);
        } else if (key === '4' || key === 'D') {
          e.preventDefault();
          handleSelectOption(3);
        } else if (key === 'P') {
          e.preventDefault();
          setIsTimerPaused((p) => !p);
        }
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleNextQuestion();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, stage, isAnswered, handleSelectOption, handleNextQuestion, onClose]);

  if (!isOpen) return null;

  const timerProgressPct = Math.max(0, Math.min(100, (timeLeft / QUESTION_TIME_LIMIT) * 100));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdi-trivia-modal-title"
      className="fixed inset-0 z-[1180] bg-[#0D0F12]/92 backdrop-blur-xl flex flex-col items-center justify-center p-3 sm:p-6 overflow-y-auto select-none print:hidden"
    >
      <div className="w-full max-w-5xl bg-[#161920] border-2 border-[#D4AF37]/60 rounded-2xl shadow-[0_28px_80px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col max-h-[94vh]">
        {/* ENCABEZADO SUPERIOR PDI */}
        <header className="px-5 sm:px-7 py-4 bg-[#0D0F12]/90 border-b border-[#C5A059]/30 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-10 h-10 rounded-xl bg-[#D4AF37] text-[#0D0F12] flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
              <Zap className="w-6 h-6 fill-current" />
            </span>
            <div className="min-w-0">
              <div className="text-xs font-mono-tabular uppercase tracking-[0.18em] text-[#C5A059] font-semibold">
                Evaluación Formativa PDI · Cierre de Clase (5 min)
              </div>
              <h2
                id="pdi-trivia-modal-title"
                className="font-display text-lg sm:text-2xl font-bold text-[#F4F1EA] truncate"
              >
                Desafío Rápido en Clase — CronoMapa RD
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {stage !== 'setup' && (
              <button
                type="button"
                onClick={() => setStage('setup')}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[#C5A059]/40 bg-[#161920] hover:border-[#D4AF37] text-xs sm:text-sm font-semibold text-[#F4F1EA] transition-colors"
              >
                <RotateCcw className="w-4 h-4 text-[#D4AF37]" />
                <span className="hidden sm:inline">Configurar</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar Desafío Rápido"
              className="min-w-[42px] min-h-[42px] flex items-center justify-center rounded-xl border border-[#C5A059]/35 bg-[#0D0F12] text-[#A39E93] hover:text-[#F4F1EA] hover:border-[#D4AF37] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* ================= FASE 1: CONFIGURACIÓN RÁPIDA EN 1 CLIC ================= */}
        {stage === 'setup' && (
          <div className="p-6 sm:p-8 space-y-6 overflow-y-auto gis-scroll text-[#F4F1EA]">
            {/* 1. Selector de Época */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <label className="text-sm sm:text-base font-semibold text-[#D4AF37]">
                  1. Época Histórica (Sincronizada con el mapa)
                </label>
                <span className="text-xs font-mono-tabular text-[#A39E93]">
                  Año en visor: {currentYear}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {TRIVIA_EPOCH_OPTIONS.map((ep) => {
                  const active = selectedEpoch === ep.id;
                  return (
                    <button
                      key={ep.id}
                      type="button"
                      onClick={() => setSelectedEpoch(ep.id)}
                      aria-pressed={active}
                      className={`px-4 py-3 rounded-xl border text-left transition-all ${
                        active
                          ? 'bg-[#D4AF37] text-[#0D0F12] border-[#D4AF37] font-bold shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                          : 'bg-[#0D0F12]/80 text-[#F4F1EA] border-[#C5A059]/30 hover:border-[#D4AF37]'
                      }`}
                    >
                      <div className="text-sm sm:text-base leading-snug">{ep.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Selector de Modalidad de Aula */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2.5">
                <span className="block text-sm sm:text-base font-semibold text-[#D4AF37]">
                  2. Modalidad de Participación en el Aula
                </span>
                <div className="grid grid-cols-1 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setGameMode('teams')}
                    aria-pressed={gameMode === 'teams'}
                    className={`p-4 rounded-xl border text-left flex items-start gap-3.5 transition-all ${
                      gameMode === 'teams'
                        ? 'bg-[#1D3557] text-[#F4F1EA] border-[#D4AF37] ring-1 ring-[#D4AF37]'
                        : 'bg-[#0D0F12]/80 text-[#F4F1EA]/85 border-[#C5A059]/30 hover:border-[#D4AF37]'
                    }`}
                  >
                    <Swords className="w-6 h-6 text-[#D4AF37] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-base font-bold text-[#F4F1EA]">
                        Duelo de Equipos (Trinitarios vs. Restauradores)
                      </div>
                      <div className="text-xs sm:text-sm text-[#A39E93] mt-0.5">
                        Divide el salón en Equipo Azul y Equipo Rojo con marcadores gigantes en vivo.
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setGameMode('individual')}
                    aria-pressed={gameMode === 'individual'}
                    className={`p-4 rounded-xl border text-left flex items-start gap-3.5 transition-all ${
                      gameMode === 'individual'
                        ? 'bg-[#1D3557] text-[#F4F1EA] border-[#D4AF37] ring-1 ring-[#D4AF37]'
                        : 'bg-[#0D0F12]/80 text-[#F4F1EA]/85 border-[#C5A059]/30 hover:border-[#D4AF37]'
                    }`}
                  >
                    <Users className="w-6 h-6 text-[#D4AF37] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-base font-bold text-[#F4F1EA]">
                        Juego Individual / Mano Alzada
                      </div>
                      <div className="text-xs sm:text-sm text-[#A39E93] mt-0.5">
                        Participación grupal a mano alzada con contador de aciertos y racha de clase.
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* 3. Cantidad de Preguntas y Temporizador */}
              <div className="space-y-4">
                <div className="space-y-2.5">
                  <span className="block text-sm sm:text-base font-semibold text-[#D4AF37]">
                    3. Extensión del Desafío
                  </span>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { count: 5, title: '5 Preguntas Rápidas', sub: 'Ideal cierre de 5 min' },
                      { count: 10, title: '10 Preguntas', sub: 'Repaso completo de unidad' },
                    ].map((opt) => (
                      <button
                        key={opt.count}
                        type="button"
                        onClick={() => setQuestionCount(opt.count)}
                        aria-pressed={questionCount === opt.count}
                        className={`p-3.5 rounded-xl border text-left transition-all ${
                          questionCount === opt.count
                            ? 'bg-[#D4AF37] text-[#0D0F12] border-[#D4AF37] font-bold'
                            : 'bg-[#0D0F12]/80 text-[#F4F1EA] border-[#C5A059]/30 hover:border-[#D4AF37]'
                        }`}
                      >
                        <div className="text-base font-bold">{opt.title}</div>
                        <div
                          className={`text-xs mt-0.5 ${
                            questionCount === opt.count ? 'text-[#0D0F12]/80' : 'text-[#A39E93]'
                          }`}
                        >
                          {opt.sub}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0D0F12]/80 border border-[#C5A059]/30 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm sm:text-base font-semibold text-[#F4F1EA]">
                      Temporizador de 30 segundos por pregunta
                    </div>
                    <div className="text-xs text-[#A39E93]">
                      Incluye botón en pantalla para pausar y debatir con los alumnos
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setTimerEnabled((prev) => !prev)}
                    aria-pressed={timerEnabled}
                    className={`px-3.5 py-2 rounded-lg text-xs font-bold border transition-colors ${
                      timerEnabled
                        ? 'bg-[#D4AF37] text-[#0D0F12] border-[#D4AF37]'
                        : 'bg-[#161920] text-[#A39E93] border-[#C5A059]/30'
                    }`}
                  >
                    {timerEnabled ? 'Activo (30s)' : 'Sin límite'}
                  </button>
                </div>
              </div>
            </div>

            {/* Botón de Inicio */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-[#C5A059]/25">
              <div className="text-xs sm:text-sm text-[#A39E93]">
                Atajos de teclado para el profesor: teclas{' '}
                <strong className="text-[#F4F1EA]">A, B, C, D</strong> (o{' '}
                <strong className="text-[#F4F1EA]">1–4</strong>) para responder y{' '}
                <strong className="text-[#F4F1EA]">Espacio / Enter</strong> para avanzar.
              </div>

              <button
                type="button"
                onClick={startNewRound}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#C5A059] text-[#0D0F12] text-base sm:text-lg font-bold shadow-[0_10px_30px_rgba(212,175,55,0.4)] transition-all cursor-pointer"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>¡Iniciar Desafío en la PDI!</span>
              </button>
            </div>
          </div>
        )}

        {/* ================= FASE 2: PANTALLA DE PREGUNTA PROYECTABLE ================= */}
        {stage === 'playing' && currentQuestion && (
          <div className="flex-1 overflow-y-auto gis-scroll p-5 sm:p-7 space-y-5 text-[#F4F1EA]">
            {/* Barra de Marcadores (Duelo de Equipos o Individual) + Temporizador */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                {/* Indicador de progreso */}
                <div className="flex items-center gap-3">
                  <span className="px-3.5 py-1.5 rounded-lg bg-[#0D0F12] border border-[#D4AF37]/50 font-mono-tabular text-sm sm:text-base font-bold text-[#D4AF37]">
                    Pregunta {currentIndex + 1} / {questions.length}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-[#C5A059]">
                    {currentQuestion.epocaLabel}
                  </span>
                </div>

                {/* Marcadores de Puntaje */}
                {gameMode === 'teams' ? (
                  <div className="flex items-center gap-3">
                    {/* Equipo Azul: Trinitarios */}
                    <div
                      onClick={() => setActiveTeamTurn('blue')}
                      title="Clic para asignar turno al Equipo Trinitarios"
                      className={`cursor-pointer flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl border-2 transition-all ${
                        activeTeamTurn === 'blue'
                          ? 'bg-[#1D3557] border-[#D4AF37] shadow-[0_0_18px_rgba(69,123,157,0.5)] scale-[1.03]'
                          : 'bg-[#0D0F12]/80 border-[#457B9D]/40 opacity-80'
                      }`}
                    >
                      <Shield className="w-4 h-4 text-[#60A5FA]" />
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-[#93C5FD] font-bold">
                          Eq. Azul · Trinitarios {activeTeamTurn === 'blue' ? '● Turno' : ''}
                        </div>
                        <div className="font-mono-tabular text-base sm:text-xl font-bold text-[#F4F1EA]">
                          {teamBlueScore} pts
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setTeamBlueScore((s) => s + 50);
                        }}
                        title="Sumar +50 pts extra por debate"
                        className="p-1 rounded bg-black/30 hover:bg-black/60 text-xs text-[#D4AF37]"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Equipo Rojo: Restauradores */}
                    <div
                      onClick={() => setActiveTeamTurn('red')}
                      title="Clic para asignar turno al Equipo Restauradores"
                      className={`cursor-pointer flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl border-2 transition-all ${
                        activeTeamTurn === 'red'
                          ? 'bg-[#9B2226] border-[#D4AF37] shadow-[0_0_18px_rgba(230,57,70,0.5)] scale-[1.03]'
                          : 'bg-[#0D0F12]/80 border-[#E63946]/40 opacity-80'
                      }`}
                    >
                      <Flame className="w-4 h-4 text-[#FCA5A5]" />
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-[#FECACA] font-bold">
                          Eq. Rojo · Restauradores {activeTeamTurn === 'red' ? '● Turno' : ''}
                        </div>
                        <div className="font-mono-tabular text-base sm:text-xl font-bold text-[#F4F1EA]">
                          {teamRedScore} pts
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setTeamRedScore((s) => s + 50);
                        }}
                        title="Sumar +50 pts extra por debate"
                        className="p-1 rounded bg-black/30 hover:bg-black/60 text-xs text-[#D4AF37]"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="px-4 py-1.5 rounded-xl bg-[#0D0F12] border border-[#C5A059]/40 flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-[#D4AF37]" />
                      <span className="font-mono-tabular text-base sm:text-xl font-bold text-[#F4F1EA]">
                        {individualScore} pts
                      </span>
                    </div>
                    {streak > 1 && (
                      <div className="px-3 py-1.5 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37] font-mono-tabular text-sm font-bold text-[#D4AF37]">
                        🔥 Racha x{streak}
                      </div>
                    )}
                  </div>
                )}

                {/* Control de Tiempo (30 segundos) */}
                {timerEnabled && (
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-mono-tabular text-base sm:text-lg font-bold px-3 py-1 rounded-lg border ${
                        timeLeft <= 8 && !isAnswered
                          ? 'bg-[#9B2226] text-[#F4F1EA] border-[#E63946]'
                          : 'bg-[#0D0F12] text-[#D4AF37] border-[#C5A059]/40'
                      }`}
                    >
                      <Clock className="w-4 h-4 inline mr-1.5 -mt-0.5" />
                      {timeLeft}s
                    </span>

                    {!isAnswered && (
                      <button
                        type="button"
                        onClick={() => setIsTimerPaused((p) => !p)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#C5A059]/40 bg-[#0D0F12] hover:border-[#D4AF37] text-xs sm:text-sm font-semibold text-[#F4F1EA]"
                      >
                        {isTimerPaused ? (
                          <>
                            <Play className="w-3.5 h-3.5 text-[#D4AF37] fill-current" />
                            <span>Reanudar tiempo</span>
                          </>
                        ) : (
                          <>
                            <Pause className="w-3.5 h-3.5 text-[#D4AF37]" />
                            <span>Pausar tiempo</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Barra de Progreso Dorada del Temporizador */}
              {timerEnabled && (
                <div className="w-full h-2.5 bg-[#0D0F12] rounded-full overflow-hidden border border-[#C5A059]/25">
                  <div
                    className="h-full transition-all duration-500 ease-linear"
                    style={{
                      width: `${timerProgressPct}%`,
                      backgroundColor: timeLeft <= 8 ? '#E63946' : '#D4AF37',
                    }}
                  />
                </div>
              )}
            </div>

            {/* TARJETA DE PREGUNTA DE ALTO IMPACTO PARA LECTURA A 5–7 METROS */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0D0F12]/90 border border-[#C5A059]/40 shadow-inner">
              <p
                style={{ textWrap: 'balance' }}
                className="font-display text-2xl md:text-3xl font-semibold text-[#F4F1EA] leading-snug"
              >
                {currentQuestion.pregunta}
              </p>
            </div>

            {/* 4 TARJETAS TÁCTILES GIGANTES (A, B, C, D) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {currentQuestion.opciones.map((opcion, idx) => {
                const isCorrectOption = idx === currentQuestion.respuestaCorrecta;
                const isChosenOption = selectedOption === idx;

                let cardStyle =
                  'bg-[#0D0F12]/85 border-[#C5A059]/40 text-[#F4F1EA] hover:border-[#D4AF37] hover:bg-[#C5A059]/10';
                let badgeStyle = 'bg-[#D4AF37] text-[#0D0F12]';

                if (isAnswered) {
                  if (isCorrectOption) {
                    cardStyle =
                      'bg-emerald-950/90 border-2 border-emerald-400 text-[#F4F1EA] shadow-[0_0_25px_rgba(16,185,129,0.35)]';
                    badgeStyle = 'bg-emerald-400 text-[#0D0F12]';
                  } else if (isChosenOption) {
                    cardStyle =
                      'bg-[#9B2226]/90 border-2 border-[#E63946] text-[#F4F1EA]';
                    badgeStyle = 'bg-[#E63946] text-[#F4F1EA]';
                  } else {
                    cardStyle =
                      'bg-[#0D0F12]/40 border-[#C5A059]/15 text-[#A39E93] opacity-60';
                    badgeStyle = 'bg-[#161920] text-[#A39E93]';
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`min-h-[76px] p-4 sm:p-5 rounded-xl border text-left flex items-center justify-between gap-4 transition-all duration-150 cursor-pointer disabled:cursor-default ${cardStyle}`}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span
                        className={`w-11 h-11 rounded-xl font-mono-tabular text-lg md:text-xl font-bold flex items-center justify-center shrink-0 shadow-md ${badgeStyle}`}
                      >
                        {OPTION_LETTERS[idx]}
                      </span>
                      <span className="text-lg md:text-xl font-semibold leading-snug">
                        {opcion}
                      </span>
                    </div>

                    {isAnswered && isCorrectOption && (
                      <span className="flex items-center gap-1.5 text-sm font-bold text-emerald-300 shrink-0">
                        <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                        <span className="hidden sm:inline">Correcta</span>
                      </span>
                    )}

                    {isAnswered && isChosenOption && !isCorrectOption && (
                      <span className="flex items-center gap-1.5 text-sm font-bold text-red-200 shrink-0">
                        <XCircle className="w-6 h-6 text-red-300 shrink-0" />
                        <span className="hidden sm:inline">Incorrecta</span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* TARJETA DE EXPLICACIÓN HISTÓRICA Y BOTÓN "📍 VER LUGAR EN EL MAPA" */}
            {isAnswered && (
              <div className="p-5 rounded-xl bg-[#0D0F12]/95 border-2 border-[#D4AF37]/60 space-y-3 shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-sm sm:text-base font-bold">
                    {selectedOption === currentQuestion.respuestaCorrecta ? (
                      <span className="text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>¡Respuesta Correcta! (+100 puntos)</span>
                      </span>
                    ) : selectedOption === 'timeout' ? (
                      <span className="text-[#D4AF37] flex items-center gap-1.5">
                        <Clock className="w-5 h-5" />
                        <span>Tiempo agotado · Explicación Histórica</span>
                      </span>
                    ) : (
                      <span className="text-[#E63946] flex items-center gap-1.5">
                        <HelpCircle className="w-5 h-5" />
                        <span>
                          Respuesta correcta: Opción{' '}
                          {OPTION_LETTERS[currentQuestion.respuestaCorrecta]}
                        </span>
                      </span>
                    )}
                  </div>

                  <span className="text-xs font-mono-tabular text-[#C5A059]">
                    Tema: {currentQuestion.tema}
                  </span>
                </div>

                <p className="text-base sm:text-lg text-[#F4F1EA]/95 leading-relaxed">
                  {currentQuestion.explicacionDidactica}
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                  {currentQuestion.coordenadasMapa && onFocusMapLocation ? (
                    <button
                      type="button"
                      onClick={() => {
                        onFocusMapLocation(currentQuestion.coordenadasMapa);
                        onClose();
                      }}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#D4AF37] bg-[#161920] hover:bg-[#C5A059]/20 text-sm sm:text-base font-semibold text-[#D4AF37] transition-colors cursor-pointer"
                    >
                      <MapPin className="w-4 h-4 shrink-0" />
                      <span>
                        📍 Ver lugar en el mapa
                        {currentQuestion.coordenadasMapa.label
                          ? `: ${currentQuestion.coordenadasMapa.label}`
                          : ''}
                      </span>
                    </button>
                  ) : (
                    <span />
                  )}

                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#C5A059] text-[#0D0F12] text-base sm:text-lg font-bold shadow-lg transition-colors cursor-pointer"
                  >
                    <span>
                      {currentIndex + 1 >= questions.length
                        ? 'Ver Podio Final →'
                        : 'Siguiente Pregunta →'}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= FASE 3: PODIO Y CIERRE PEDAGÓGICO ================= */}
        {stage === 'podium' && (
          <div className="p-6 sm:p-8 space-y-6 overflow-y-auto gis-scroll text-[#F4F1EA]">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#D4AF37] text-[#0D0F12] shadow-[0_0_35px_rgba(212,175,55,0.5)] mb-1">
                <Trophy className="w-9 h-9" />
              </div>

              {gameMode === 'teams' ? (
                <>
                  <h3 className="font-display text-2xl sm:text-4xl font-bold text-[#F4F1EA]">
                    {teamBlueScore > teamRedScore
                      ? '¡Victoria del Equipo Azul (Trinitarios)!'
                      : teamRedScore > teamBlueScore
                        ? '¡Victoria del Equipo Rojo (Restauradores)!'
                        : '¡Empate Patriótico entre Trinitarios y Restauradores!'}
                  </h3>
                  <p className="text-sm sm:text-base text-[#A39E93]">
                    Excelente cierre formativo de Ciencias Sociales en la Pizarra Digital
                  </p>
                </>
              ) : (
                <>
                  <h3 className="font-display text-2xl sm:text-4xl font-bold text-[#F4F1EA]">
                    ¡Desafío Completado! · {individualScore} Puntos
                  </h3>
                  <p className="text-sm sm:text-base text-[#A39E93]">
                    Aciertos de la clase: {masteredTopics.length} de {questions.length} preguntas
                  </p>
                </>
              )}
            </div>

            {/* Tarjetas de Marcador Final */}
            {gameMode === 'teams' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  className={`p-5 rounded-2xl border-2 text-center ${
                    teamBlueScore >= teamRedScore
                      ? 'bg-[#1D3557]/90 border-[#D4AF37]'
                      : 'bg-[#0D0F12]/80 border-[#457B9D]/40'
                  }`}
                >
                  <div className="text-xs uppercase tracking-widest text-[#93C5FD] font-bold">
                    Equipo Azul · Trinitarios
                  </div>
                  <div className="font-mono-tabular text-3xl sm:text-4xl font-bold text-[#F4F1EA] mt-1">
                    {teamBlueScore} pts
                  </div>
                </div>

                <div
                  className={`p-5 rounded-2xl border-2 text-center ${
                    teamRedScore >= teamBlueScore
                      ? 'bg-[#9B2226]/90 border-[#D4AF37]'
                      : 'bg-[#0D0F12]/80 border-[#E63946]/40'
                  }`}
                >
                  <div className="text-xs uppercase tracking-widest text-[#FECACA] font-bold">
                    Equipo Rojo · Restauradores
                  </div>
                  <div className="font-mono-tabular text-3xl sm:text-4xl font-bold text-[#F4F1EA] mt-1">
                    {teamRedScore} pts
                  </div>
                </div>
              </div>
            )}

            {/* Resumen de Temas Dominados y por Reforzar */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#0D0F12]/80 border border-emerald-500/40 space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
                  <Award className="w-4 h-4" />
                  <span>Temas Históricos Dominados ({masteredTopics.length})</span>
                </div>
                {masteredTopics.length > 0 ? (
                  <ul className="space-y-1.5 text-xs sm:text-sm text-[#F4F1EA]/90">
                    {masteredTopics.map((topic) => (
                      <li key={topic} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-[#A39E93]">
                    Juega otra ronda para registrar competencias dominadas.
                  </p>
                )}
              </div>

              <div className="p-4 rounded-xl bg-[#0D0F12]/80 border border-[#C5A059]/35 space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-[#D4AF37]">
                  <HelpCircle className="w-4 h-4" />
                  <span>Temas Sugeridos para Repaso en el Mapa ({reviewTopics.length})</span>
                </div>
                {reviewTopics.length > 0 ? (
                  <ul className="space-y-1.5 text-xs sm:text-sm text-[#F4F1EA]/90">
                    {reviewTopics.map((topic) => (
                      <li key={topic}>· {topic}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-emerald-300">
                    ¡Pleno absoluto! El grupo respondió correctamente todas las preguntas de la ronda.
                  </p>
                )}
              </div>
            </div>

            {/* Botones de Acción Final */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={startNewRound}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#C5A059] text-[#0D0F12] text-base font-bold shadow-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Jugar otra ronda</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-[#C5A059]/50 bg-[#0D0F12] hover:border-[#D4AF37] text-[#F4F1EA] text-base font-semibold transition-colors cursor-pointer"
              >
                <span>Volver al Atlas</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
