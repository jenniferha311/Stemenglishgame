import React, { useState, useEffect } from 'react';
import { Question, SupportedLanguage } from '../types';
import { soundManager } from '../utils/audio';
import { getLocalizedQuestionPrompt } from '../data/multilingualQuestions';
import {
  Volume2,
  ArrowUp,
  ArrowDown,
  HelpCircle,
  Send,
  Mic,
  Calculator,
  Shuffle,
} from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  onSubmitAnswer: (answer: unknown) => void;
  disabled?: boolean;
  currentLanguage?: SupportedLanguage;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onSubmitAnswer,
  disabled = false,
  currentLanguage = 'vi',
}) => {
  // State for different question modes
  const [selectedOption, setSelectedOption] = useState<string | number>('');
  const [selectedMultiple, setSelectedMultiple] = useState<string[]>([]);
  const [textInput, setTextInput] = useState<string>('');
  const [numericInput, setNumericInput] = useState<string>('');
  const [matchingSelections, setMatchingSelections] = useState<Record<string, string>>({});
  const [shuffledSteps, setShuffledSteps] = useState<{ id: number; text: string }[]>([]);
  const [isRecording, setIsRecording] = useState<boolean>(false);

  // Initialize state whenever the question changes
  useEffect(() => {
    setSelectedOption('');
    setSelectedMultiple([]);
    setTextInput('');
    setNumericInput('');
    setMatchingSelections({});
    setIsRecording(false);

    if (question.type === 'ordering' || question.type === 'sequencing') {
      const originalSteps = question.steps || question.options || [];
      const indexed = originalSteps.map((step, idx) => ({ id: idx, text: step }));
      // Deterministic / semi-random shuffle so user can rearrange
      const shuffled = [...indexed].sort(() => Math.random() - 0.5);
      setShuffledSteps(shuffled);
    }
  }, [question.id]);

  // Handle single choice option
  const handleSelectOption = (opt: string | number) => {
    soundManager.playClick();
    setSelectedOption(opt);
  };

  // Handle multiple selection checkbox
  const handleToggleMultiple = (opt: string) => {
    soundManager.playClick();
    if (selectedMultiple.includes(opt)) {
      setSelectedMultiple(selectedMultiple.filter(o => o !== opt));
    } else {
      setSelectedMultiple([...selectedMultiple, opt]);
    }
  };

  // Handle ordering move
  const handleMoveStep = (index: number, direction: 'up' | 'down') => {
    soundManager.playClick();
    const newSteps = [...shuffledSteps];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < newSteps.length) {
      const temp = newSteps[index];
      newSteps[index] = newSteps[targetIndex];
      newSteps[targetIndex] = temp;
      setShuffledSteps(newSteps);
    }
  };

  // Handle matching dropdown
  const handleMatchChange = (left: string, right: string) => {
    soundManager.playClick();
    setMatchingSelections(prev => ({
      ...prev,
      [left]: right,
    }));
  };

  // Submit Answer
  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (disabled) return;
    soundManager.playClick();

    switch (question.type) {
      case 'multiple_choice':
      case 'single_choice':
      case 'true_false':
      case 'drag_drop':
      case 'simulation':
        if (Array.isArray(question.correct_answer)) {
          onSubmitAnswer(selectedMultiple.length > 0 ? selectedMultiple : [String(selectedOption)]);
        } else {
          onSubmitAnswer(selectedOption);
        }
        break;

      case 'numeric':
        onSubmitAnswer(parseFloat(numericInput) || 0);
        break;

      case 'short_response':
      case 'fill_in_the_blank':
        onSubmitAnswer(textInput.trim());
        break;

      case 'speech_practice':
      case 'pronunciation':
        onSubmitAnswer(selectedOption || textInput.trim() || 'completed');
        break;

      case 'ordering':
      case 'sequencing':
        // Return array of original indices in current order
        onSubmitAnswer(shuffledSteps.map(s => s.id));
        break;

      case 'matching':
        onSubmitAnswer(matchingSelections);
        break;

      default:
        onSubmitAnswer(selectedOption || textInput);
    }
  };

  // Helper for matching right-hand options
  const matchingPairs = question.pairs
    ? question.pairs
    : question.matching_pairs
    ? Object.entries(question.matching_pairs).map(([left, right]) => ({ left, right }))
    : [];

  const rightSideOptions = Array.from(new Set(matchingPairs.map(p => p.right))).sort();

  const { primaryPrompt, englishPrompt } = getLocalizedQuestionPrompt(
    question,
    currentLanguage || 'vi'
  );

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl space-y-5">
      {/* Question Header & Points */}
      <div>
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span className="font-mono uppercase font-bold tracking-wider text-cyan-400">
            Nhiệm Vụ #{question.id} &bull; {question.type.replace(/_/g, ' ').toUpperCase()}
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 font-mono font-bold">
            +{question.points} pts
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-slate-100 leading-snug">
          {primaryPrompt}
        </h3>

        {/* English Prompt with Audio Pronunciation */}
        <div className="mt-2 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start justify-between gap-2">
          <p className="text-xs sm:text-sm text-cyan-200/90 italic font-sans leading-relaxed">
            &ldquo;{englishPrompt}&rdquo;
          </p>
          <button
            onClick={() => soundManager.speak(englishPrompt, 'us')}
            className="p-1 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors shrink-0"
            title="Nghe câu hỏi bằng tiếng Anh chuẩn"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Dynamic Interaction based on question.type */}
      <div className="space-y-3 pt-1">
        {/* 1. Multiple Choice / True-False / Single Choice / Simulation */}
        {(question.type === 'multiple_choice' ||
          question.type === 'true_false' ||
          question.type === 'single_choice' ||
          question.type === 'drag_drop' ||
          question.type === 'simulation') &&
          question.options && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {question.options.map((opt, idx) => {
                const isSelected =
                  selectedOption === idx ||
                  selectedOption === opt ||
                  selectedMultiple.includes(opt);

                return (
                  <button
                    key={opt}
                    disabled={disabled}
                    onClick={() => {
                      if (Array.isArray(question.correct_answer)) {
                        handleToggleMultiple(opt);
                      } else {
                        handleSelectOption(typeof question.correct_answer === 'number' ? idx : opt);
                      }
                    }}
                    className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between group ${
                      isSelected
                        ? 'bg-cyan-950 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-500/10'
                        : 'bg-slate-800/50 hover:bg-slate-800 border-slate-700/80 text-slate-300 hover:text-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center font-mono text-xs font-bold text-slate-400 group-hover:text-cyan-300 shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

        {/* 2. Numeric Input */}
        {question.type === 'numeric' && (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
              <Calculator className="w-5 h-5 text-amber-400 shrink-0" />
              <input
                type="number"
                step="any"
                disabled={disabled}
                placeholder="Nhập giá trị số tính toán được..."
                value={numericInput}
                onChange={e => setNumericInput(e.target.value)}
                className="w-full bg-transparent text-sm text-cyan-200 font-mono focus:outline-none placeholder-slate-500"
              />
              {question.unit && (
                <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-slate-800 text-slate-300">
                  {question.unit}
                </span>
              )}
            </div>
          </form>
        )}

        {/* 3. Short Response & Fill in the blank */}
        {(question.type === 'short_response' || question.type === 'fill_in_the_blank') && (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <input
                type="text"
                disabled={disabled}
                placeholder="Nhập câu trả lời bằng tiếng Anh..."
                value={textInput}
                onChange={e => setTextInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-cyan-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          </form>
        )}

        {/* 4. Speech Practice & Pronunciation */}
        {(question.type === 'speech_practice' || question.type === 'pronunciation') && (
          <div className="space-y-3 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-rose-300 flex items-center gap-1.5">
                <Mic className="w-4 h-4 text-rose-400" />
                Luyện Phát Âm STEM Chuẩn IPA (Ms Phượng Chick):
              </span>
              <button
                onClick={() => soundManager.speak(question.prompt_en, 'us')}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 text-xs"
              >
                <Volume2 className="w-3.5 h-3.5" />
                Nghe phát âm mẫu
              </button>
            </div>

            {question.options && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {question.options.map(opt => (
                  <button
                    key={opt}
                    onClick={() => handleSelectOption(opt)}
                    className={`p-3 rounded-xl border text-xs sm:text-sm font-medium flex items-center justify-between transition-colors ${
                      selectedOption === opt
                        ? 'bg-cyan-950 border-cyan-400 text-cyan-200'
                        : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <span>{opt}</span>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        soundManager.speak(opt, 'us');
                      }}
                      className="p-1 text-slate-400 hover:text-cyan-300"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setIsRecording(!isRecording);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isRecording
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
              >
                <Mic className="w-3.5 h-3.5" />
                {isRecording ? 'Đang ghi âm giọng đọc...' : 'Thử phát âm qua mic'}
              </button>
              <span className="text-[11px] text-slate-400">
                Lắng nghe kỹ âm gió, trọng âm và đuôi từ.
              </span>
            </div>
          </div>
        )}

        {/* 5. Ordering / Sequencing */}
        {(question.type === 'ordering' || question.type === 'sequencing') && (
          <div className="space-y-2">
            <div className="text-xs text-slate-400 mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                Sắp xếp theo thứ tự quy trình khoa học (dùng mũi tên lên/xuống):
              </span>
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <Shuffle className="w-3 h-3" />
                Đã xáo trộn
              </span>
            </div>

            {shuffledSteps.map((step, idx) => (
              <div
                key={step.id}
                className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/80 flex items-center justify-between text-xs sm:text-sm text-slate-200 font-medium"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-300 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span>{step.text}</span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    disabled={disabled || idx === 0}
                    onClick={() => handleMoveStep(idx, 'up')}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 hover:text-cyan-300 transition-colors"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    disabled={disabled || idx === shuffledSteps.length - 1}
                    onClick={() => handleMoveStep(idx, 'down')}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 hover:text-cyan-300 transition-colors"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 6. Matching */}
        {question.type === 'matching' && matchingPairs.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs text-slate-400 mb-1">
              Ghép nối từng khái niệm/dụng cụ với tên tiếng Anh chính xác:
            </div>
            {matchingPairs.map(pair => {
              const currentChoice = matchingSelections[pair.left] || '';
              return (
                <div
                  key={pair.left}
                  className="p-3 rounded-xl bg-slate-800/60 border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                >
                  <span className="font-semibold text-cyan-300 sm:w-1/2">{pair.left}</span>
                  <select
                    disabled={disabled}
                    value={currentChoice}
                    onChange={e => handleMatchChange(pair.left, e.target.value)}
                    className="bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-cyan-500 sm:w-1/2 font-sans"
                  >
                    <option value="">-- Chọn thuật ngữ tiếng Anh --</option>
                    {rightSideOptions.map(opt => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2 flex justify-end">
        <button
          id="submit-answer-btn"
          disabled={disabled}
          onClick={() => handleSubmit()}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition-all active:scale-[0.98]"
        >
          <Send className="w-4 h-4" />
          Xác Nhận Câu Trả Lời
        </button>
      </div>
    </div>
  );
};
