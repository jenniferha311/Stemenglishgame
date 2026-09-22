import React from 'react';
import { PlayerSession } from '../types';
import { soundManager } from '../utils/audio';
import { X, Briefcase, KeyRound, CheckCircle2, CircleDashed } from 'lucide-react';

interface BackpackModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: PlayerSession;
  onOpenKeypad: () => void;
}

export const BackpackModal: React.FC<BackpackModalProps> = ({
  isOpen,
  onClose,
  session,
  onOpenKeypad,
}) => {
  if (!isOpen) return null;

  const roomFragments = [
    { room: 1, letter: 'S', title: 'Room 1: The Contaminated Lab', mentor: 'Dr Tang' },
    { room: 2, letter: 'T', title: 'Room 2: The Energy Chamber', mentor: 'Mr Hero' },
    { room: 3, letter: 'E', title: 'Room 3: The Broken Robot', mentor: 'Mr Dimark' },
    { room: 4, letter: 'M', title: 'Room 4: The Language Laser', mentor: 'Ms Phượng Chick' },
    { room: 5, letter: '!', title: 'Room 5: The Eco-Innovation Vault', mentor: 'Ms Selena' },
  ];

  const totalCollected = Object.keys(session.codeFragments).length;
  const isComplete = totalCollected === 5;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">Ba Lô Vật Phẩm &amp; Mã Khóa Thoát Hiểm</h2>
              <p className="text-xs text-slate-400">Inventory &amp; Escape Code Fragments</p>
            </div>
          </div>
          <button
            id="backpack-close-btn"
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Escape Code Fragments Box */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                5 Mảnh Mã Thoát Hiểm (Escape Code Fragments)
              </span>
              <span className="text-xs font-mono font-bold text-cyan-400">
                {totalCollected} / 5 Thu thập
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {roomFragments.map(frag => {
                const collected = !!session.codeFragments[frag.room];
                return (
                  <div
                    key={frag.room}
                    className={`rounded-xl border p-2.5 sm:p-3 text-center flex flex-col items-center justify-center transition-all ${
                      collected
                        ? 'bg-gradient-to-b from-cyan-950 to-slate-900 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                        : 'bg-slate-950/60 border-slate-800 text-slate-600'
                    }`}
                  >
                    <span className="text-[10px] text-slate-400 font-mono">Phòng {frag.room}</span>
                    <span className="text-2xl sm:text-3xl font-black font-mono my-1">
                      {collected ? frag.letter : '?'}
                    </span>
                    <span className="text-[9px] text-slate-400 truncate max-w-full">
                      {frag.mentor}
                    </span>
                    <div className="mt-1">
                      {collected ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <CircleDashed className="w-3.5 h-3.5 text-slate-600" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Target Code Hint */}
            <div className="mt-4 p-3 rounded-xl bg-slate-800/60 border border-slate-700/80 text-xs text-slate-300 flex items-center justify-between">
              <div>
                <span className="font-semibold text-cyan-300">Công thức mã thoát:</span>{' '}
                <code className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-amber-300 font-mono font-bold text-sm">
                  S + T + E + M + ! = STEM!
                </code>
              </div>
              {isComplete && (
                <button
                  id="backpack-open-keypad-btn"
                  onClick={() => {
                    soundManager.playClick();
                    onClose();
                    onOpenKeypad();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 text-xs shadow-md shadow-emerald-500/30 animate-pulse"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  Mở Bàn Phím Khóa
                </button>
              )}
            </div>
          </div>

          {/* Standard Lab Equipment Inventory */}
          <div>
            <span className="text-sm font-bold text-slate-200 uppercase tracking-wider block mb-3">
              Trang Thiết Bị Phòng Lab (Lab Equipment)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {session.inventory && session.inventory.length > 0 ? (
                session.inventory.map(item => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-center gap-3"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <div className="font-semibold text-xs text-slate-200">{item.name}</div>
                      <div className="text-[11px] text-slate-400 leading-tight">{item.description}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-4 text-xs text-slate-500 italic">
                  Chưa có thêm vật phẩm đặc biệt. Hoàn thành các phòng để nhận trang thiết bị STEM.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-800/80 border-t border-slate-700 flex justify-end">
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold"
          >
            Đóng ba lô
          </button>
        </div>
      </div>
    </div>
  );
};
