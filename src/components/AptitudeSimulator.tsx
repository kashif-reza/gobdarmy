import React, { useState, useEffect, useRef } from 'react';
import { SIMULATOR_QUESTIONS, SimulatorQuestion } from '../data/simulatorData';
import { soundEngine } from '../utils/audio';
import {
  Timer,
  Volume2,
  VolumeX,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Award,
  RotateCcw,
  Shield,
  ArrowRight,
  Flame,
  Clock,
  Eye,
  Maximize2,
} from 'lucide-react';

interface AptitudeSimulatorProps {
  onClose?: () => void;
}

export const AptitudeSimulator: React.FC<AptitudeSimulatorProps> = ({ onClose }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(SIMULATOR_QUESTIONS[0].timeLimitSeconds);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [userAnswers, setUserAnswers] = useState<Array<{ questionId: string; selected: number; correct: boolean }>>([]);
  const [isExamCompleted, setIsExamCompleted] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  const currentQ: SimulatorQuestion = SIMULATOR_QUESTIONS[currentQuestionIndex];
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync soundEngine enabled state
  useEffect(() => {
    soundEngine.enabled = soundEnabled;
  }, [soundEnabled]);

  // Main countdown timer loop
  useEffect(() => {
    if (!isTimerRunning || isAnswerSubmitted || isExamCompleted) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time expired
          handleTimeout();
          return 0;
        }

        // Timer alerts
        if (prev <= 7) {
          // Urgent warning beep
          soundEngine.playTimerWarningAlert();
        } else {
          // Subtle ticking sound
          soundEngine.playTimerTick();
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, isAnswerSubmitted, isExamCompleted, currentQuestionIndex]);

  const handleTimeout = () => {
    if (isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    soundEngine.playTaskError();
    setUserAnswers((prev) => [
      ...prev,
      { questionId: currentQ.id, selected: -1, correct: false },
    ]);
  };

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    soundEngine.playClick();
    setSelectedOption(index);
  };

  const handleConfirmAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);

    const isCorrect = selectedOption === currentQ.correctAnswerIndex;
    if (isCorrect) {
      soundEngine.playTaskComplete();
    } else {
      soundEngine.playTaskError();
    }

    setUserAnswers((prev) => [
      ...prev,
      { questionId: currentQ.id, selected: selectedOption, correct: isCorrect },
    ]);
  };

  const handleNextQuestion = () => {
    soundEngine.playClick();
    if (currentQuestionIndex + 1 < SIMULATOR_QUESTIONS.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setTimeLeft(SIMULATOR_QUESTIONS[currentQuestionIndex + 1].timeLimitSeconds);
      setIsTimerRunning(true);
    } else {
      // Completed Exam
      setIsExamCompleted(true);
      soundEngine.playExamCompletionFanfare();
    }
  };

  const handleRestart = () => {
    soundEngine.playClick();
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setTimeLeft(SIMULATOR_QUESTIONS[0].timeLimitSeconds);
    setIsTimerRunning(true);
    setUserAnswers([]);
    setIsExamCompleted(false);
  };

  const totalScore = userAnswers.filter((a) => a.correct).length;
  const scorePercent = Math.round((totalScore / SIMULATOR_QUESTIONS.length) * 100);

  return (
    <div className="rounded-2xl bg-[#090f0c] border border-stone-800 overflow-hidden shadow-2xl relative">
      {/* Top Simulator HUD Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:px-6 bg-[#0c1511] border-b border-stone-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-800/60 text-[#c5a059]">
            <Shield className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">
              ISSB Armed Forces Selection Board Simulator
            </div>
            <h3 className="text-base font-bold text-stone-100 font-display">
              Officer Aptitude & Reaction Exam (Real-Time Mode)
            </h3>
          </div>
        </div>

        {/* Status HUD & Controls */}
        <div className="flex items-center gap-4">
          {/* Sound Toggle */}
          <button
            onClick={() => {
              const next = !soundEnabled;
              setSoundEnabled(next);
              if (next) soundEngine.playClick();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs transition-colors cursor-pointer ${
              soundEnabled
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60'
                : 'bg-stone-900 text-stone-500 border-stone-800'
            }`}
            title={soundEnabled ? 'Mute Audio Alerts' : 'Enable Audio Alerts'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="font-mono text-[11px]">{soundEnabled ? 'Audio Alert: ON' : 'Muted'}</span>
          </button>

          {/* Real-Time Countdown Badge */}
          {!isExamCompleted && (
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border font-mono text-xs transition-all ${
                timeLeft <= 7
                  ? 'bg-rose-950/80 border-rose-600 text-rose-300 animate-pulse font-bold'
                  : 'bg-stone-900 border-stone-700 text-[#c5a059]'
              }`}
            >
              <Timer className={`w-4 h-4 ${timeLeft <= 7 ? 'text-rose-400' : 'text-[#c5a059]'}`} />
              <span>
                00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Main Examination Viewport */}
      {!isExamCompleted ? (
        <div className="p-6 sm:p-8 space-y-6">
          {/* Progress Strip */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-stone-400 font-mono">
              <span className="text-emerald-400 uppercase">
                Challenge {currentQuestionIndex + 1} of {SIMULATOR_QUESTIONS.length}
              </span>
              <span>{currentQ.category}</span>
            </div>
            <div className="w-full h-1.5 bg-stone-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{
                  width: `${((currentQuestionIndex + 1) / SIMULATOR_QUESTIONS.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Question Scenario & Image Presentation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Realistic Military Reference Image if present */}
            {currentQ.image && (
              <div className="lg:col-span-5 relative rounded-2xl overflow-hidden bg-black/60 border border-stone-800 group aspect-video sm:aspect-4/3 flex items-center justify-center">
                <img
                  src={currentQ.image}
                  alt={currentQ.question}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button
                  onClick={() => setEnlargedImage(currentQ.image || null)}
                  className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-sm border border-stone-700 text-[11px] text-stone-200 hover:text-white"
                  title="Enlarge Tactical Reference"
                >
                  <Maximize2 className="w-3 h-3 text-[#c5a059]" />
                  <span>Enlarge</span>
                </button>
              </div>
            )}

            {/* Right: Question Text and Scenario */}
            <div className={currentQ.image ? 'lg:col-span-7 space-y-4' : 'lg:col-span-12 space-y-4'}>
              {currentQ.scenario && (
                <div className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800 text-xs text-stone-300 leading-relaxed italic">
                  <span className="text-[#c5a059] font-semibold not-italic">Tactical Context: </span>
                  {currentQ.scenario}
                </div>
              )}

              <h4 className="text-base sm:text-lg font-bold text-stone-100 font-display leading-snug">
                {currentQ.question}
              </h4>

              {/* Options */}
              <div className="space-y-2.5 pt-2">
                {currentQ.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQ.correctAnswerIndex;

                  let optionStyle =
                    'bg-stone-900/80 border-stone-800 text-stone-200 hover:bg-stone-800 hover:border-stone-700';

                  if (isAnswerSubmitted) {
                    if (isCorrect) {
                      optionStyle = 'bg-emerald-950/80 border-emerald-600 text-emerald-200 font-semibold';
                    } else if (isSelected && !isCorrect) {
                      optionStyle = 'bg-rose-950/80 border-rose-600 text-rose-200';
                    } else {
                      optionStyle = 'bg-stone-900/40 border-stone-800/60 text-stone-500 opacity-60';
                    }
                  } else if (isSelected) {
                    optionStyle =
                      'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-semibold shadow-md';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswerSubmitted}
                      className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between gap-3 cursor-pointer disabled:cursor-default ${optionStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-stone-800 border border-stone-700 flex items-center justify-center font-mono text-[11px] font-bold text-stone-300 shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="leading-relaxed">{option}</span>
                      </div>

                      {isAnswerSubmitted && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      )}
                      {isAnswerSubmitted && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Immediate Feedback Explanation */}
              {isAnswerSubmitted && (
                <div className="p-4 rounded-xl bg-[#07110b] border border-emerald-800/50 text-xs space-y-1 animate-fadeIn">
                  <div className="font-semibold text-emerald-400 flex items-center gap-1.5">
                    <Award className="w-4 h-4" />
                    <span>Officer Evaluation Briefing:</span>
                  </div>
                  <p className="text-stone-300 leading-relaxed">{currentQ.explanation}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-3 flex items-center justify-between border-t border-stone-800">
                {!isAnswerSubmitted ? (
                  <button
                    onClick={handleConfirmAnswer}
                    disabled={selectedOption === null}
                    className="px-6 py-2.5 rounded-xl bg-[#c5a059] hover:bg-[#d4af37] text-stone-950 text-xs font-bold transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Lock In Tactical Decision
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer ml-auto"
                  >
                    <span>
                      {currentQuestionIndex + 1 < SIMULATOR_QUESTIONS.length
                        ? 'Next Challenge'
                        : 'Review Final Assessment'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Final Assessment Scorecard */
        <div className="p-8 sm:p-10 text-center space-y-8 animate-fadeIn">
          <div className="max-w-md mx-auto space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-emerald-950/80 border border-emerald-700 flex items-center justify-center text-[#c5a059] mx-auto shadow-xl">
              <Award className="w-8 h-8 text-[#c5a059]" />
            </div>
            <h3 className="text-2xl font-bold text-stone-100 font-display">
              Candidate Performance Evaluation Complete
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Based on your timed situational judgments, military hierarchy comprehension, and radar bearing calculations:
            </p>
          </div>

          {/* Score Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800">
              <div className="text-[11px] font-mono text-stone-500 uppercase">Total Score</div>
              <div className="text-3xl font-extrabold text-[#c5a059] font-mono mt-1">
                {totalScore} / {SIMULATOR_QUESTIONS.length}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800">
              <div className="text-[11px] font-mono text-stone-500 uppercase">Proficiency</div>
              <div className="text-3xl font-extrabold text-emerald-400 font-mono mt-1">
                {scorePercent}%
              </div>
            </div>

            <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800">
              <div className="text-[11px] font-mono text-stone-500 uppercase">Assessment</div>
              <div className="text-sm font-bold text-stone-200 mt-2">
                {scorePercent >= 80
                  ? 'Highly Recommended'
                  : scorePercent >= 60
                  ? 'Recommended'
                  : 'Needs Review'}
              </div>
            </div>
          </div>

          {/* Branch Aptitude Recommendation */}
          <div className="p-5 rounded-2xl bg-[#0d1611] border border-stone-800 max-w-2xl mx-auto text-left space-y-2">
            <div className="text-xs font-mono uppercase text-[#c5a059]">
              Commission Stream Recommendation
            </div>
            <div className="text-sm font-semibold text-stone-100">
              {scorePercent >= 80
                ? 'High Aptitude: BAF General Duties Pilot GD(P) / Naval Executive Surface Combat'
                : scorePercent >= 60
                ? 'Strong Aptitude: Army Armoured / Infantry Officer Cadet Stream (BMA Long Course)'
                : 'Development Stream: Engineering / Logistics Technical Officer Corps'}
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Official selection at ISSB (Dhaka Cantonment) includes extensive multi-day psychometric tests, physical obstacle testing, and interview boards.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleRestart}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-xs text-stone-200 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-[#c5a059]" />
              <span>Retake Simulator Exam</span>
            </button>

            {onClose && (
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Return to Career Explorer
              </button>
            )}
          </div>
        </div>
      )}

      {/* Enlarged Image Lightbox */}
      {enlargedImage && (
        <div
          onClick={() => setEnlargedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn cursor-pointer"
        >
          <div className="max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden border border-stone-700 bg-black">
            <img
              src={enlargedImage}
              alt="Enlarged Reference"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};
