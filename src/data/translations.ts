import { SupportedLanguage } from '../types';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  localName: string;
  flag: string;
  label: string;
  tagline: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  {
    code: 'vi',
    name: 'Tiếng Việt',
    localName: 'Tiếng Việt',
    flag: '🇻🇳',
    label: 'Việt Nam',
    tagline: 'Phiên bản Tiếng Việt chuẩn STEM song ngữ',
  },
  {
    code: 'th',
    name: 'Thai',
    localName: 'ภาษาไทย',
    flag: '🇹🇭',
    label: 'ไทย (Thai)',
    tagline: 'เวอร์ชันภาษาไทยสำหรับนักเรียนไทย พร้อมคำศัพท์ STEM',
  },
  {
    code: 'en',
    name: 'English',
    localName: 'English',
    flag: '🇬🇧',
    label: 'English',
    tagline: 'Global STEM & English Academic Version',
  },
  {
    code: 'zh',
    name: 'Chinese',
    localName: '中文 (简体)',
    flag: '🇨🇳',
    label: '中文 (Chinese)',
    tagline: 'STEM 科学与英语双语互动挑战版',
  },
  {
    code: 'fr',
    name: 'French',
    localName: 'Français',
    flag: '🇫🇷',
    label: 'Français (French)',
    tagline: 'Version scientifique bilingue Français & Anglais',
  },
  {
    code: 'es',
    name: 'Spanish',
    localName: 'Español',
    flag: '🇪🇸',
    label: 'Español (Spanish)',
    tagline: 'Versión de desafío STEM bilingüe Español e Inglés',
  },
];

