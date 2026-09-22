import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { PlayerSession } from '../types';
import { STEM_MENTORS, MentorAvatar } from '../data/mentors';
import { soundManager } from '../utils/audio';
import {
  Award,
  Printer,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  Calendar,
  Volume2,
} from 'lucide-react';

interface VictoryModalProps {
  session: PlayerSession;
  onRestart: () => void;
  onReviewIncorrect: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  session,
  onRestart,
  onReviewIncorrect,
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  // Trigger celebration confetti
  useEffect(() => {
    soundManager.playCorrect();
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
      const timer = setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });
      }, 400);
      return () => clearTimeout(timer);
    } catch {
      // Confetti fallback
    }
  }, []);

  // Determine Rank Tier based on specifications
  const getRank = (score: number) => {
    if (score >= 900) return { title: 'STEM Mastermind', color: 'text-amber-400', badge: '🏆' };
    if (score >= 750) return { title: 'Innovation Champion', color: 'text-cyan-400', badge: '🥇' };
    if (score >= 600) return { title: 'Skilled Explorer', color: 'text-emerald-400', badge: '🥈' };
    if (score >= 400) return { title: 'Emerging Scientist', color: 'text-purple-400', badge: '🥉' };
    return { title: 'STEM Trainee', color: 'text-slate-400', badge: '📜' };
  };

  const rank = getRank(session.score);
  const completionDate = new Date().toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const finalQuote =
    'You did not escape by luck. You escaped by thinking, testing, communicating and never giving up. Cô Phượng Chick chúc mừng các nhà khoa học trẻ!';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl my-auto bg-slate-900 border-2 border-emerald-500/80 rounded-3xl shadow-2xl overflow-hidden text-slate-100 flex flex-col">
        {/* Animated Lab Door Unlock Banner */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-800 to-cyan-900 px-6 py-6 text-center border-b border-emerald-500/40 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-400/60 text-emerald-300 font-mono text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            LAB DOORS UNLOCKED &bull; MISSION ACCOMPLISHED
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            CHÚC MỪNG EM ĐÃ THOÁT KHỎI PHÒNG LAB STEM!
          </h1>
          <p className="text-xs sm:text-sm text-emerald-200 mt-1 max-w-2xl mx-auto">
            Hội đồng Cố vấn STEM gồm 8 giáo viên ghi nhận nỗ lực xuất sắc và tư duy khoa học của em!
          </p>
        </div>

        {/* 8 Mentors Council Lineup Greeting */}
        <div className="px-6 py-4 bg-slate-850 border-b border-slate-800">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center mb-3">
            Hội Đồng Cố Vấn STEM Đồng Nhiệt Liệt Chúc Mừng
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            {STEM_MENTORS.map(m => (
              <div key={m.id} className="flex flex-col items-center group relative">
                <MentorAvatar mentor={m} size="sm" />
                <span className="text-[10px] text-slate-300 font-medium mt-1 truncate max-w-[70px]">
                  {m.name.split(' ')[0]} {m.name.split(' ')[1]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Scrollable Center: Stats, Certificate, Strengths */}
        <div className="p-4 sm:p-8 space-y-6 max-h-[65vh] overflow-y-auto">
          {/* Printable Official Certificate */}
          <div
            ref={certificateRef}
            id="stem-certificate"
            className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-850 to-slate-950 border-4 border-amber-500/80 shadow-2xl relative text-center text-slate-100"
          >
            {/* Certificate Decorative Corners */}
            <div className="absolute top-3 left-3 text-amber-400 font-serif text-xl">❖</div>
            <div className="absolute top-3 right-3 text-amber-400 font-serif text-xl">❖</div>
            <div className="absolute bottom-3 left-3 text-amber-400 font-serif text-xl">❖</div>
            <div className="absolute bottom-3 right-3 text-amber-400 font-serif text-xl">❖</div>

            <div className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
              CERTIFICATE OF SCIENTIFIC EXCELLENCE
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-wide text-white mt-1">
              CHỨNG NHẬN HOÀN THÀNH
            </h2>

            <div className="text-sm font-semibold tracking-wider text-cyan-300 uppercase mt-1">
              Completed Escape the STEM Lab
            </div>

            <div className="my-4 py-2 border-y border-amber-500/30">
              <span className="text-xs text-slate-400 block mb-1">Chứng nhận trao tặng cho:</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-sans tracking-wide">
                {session.playerName}
              </span>
              {session.teamMembers && session.teamMembers.length > 0 && (
                <div className="text-xs text-slate-400 mt-1">
                  Đội viên: {session.teamMembers.join(', ')}
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 my-4 text-xs">
              <div className="flex items-center gap-1.5 text-slate-300">
                <span className="text-lg">{rank.badge}</span>
                <span className="text-slate-400">Danh hiệu:</span>
                <span className={`font-bold ${rank.color}`}>{rank.title}</span>
              </div>

              <div className="flex items-center gap-1.5 text-slate-300">
                <Award className="w-4 h-4 text-amber-400" />
                <span className="text-slate-400">Điểm số:</span>
                <span className="font-bold text-amber-300 font-mono text-sm">
                  {session.score} / 1000
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-slate-300">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="text-slate-400">Ngày hoàn thành:</span>
                <span className="font-mono text-slate-200">{completionDate}</span>
              </div>
            </div>

            {/* Official Council Signature */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
              <div className="text-left font-mono text-[11px]">
                Mã xác thực: STEM-{session.difficulty.slice(0, 3).toUpperCase()}-
                {Math.abs(session.score * 7).toString(16).toUpperCase()}
              </div>

              <div className="text-center sm:text-right">
                <div className="font-serif italic font-bold text-amber-300 text-sm">
                  Ms Phượng Chick and the STEM Mentor Council
                </div>
                <div className="text-[10px] text-slate-500">Đại diện Hội đồng Cố vấn STEM</div>
              </div>
            </div>
          </div>

          {/* Cô Phượng Chick Final Quote */}
          <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-xs sm:text-sm text-rose-200 flex items-start gap-3">
            <MentorAvatar mentor="phuong_chick" size="md" showBadge={false} />
            <div className="space-y-1 flex-1">
              <div className="font-bold text-rose-300 flex items-center justify-between">
                <span>Lời Chúc Từ Cô Phượng Chick:</span>
                <button
                  onClick={() => soundManager.speak(finalQuote, 'us')}
                  className="p-1 rounded bg-rose-900/60 hover:bg-rose-800 text-rose-200"
                  title="Nghe cô Phượng Chick đọc lời chúc"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="italic leading-relaxed font-sans">&ldquo;{finalQuote}&rdquo;</p>
            </div>
          </div>

          {/* 5 Strengths & Room Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700 space-y-2">
              <span className="font-bold text-cyan-300 uppercase tracking-wider block">
                5 Điểm Mạnh Nổi Bật Của Em:
              </span>
              <ul className="space-y-1.5 text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  Làm chủ quy trình an toàn &amp; dụng cụ thí nghiệm phòng lab.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  Hiểu bản chất bảo toàn năng lượng &amp; công suất kilowatt-giờ.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  Tư duy thuật toán và phân tích lỗi logic vi điều khiển.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  Phát âm chuẩn xác các cặp âm tối thiểu và thuật ngữ tiếng Anh.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  Tích hợp đa ngành giải quyết bài toán lọc nước bền vững.
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700 space-y-2">
              <span className="font-bold text-amber-300 uppercase tracking-wider block">
                Nội Dung Khuyến Nghị Rèn Luyện Thêm:
              </span>
              <ul className="space-y-1.5 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">&bull;</span>
                  Luyện tập phân biệt âm cuối vô thanh/hữu thanh (/t/ vs /d/) với cô Phượng Chick.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">&bull;</span>
                  Tối ưu chi phí kỹ thuật và kiểm tra giới hạn của vật liệu cùng thầy Tuấn Rich.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">&bull;</span>
                  Thử nghiệm thêm các mô hình giàn chịu lực phức tạp cùng thầy Zainuddin.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-850 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onRestart}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Chơi lại từ đầu
          </button>

          <div className="flex items-center gap-2">
            {session.incorrectWordIds && session.incorrectWordIds.length > 0 && (
              <button
                onClick={onReviewIncorrect}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-950 hover:bg-purple-900 border border-purple-500/50 text-xs font-semibold text-purple-200 transition-colors"
              >
                Ôn các câu đã sai ({session.incorrectWordIds.length})
              </button>
            )}

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-xs font-bold text-white shadow-lg shadow-emerald-500/30 transition-all"
            >
              <Printer className="w-4 h-4" />
              In / Lưu Chứng Nhận (PDF)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
