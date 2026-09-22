export type GameMode = 'solo' | 'team' | 'individual';
export type DifficultyLevel = 'Explorer' | 'Scientist' | 'Innovator';
export type GameDifficulty = DifficultyLevel;

export type GameView = 'lobby' | 'room' | 'victory';

export type VerdictStatus = 'IDLE' | 'CORRECT' | 'PARTLY CORRECT' | 'TRY AGAIN' | 'MISSION FAILED';

export interface Mentor {
  id: string;
  name: string;
  gender: 'male' | 'female';
  expertise: string;
  role: string;
  color: string;
  accentHex: string;
  symbol: string;
  avatarUrl?: string;
  avatarStyle: {
    skinTone: string;
    hairColor: string;
    hairStyle: string;
    glasses: boolean;
    outfit: string;
    outfitColor: string;
    hasTie: boolean;
    tag?: string;
  };
  quote: string;
}

export interface VocabularyItem {
  id: string;
  term: string;
  ipa_uk: string;
  ipa_us: string;
  part_of_speech: string;
  vietnamese_meaning: string;
  simple_english_definition: string;
  example: string;
  room: number;
  category:
    | 'Science & Lab Safety'
    | 'Technology & Coding'
    | 'Engineering & Design'
    | 'Mathematics & Data'
    | 'Environment & STEM Communication';
  difficulty: DifficultyLevel;
  mastered?: boolean;
}

export type QuestionType =
  | 'multiple_choice'
  | 'true_false'
  | 'matching'
  | 'ordering'
  | 'drag_drop'
  | 'numeric'
  | 'short_response'
  | 'simulation'
  | 'speech_practice'
  | 'single_choice'
  | 'fill_in_the_blank'
  | 'sequencing'
  | 'pronunciation';

export interface Question {
  id: string;
  room: number;
  missionIndex?: number;
  skill?: string;
  difficulty: DifficultyLevel;
  type: QuestionType;
  prompt_en: string;
  prompt_vi: string;
  options?: string[];
  correct_answer?: number | string | string[] | number[] | Record<string, string>;
  matching_pairs?: Record<string, string>;
  pairs?: { left: string; right: string }[];
  steps?: string[];
  numeric_target?: number;
  numeric_tolerance?: number;
  unit?: string;
  rubric_keywords?: string[];
  explanation_vi: string;
  explanation_en: string;
  hint_1?: string;
  hint_2?: string;
  hint1?: string;
  hint2?: string;
  lead_mentor: string;
  support_mentor: string;
  points: number;
  target_word_id?: string;
}

export interface RoomConfig {
  id: number;
  title_en: string;
  title_vi: string;
  theme: string;
  lead_mentor: string;
  support_mentor: string;
  leadMentor?: string;
  supportMentor?: string;
  objective_en: string;
  objective_vi: string;
  code_fragment: string; // 'S', 'T', 'E', 'M', '!'
  targetLetter?: string;
  bgGradient: string;
  accentColor?: string;
  icon: string;
  subtitle?: string;
  scenario?: string;
}

export interface PlayerSession {
  playerName: string;
  teamMembers?: string[];
  gameMode: GameMode;
  difficulty: DifficultyLevel;
  score: number;
  startTime: number;
  endTime?: number;
  timerEnabled: boolean;
  timeRemainingSeconds: number; // default 35 min = 2100s
  currentRoom: number;
  completedRooms?: number[];
  codeFragments: { [room: number]: string };
  inventory: { id: string; name: string; icon: string; description: string; obtainedInRoom?: number }[];
  attemptsByQuestion?: { [qId: string]: number };
  hintsUsedByQuestion?: { [qId: string]: number };
  incorrectWordIds: string[];
  mistakesCount: number;
  hintsUsedCount: number;
  completedQuestions: string[];
  roomCompleted: { [room: number]: boolean };
  finished?: boolean;
  isCompleted?: boolean;
}

export interface StudentLog {
  id: string;
  name: string;
  mode: GameMode;
  difficulty: DifficultyLevel;
  score: number;
  timeSpentSeconds: number;
  timestamp: string;
  mistakesCount: number;
  reviewWords?: string[];
  weakWords?: string[];
  passed: boolean;
}

export interface TeacherSettings {
  pin: string;
  enabledRooms: { [room: number]: boolean };
  timerEnabled: boolean;
  timeLimitMinutes: number;
  defaultDifficulty: DifficultyLevel;
  allowHints: boolean;
  maxAttemptsPerTask: number;
}