export interface TranslationDictionary {
  appName: string;
  appSubtitle: string;
  homeIntro: string;
  selectLanguage: string;
  languageSelectedBadge: string;
  mentorsCouncilTitle: string;
  mentorsCouncilSubtitle: string;
  viewCouncilDetails: string;
  gameModeLabel: string;
  soloMode: string;
  teamMode: string;
  playerNameLabel: string;
  teamNameLabel: string;
  teamMembersLabel: string;
  difficultyLabel: string;
  explorerLevel: string;
  explorerDesc: string;
  scientistLevel: string;
  scientistDesc: string;
  innovatorLevel: string;
  innovatorDesc: string;
  startGameBtn: string;
  resumeGameBtn: string;
  resumeBanner: string;
  vocabFlashcardsBtn: string;
  councilBtn: string;
  teacherDashboardBtn: string;
  // Room
  roomPrefix: string;
  missionNumber: string;
  submitAnswer: string;
  unlockHint: string;
  hintUsed: string;
  nextRoomBtn: string;
  escapeSuccessBtn: string;
  backToLobby: string;
  keypadTitle: string;
  backpackTitle: string;
  score: string;
  timeRemaining: string;
  correctVerdict: string;
  partlyCorrectVerdict: string;
  tryAgainVerdict: string;
  missionFailedVerdict: string;
  // Flashcards
  flashcardTitle: string;
  searchPlaceholder: string;
  flipCard: string;
  mastered: string;
  markMastered: string;
  allCategories: string;
  pronounceUk: string;
  pronounceUs: string;
  definitionLabel: string;
  exampleLabel: string;
  meaningLabel: string;
  // Victory
  victoryTitle: string;
  victoryCongrats: string;
  finalScore: string;
  playAgainBtn: string;
  reviewWeakWordsBtn: string;
  councilHonor: string;
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  vi: {
    appName: 'Escape the STEM Lab',
    appSubtitle: 'Thử Thách Giải Mã Phòng Thí Nghiệm STEM & Tiếng Anh Học Thuật',
    homeIntro:
      'Phòng thí nghiệm trung tâm bị khóa khẩn cấp! Hãy cùng Hội đồng Cố vấn STEM gồm 8 giáo viên giải mã 5 phòng thử thách, thu thập 5 mảnh mã khóa S - T - E - M - ! và mở cánh cửa thoát hiểm!',
    selectLanguage: 'Chọn Phiên Bản Ngôn Ngữ (Language Edition):',
    languageSelectedBadge: 'Đang chọn phiên bản Tiếng Việt 🇻🇳',
    mentorsCouncilTitle: 'Hội đồng Cố vấn STEM (8 Giáo viên Đồng hành):',
    mentorsCouncilSubtitle: 'Mr Zainuddin, Mr Hero, Mr Dimark, Mr Tuấn Rich, Dr Tang, Ms Phượng Chick, Ms Selena, Ms Ngoan',
    viewCouncilDetails: 'Nhấn xem hồ sơ chi tiết →',
    gameModeLabel: 'Chế Độ Chơi (Game Mode)',
    soloMode: 'Cá Nhân (Solo Explorer)',
    teamMode: 'Theo Đội (Team Innovation)',
    playerNameLabel: 'Tên Học Sinh',
    teamNameLabel: 'Tên Đội Thi Đấu',
    teamMembersLabel: 'Danh Sách Thành Viên (phân cách bằng dấu phẩy)',
    difficultyLabel: 'Cấp Độ & Độ Khó (Target Grade & Difficulty)',
    explorerLevel: 'Explorer',
    explorerDesc: 'Lớp 6-7 (Khám Phá)',
    scientistLevel: 'Scientist',
    scientistDesc: 'Lớp 8-9 (Chuẩn Học Thuật)',
    innovatorLevel: 'Innovator',
    innovatorDesc: 'Lớp 10+ (Đột Phá Chuyên Sâu)',
    startGameBtn: 'Bắt Đầu Giải Mã Phòng Lab (Khởi Hành)',
    resumeGameBtn: 'Chơi Tiếp',
    resumeBanner: 'Tiếp tục phiên chơi dở dang:',
    vocabFlashcardsBtn: '200 Từ Vựng Flashcards',
    councilBtn: 'Hội Đồng 8 Cố Vấn',
    teacherDashboardBtn: 'Bảng Giáo Viên',
    roomPrefix: 'Phòng',
    missionNumber: 'Nhiệm Vụ',
    submitAnswer: 'Gửi Câu Trả Lời & Kiểm Tra',
    unlockHint: 'Mở Khóa Gợi Ý Cố Vấn (-50 pts)',
    hintUsed: 'Gợi ý từ cố vấn:',
    nextRoomBtn: 'Tiến Vào Phòng Kế Tiếp →',
    escapeSuccessBtn: 'Mở Bàn Phím Khóa Cửa Thoát Hiểm (Keypad)!',
    backToLobby: '← Quay Lại Sảnh Chờ',
    keypadTitle: 'Bàn Phím Khóa Cửa Thoát Hiểm',
    backpackTitle: 'Ba Lô Dụng Cụ & Mảnh Mã Khóa',
    score: 'Điểm Số',
    timeRemaining: 'Thời Gian',
    correctVerdict: 'CHÍNH XÁC (Đúng Hoàn Toàn)',
    partlyCorrectVerdict: 'ĐÚNG MỘT PHẦN',
    tryAgainVerdict: 'HÃY THỬ LẠI',
    missionFailedVerdict: 'NHIỆM VỤ THẤT BẠI',
    flashcardTitle: 'Từ Điển Thuật Ngữ STEM & Flashcards 3D',
    searchPlaceholder: 'Tìm kiếm từ vựng, định nghĩa hoặc nghĩa tiếng Việt...',
    flipCard: 'Nhấn Để Lật Thẻ Xem Nghĩa',
    mastered: 'Đã Thuộc',
    markMastered: 'Đánh Dấu Đã Thuộc',
    allCategories: 'Tất cả chuyên mục',
    pronounceUk: 'Phát âm UK',
    pronounceUs: 'Phát âm US',
    definitionLabel: 'Định nghĩa tiếng Anh giản lược:',
    exampleLabel: 'Ví dụ ngữ cảnh thực nghiệm:',
    meaningLabel: 'Nghĩa tiếng Việt:',
    victoryTitle: 'XUẤT SẮC THOÁT HIỂM THÀNH CÔNG!',
    victoryCongrats:
      'Chúc mừng bạn đã giải mã thành công toàn bộ 5 phòng thí nghiệm STEM và ghép mã S-T-E-M-! an toàn!',
    finalScore: 'Tổng Điểm Đạt Được:',
    playAgainBtn: 'Chơi Lại Thử Thách Mới',
    reviewWeakWordsBtn: 'Ôn Lại Từ Vựng Cần Củng Cố',
    councilHonor: 'Hội Đồng Cố Vấn STEM Đồng Nhiệt Liệt Chúc Mừng',
  },

