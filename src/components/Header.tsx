import React from 'react';
import { PlayerSession } from '../types';
import { ROOMS_CONFIG } from '../data/rooms';
import { soundManager } from '../utils/audio';
import {
  Volume2,
  VolumeX,
  Briefcase,
  BookOpen,
  Users,
  Settings,
  Clock,
  Award,
  KeyRound,
} from 'lucide-react';

interface HeaderProps {
  session: PlayerSession;
  onOpenBackpack: () => void;
  onOpenCouncil: () => void;
  onOpenVocab: () => void;
  onOpenTeacher: () => void;
  onOpenKeypad: () => void;
  onToggleSound: () => void;
  isMuted: boolean;
  timeRemaining: number;
}

export const Header: React.FC<HeaderProps> = ({
  session,
  onOpenBackpack,
  onOpenCouncil,
  onOpenVocab,
  onOpenTeacher,
  onOpenKeypad,
  onToggleSound,
  isMuted,
  timeRemaining,
}) => {
  const currentRoomConfig = ROOMS_CONFIG.find(r => r.id === session.currentRoom) || ROOMS_CONFIG[0];
  const collectedCount = Object.keys(session.codeFragments).length;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(Math.max(0, seconds) / 60);
    const secs = Math.max(0, seconds) % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isLowTime = timeRemaining < 300 && session.timerEnabled;

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Room Info */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-black text-white shadow-md shadow-cyan-500/20">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base sm:text-lg tracking-tight bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-200 bg-clip-text text-transparent">
                  Escape the STEM Lab
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800/60 uppercase">
                  {session.difficulty}
                </span>
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-1.5">
                <span className="text-cyan-400 font-semibold">Room {session.currentRoom}:</span>
                <span className="truncate max-w-[140px] sm:max-w-none">{currentRoomConfig.title_en}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Status Metrics: Score, Timer, Player */}
        <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm">
          {/* Player/Team */}
          <div className="hidden md:flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700/60 text-slate-300">
            <span className="text-slate-400 font-medium">{session.gameMode === 'team' ? 'Team:' : 'Player:'}</span>
            <span className="font-semibold text-slate-200 truncate max-w-[100px]">{session.playerName}</span>
          </div>

          {/* Score Counter */}
          <div className="flex items-center gap-1.5 bg-amber-950/40 border border-amber-500/30 text-amber-300 px-2.5 py-1.5 rounded-lg shadow-inner">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="font-bold tracking-wide">{session.score}</span>
            <span className="text-[10px] text-amber-500 font-medium">/ 1000</span>
          </div>

          {/* Timer */}
          {session.timerEnabled && (
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border font-mono font-bold transition-colors ${
                isLowTime
                  ? 'bg-rose-950/70 border-rose-500/50 text-rose-300 animate-pulse'
                  : 'bg-slate-800/80 border-slate-700 text-cyan-300'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{formatTime(timeRemaining)}</span>
            </div>
          )}

          {/* Escape Fragments Indicator */}
          <button
            id="header-keypad-btn"
            onClick={() => {
              soundManager.playClick();
              onOpenKeypad();
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border font-medium transition-all ${
              collectedCount >= 5
                ? 'bg-gradient-to-r from-emerald-600 to-teal-500 border-emerald-400 text-white shadow-lg shadow-emerald-500/30 animate-bounce'
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-cyan-500 hover:text-cyan-200'
            }`}
            title="Open Escape Terminal Keypad"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span className="font-mono text-xs font-bold tracking-wider">
              {collectedCount}/5 Codes
            </span>
          </button>
        </div>

        {/* Action Tools */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Backpack Modal */}
          <button
            id="header-backpack-btn"
            onClick={() => {
              soundManager.playClick();
              onOpenBackpack();
            }}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white transition-colors relative"
            title="Open Backpack / Inventory"
          >
            <Briefcase className="w-4 h-4 text-cyan-400" />
            {collectedCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-black flex items-center justify-center">
                {collectedCount}
              </span>
            )}
          </button>

          {/* 200 Flashcards Vocab */}
          <button
            id="header-vocab-btn"
            onClick={() => {
              soundManager.playClick();
              onOpenVocab();
            }}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white transition-colors"
            title="200 STEM Vocabulary Flashcards"
          >
            <BookOpen className="w-4 h-4 text-emerald-400" />
          </button>

          {/* Mentor Council Profile */}
          <button
            id="header-council-btn"
            onClick={() => {
              soundManager.playClick();
              onOpenCouncil();
            }}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white transition-colors"
            title="STEM Mentor Council (8 Teachers)"
          >
            <Users className="w-4 h-4 text-purple-400" />
          </button>

          {/* Audio Mute/Unmute */}
          <button
            id="header-sound-btn"
            onClick={() => {
              onToggleSound();
            }}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white transition-colors"
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Teacher Dashboard */}
          <button
            id="header-teacher-btn"
            onClick={() => {
              soundManager.playClick();
              onOpenTeacher();
            }}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-amber-300 transition-colors"
            title="Teacher Dashboard (PIN Protected)"
          >
            <Settings className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </div>
    </header>
  );
};
