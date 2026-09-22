import React, { useState } from 'react';
import { SupportedLanguage } from '../types';
import { STEM_VOCABULARY_BANK } from '../data/vocabulary';
import { soundManager } from '../utils/audio';
import { loadMasteredVocabIds, toggleMasteredVocab } from '../utils/storage';
import { getTranslation, SUPPORTED_LANGUAGES } from '../data/translations';
import { getLocalizedCategory, getVocabMeaning } from '../data/multilingualVocab';
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
  Globe,
} from 'lucide-react';

interface FlashcardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  incorrectWordIds?: string[];
  initialLanguage?: SupportedLanguage;
}

export const FlashcardsModal: React.FC<FlashcardsModalProps> = ({
  isOpen,
  onClose,
  incorrectWordIds = [],
  initialLanguage = 'vi',
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>(initialLanguage);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [onlyIncorrect, setOnlyIncorrect] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [masteredIds, setMasteredIds] = useState<string[]>(() => loadMasteredVocabIds());

  if (!isOpen) return null;

  const t = getTranslation(selectedLanguage);

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
      const localizedMeaning = getVocabMeaning(item, selectedLanguage).toLowerCase();
      return (
        item.term.toLowerCase().includes(q) ||
        localizedMeaning.includes(q) ||
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
        <div className="px-5 py-3.5 bg-slate-800/80 border-b border-slate-700 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>{t.flashcardTitle}</span>
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 font-mono">
                {masteredIds.length}/200 {t.mastered}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Phát âm chuẩn IPA Anh–Anh &amp; Anh–Mỹ &bull; Đa ngôn ngữ (English / Thai / Vietnamese)
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Language Switcher Pills */}
            <div className="flex items-center gap-1 bg-slate-950/70 p-1 rounded-xl border border-slate-700/80">
              {SUPPORTED_LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedLanguage(lang.code);
                  }}
                  className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                    selectedLanguage === lang.code
                      ? 'bg-cyan-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                  title={lang.name}
                >
                  <span>{lang.flag}</span>
                  <span className="text-[11px] font-mono uppercase">{lang.code}</span>
                </button>
              ))}
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
        </div>

        {/* Filters and Search Bar */}
        <div className="px-5 py-3 bg-slate-850 border-b border-slate-800 flex flex-wrap items-center gap-2.5 text-xs">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setCurrentIndex(0);
              }}
              placeholder={t.searchPlaceholder}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedCategory}
              onChange={e => {
                setSelectedCategory(e.target.value);
                setCurrentIndex(0);
              }}
              className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              {categories.map(c => (
                <option key={c} value={c}>
                  {getLocalizedCategory(c, selectedLanguage)}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <select
            value={selectedDifficulty}
            onChange={e => {
              setSelectedDifficulty(e.target.value);
              setCurrentIndex(0);
            }}
            className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="all">Tất cả cấp độ</option>
            <option value="Explorer">Explorer (Lớp 6-7)</option>
            <option value="Scientist">Scientist (Lớp 8-9)</option>
            <option value="Innovator">Innovator (Lớp 10+)</option>
          </select>

          {/* Incorrect review toggle */}
          {incorrectWordIds.length > 0 && (
            <button
              onClick={() => {
                setOnlyIncorrect(!onlyIncorrect);
                setCurrentIndex(0);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border font-semibold transition-colors ${
                onlyIncorrect
                  ? 'bg-rose-950/80 border-rose-500 text-rose-300'
                  : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              Ôn từ sai ({incorrectWordIds.length})
            </button>
          )}
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
                <span className="text-cyan-400 font-semibold truncate max-w-[280px]">
                  {getLocalizedCategory(currentWord.category, selectedLanguage)}
                </span>
              </div>

              {/* 3D Flip Card */}
              <div
                onClick={() => {
                  soundManager.playClick();
                  setIsFlipped(!isFlipped);
                }}
                className="w-full min-h-[310px] cursor-pointer bg-gradient-to-br from-slate-800 via-slate-850 to-slate-900 border-2 border-slate-700 hover:border-cyan-500/80 rounded-2xl p-6 shadow-2xl flex flex-col justify-between transition-all duration-300 select-none relative group"
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-950/70 border border-slate-800 text-cyan-300 uppercase">
                    {currentWord.difficulty} &bull; Room {currentWord.room}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 group-hover:text-cyan-300">
                      <RotateCw className="w-3 h-3" />
                      {t.flipCard}
                    </span>
                  </div>
                </div>

                {/* Front (English Term + IPA) vs Back (Multilingual Meaning + Example) */}
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

                    <div className="text-xs text-slate-400 pt-1">
                      <span>Nhấn vào thẻ để xem nghĩa bằng {SUPPORTED_LANGUAGES.find(l => l.code === selectedLanguage)?.name}</span>
                    </div>
                  </div>
                ) : (
                  <div className="my-auto text-left space-y-3.5 py-2">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">
                          {t.meaningLabel}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {selectedLanguage === 'th' ? '🇹🇭 ภาษาไทย' : selectedLanguage === 'vi' ? '🇻🇳 Tiếng Việt' : selectedLanguage}
                        </span>
                      </div>
                      <h4 className="text-xl sm:text-2xl font-bold text-amber-300 mt-1 leading-snug">
                        {getVocabMeaning(currentWord, selectedLanguage)}
                      </h4>
                    </div>

                    {/* Dual reference: If language is Thai/Chinese/French/Spanish, also display Vietnamese or English for cross-study */}
                    {selectedLanguage !== 'vi' && (
                      <div className="text-xs text-slate-400">
                        <span className="text-slate-500 font-medium">Nghĩa tiếng Việt: </span>
                        <span>{currentWord.vietnamese_meaning}</span>
                      </div>
                    )}

                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                      <span className="font-semibold text-slate-200 block mb-1">
                        {t.definitionLabel}
                      </span>
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
                        {t.mastered}
                      </>
                    ) : (
                      <>
                        <Circle className="w-3.5 h-3.5" />
                        {t.markMastered}
                      </>
                    )}
                  </button>

                  <span className="text-[11px] text-slate-500">
                    Phím &larr; / &rarr; để chuyển thẻ
                  </span>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between mt-4">
                <button
                  id="flashcard-prev-btn"
                  onClick={handlePrev}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Thẻ trước
                </button>

                <button
                  onClick={() => soundManager.speak(currentWord.term, 'us')}
                  className="px-3 py-2 rounded-xl bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-800/80 text-xs font-semibold text-cyan-300 flex items-center gap-1.5 transition-colors"
                >
                  <Volume2 className="w-4 h-4 text-cyan-400" />
                  Nghe từ: {currentWord.term}
                </button>

                <button
                  id="flashcard-next-btn"
                  onClick={handleNext}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors"
                >
                  Thẻ tiếp
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
