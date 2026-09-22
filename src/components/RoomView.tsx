import React, { useState } from 'react';
import { PlayerSession, Question, RoomConfig, VerdictStatus } from '../types';
import { MentorDialogue } from './MentorDialogue';
import { QuestionCard } from './QuestionCard';
import { soundManager } from '../utils/audio';
import {
  ShieldAlert,
  Zap,
  Cpu,
  Radio,
  Leaf,
  ChevronRight,
  Sparkles,
  KeyRound,
  RotateCcw,
} from 'lucide-react';

interface RoomViewProps {
  roomConfig: RoomConfig;
  session: PlayerSession;
  questions: Question[];
  onAnswerQuestion: (
    question: Question,
    isCorrect: boolean,
    pointsEarned: number,
    deductions: number
  ) => void;
  onAdvanceToNextRoom: () => void;
  onOpenKeypad: () => void;
  onBackToLobby: () => void;
}

export const RoomView: React.FC<RoomViewProps> = ({
  roomConfig,
  session,
  questions,
  onAnswerQuestion,
  onAdvanceToNextRoom,
  onOpenKeypad,
  onBackToLobby,
}) => {
  // Current question index within the room
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [verdictStatus, setVerdictStatus] = useState<VerdictStatus>('IDLE');
  const [feedbackEn, setFeedbackEn] = useState<string>('');
  const [feedbackVi, setFeedbackVi] = useState<string>('');
  const [activeHintLevel, setActiveHintLevel] = useState<number>(0);
  const [attempts, setAttempts] = useState<number>(0);
  const [isAnsweredCorrectly, setIsAnsweredCorrectly] = useState<boolean>(false);

  const roomQuestions = questions.filter(q => q.room === roomConfig.id);
  const currentQuestion = roomQuestions[currentQuestionIndex] || roomQuestions[0];

  const targetFragment = roomConfig.targetLetter || roomConfig.code_fragment;
  const leadMentor = roomConfig.leadMentor || roomConfig.lead_mentor;
  const supportMentor = roomConfig.supportMentor || roomConfig.support_mentor;
  const scenarioText = roomConfig.scenario || roomConfig.objective_vi;
  const fragmentUnlocked = !!session.codeFragments[roomConfig.id];

  // Dynamic Room Icon mapping
  const getRoomIcon = (roomId: number) => {
    switch (roomId) {
      case 1:
        return <ShieldAlert className="w-6 h-6 text-emerald-400" />;
      case 2:
        return <Zap className="w-6 h-6 text-amber-400" />;
      case 3:
        return <Cpu className="w-6 h-6 text-cyan-400" />;
      case 4:
        return <Radio className="w-6 h-6 text-rose-400" />;
      case 5:
        return <Leaf className="w-6 h-6 text-teal-400" />;
      default:
        return <Zap className="w-6 h-6 text-cyan-400" />;
    }
  };

  const handleUnlockHint = () => {
    setActiveHintLevel(prev => Math.min(prev + 1, 2));
  };

  // Evaluate Answer Logic across all question types
  const handleAnswerSubmit = (userAnswer: unknown) => {
    const q = currentQuestion;
    let isCorrect = false;

    if (q.type === 'multiple_choice' || q.type === 'true_false' || q.type === 'single_choice' || q.type === 'drag_drop' || q.type === 'simulation') {
      if (typeof q.correct_answer === 'number') {
        isCorrect = userAnswer === q.correct_answer || Boolean(q.options && q.options[q.correct_answer] === userAnswer);
      } else if (Array.isArray(q.correct_answer)) {
        const userArr = Array.isArray(userAnswer) ? userAnswer : [userAnswer];
        isCorrect =
          q.correct_answer.length === userArr.length &&
          q.correct_answer.every(item => userArr.includes(item));
      } else {
        isCorrect = String(userAnswer).trim().toLowerCase() === String(q.correct_answer).trim().toLowerCase();
      }
    } else if (q.type === 'numeric') {
      const userNum = Number(userAnswer);
      const target = q.numeric_target ?? (typeof q.correct_answer === 'number' ? q.correct_answer : 0);
      const tolerance = q.numeric_tolerance ?? 0.1;
      isCorrect = !isNaN(userNum) && Math.abs(userNum - target) <= tolerance;
    } else if (q.type === 'ordering' || q.type === 'sequencing') {
      const userArr = Array.isArray(userAnswer) ? userAnswer : [];
      const targetArr = Array.isArray(q.correct_answer)
        ? q.correct_answer
        : (q.steps || []).map((_, i) => i);
      isCorrect = JSON.stringify(userArr) === JSON.stringify(targetArr);
    } else if (q.type === 'matching') {
      const userMatches = (userAnswer as Record<string, string>) || {};
      const pairs = q.pairs || (q.matching_pairs ? Object.entries(q.matching_pairs).map(([left, right]) => ({ left, right })) : []);
      if (pairs.length > 0) {
        const correctCount = pairs.filter(p => userMatches[p.left] === p.right).length;
        isCorrect = correctCount === pairs.length;
      } else {
        isCorrect = true;
      }
    } else if (q.type === 'short_response' || q.type === 'fill_in_the_blank') {
      const userStr = String(userAnswer || '').trim().toLowerCase();
      if (q.rubric_keywords && q.rubric_keywords.length > 0) {
        const matchCount = q.rubric_keywords.filter(kw => userStr.includes(kw.toLowerCase())).length;
        isCorrect = matchCount >= Math.min(2, q.rubric_keywords.length);
      } else if (q.correct_answer) {
        isCorrect = userStr === String(q.correct_answer).trim().toLowerCase();
      } else {
        isCorrect = userStr.length >= 3;
      }
    } else if (q.type === 'speech_practice' || q.type === 'pronunciation') {
      isCorrect = true; // Participation and phonetics attempt is honored
    }

    if (isCorrect) {
      soundManager.playCorrect();
      setVerdictStatus('CORRECT');
      setFeedbackEn(q.explanation_en || 'Excellent reasoning! Your scientific deduction is spot on.');
      setFeedbackVi(q.explanation_vi || 'Tuyệt vời! Em đã hoàn thành thử thách này một cách chuẩn xác.');
      setIsAnsweredCorrectly(true);

      const penalty = activeHintLevel === 1 ? 3 : activeHintLevel === 2 ? 9 : 0;
      onAnswerQuestion(q, true, q.points, penalty);
    } else {
      soundManager.playWrong();
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= 3) {
        setVerdictStatus('MISSION FAILED');
        setFeedbackEn(`Mission Failed: The correct answer was: ${Array.isArray(q.correct_answer) ? q.correct_answer.join(', ') : String(q.correct_answer || 'Xem đáp án trong phần giải thích')}. Review the hints to learn the concept.`);
        setFeedbackVi(`Đã vượt quá số lần thử. Đáp án chính xác là: ${Array.isArray(q.correct_answer) ? q.correct_answer.join(', ') : String(q.correct_answer || 'Xem phần giải thích')}.`);
        setIsAnsweredCorrectly(true); // Allow continuing
        onAnswerQuestion(q, false, 0, 0);
      } else {
        setVerdictStatus('TRY AGAIN');
        setFeedbackEn('Not quite right. Re-examine the scientific principles and definitions carefully.');
        setFeedbackVi('Chưa chính xác. Hãy đọc kỹ lại câu hỏi và tham khảo gợi ý từ các cố vấn.');
      }
    }
  };

  const handleNextQuestion = () => {
    soundManager.playClick();
    if (currentQuestionIndex + 1 < roomQuestions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setVerdictStatus('IDLE');
      setFeedbackEn('');
      setFeedbackVi('');
      setActiveHintLevel(0);
      setAttempts(0);
      setIsAnsweredCorrectly(false);
    } else {
      // Room complete!
      onAdvanceToNextRoom();
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 animate-fadeIn">
      {/* Room Header Banner */}
      <div
        className="rounded-3xl p-5 sm:p-7 border border-slate-800 bg-slate-900/95 backdrop-blur-md relative overflow-hidden shadow-2xl"
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-cyan-950/60 border border-cyan-800/60 shadow-lg shrink-0">
              {getRoomIcon(roomConfig.id)}
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-950 border border-slate-700 text-slate-300">
                  Phòng {roomConfig.id} / 5
                </span>
                <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/80">
                  {leadMentor} &amp; {supportMentor}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                {roomConfig.title_vi}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 italic font-sans">
                {roomConfig.title_en} &bull; {roomConfig.theme}
              </p>
            </div>
          </div>

          {/* Fragment Unlock Status */}
          <div className="flex items-center gap-3">
            <div
              className={`p-3 rounded-2xl border text-center transition-all ${
                fragmentUnlocked
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-950 border-slate-800 text-slate-500'
              }`}
            >
              <div className="text-[10px] uppercase font-mono font-bold tracking-wider">
                Mảnh Mã Thoát
              </div>
              <div className="text-2xl font-black font-mono">
                {fragmentUnlocked ? targetFragment : '?'}
              </div>
            </div>

            <button
              onClick={() => {
                soundManager.playClick();
                onBackToLobby();
              }}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
              title="Trở về sảnh chính"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Ambient Room Description */}
        <p className="relative z-10 text-xs text-slate-300 mt-4 pt-3 border-t border-slate-800/80 leading-relaxed font-sans">
          &ldquo;{scenarioText}&rdquo;
        </p>
      </div>

      {/* Main Mission Grid: Question Card & Mentor Dialogue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Question Card (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Question Stepper */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-1 font-mono">
            <span>
              Thử Thách {currentQuestionIndex + 1} / {roomQuestions.length}
            </span>
            <div className="flex gap-1.5">
              {roomQuestions.map((_, i) => (
                <span
                  key={i}
                  className={`w-5 h-1.5 rounded-full transition-colors ${
                    i === currentQuestionIndex
                      ? 'bg-cyan-400'
                      : i < currentQuestionIndex
                      ? 'bg-emerald-500'
                      : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            onSubmitAnswer={handleAnswerSubmit}
            disabled={isAnsweredCorrectly}
          />

          {/* Next Action Button after Question is Correct / Finished */}
          {isAnsweredCorrectly && (
            <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/50 flex items-center justify-between gap-4 animate-slideDown shadow-xl">
              <div>
                <span className="font-bold text-emerald-400 text-sm block">
                  {currentQuestionIndex + 1 < roomQuestions.length
                    ? 'Thử thách hoàn tất! Sẵn sàng cho câu tiếp theo?'
                    : `Chúc mừng! Em đã mở khóa Mảnh Mã [${targetFragment}]!`}
                </span>
                <span className="text-xs text-slate-400">
                  {currentQuestionIndex + 1 < roomQuestions.length
                    ? `Còn ${roomQuestions.length - currentQuestionIndex - 1} nhiệm vụ trong phòng này.`
                    : 'Phòng thí nghiệm này đã được xử lý an toàn.'}
                </span>
              </div>

              {currentQuestionIndex + 1 < roomQuestions.length ? (
                <button
                  id="next-question-btn"
                  onClick={handleNextQuestion}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-all"
                >
                  Câu Tiếp Theo
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    id="next-room-btn"
                    onClick={onAdvanceToNextRoom}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 transition-all"
                  >
                    Tiếp Tục Phòng Kế Tiếp
                    <Sparkles className="w-4 h-4" />
                  </button>

                  <button
                    onClick={onOpenKeypad}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5"
                    title="Mở Bàn Phím Khóa Thoát Hiểm"
                  >
                    <KeyRound className="w-4 h-4 text-cyan-400" />
                    Keypad
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Mentor Advisory Dialogue & Hints (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <MentorDialogue
            leadMentorName={leadMentor}
            supportMentorName={supportMentor}
            status={verdictStatus}
            feedbackEn={feedbackEn}
            feedbackVi={feedbackVi}
            hint1={currentQuestion.hint_1 || currentQuestion.hint1}
            hint2={currentQuestion.hint_2 || currentQuestion.hint2}
            activeHintLevel={activeHintLevel}
            onUnlockHint={handleUnlockHint}
            attemptsCount={attempts}
          />
        </div>
      </div>
    </div>
  );
};
