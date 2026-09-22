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

        {/* Council Grid in Specified Reference Order */}
        <div className="p-4 sm:p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {councilInOrder.map((mentor, index) => (
            <div
              key={mentor.id}
              className="bg-slate-800/50 hover:bg-slate-800/90 border border-slate-700/70 hover:border-slate-500 rounded-xl p-4 transition-all flex flex-col justify-between shadow-md relative overflow-hidden"
              style={{ borderTopColor: mentor.accentHex, borderTopWidth: '3px' }}
            >
              {/* Order number tag */}
              <div className="absolute top-2 right-2 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-900/80 text-slate-400 border border-slate-700">
                #{index + 1}
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <MentorAvatar mentor={mentor} size="md" />
                  <div>
                    <h3 className="font-bold text-slate-100 text-sm sm:text-base leading-tight">
                      {mentor.name}
                    </h3>
                    <span
                      className="text-[11px] font-semibold tracking-wide inline-block mt-0.5"
                      style={{ color: mentor.accentHex }}
                    >
                      {mentor.expertise}
                    </span>
                  </div>
                </div>

                {/* Specific Visual Identity description badges */}
                <div className="text-xs text-slate-300 bg-slate-900/60 rounded-lg p-2 border border-slate-800 mb-3 space-y-1">
                  <div className="text-[11px] text-slate-400 font-medium">{mentor.role}</div>
                  {mentor.id === 'zainuddin' && (
                    <div className="text-[10px] text-amber-300/90">
                      👔 Áo sơ vin, bắt buộc đeo cà vạt; học giả Malaysia uyên bác, tóc dày chải gọn.
                    </div>
                  )}
                  {mentor.id === 'dr_tang' && (
                    <div className="text-[10px] text-purple-300/90">
                      🧪 Áo sơ mi cổ Đức màu tím, tag &quot;KVIS&quot; trên ngực; dáng gầy, tóc ngắn, đeo kính.
                    </div>
                  )}
                  {mentor.id === 'phuong_chick' && (
                    <div className="text-[10px] text-rose-300/90">
                      🎙️ Áo dài Việt Nam màu đỏ, đeo kính; phát âm IPA &amp; truyền cảm hứng song ngữ.
                    </div>
                  )}
                  {mentor.id === 'selena' && (
                    <div className="text-[10px] text-purple-300/90">
                      🌿 Áo dài Việt Nam màu tím; cố vấn sinh học &amp; hệ sinh thái bền vững.
                    </div>
                  )}
                  {mentor.id === 'ngoan' && (
                    <div className="text-[10px] text-blue-300/90">
                      💡 Áo dài Việt Nam màu xanh blue; cố vấn thiết kế sáng tạo &amp; làm việc nhóm.
                    </div>
                  )}
                  {(mentor.id === 'hero' || mentor.id === 'dimark' || mentor.id === 'tuan_rich') && (
                    <div className="text-[10px] text-slate-400">
                      👔 Áo sơ mi lịch sự, sơ vin gọn gàng, phong thái sư phạm chuyên nghiệp.
                    </div>
                  )}
                </div>
              </div>

              {/* Quote & TTS Audio button */}
              <div className="pt-2 border-t border-slate-800 flex items-start justify-between gap-2">
                <p className="text-[11px] italic text-slate-400 flex-1 leading-snug">
                  &ldquo;{mentor.quote}&rdquo;
                </p>
                <button
                  onClick={() => soundManager.speak(mentor.quote, 'us')}
                  className="p-1 rounded text-slate-400 hover:text-cyan-300 hover:bg-slate-700 transition-colors shrink-0"
                  title="Listen to quote in English"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-800/80 border-t border-slate-700/80 flex items-center justify-between text-xs text-slate-400">
          <span>7 cố vấn đầu tiên đối chiếu theo thứ tự ảnh nhóm tham chiếu (từ trái qua phải).</span>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 font-semibold text-white transition-colors"
          >
            Đóng bảng cố vấn
          </button>
        </div>
      </div>
    </div>
  );
};