  th: {
    appName: 'Escape the STEM Lab',
    appSubtitle: 'ความท้าทายถอดรหัสห้องแล็บ STEM และภาษาอังกฤษเชิงวิชาการ',
    homeIntro:
      'ห้องปฏิบัติการกลางถูกล็อกฉุกเฉิน! ร่วมมือกับคณะที่ปรึกษา STEM ทั้ง 8 ท่าน ไขรหัส 5 ห้องทดลอง รวบรวมรหัส 5 ชิ้นส่วน S - T - E - M - ! เพื่อเปิดประตูกู้ภัย!',
    selectLanguage: 'เลือกเวอร์ชันภาษา (Language Edition):',
    languageSelectedBadge: 'กำลังใช้งานเวอร์ชันภาษาไทย 🇹🇭 สำหรับนักเรียนไทย',
    mentorsCouncilTitle: 'คณะครูที่ปรึกษา STEM (8 ท่าน):',
    mentorsCouncilSubtitle: 'Mr Zainuddin, Mr Hero, Mr Dimark, Mr Tuấn Rich, Dr Tang, Ms Phượng Chick, Ms Selena, Ms Ngoan',
    viewCouncilDetails: 'ดูประวัติครูที่ปรึกษา →',
    gameModeLabel: 'โหมดการเล่น (Game Mode)',
    soloMode: 'รายบุคคล (Solo Explorer)',
    teamMode: 'แบบทีม (Team Innovation)',
    playerNameLabel: 'ชื่อนักเรียน',
    teamNameLabel: 'ชื่อทีม',
    teamMembersLabel: 'รายชื่อสมาชิกในทีม (คั่นด้วยเครื่องหมายจุลภาค ,)',
    difficultyLabel: 'ระดับความยาก (Difficulty Level)',
    explorerLevel: 'Explorer (ผู้สำรวจ)',
    explorerDesc: 'ม.1 - ม.2 (พื้นฐาน)',
    scientistLevel: 'Scientist (นักวิทยาศาสตร์)',
    scientistDesc: 'ม.3 - ม.4 (มาตรฐานวิชาการ)',
    innovatorLevel: 'Innovator (นวัตกร)',
    innovatorDesc: 'ม.5 - ม.6+ (ขั้นสูง)',
    startGameBtn: 'เริ่มไขรหัสห้องปฏิบัติการ STEM (ออกเดินทาง)',
    resumeGameBtn: 'เล่นต่อ',
    resumeBanner: 'ดำเนินเซสชันที่เล่นค้างไว้:',
    vocabFlashcardsBtn: 'แฟลชการ์ด 200 คำศัพท์ STEM',
    councilBtn: 'คณะครูที่ปรึกษา 8 ท่าน',
    teacherDashboardBtn: 'แดชบอร์ดครูผู้สอน',
    roomPrefix: 'ห้องที่',
    missionNumber: 'ภารกิจที่',
    submitAnswer: 'ส่งคำตอบและตรวจสอบ',
    unlockHint: 'ขอคำใบ้จากครูที่ปรึกษา (-50 คะแนน)',
    hintUsed: 'คำแนะนำจากครูที่ปรึกษา:',
    nextRoomBtn: 'ไปยังห้องถัดไป →',
    escapeSuccessBtn: 'เปิดแป้นพิมพ์รหัสปลดล็อกประตูกู้ภัย (Keypad)!',
    backToLobby: '← กลับสู่ล็อบบี้',
    keypadTitle: 'แป้นพิมพ์รหัสถอดรหัสประตูนิรภัย',
    backpackTitle: 'กระเป๋าอุปกรณ์และชิ้นส่วนรหัสลับ',
    score: 'คะแนน',
    timeRemaining: 'เวลาที่เหลือ',
    correctVerdict: 'ถูกต้องยอดเยี่ยม!',
    partlyCorrectVerdict: 'ถูกต้องบางส่วน',
    tryAgainVerdict: 'ลองอีกครั้ง',
    missionFailedVerdict: 'ภารกิจไม่สำเร็จ',
    flashcardTitle: 'พจนานุกรมคำศัพท์ STEM และแฟลชการ์ด 3D (พร้อมคำแปลภาษาไทย)',
    searchPlaceholder: 'ค้นหาคำศัพท์ คำจำกัดความ หรือความหมายภาษาไทย...',
    flipCard: 'แตะเพื่อพลิกบัตรดูความหมาย',
    mastered: 'จำได้แล้ว',
    markMastered: 'ทำเครื่องหมายว่าจำได้แล้ว',
    allCategories: 'ทุกหมวดหมู่วิทยาศาสตร์',
    pronounceUk: 'เสียงอ่าน UK',
    pronounceUs: 'เสียงอ่าน US',
    definitionLabel: 'คำจำกัดความภาษาอังกฤษอย่างง่าย:',
    exampleLabel: 'ตัวอย่างประโยคในห้องทดลอง:',
    meaningLabel: 'ความหมายภาษาไทย (Thai Meaning):',
    victoryTitle: 'ยินดีด้วย! คุณหลบหนีออกจากห้องแล็บสำเร็จ!',
    victoryCongrats:
      'สุดยอดมาก! คุณได้ไขรหัสห้องทดลอง STEM ครบทั้ง 5 ห้อง และรวบรวมรหัส S-T-E-M-! ได้สำเร็จอย่างปลอดภัย!',
    finalScore: 'คะแนนรวมที่ทำได้:',
    playAgainBtn: 'เริ่มภารกิจใหม่อีกครั้ง',
    reviewWeakWordsBtn: 'ทบทวนคำศัพท์ที่ควรฝึกฝนเพิ่ม',
    councilHonor: 'คณะครูที่ปรึกษา STEM ขอแสดงความยินดีอย่างยิ่ง!',
  },

