import React, { useState, useEffect } from 'react';
import { GameView, PlayerSession, Question, TeacherSettings } from './types';
import { ROOMS_CONFIG } from './data/rooms';
import {
  loadPlayerSession,
  savePlayerSession,
  clearPlayerSession,
  loadTeacherSettings,
  loadQuestions,
  saveStudentLog,
} from './utils/storage';
import { soundManager } from './utils/audio';

// Components
import { Header } from './components/Header';
import { LobbyScreen } from './components/LobbyScreen';
import { RoomView } from './components/RoomView';
import { MentorCouncilModal } from './components/MentorCouncilModal';
import { BackpackModal } from './components/BackpackModal';
import { FlashcardsModal } from './components/FlashcardsModal';
import { KeypadModal } from './components/KeypadModal';
import { VictoryModal } from './components/VictoryModal';
import { TeacherDashboard } from './components/TeacherDashboard';

export default function App() {
  // Global State
  const [currentView, setCurrentView] = useState<GameView>('lobby');
  const [teacherSettings, setTeacherSettings] = useState<TeacherSettings>(() => loadTeacherSettings());
  const [questions, setQuestions] = useState<Question[]>(() => loadQuestions());
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Modals state
  const [isCouncilOpen, setIsCouncilOpen] = useState<boolean>(false);
  const [isBackpackOpen, setIsBackpackOpen] = useState<boolean>(false);
  const [isVocabOpen, setIsVocabOpen] = useState<boolean>(false);
  const [isTeacherOpen, setIsTeacherOpen] = useState<boolean>(false);
  const [isKeypadOpen, setIsKeypadOpen] = useState<boolean>(false);

  // Saved Session
  const [savedSession, setSavedSession] = useState<PlayerSession | null>(() => loadPlayerSession());

  // Active Session state
  const [session, setSession] = useState<PlayerSession>(() => {
    return (
      savedSession || {
        playerName: 'Young Scientist',
        gameMode: 'individual',
        difficulty: 'Scientist',
        currentRoom: 1,
        score: 0,
        mistakesCount: 0,
        hintsUsedCount: 0,
        timeRemainingSeconds: 35 * 60,
        timerEnabled: true,
        codeFragments: {},
        inventory: [
          {
            id: 'ppe_goggles',
            name: 'Kính Bảo Hộ & Găng Tay Kháng Hóa Chất',
            description: 'Trang thiết bị an toàn tiêu chuẩn cấp độ 2 từ thầy Dr Tang.',
            icon: '🥽',
            obtainedInRoom: 1,
          },
        ],
        roomCompleted: { 1: false, 2: false, 3: false, 4: false, 5: false },
        incorrectWordIds: [],
        completedQuestions: [],
        isCompleted: false,
        startTime: Date.now(),
      }
    );
  });

  // Countdown Timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (currentView === 'room' && session.timerEnabled && session.timeRemainingSeconds > 0) {
      interval = setInterval(() => {
        setSession(prev => {
          const updatedTime = Math.max(0, prev.timeRemainingSeconds - 1);
          const updatedSession = { ...prev, timeRemainingSeconds: updatedTime };
          savePlayerSession(updatedSession);
          return updatedSession;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentView, session.timerEnabled, session.timeRemainingSeconds]);

  // Handle Mute Toggle
  const handleToggleSound = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundManager.setMuted(next);
  };

  // Start New Game from Lobby
  const handleStartGame = (sessionData: Partial<PlayerSession>) => {
    const newSession: PlayerSession = {
      playerName: sessionData.playerName || 'Young Scientist',
      gameMode: sessionData.gameMode || 'individual',
      teamMembers: sessionData.teamMembers || [],
      difficulty: sessionData.difficulty || teacherSettings.defaultDifficulty || 'Scientist',
      currentRoom: 1,
      score: 0,
      mistakesCount: 0,
      hintsUsedCount: 0,
      timeRemainingSeconds: teacherSettings.timeLimitMinutes * 60,
      timerEnabled: teacherSettings.timerEnabled,
      codeFragments: {},
      inventory: [
        {
          id: 'ppe_goggles',
          name: 'Kính Bảo Hộ & Găng Tay Kháng Hóa Chất',
          description: 'Trang thiết bị an toàn tiêu chuẩn cấp độ 2 từ Dr Tang.',
          icon: '🥽',
          obtainedInRoom: 1,
        },
      ],
      roomCompleted: { 1: false, 2: false, 3: false, 4: false, 5: false },
      incorrectWordIds: [],
      completedQuestions: [],
      isCompleted: false,
      startTime: Date.now(),
    };

    setSession(newSession);
    savePlayerSession(newSession);
    setCurrentView('room');
  };

  // Resume Game
  const handleResumeGame = () => {
    if (savedSession) {
      setSession(savedSession);
      setCurrentView('room');
    }
  };

  // Handle Answering a Question
  const handleAnswerQuestion = (
    q: Question,
    isCorrect: boolean,
    pointsEarned: number,
    deductions: number
  ) => {
    setSession(prev => {
      const netPoints = Math.max(0, pointsEarned - deductions);
      const newScore = Math.min(1000, prev.score + netPoints);
      const newMistakes = isCorrect ? prev.mistakesCount : prev.mistakesCount + 1;
      const newHints = deductions > 0 ? prev.hintsUsedCount + 1 : prev.hintsUsedCount;

      const updatedIncorrect = [...prev.incorrectWordIds];
      if (!isCorrect && q.target_word_id && !updatedIncorrect.includes(q.target_word_id)) {
        updatedIncorrect.push(q.target_word_id);
      }

      const updatedCompleted = prev.completedQuestions.includes(q.id)
        ? prev.completedQuestions
        : [...prev.completedQuestions, q.id];

      // Check if all questions of current room are completed
      const roomQs = questions.filter(item => item.room === prev.currentRoom);
      const allRoomDone = roomQs.every(item => updatedCompleted.includes(item.id) || item.id === q.id);

      const updatedFragments = { ...prev.codeFragments };
      const updatedRoomsCompleted = { ...prev.roomCompleted };

      if (allRoomDone) {
        const config = ROOMS_CONFIG.find(r => r.id === prev.currentRoom);
        if (config) {
          updatedFragments[prev.currentRoom] = config.targetLetter || config.code_fragment;
          updatedRoomsCompleted[prev.currentRoom] = true;
        }
      }

      const updatedSession: PlayerSession = {
        ...prev,
        score: newScore,
        mistakesCount: newMistakes,
        hintsUsedCount: newHints,
        incorrectWordIds: updatedIncorrect,
        completedQuestions: updatedCompleted,
        codeFragments: updatedFragments,
        roomCompleted: updatedRoomsCompleted,
      };

      savePlayerSession(updatedSession);
      return updatedSession;
    });
  };

  // Advance to Next Room
  const handleAdvanceToNextRoom = () => {
    soundManager.playDoorUnlock();
    if (session.currentRoom < 5) {
      const nextRoomId = session.currentRoom + 1;
      setSession(prev => {
        const updated = { ...prev, currentRoom: nextRoomId };
        savePlayerSession(updated);
        return updated;
      });
    } else {
      // All rooms completed -> Open Final Keypad!
      setIsKeypadOpen(true);
    }
  };

  // Successful Escape Keypad Unlock
  const handleUnlockSuccess = () => {
    setIsKeypadOpen(false);
    setCurrentView('victory');

    // Update Session
    const finalizedSession: PlayerSession = {
      ...session,
      isCompleted: true,
      endTime: Date.now(),
    };
    setSession(finalizedSession);
    savePlayerSession(finalizedSession);

    // Save Student Log for Teacher Dashboard
    const totalTimeSpent = Math.round((Date.now() - session.startTime) / 1000);
    saveStudentLog({
      id: `LOG_${Date.now()}`,
      name: session.playerName,
      mode: session.gameMode,
      difficulty: session.difficulty,
      score: session.score,
      timeSpentSeconds: totalTimeSpent,
      timestamp: new Date().toLocaleString('vi-VN'),
      mistakesCount: session.mistakesCount,
      passed: true,
      weakWords: session.incorrectWordIds,
    });
  };

  // Restart / Reset
  const handleRestart = () => {
    clearPlayerSession();
    setSavedSession(null);
    setCurrentView('lobby');
  };

  const currentRoomConfig =
    ROOMS_CONFIG.find(r => r.id === session.currentRoom) || ROOMS_CONFIG[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950 antialiased">
      {/* Header Bar */}
      <Header
        session={session}
        onOpenBackpack={() => setIsBackpackOpen(true)}
        onOpenCouncil={() => setIsCouncilOpen(true)}
        onOpenVocab={() => setIsVocabOpen(true)}
        onOpenTeacher={() => setIsTeacherOpen(true)}
        onOpenKeypad={() => setIsKeypadOpen(true)}
        onToggleSound={handleToggleSound}
        isMuted={isMuted}
        timeRemaining={session.timeRemainingSeconds}
      />

      {/* Main Body Routing */}
      <main className="flex-1 w-full">
        {currentView === 'lobby' && (
          <LobbyScreen
            onStartGame={handleStartGame}
            onOpenCouncil={() => setIsCouncilOpen(true)}
            onOpenVocab={() => setIsVocabOpen(true)}
            onOpenTeacher={() => setIsTeacherOpen(true)}
            savedSession={savedSession}
            onResumeGame={handleResumeGame}
          />
        )}

        {currentView === 'room' && (
          <RoomView
            roomConfig={currentRoomConfig}
            session={session}
            questions={questions}
            onAnswerQuestion={handleAnswerQuestion}
            onAdvanceToNextRoom={handleAdvanceToNextRoom}
            onOpenKeypad={() => setIsKeypadOpen(true)}
            onBackToLobby={() => setCurrentView('lobby')}
          />
        )}

        {currentView === 'victory' && (
          <VictoryModal
            session={session}
            onRestart={handleRestart}
            onReviewIncorrect={() => {
              setIsVocabOpen(true);
            }}
          />
        )}
      </main>

      {/* Global Modals */}
      <MentorCouncilModal
        isOpen={isCouncilOpen}
        onClose={() => setIsCouncilOpen(false)}
      />

      <BackpackModal
        isOpen={isBackpackOpen}
        onClose={() => setIsBackpackOpen(false)}
        session={session}
        onOpenKeypad={() => {
          setIsBackpackOpen(false);
          setIsKeypadOpen(true);
        }}
      />

      <FlashcardsModal
        isOpen={isVocabOpen}
        onClose={() => setIsVocabOpen(false)}
        incorrectWordIds={session.incorrectWordIds}
      />

      <KeypadModal
        isOpen={isKeypadOpen}
        onClose={() => setIsKeypadOpen(false)}
        session={session}
        onUnlockSuccess={handleUnlockSuccess}
      />

      <TeacherDashboard
        isOpen={isTeacherOpen}
        onClose={() => setIsTeacherOpen(false)}
        onSettingsChanged={newSettings => {
          setTeacherSettings(newSettings);
          setQuestions(loadQuestions());
        }}
      />
    </div>
  );
}
