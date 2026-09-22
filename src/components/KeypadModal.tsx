import React, { useState } from 'react';
import { PlayerSession } from '../types';
import { soundManager } from '../utils/audio';
import { X, KeyRound, Unlock, Lock, AlertCircle, ArrowLeft } from 'lucide-react';

interface KeypadModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: PlayerSession;
  onUnlockSuccess: () => void;
}

export const KeypadModal: React.FC<KeypadModalProps> = ({
  isOpen,
  onClose,
  session,
  onUnlockSuccess,
}) => {
  const [inputCode, setInputCode] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  if (!isOpen) return null;

  const collectedFragments = session.codeFragments;
  const isComplete = Object.keys(collectedFragments).length === 5;

  const keypadButtons = [
    'S', 'T', 'E',
    'M', '!', 'A',
    'B', 'C', 'D',
    '1', '2', '3',
  ];

  const handleKeyPress = (char: string) => {
    soundManager.playClick();
    setErrorMsg('');
    if (inputCode.length < 8) {
      setInputCode(prev => prev + char);
    }
  };

  const handleBackspace = () => {
    soundManager.playClick();
    setErrorMsg('');
    setInputCode(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    soundManager.playClick();
    setErrorMsg('');
    setInputCode('');
  };

  const handleVerify = () => {
    soundManager.playClick();
    setIsVerifying(true);
    setErrorMsg('');

    setTimeout(() => {
      setIsVerifying(false);
      if (inputCode.trim().toUpperCase() === 'STEM!') {
        soundManager.playDoorUnlock();
        onUnlockSuccess();
      } else {
        soundManager.playWrong();
        setErrorMsg('MÃ SAI! Gợi ý: Ghép 5 mảnh mã theo thứ tự Phòng 1 đến 5 (S + T + E + M + !).');
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 border-2 border-cyan-500/60 rounded-3xl shadow-2xl overflow-hidden text-slate-100 flex flex-col">
        {/* Terminal Header */}
        <div className="px-6 py-4 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-950 border border-cyan-700/80 text-cyan-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-mono font-bold text-sm sm:text-base text-cyan-300">
                LAB EMERGENCY EXIT KEYPAD
              </h3>
              <p className="text-[11px] text-slate-400">Bàn phím điện tử mở cửa phòng thí nghiệm</p>
            </div>
          </div>
          <button
            id="keypad-close-btn"
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content & Digital Screen */}
        <div className="p-6 space-y-5">
          {/* Fragments Checklist */}
          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400 font-mono">Mảnh mã đã thu:</span>
            <div className="flex items-center gap-1.5 font-mono font-bold">
              <span className={collectedFragments[1] ? 'text-cyan-400 font-black' : 'text-slate-600'}>
                [S]
              </span>
              <span className={collectedFragments[2] ? 'text-cyan-400 font-black' : 'text-slate-600'}>
                [T]
              </span>
              <span className={collectedFragments[3] ? 'text-cyan-400 font-black' : 'text-slate-600'}>
                [E]
              </span>
              <span className={collectedFragments[4] ? 'text-cyan-400 font-black' : 'text-slate-600'}>
                [M]
              </span>
              <span className={collectedFragments[5] ? 'text-emerald-400 font-black' : 'text-slate-600'}>
                [!]
              </span>
            </div>
          </div>

          {/* LED Display Screen */}
          <div className="bg-black/90 p-4 rounded-2xl border-2 border-cyan-900 shadow-inner text-center font-mono">
            <div className="text-[10px] text-cyan-600 uppercase tracking-widest mb-1">
              SYSTEM SECURITY AUTHORIZATION
            </div>
            <div className="h-12 flex items-center justify-center text-3xl font-black tracking-widest text-cyan-300">
              {inputCode ? (
                <span>{inputCode}</span>
              ) : (
                <span className="text-slate-700 animate-pulse">_ _ _ _ _</span>
              )}
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-2.5 rounded-xl bg-rose-950/70 border border-rose-500/50 text-xs text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* 3x4 Keypad Matrix */}
          <div className="grid grid-cols-3 gap-2.5">
            {keypadButtons.map(btn => (
              <button
                key={btn}
                onClick={() => handleKeyPress(btn)}
                className="h-12 rounded-xl bg-slate-800/90 hover:bg-slate-700 active:bg-cyan-900 border border-slate-700 hover:border-cyan-500/60 font-mono font-bold text-lg text-slate-200 hover:text-cyan-300 shadow transition-all active:scale-95"
              >
                {btn}
              </button>
            ))}
          </div>

          {/* Action Row: Backspace, Clear, Submit */}
          <div className="grid grid-cols-3 gap-2.5 pt-1">
            <button
              onClick={handleClear}
              className="h-11 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 font-semibold text-xs text-slate-300 transition-colors"
            >
              CLEAR
            </button>
            <button
              onClick={handleBackspace}
              className="h-11 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 font-semibold text-xs text-slate-300 flex items-center justify-center transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              id="keypad-unlock-btn"
              onClick={handleVerify}
              disabled={isVerifying}
              className="h-11 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 font-bold text-xs text-white shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-1 transition-all"
            >
              {isVerifying ? (
                <Lock className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Unlock className="w-4 h-4" />
                  UNLOCK
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer Hint */}
        <div className="px-6 py-3 bg-slate-850 border-t border-slate-800 text-[11px] text-slate-400 text-center">
          {isComplete ? (
            <span className="text-emerald-400 font-semibold">
              Đã thu thập đủ 5 mảnh! Nhập STEM! để mở cửa phòng thí nghiệm.
            </span>
          ) : (
            <span>Em có thể hoàn thành cả 5 phòng để nhận đầy đủ 5 mảnh mã khóa.</span>
          )}
        </div>
      </div>
    </div>
  );
};
