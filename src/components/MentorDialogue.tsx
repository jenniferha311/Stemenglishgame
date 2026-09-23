import React from 'react';
import { VerdictStatus } from '../types';
import { getMentor, MentorAvatar } from '../data/mentors';
import { soundManager } from '../utils/audio';
import { Lightbulb, Volume2, CheckCircle, AlertTriangle, XCircle, RefreshCw } from 'lucide-react';

interface MentorDialogueProps {
  leadMentorName: string;
  supportMentorName: string;
  status: VerdictStatus;
  feedbackEn: string;
  feedbackVi: string;
  hint1?: string;
  hint2?: string;
  activeHintLevel: number;
  onUnlockHint: () => void;
  attemptsCount: number;
}

export const MentorDialogue: React.FC<MentorDialogueProps> = ({
  leadMentorName,
  supportMentorName,
  status,
  feedbackEn,
  feedbackVi,
  hint1,
  hint2,
  activeHintLevel,
  onUnlockHint,
  attemptsCount,
}) => {
  const leadMentor = getMentor(leadMentorName);
  const supportMentor = getMentor(supportMentorName);

  const getStatusBadge = () => {
    switch (status) {
      case 'CORRECT':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-300 font-bold text-xs tracking-wider uppercase animate-pulse">
            <CheckCircle className="w-3.5 h-3.5" />
            CORRECT (Đúng Hoàn Toàn)
          </span>
        );
      case 'PARTLY CORRECT':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950 border border-amber-500 text-amber-300 font-bold text-xs tracking-wider uppercase">
            <AlertTriangle className="w-3.5 h-3.5" />
            PARTLY CORRECT (Đúng Một Phần)
          </span>
        );
      case 'TRY AGAIN':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-950 border border-orange-500 text-orange-300 font-bold text-xs tracking-wider uppercase">
            <RefreshCw className="w-3.5 h-3.5" />
            TRY AGAIN (Thử Lại Lần {attemptsCount})
          </span>
        );
      case 'MISSION FAILED':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950 border border-rose-500 text-rose-300 font-bold text-xs tracking-wider uppercase">
            <XCircle className="w-3.5 h-3.5" />
            MISSION FAILED (Nhiệm Vụ Thất Bại)
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 font-mono text-[11px]">
            ADVISORY PANEL
          </span>
        );
    }
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 sm:p-5 shadow-xl relative overflow-hidden backdrop-blur-md">
      {/* Top Banner with Lead & Support Mentors */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-3.5">
          <MentorAvatar mentor={leadMentor} size="lg" glow />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-100 text-sm sm:text-base">
                {leadMentor.name}
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 uppercase">
                Cố Vấn Trưởng
              </span>
            </div>
          </div>
        </div>

        {/* Support Mentor Mini Avatar */}
        <div className="flex items-center gap-2 bg-slate-800/60 px-2.5 py-1 rounded-xl border border-slate-700/60 text-xs text-slate-300">
          <MentorAvatar mentor={supportMentor} size="sm" showBadge={false} />
          <div>
            <div className="text-[10px] text-slate-400">Cố vấn hỗ trợ:</div>
            <div className="font-medium text-slate-200">{supportMentor.name}</div>
          </div>
        </div>
      </div>

      {/* Verdict & Message Dialogue */}
      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          {getStatusBadge()}

          {/* Voice pronunciation */}
          {feedbackEn && (
            <button
              onClick={() => soundManager.speak(feedbackEn, 'us')}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 text-xs border border-slate-700 transition-colors"
              title="Listen to English feedback"
            >
              <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Nghe tiếng Anh</span>
            </button>
          )}
        </div>

        {/* Dialogue Bubble */}
        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2">
          {feedbackEn ? (
            <p className="text-sm text-cyan-200 font-medium leading-relaxed font-sans">
              &ldquo;{feedbackEn}&rdquo;
            </p>
          ) : (
            <p className="text-sm text-slate-300 italic leading-relaxed">
              &ldquo;{leadMentor.quote}&rdquo;
            </p>
          )}

          {feedbackVi && (
            <p className="text-xs text-slate-400 border-t border-slate-800 pt-2 leading-relaxed">
              {feedbackVi}
            </p>
          )}
        </div>

        {/* Hints Bar */}
        {(hint1 || hint2) && (
          <div className="pt-2 flex flex-wrap items-center gap-2">
            {activeHintLevel === 0 && (
              <button
                id="unlock-hint-1-btn"
                onClick={() => {
                  soundManager.playHint();
                  onUnlockHint();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-950/60 hover:bg-amber-900/80 border border-amber-600/50 text-amber-300 text-xs font-semibold transition-all shadow-sm"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                Mở Gợi Ý 1 (-3 điểm)
              </button>
            )}

            {activeHintLevel >= 1 && hint1 && (
              <div className="w-full p-2.5 rounded-lg bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-300 mr-1">Gợi ý 1 ({supportMentor.name}):</span>
                  {hint1}
                </div>
              </div>
            )}

            {activeHintLevel === 1 && hint2 && (
              <button
                id="unlock-hint-2-btn"
                onClick={() => {
                  soundManager.playHint();
                  onUnlockHint();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-950/60 hover:bg-amber-900/80 border border-amber-600/50 text-amber-300 text-xs font-semibold transition-all shadow-sm"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                Mở Gợi Ý 2 Chi Tiết (-6 điểm)
              </button>
            )}

            {activeHintLevel >= 2 && hint2 && (
              <div className="w-full p-2.5 rounded-lg bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-300 mr-1">Gợi ý 2 ({leadMentor.name}):</span>
                  {hint2}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
