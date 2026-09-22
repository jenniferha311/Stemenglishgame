import React, { useState } from 'react';
import { STEM_VOCABULARY_BANK } from '../data/vocabulary';
import { soundManager } from '../utils/audio';
import { loadMasteredVocabIds, toggleMasteredVocab } from '../utils/storage';
import {
  X,
  Volume2,
  CheckCircle,
  Circle,
  RotateCw,
  Search,
  Filter,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface FlashcardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  incorrectWordIds?: string[];
}

export const FlashcardsModal: React.FC<FlashcardsModalProps> = ({
  isOpen,
  onClose,
  incorrectWordIds = [],
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [onlyIncorrect, setOnlyIncorrect] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [masteredIds, setMasteredIds] = useState<string[]>(() => loadMasteredVocabIds());

  if (!isOpen) return null;

  const categories = [
    'all',
    'Science & Lab Safety',
    'Technology & Coding',
    'Engineering & Design',
    'Mathematics & Data',
    'Environment & STEM Communication',
  ];

  // Filtering
  const filteredWords = STEM_VOCABULARY_BANK.filter(item => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (selectedDifficulty !== 'all' && item.difficulty !== selectedDifficulty) return false;
    if (onlyIncorrect && !incorrectWordIds.includes(item.id)) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.term.toLowerCase().includes(q) ||
        item.vietnamese_meaning.toLowerCase().includes(q) ||
        item.simple_english_definition.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const currentWord = filteredWords[currentIndex] || filteredWords[0];

  const handleToggleMastered = (id: string) => {
    const updated = toggleMasteredVocab(id);
    setMasteredIds(updated);
    soundManager.playClick();
  };

  const handleNext = () => {
    soundManager.playClick();
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % Math.max(1, filteredWords.length));
  };

  const handlePrev = () => {
    soundManager.playClick();
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + filteredWords.length) % Math.max(1, filteredWords.length));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-100">
                Ngân Hàng 200 Từ Vựng STEM (Bilingual Flashcards)
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 font-mono">
                {masteredIds.length}/200 Đã thuộc
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Phát âm chuẩn IPA Anh–Anh &amp; Anh–Mỹ kèm giải thích và ví dụ ngữ cảnh
            </p>
          </div>
          <button
            id="flashcards-close-btn"
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters bar */}
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Category Dropdown */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-cyan-400" />
            <select
              value={selectedCategory}
              onChange={e => {
                setSelectedCategory(e.target.value);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              {categories.map(c => (
                <option key={c} value={c}>
                  {c === 'all' ? 'Tất cả lĩnh vực (200 từ)' : c}
                </option>
              ))}
            </select>

            {/* Difficulty */}
            <select
              value={selectedDifficulty}
              onChange={e => {
                setSelectedDifficulty(e.target.value);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="all">Độ khó: Tất cả</option>
              <option value="Explorer">Explorer</option>
              <option value="Scientist">Scientist</option>
              <option value="Innovator">Innovator</option>
            </select>
          </div>

          {/* Search & Only incorrect toggle */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Tìm từ vựng..."
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  setCurrentIndex(0);
                }}
                className="bg-slate-800 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {incorrectWordIds.length > 0 && (
              <button
                onClick={() => {
                  setOnlyIncorrect(!onlyIncorrect);
                  setCurrentIndex(0);
                }}
                className={`px-2.5 py-1.5 rounded-lg border font-semibold flex items-center gap-1 transition-colors ${
                  onlyIncorrect
                    ? 'bg-rose-950 border-rose-500 text-rose-300'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                Ôn từ sai ({incorrectWordIds.length})
              </button>
            )}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-8 flex-1 flex flex-col items-center justify-center overflow-y-auto">
          {filteredWords.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <p>Không tìm thấy từ vựng nào khớp với bộ lọc.</p>
            </div>
          ) : (
            <div className="w-full max-w-xl">
              {/* Progress counter */}
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
                <span>
                  Thẻ {currentIndex + 1} / {filteredWords.length}
                </span>
                <span className="text-cyan-400 font-semibold">{currentWord.category}</span>
              </div>

              {/* 3D Flip Card */}
              <div
                onClick={() => {
                  soundManager.playClick();
                  setIsFlipped(!isFlipped);
                }}
                className="w-full min-h-[300px] cursor-pointer bg-gradient-to-br from-slate-800 via-slate-850 to-slate-900 border-2 border-slate-700 hover:border-cyan-500/80 rounded-2xl p-6 shadow-2xl flex flex-col justify-between transition-all duration-300 select-none relative group"
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-950/70 border border-slate-800 text-cyan-300 uppercase">
                    {currentWord.difficulty} &bull; Room {currentWord.room}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 group-hover:text-cyan-300">
                      <RotateCw className="w-3 h-3" />
                      Nhấn để lật thẻ
                    </span>
                  </div>
                </div>

                {/* Front (English Term + IPA) vs Back (Vietnamese Meaning + Example) */}
                {!isFlipped ? (
                  <div className="my-auto text-center space-y-4 py-4">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                      ({currentWord.part_of_speech})
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-200 to-white bg-clip-text text-transparent">
                      {currentWord.term}
                    </h3>

                    {/* IPA pronunciations */}
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                      <div className="flex items-center gap-1 bg-slate-950/60 px-2.5 py-1 rounded-lg border border-slate-800 text-xs">
                        <span className="text-slate-400 text-[10px] font-bold">UK:</span>
                        <span className="text-slate-300 font-mono">{currentWord.ipa_uk}</span>
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            soundManager.speak(currentWord.term, 'uk');
                          }}
                          className="p-1 text-cyan-400 hover:text-cyan-200 hover:bg-slate-800 rounded transition-colors"
                          title="Play UK pronunciation"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-1 bg-slate-950/60 px-2.5 py-1 rounded-lg border border-slate-800 text-xs">
                        <span className="text-slate-400 text-[10px] font-bold">US:</span>
                        <span className="text-slate-300 font-mono">{currentWord.ipa_us}</span>
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            soundManager.speak(currentWord.term, 'us');
                          }}
                          className="p-1 text-cyan-400 hover:text-cyan-200 hover:bg-slate-800 rounded transition-colors"
                          title="Play US pronunciation"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="my-auto text-left space-y-4 py-2">
                    <div>
                      <span className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">
                        Nghĩa Tiếng Việt:
                      </span>
                      <h4 className="text-2xl font-bold text-amber-300 mt-1">
                        {currentWord.vietnamese_meaning}
                      </h4>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                      <span className="font-semibold text-slate-200 block mb-1">Definition:</span>
                      {currentWord.simple_english_definition}
                    </div>

                    <div className="text-xs text-slate-400 italic border-l-2 border-cyan-500 pl-3">
                      &ldquo;{currentWord.example}&rdquo;
                    </div>
                  </div>
                )}

                {/* Bottom Mastery Marker */}
                <div
                  className="flex items-center justify-between pt-3 border-t border-slate-800/80"
                  onClick={e => e.stopPropagation()}
                >
                  <button
                    onClick={() => handleToggleMastered(currentWord.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      masteredIds.includes(currentWord.id)
                        ? 'bg-emerald-950/80 border border-emerald-500/80 text-emerald-300'
                        : 'bg-slate-800 border border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {masteredIds.includes(currentWord.id) ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                        Đã thuộc từ này
                      </>
                    ) : (
                      <>
                        <Circle className="w-3.5 h-3.5" />
                        Đánh dấu đã thuộc
                      </>
                    )}
                  </button>

                  <span className="text-[11px] text-slate-500">
                    Phím mũi tên &larr; / &rarr; để chuyển thẻ
                  </span>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between mt-4">
                <button
                  id="flashcards-prev-btn"
                  onClick={handlePrev}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Từ trước
                </button>

                <button
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-cyan-300 transition-colors"
                >
                  {isFlipped ? 'Xem mặt trước (English)' : 'Xem mặt sau (Tiếng Việt)'}
                </button>

                <button
                  id="flashcards-next-btn"
                  onClick={handleNext}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs font-semibold text-white transition-colors"
                >
                  Từ tiếp theo
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
