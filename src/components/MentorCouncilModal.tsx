import React from 'react';
import { STEM_MENTORS, MentorAvatar } from '../data/mentors';
import { soundManager } from '../utils/audio';
import { X, Volume2 } from 'lucide-react';

interface MentorCouncilModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MentorCouncilModal: React.FC<MentorCouncilModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Exact reference order specified in prompt:
  // 1. Mr Tuấn Rich, 2. Ms Ngoan, 3. Mr Dimark, 4. Ms Phượng Chick, 5. Mr Zainuddin, 6. Mr Hero, 7. Ms Selena, followed by Dr Tang
  const orderedIds = [
    'tuan_rich',
    'ngoan',
    'dimark',
    'phuong_chick',
    'zainuddin',
    'hero',
    'selena',
    'dr_tang',
  ];

  const councilInOrder = orderedIds
    .map(id => STEM_MENTORS.find(m => m.id === id))
    .filter(Boolean) as typeof STEM_MENTORS;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-800/80 border-b border-slate-700/80 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold bg-gradient-to-r from-amber-400 via-orange-300 to-rose-300 bg-clip-text text-transparent">
                Hội Đồng Cố Vấn STEM (8 Giáo Viên)
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 border border-slate-600 font-mono">
                4 Nam & 4 Nữ
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Think scientifically. Create bravely. Communicate globally.
            </p>
          </div>
          <button
            id="council-modal-close"
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Council Grid in Specified Reference Order (Only Teacher Avatar & Name) */}
        <div className="p-4 sm:p-6 overflow-y-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {councilInOrder.map((mentor, index) => (
            <div
              key={mentor.id}
              className="bg-slate-800/60 hover:bg-slate-800/95 border border-slate-700/80 hover:border-cyan-500/60 rounded-2xl p-4 sm:p-5 transition-all flex flex-col items-center justify-center text-center shadow-lg relative group overflow-hidden"
              style={{ borderTopColor: mentor.accentHex, borderTopWidth: '3px' }}
            >
              {/* Order number tag */}
              <div className="absolute top-2.5 right-2.5 text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-900/90 text-slate-300 border border-slate-700/80">
                #{index + 1}
              </div>

              {/* Teacher Avatar */}
              <div className="my-2 transform group-hover:scale-105 transition-transform duration-200">
                <MentorAvatar mentor={mentor} size="xl" glow />
              </div>

              {/* Only Teacher Name as requested */}
              <h3 className="font-bold text-slate-100 text-base sm:text-lg mt-2 tracking-tight">
                {mentor.name}
              </h3>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-800/80 border-t border-slate-700/80 flex items-center justify-between text-xs text-slate-400">
          <span>8 Giáo viên Hội đồng Cố vấn STEM</span>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 font-semibold text-white transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