  en: {
    appName: 'Escape the STEM Lab',
    appSubtitle: 'Interactive STEM & Academic English Escape Room Challenge',
    homeIntro:
      'The central facility is under lockdown! Partner with the 8-mentor STEM Council, decipher clues across 5 specialized chambers, gather all 5 cipher fragments S - T - E - M - !, and unlock the emergency exit!',
    selectLanguage: 'Select Language Edition:',
    languageSelectedBadge: 'English Edition Active 🇬🇧',
    mentorsCouncilTitle: 'STEM Advisory Council (8 Distinguished Mentors):',
    mentorsCouncilSubtitle: 'Mr Zainuddin, Mr Hero, Mr Dimark, Mr Tuấn Rich, Dr Tang, Ms Phượng Chick, Ms Selena, Ms Ngoan',
    viewCouncilDetails: 'View Detailed Profiles →',
    gameModeLabel: 'Game Mode',
    soloMode: 'Solo Explorer',
    teamMode: 'Team Innovation',
    playerNameLabel: 'Student Name',
    teamNameLabel: 'Team Name',
    teamMembersLabel: 'Team Members (comma separated)',
    difficultyLabel: 'Target Grade & Difficulty',
    explorerLevel: 'Explorer',
    explorerDesc: 'Grades 6-7 (Foundational)',
    scientistLevel: 'Scientist',
    scientistDesc: 'Grades 8-9 (Core Academic)',
    innovatorLevel: 'Innovator',
    innovatorDesc: 'Grades 10+ (Advanced Mastery)',
    startGameBtn: 'Start Escape Challenge (Launch)',
    resumeGameBtn: 'Resume Session',
    resumeBanner: 'Unfinished session found:',
    vocabFlashcardsBtn: '200 Vocabulary Flashcards',
    councilBtn: '8 STEM Mentors',
    teacherDashboardBtn: 'Teacher Dashboard',
    roomPrefix: 'Chamber',
    missionNumber: 'Mission',
    submitAnswer: 'Submit & Verify Answer',
    unlockHint: 'Request Mentor Hint (-50 pts)',
    hintUsed: 'Mentor Guidance:',
    nextRoomBtn: 'Proceed to Next Chamber →',
    escapeSuccessBtn: 'Access Escape Door Keypad!',
    backToLobby: '← Return to Lobby',
    keypadTitle: 'Emergency Escape Decryption Keypad',
    backpackTitle: 'Inventory & Cipher Fragments',
    score: 'Score',
    timeRemaining: 'Time Left',
    correctVerdict: 'CORRECT! Mastered',
    partlyCorrectVerdict: 'PARTLY CORRECT',
    tryAgainVerdict: 'TRY AGAIN',
    missionFailedVerdict: 'MISSION FAILED',
    flashcardTitle: 'STEM Academic Vocabulary & 3D Flashcards',
    searchPlaceholder: 'Search terminology, definitions, or meanings...',
    flipCard: 'Click to Flip & Inspect Definition',
    mastered: 'Mastered',
    markMastered: 'Mark as Mastered',
    allCategories: 'All STEM Categories',
    pronounceUk: 'UK Pronunciation',
    pronounceUs: 'US Pronunciation',
    definitionLabel: 'Academic English Definition:',
    exampleLabel: 'Experimental Context Sentence:',
    meaningLabel: 'Translation Meaning:',
    victoryTitle: 'OUTSTANDING LAB ESCAPE SUCCESS!',
    victoryCongrats:
      'Congratulations! You successfully neutralized all hazards across 5 STEM chambers and assembled the S-T-E-M-! master sequence!',
    finalScore: 'Total Score Achieved:',
    playAgainBtn: 'Start New Challenge',
    reviewWeakWordsBtn: 'Review Targeted Terminology',
    councilHonor: 'The STEM Advisory Council Applauds Your Mastery',
  },

  zh: {
    appName: 'Escape the STEM Lab',
    appSubtitle: 'STEM科学与学术英语密室逃脱互动挑战',
    homeIntro:
      '中心实验室处于紧急封锁状态！与8位STEM导师携手合作，破解5个专属实验舱的谜题，收集5个密码碎片 S - T - E - M - ！，成功开启紧急逃生门！',
    selectLanguage: '选择语言版本 (Language Edition):',
    languageSelectedBadge: '当前为中文版本 🇨🇳',
    mentorsCouncilTitle: 'STEM导师顾问委员会 (8位专家导师):',
    mentorsCouncilSubtitle: 'Mr Zainuddin, Mr Hero, Mr Dimark, Mr Tuấn Rich, Dr Tang, Ms Phượng Chick, Ms Selena, Ms Ngoan',
    viewCouncilDetails: '查看导师档案 →',
    gameModeLabel: '游戏模式 (Game Mode)',
    soloMode: '个人探索 (Solo Explorer)',
    teamMode: '团队协作 (Team Innovation)',
    playerNameLabel: '学生姓名',
    teamNameLabel: '队伍名称',
    teamMembersLabel: '小组成员名单 (以逗号分隔)',
    difficultyLabel: '难度等级 (Difficulty Level)',
    explorerLevel: 'Explorer (探索者)',
    explorerDesc: '6-7 年级 (基础探索)',
    scientistLevel: 'Scientist (科学家)',
    scientistDesc: '8-9 年级 (标准学术)',
    innovatorLevel: 'Innovator (创新者)',
    innovatorDesc: '10 年级以上 (进阶深度)',
    startGameBtn: '启动解密挑战 (出发)',
    resumeGameBtn: '继续游戏',
    resumeBanner: '检测到未完成的挑战会话：',
    vocabFlashcardsBtn: '200个核心词汇闪卡',
    councilBtn: '8位导师团队',
    teacherDashboardBtn: '教师管理后台',
    roomPrefix: '实验舱',
    missionNumber: '任务',
    submitAnswer: '提交并验证答案',
    unlockHint: '向导师申请提示 (-50 分)',
    hintUsed: '导师指引：',
    nextRoomBtn: '进入下一个实验舱 →',
    escapeSuccessBtn: '打开逃生门解密键盘 (Keypad)！',
    backToLobby: '← 返回大厅',
    keypadTitle: '逃生门解密键盘',
    backpackTitle: '实验背包与密码碎片',
    score: '得分',
    timeRemaining: '剩余时间',
    correctVerdict: '回答正确！完全掌握',
    partlyCorrectVerdict: '部分正确',
    tryAgainVerdict: '请再试一次',
    missionFailedVerdict: '任务失败',
    flashcardTitle: 'STEM学术词汇库与3D互动闪卡 (含中文释义)',
    searchPlaceholder: '搜索英文术语、定义或中文含义...',
    flipCard: '点击翻转卡片查看释义',
    mastered: '已掌握',
    markMastered: '标记为已掌握',
    allCategories: '所有科学领域',
    pronounceUk: '英式发音 UK',
    pronounceUs: '美式发音 US',
    definitionLabel: '简明英文释义：',
    exampleLabel: '实验语境例句：',
    meaningLabel: '中文含义 (Chinese Meaning)：',
    victoryTitle: '热烈祝贺！成功逃出实验室！',
    victoryCongrats:
      '你成功攻克了5个STEM实验舱的全部难关，并顺利集齐了 S-T-E-M-! 密钥序列！',
    finalScore: '最终获得积分：',
    playAgainBtn: '开始全新挑战',
    reviewWeakWordsBtn: '复习需要强化的词汇',
    councilHonor: 'STEM导师顾问委员会向你致以热烈祝贺！',
  },

