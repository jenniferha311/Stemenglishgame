import React, { useState } from 'react';
import { GameDifficulty, GameMode, PlayerSession } from '../types';
import { STEM_MENTORS, MentorAvatar } from '../data/mentors';
import { soundManager } from '../utils/audio';
import {
  Users,
  User,
  Sparkles,
  BookOpen,
  Settings,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface LobbyScreenProps {
  onStartGame: (sessionData: Partial<PlayerSession>) => void;
  onOpenCouncil: () => void;
  onOpenVocab: () => void;
  onOpenTeacher: () => void;
  savedSession: PlayerSession | null;
  onResumeGame: () => void;
}

export const LobbyScreen: React.FC<LobbyScreenProps> = ({
  onStartGame,
  onOpenCouncil,
  onOpenVocab,
  onOpenTeacher,
  savedSession,
  onResumeGame,
}) => {
  const [playerName, setPlayerName] = useState<string>('Alex Minh');
  const [gameMode, setGameMode] = useState<GameMode>('individual');
  const [teamMembersInput, setTeamMembersInput] = useState<string>('Linh, Huy, An');
  const [difficulty, setDifficulty] = useState<GameDifficulty>('Scientist');

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playDoorUnlock();

    const members =
      gameMode === 'team'
        ? teamMembersInput
            .split(',')
            .map(m => m.trim())
            .filter(Boolean)
        : [];

    onStartGame({
      playerName: playerName.trim() || 'Young Scientist',
      gameMode,
      teamMembers: members,
      difficulty,
    });
  };

  return (
    <div className="min-h-[calc(100vh-60px)] flex flex-col justify-center items-center px-4 py-8 max-w-5xl mx-auto space-y-8 animate-fadeIn">
      {/* Title & Council Banner */}
      <div className="text-center space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          Interactive STEM &amp; English Escape Room Challenge
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-300 via-sky-100 to-indigo-300 bg-clip-text text-transparent">
          Escape the STEM Lab
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-w-2xl mx-auto">
          Phòng thí nghiệm trung tâm bị khóa khẩn cấp! Hãy cùng{' '}
          <strong className="text-cyan-300">Hội đồng Cố vấn STEM gồm 8 giáo viên</strong> giải mã 5
          phòng thử thách, thu thập 5 mảnh mã khóa <code className="text-amber-300 font-bold font-mono">S - T - E - M - !</code> và mở cánh cửa thoát hiểm!
        </p>
      </div>

      {/* 8 Mentors Lineup Teaser */}
      <div
        onClick={() => {
          soundManager.playClick();
          onOpenCouncil();
        }}
        className="cursor-pointer w-full bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 transition-all shadow-lg flex flex-col items-center group"
      >
        <div className="flex items-center justify-between w-full mb-3 text-xs text-slate-400">
          <span className="font-semibold text-slate-300 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-purple-400" />
            Hội đồng Cố vấn STEM (8 Giáo viên Đồng hành):
          </span>
          <span className="text-cyan-400 group-hover:underline text-[11px]">
            Nhấn xem hồ sơ chi tiết &rarr;
          </span>
        </div>

        {/* Mentors Preview Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          {STEM_MENTORS.map(m => (
            <div key={m.id} className="flex flex-col items-center">
              <MentorAvatar mentor={m} size="sm" />
              <span className="text-[10px] text-slate-400 mt-1 font-medium truncate max-w-[65px]">
                {m.name.split(' ')[0]} {m.name.split(' ')[1]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Setup Form */}
      <div className="w-full max-w-xl bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Resume Saved Game option if exists */}
        {savedSession && !savedSession.isCompleted && (
          <div className="p-3.5 rounded-2xl bg-cyan-950/60 border border-cyan-500/50 flex items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-bold text-cyan-300 block">Tiếp tục phiên chơi dở dang:</span>
              <span className="text-slate-300">
                {savedSession.playerName} &bull; Phòng {savedSession.currentRoom} &bull;{' '}
                {savedSession.score} pts
              </span>
            </div>
            <button
              onClick={() => {
                soundManager.playClick();
                onResumeGame();
              }}
              className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition-colors shrink-0 shadow-md shadow-cyan-500/20"
            >
              Chơi tiếp
            </button>
          </div>
        )}

        <form onSubmit={handleStart} className="space-y-5">
          {/* Game Mode Selector */}
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
              Chế Độ Chơi (Game Mode)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setGameMode('individual');
                }}
                className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                  gameMode === 'individual'
                    ? 'bg-cyan-950 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-500/10'
                    : 'bg-slate-850 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <User className="w-4 h-4" />
                Cá Nhân (Solo Explorer)
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setGameMode('team');
                }}
                className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                  gameMode === 'team'
                    ? 'bg-cyan-950 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-500/10'
                    : 'bg-slate-850 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Users className="w-4 h-4" />
                Theo Đội (Team Innovation)
              </button>
            </div>
          </div>

          {/* Player or Team Name */}
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
              {gameMode === 'team' ? 'Tên Đội Thi Đấu' : 'Tên Học Sinh'}
            </label>
            <input
              type="text"
              required
              value={playerName}
              onChange={e => setPlayerName(e.target.value)}
              placeholder={gameMode === 'team' ? 'Ví dụ: Đội Tia Chớp STEM' : 'Ví dụ: Nguyễn Minh An'}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-sans"
            />
          </div>

          {/* Team Members if Team mode */}
          {gameMode === 'team' && (
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                Danh Sách Thành Viên (phân cách bằng dấu phẩy)
              </label>
              <input
                type="text"
                value={teamMembersInput}
                onChange={e => setTeamMembersInput(e.target.value)}
                placeholder="Ví dụ: Hoàng, Linh, An, Tuấn"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-sans"
              />
            </div>
          )}

          {/* Difficulty Tier */}
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
              Cấp Độ &amp; Độ Khó (Target Grade &amp; Difficulty)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { id: 'Explorer', label: 'Explorer', desc: 'Lớp 6-7' },
                  { id: 'Scientist', label: 'Scientist', desc: 'Lớp 8-9 (Chuẩn)' },
                  { id: 'Innovator', label: 'Innovator', desc: 'Lớp 10+' },
                ] as const
              ).map(diff => (
                <button
                  key={diff.id}
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setDifficulty(diff.id);
                  }}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    difficulty === diff.id
                      ? 'bg-amber-950/70 border-amber-500 text-amber-300 shadow-md shadow-amber-500/10'
                      : 'bg-slate-850 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="font-bold text-xs">{diff.label}</div>
                  <div className="text-[10px] text-slate-500">{diff.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2">
            <button
              id="start-escape-btn"
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 font-bold text-sm text-white shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
            >
              <Zap className="w-4 h-4" />
              Bắt Đầu Giải Mã Phòng Lab (Khởi Hành)
            </button>
          </div>
        </form>

        {/* Quick Links Footer */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenVocab();
            }}
            className="flex items-center gap-1.5 hover:text-emerald-300 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            200 Từ Vựng Flashcards
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onOpenCouncil();
            }}
            className="flex items-center gap-1.5 hover:text-purple-300 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            Hội Đồng 8 Cố Vấn
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onOpenTeacher();
            }}
            className="flex items-center gap-1.5 hover:text-amber-300 transition-colors"
          >
            <Settings className="w-3.5 h-3.5 text-amber-400" />
            Bảng Giáo Viên
          </button>
        </div>
      </div>
    </div>
  );
};
