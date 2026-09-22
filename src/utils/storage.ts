import { PlayerSession, Question, StudentLog, TeacherSettings, VocabularyItem } from '../types';
import { INITIAL_QUESTIONS } from '../data/rooms';
import { STEM_VOCABULARY_BANK } from '../data/vocabulary';

const STORAGE_KEYS = {
  CURRENT_SESSION: 'stem_lab_current_session',
  TEACHER_SETTINGS: 'stem_lab_teacher_settings',
  CUSTOM_QUESTIONS: 'stem_lab_custom_questions',
  STUDENT_LOGS: 'stem_lab_student_logs',
  VOCAB_PROGRESS: 'stem_lab_vocab_progress',
};

export const DEFAULT_TEACHER_SETTINGS: TeacherSettings = {
  pin: 'STEM2026',
  enabledRooms: { 1: true, 2: true, 3: true, 4: true, 5: true },
  timerEnabled: true,
  timeLimitMinutes: 35,
  defaultDifficulty: 'Scientist',
  allowHints: true,
  maxAttemptsPerTask: 3,
};

// Player Session
export function loadPlayerSession(): PlayerSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_SESSION);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function savePlayerSession(session: PlayerSession): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CURRENT_SESSION, JSON.stringify(session));
  } catch {
    // Ignore quota errors
  }
}

export function clearPlayerSession(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_SESSION);
  } catch {
    // Ignore
  }
}

// Teacher Settings
export function loadTeacherSettings(): TeacherSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TEACHER_SETTINGS);
    if (!raw) return DEFAULT_TEACHER_SETTINGS;
    return { ...DEFAULT_TEACHER_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_TEACHER_SETTINGS;
  }
}

export function saveTeacherSettings(settings: TeacherSettings): void {
  try {
    localStorage.setItem(STORAGE_KEYS.TEACHER_SETTINGS, JSON.stringify(settings));
  } catch {
    // Ignore
  }
}

// Questions Storage (Allows teacher to add/edit/delete/reset)
export function loadQuestions(): Question[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_QUESTIONS);
    if (!raw) return INITIAL_QUESTIONS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_QUESTIONS;
  } catch {
    return INITIAL_QUESTIONS;
  }
}

export function saveQuestions(questions: Question[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_QUESTIONS, JSON.stringify(questions));
  } catch {
    // Ignore
  }
}

export function resetQuestionsToDefault(): Question[] {
  saveQuestions(INITIAL_QUESTIONS);
  return INITIAL_QUESTIONS;
}

// Student Logs
export function loadStudentLogs(): StudentLog[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STUDENT_LOGS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveStudentLog(log: StudentLog): void {
  try {
    const logs = loadStudentLogs();
    logs.unshift(log); // Add latest to start
    localStorage.setItem(STORAGE_KEYS.STUDENT_LOGS, JSON.stringify(logs.slice(0, 100)));
  } catch {
    // Ignore
  }
}

export function clearStudentLogs(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.STUDENT_LOGS);
  } catch {
    // Ignore
  }
}

// Vocabulary Progress
export function loadMasteredVocabIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.VOCAB_PROGRESS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function toggleMasteredVocab(wordId: string): string[] {
  try {
    const current = loadMasteredVocabIds();
    const index = current.indexOf(wordId);
    let updated: string[];
    if (index >= 0) {
      updated = current.filter(id => id !== wordId);
    } else {
      updated = [...current, wordId];
    }
    localStorage.setItem(STORAGE_KEYS.VOCAB_PROGRESS, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

// CSV Export Utility for Teacher
export function exportLogsToCSV(logs: StudentLog[]): void {
  if (logs.length === 0) {
    alert('Chưa có dữ liệu học sinh để xuất CSV.');
    return;
  }
  const headers = ['ID', 'Player/Team Name', 'Mode', 'Difficulty', 'Score (Max 1000)', 'Time (seconds)', 'Date', 'Mistakes', 'Passed'];
  const rows = logs.map(l => [
    `"${l.id}"`,
    `"${l.name.replace(/"/g, '""')}"`,
    l.mode,
    l.difficulty,
    l.score,
    l.timeSpentSeconds,
    `"${l.timestamp}"`,
    l.mistakesCount,
    l.passed ? 'PASSED' : 'FAILED',
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `STEM_Lab_Student_Logs_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