  fr: {
    appName: 'Escape the STEM Lab',
    appSubtitle: 'Défi Scientifique STEM & Anglais Académique en Salle d’Évasion',
    homeIntro:
      'Le laboratoire central est verrouillé d’urgence ! Avec le conseil de 8 mentors STEM, décryptez 5 salles spécialisées, récupérez les 5 fragments du code S - T - E - M - ! et ouvrez la porte de secours !',
    selectLanguage: 'Choisir la Version Linguistique :',
    languageSelectedBadge: 'Version Française Active 🇫🇷',
    mentorsCouncilTitle: 'Conseil des Mentors STEM (8 Éducateurs) :',
    mentorsCouncilSubtitle: 'Mr Zainuddin, Mr Hero, Mr Dimark, Mr Tuấn Rich, Dr Tang, Ms Phượng Chick, Ms Selena, Ms Ngoan',
    viewCouncilDetails: 'Consulter les profils →',
    gameModeLabel: 'Mode de Jeu (Game Mode)',
    soloMode: 'Explorateur Solo',
    teamMode: 'Équipe Innovante',
    playerNameLabel: 'Nom de l’élève',
    teamNameLabel: 'Nom de l’équipe',
    teamMembersLabel: 'Membres de l’équipe (séparés par des virgules)',
    difficultyLabel: 'Niveau et Difficulté',
    explorerLevel: 'Explorer',
    explorerDesc: 'Classes 6e-5e (Fondations)',
    scientistLevel: 'Scientist',
    scientistDesc: 'Classes 4e-3e (Standard Académique)',
    innovatorLevel: 'Innovator',
    innovatorDesc: 'Lycée 2nde+ (Avancé)',
    startGameBtn: 'Lancer l’Évasion STEM (Démarrer)',
    resumeGameBtn: 'Reprendre la Partie',
    resumeBanner: 'Session inachevée détectée :',
    vocabFlashcardsBtn: '200 Flashcards de Vocabulaire',
    councilBtn: 'Conseil des 8 Mentors',
    teacherDashboardBtn: 'Tableau de Bord Enseignant',
    roomPrefix: 'Salle',
    missionNumber: 'Mission',
    submitAnswer: 'Soumettre et Vérifier',
    unlockHint: 'Demander un Indice au Mentor (-50 pts)',
    hintUsed: 'Indice du mentor :',
    nextRoomBtn: 'Passer à la Salle Suivante →',
    escapeSuccessBtn: 'Accéder au Pavé Numérique de Secours !',
    backToLobby: '← Retour au Hall',
    keypadTitle: 'Pavé Numérique de Déverrouillage',
    backpackTitle: 'Sac à Dos & Fragments de Code',
    score: 'Score',
    timeRemaining: 'Temps Restant',
    correctVerdict: 'CORRECT ! Excellente réponse',
    partlyCorrectVerdict: 'PARTIELLEMENT CORRECT',
    tryAgainVerdict: 'RÉESSAYER',
    missionFailedVerdict: 'MISSION ÉCHOUÉE',
    flashcardTitle: 'Vocabulaire Académique STEM & Flashcards 3D (avec traduction)',
    searchPlaceholder: 'Rechercher un mot, une définition ou la traduction...',
    flipCard: 'Cliquer pour retourner la carte',
    mastered: 'Maîtrisé',
    markMastered: 'Marquer comme maîtrisé',
    allCategories: 'Toutes les catégories',
    pronounceUk: 'Prononciation UK',
    pronounceUs: 'Prononciation US',
    definitionLabel: 'Définition en anglais simple :',
    exampleLabel: 'Exemple en contexte expérimental :',
    meaningLabel: 'Signification en Français :',
    victoryTitle: 'FÉLICITATIONS ! ÉVASION RÉUSSIE !',
    victoryCongrats:
      'Bravo ! Vous avez neutralisé les dangers des 5 salles STEM et reconstitué la séquence S-T-E-M-! avec succès !',
    finalScore: 'Score Final Atteint :',
    playAgainBtn: 'Recommencer un Nouveau Défi',
    reviewWeakWordsBtn: 'Réviser les Mots à Renforcer',
    councilHonor: 'Le Conseil des Mentors STEM vous félicite chaleureusement !',
  },

  es: {
    appName: 'Escape the STEM Lab',
    appSubtitle: 'Desafío de Escape Room STEM e Inglés Académico',
    homeIntro:
      '¡El laboratorio central se encuentra bajo bloqueo de emergencia! Con el Consejo de 8 Mentores STEM, descifra los 5 laboratorios especializados, reúne los 5 fragmentos de código S - T - E - M - ! y abre la salida de emergencia.',
    selectLanguage: 'Seleccionar Edición de Idioma:',
    languageSelectedBadge: 'Edición en Español Activa 🇪🇸',
    mentorsCouncilTitle: 'Consejo de Mentores STEM (8 Educadores):',
    mentorsCouncilSubtitle: 'Mr Zainuddin, Mr Hero, Mr Dimark, Mr Tuấn Rich, Dr Tang, Ms Phượng Chick, Ms Selena, Ms Ngoan',
    viewCouncilDetails: 'Ver perfiles de mentores →',
    gameModeLabel: 'Modo de Juego (Game Mode)',
    soloMode: 'Explorador Individual',
    teamMode: 'Equipo de Innovación',
    playerNameLabel: 'Nombre del Estudiante',
    teamNameLabel: 'Nombre del Equipo',
    teamMembersLabel: 'Integrantes del equipo (separados por coma)',
    difficultyLabel: 'Nivel y Dificultad',
    explorerLevel: 'Explorer',
    explorerDesc: 'Grados 6°-7° (Fundamentos)',
    scientistLevel: 'Scientist',
    scientistDesc: 'Grados 8°-9° (Estándar Académico)',
    innovatorLevel: 'Innovator',
    innovatorDesc: 'Grado 10°+ (Avanzado)',
    startGameBtn: 'Iniciar Desafío de Escape (Comenzar)',
    resumeGameBtn: 'Continuar Partida',
    resumeBanner: 'Sesión anterior encontrada:',
    vocabFlashcardsBtn: '200 Tarjetas de Vocabulario',
    councilBtn: 'Consejo de 8 Mentores',
    teacherDashboardBtn: 'Panel de Profesores',
    roomPrefix: 'Sala',
    missionNumber: 'Misión',
    submitAnswer: 'Enviar y Verificar Respuesta',
    unlockHint: 'Pedir Pista al Mentor (-50 pts)',
    hintUsed: 'Orientación del mentor:',
    nextRoomBtn: 'Avanzar a la Siguiente Sala →',
    escapeSuccessBtn: '¡Abrir Teclado de Desbloqueo de Emergencia!',
    backToLobby: '← Volver al Vestíbulo',
    keypadTitle: 'Teclado de Desencriptación de Emergencia',
    backpackTitle: 'Mochila de Herramientas y Fragmentos',
    score: 'Puntaje',
    timeRemaining: 'Tiempo Restante',
    correctVerdict: '¡CORRECTO! Dominado con éxito',
    partlyCorrectVerdict: 'PARCIALMENTE CORRECTO',
    tryAgainVerdict: 'INTÉNTALO DE NUEVO',
    missionFailedVerdict: 'MISIÓN NO SUPERADA',
    flashcardTitle: 'Vocabulario Académico STEM y Tarjetas 3D (con traducción al español)',
    searchPlaceholder: 'Buscar término, definición o significado en español...',
    flipCard: 'Haz clic para voltear la tarjeta',
    mastered: 'Dominado',
    markMastered: 'Marcar como Dominado',
    allCategories: 'Todas las categorías STEM',
    pronounceUk: 'Pronunciación UK',
    pronounceUs: 'Pronunciación US',
    definitionLabel: 'Definición en inglés simplificado:',
    exampleLabel: 'Ejemplo en contexto de laboratorio:',
    meaningLabel: 'Significado en Español:',
    victoryTitle: '¡ENHORABUENA! ¡ESCAPE COMPLETADO!',
    victoryCongrats:
      '¡Felicitaciones! Has superado con éxito las 5 salas STEM y ensamblado la clave S-T-E-M-! sin contratiempos.',
    finalScore: 'Puntuación Total Obtenida:',
    playAgainBtn: 'Comenzar Nuevo Desafío',
    reviewWeakWordsBtn: 'Repasar Términos Clave',
    councilHonor: 'El Consejo de Mentores STEM te felicita con orgullo',
  },
};

export function getTranslation(lang: SupportedLanguage = 'vi'): TranslationDictionary {
  return TRANSLATIONS[lang] || TRANSLATIONS.vi;
}

// Multilingual Room Metadata
export interface MultilingualRoomInfo {
  title: string;
  objective: string;
  theme: string;
}

export const ROOMS_I18N: Record<number, Record<SupportedLanguage, MultilingualRoomInfo>> = {
  1: {
    vi: {
      title: 'Phòng Thí Nghiệm Nhiễm Độc',
      objective: 'Nhận diện dụng cụ thí nghiệm, làm chủ phương pháp khoa học, chọn bảo hộ PPE và giải mã chất gây ô nhiễm.',
      theme: 'Khoa học, Hóa học & An toàn phòng thí nghiệm',
    },
    th: {
      title: 'ห้องทดลองสารปนเปื้อน (The Contaminated Lab)',
      objective: 'ระบุอุปกรณ์ห้องปฏิบัติการ ทำความเข้าใจระเบียบวิธีทางวิทยาศาสตร์ เลือกชุด PPE และกำจัดสารปนเปื้อนเคมี',
      theme: 'วิทยาศาสตร์ เคมี และความปลอดภัยในห้องทดลอง',
    },
    en: {
      title: 'The Contaminated Lab',
      objective: 'Identify lab apparatus, master the scientific method, choose PPE, and neutralize chemical contaminant.',
      theme: 'Science, Chemistry & Lab Safety',
    },
    zh: {
      title: '受污染的化学实验室',
      objective: '辨识实验器材，掌握科学探究步骤，选用个人防护装备 (PPE)，中和并解除化学污染源。',
      theme: '科学、化学实验与实验室安全',
    },
    fr: {
      title: 'Le Laboratoire Contaminé',
      objective: 'Identifier la verrerie et les instruments, maîtriser la méthode scientifique, choisir les EPI et neutraliser le polluant chimique.',
      theme: 'Sciences, Chimie et Sécurité en Laboratoire',
    },
    es: {
      title: 'El Laboratorio Contaminado',
      objective: 'Identificar el material de laboratorio, aplicar el método científico, seleccionar EPP y neutralizar el reactivo contaminante.',
      theme: 'Ciencia, Química y Seguridad en el Laboratorio',
    },
  },
  2: {
    vi: {
      title: 'Buồng Năng Lượng Lực Học',
      objective: 'Phân loại nguồn năng lượng, ghép đơn vị đo, cân chỉnh góc phóng động năng và tối ưu tiêu thụ điện năng.',
      theme: 'Vật lý, Năng lượng & Toán học',
    },
    th: {
      title: 'ห้องทดลองพลังงานและกลศาสตร์ (The Energy Chamber)',
      objective: 'จำแนกแหล่งพลังงาน จับคู่หน่วยวัด ปรับเทียบมุมการเคลื่อนที่แบบโพรเจกไทล์ และเพิ่มประสิทธิภาพการใช้พลังงาน',
      theme: 'ฟิสิกส์ พลังงาน และคณิตศาสตร์',
    },
    en: {
      title: 'The Energy Chamber',
      objective: 'Classify energy sources, balance units, calibrate projectile angles, and optimize power consumption.',
      theme: 'Physics, Energy & Mathematics',
    },
    zh: {
      title: '能量与力学密室',
      objective: '分类可再生与不可再生能源，匹配物理单位，校准抛体运动角度并优化电力负载。',
      theme: '物理学、能源动力与应用数学',
    },
    fr: {
      title: 'La Chambre d’Énergie',
      objective: 'Classifier les sources d’énergie, équilibrer les unités SI, calibrer les angles de tir et optimiser la consommation.',
      theme: 'Physique, Énergie et Mathématiques',
    },
    es: {
      title: 'La Cámara de Energía',
      objective: 'Clasificar fuentes de energía, relacionar unidades de medida, calibrar ángulos de tiro parabólico y optimizar el consumo eléctrico.',
      theme: 'Física, Energía y Matemáticas',
    },
  },
  3: {
    vi: {
      title: 'Xưởng Chế Tạo Robot Hỏng',
      objective: 'Xây dựng thuật toán dẫn đường, gỡ lỗi mã giả, chọn cảm biến và kiểm tra tải trọng kết cấu kỹ thuật.',
      theme: 'Công nghệ, Lập trình & Kỹ thuật',
    },
    th: {
      title: 'โรงซ่อมบำรุงหุ่นยนต์ขัดข้อง (The Broken Robot)',
      objective: 'สร้างอัลกอริทึมการนำทาง แก้ไขข้อผิดพลาดรหัสเทียม (Pseudocode) เลือกเซนเซอร์ และทดสอบความแข็งแรงของโครงสร้างสะพาน',
      theme: 'เทคโนโลยี การเขียนโค้ด และวิศวกรรม',
    },
    en: {
      title: 'The Broken Robot Workshop',
      objective: 'Construct navigation algorithms, debug pseudocode, select sensors, and test structural bridge loads.',
      theme: 'Technology, Coding & Engineering',
    },
    zh: {
      title: '机械人检修工坊',
      objective: '构建机器人导航算法，排查调试伪代码逻辑错误，配置传感器并测试工程桥梁受力结构。',
      theme: '信息技术、编程算法与工程力学',
    },
    fr: {
      title: 'L’Atelier du Robot en Panne',
      objective: 'Concevoir des algorithmes de navigation, déboguer du pseudocode, sélectionner des capteurs et tester la résistance des ponts.',
      theme: 'Technologie, Programmation et Ingénierie',
    },
    es: {
      title: 'El Taller del Robot Averiado',
      objective: 'Diseñar algoritmos de navegación, depurar pseudocódigo, configurar sensores y probar la resistencia de estructuras.',
      theme: 'Tecnología, Programación e Ingeniería',
    },
  },
  4: {
    vi: {
      title: 'Lăng Kính Ngôn Ngữ STEM',
      objective: 'Phân biệt cặp âm tối thiểu, xác định trọng âm thuật ngữ, hoàn thành quy trình học thuật và thuyết trình giải pháp.',
      theme: 'Tiếng Anh STEM, Phát âm & Giao tiếp Quốc tế',
    },
    th: {
      title: 'เลนส์ภาษาและการสื่อสาร STEM (The Language Laser)',
      objective: 'แยกแยะคู่เสียงคำ (Minimal Pairs) กำหนดตำแหน่งการเน้นเสียงหนัก-เบา (Word Stress) เติมคำในขั้นตอนวิชาการ และนำเสนอวิธีแก้ปัญหา',
      theme: 'ภาษาอังกฤษสำหรับ STEM การออกเสียง และการสื่อสารระดับสากล',
    },
    en: {
      title: 'The Language Laser',
      objective: 'Distinguish minimal sound pairs, locate academic word stress, complete protocols, and communicate solutions clearly.',
      theme: 'English for STEM, Pronunciation & Communication',
    },
    zh: {
      title: 'STEM学术语言激光透镜',
      objective: '辨析英语最小语音对，精准标注专业术语单词重音，补全学术实验规程并进行方案陈述。',
      theme: 'STEM专业英语、标准发音与国际学术交流',
    },
    fr: {
      title: 'Le Laser Linguistique STEM',
      objective: 'Distinguer les paires minimales, identifier l’accent tonique académique, compléter des protocoles et communiquer des solutions.',
      theme: 'Anglais pour les STEM, Prononciation et Communication',
    },
    es: {
      title: 'El Láser del Lenguaje STEM',
      objective: 'Distinguir pares mínimos de sonidos, ubicar el acento prosódico en términos científicos, completar protocolos y comunicar soluciones.',
      theme: 'Inglés para STEM, Pronunciación y Comunicación Global',
    },
  },
  5: {
    vi: {
      title: 'Hầm Đổi Mới Sinh Thái',
      objective: 'Đánh giá đa dạng sinh học, tính toán chỉ số phát thải carbon, thiết kế bao bì bền vững và hoàn thành mã khóa.',
      theme: 'STEM tích hợp, Sinh thái & Thiết kế Sáng tạo',
    },
    th: {
      title: 'ห้องนิรภัยนวัตกรรมเชิงนิเวศ (The Eco-Innovation Vault)',
      objective: 'ประเมินดัชนีความหลากหลายทางชีวภาพ คำนวณคาร์บอนฟุตพริ้นท์ ออกแบบบรรจุภัณฑ์ที่เป็นมิตรต่อสิ่งแวดล้อม และปลดล็อกชิ้นส่วนรหัสสุดท้าย',
      theme: 'STEM บูรณาการ ความยั่งยืน และการออกแบบเชิงสร้างสรรค์',
    },
    en: {
      title: 'The Eco-Innovation Vault',
      objective: 'Assess biodiversity indexes, calculate carbon footprints, design circular biomaterial packaging, and unlock the final letter.',
      theme: 'Integrated STEM, Sustainability & Creative Design',
    },
    zh: {
      title: '生态创新保密舱',
      objective: '评估生态生物多样性指数，计算产品碳足迹，设计可持续可降解环保包装并激活最终通关秘钥。',
      theme: '综合跨学科STEM、生态可持续发展与人本设计',
    },
    fr: {
      title: 'La Chambre d’Éco-Innovation',
      objective: 'Évaluer la biodiversité, calculer l’empreinte carbone, concevoir un emballage circulaire durable et débloquer le code final.',
      theme: 'STEM Intégré, Durabilité et Design Circulaire',
    },
    es: {
      title: 'La Bóveda de Eco-Innovación',
      objective: 'Evaluar índices de biodiversidad, calcular la huella de carbono, diseñar envases biodegradables sostenibles y obtener la clave final.',
      theme: 'STEM Integrado, Sostenibilidad y Diseño Innovador',
    },
  },
};
