import React, { useState } from 'react';
import { Question, StudentLog, TeacherSettings } from '../types';
import {
  loadTeacherSettings,
  saveTeacherSettings,
  loadQuestions,
  saveQuestions,
  resetQuestionsToDefault,
  loadStudentLogs,
  clearStudentLogs,
  exportLogsToCSV,
} from '../utils/storage';
import { soundManager } from '../utils/audio';
import {
  X,
  Lock,
  Unlock,
  KeyRound,
  Download,
  Upload,
  RefreshCw,
  Plus,
  Trash2,
  FileSpreadsheet,
  CheckCircle,
  Clock,
  Layers,
} from 'lucide-react';

interface TeacherDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onSettingsChanged: (settings: TeacherSettings) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  isOpen,
  onClose,
  onSettingsChanged,
}) => {
  const [settings, setSettings] = useState<TeacherSettings>(() => loadTeacherSettings());
  const [pinInput, setPinInput] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinError, setPinError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'settings' | 'questions' | 'logs'>('settings');

  // Change PIN state
  const [newPin, setNewPin] = useState<string>('');
  const [pinChangeSuccess, setPinChangeSuccess] = useState<boolean>(false);

  // Questions and Logs state
  const [questions, setQuestions] = useState<Question[]>(() => loadQuestions());
  const [logs, setLogs] = useState<StudentLog[]>(() => loadStudentLogs());
  const [searchTerm, setSearchTerm] = useState<string>('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playClick();
    if (pinInput === settings.pin) {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      soundManager.playWrong();
      setPinError('Mã PIN không chính xác! (Mặc định: STEM2026)');
    }
  };

  const handleChangePin = () => {
    if (newPin.trim().length >= 4) {
      const updated = { ...settings, pin: newPin.trim() };
      setSettings(updated);
      saveTeacherSettings(updated);
      onSettingsChanged(updated);
      setNewPin('');
      setPinChangeSuccess(true);
      setTimeout(() => setPinChangeSuccess(false), 3000);
      soundManager.playCorrect();
    }
  };

  const handleToggleRoom = (roomId: number) => {
    const updatedRooms = {
      ...settings.enabledRooms,
      [roomId]: !settings.enabledRooms[roomId],
    };
    const updated = { ...settings, enabledRooms: updatedRooms };
    setSettings(updated);
    saveTeacherSettings(updated);
    onSettingsChanged(updated);
  };

  const handleToggleTimer = () => {
    const updated = { ...settings, timerEnabled: !settings.timerEnabled };
    setSettings(updated);
    saveTeacherSettings(updated);
    onSettingsChanged(updated);
  };

  const handleTimeLimitChange = (minutes: number) => {
    const updated = { ...settings, timeLimitMinutes: minutes };
    setSettings(updated);
    saveTeacherSettings(updated);
    onSettingsChanged(updated);
  };

  // JSON Export / Import
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(questions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `STEM_Lab_Questions_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = event => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          setQuestions(parsed);
          saveQuestions(parsed);
          alert('Nhập ngân hàng câu hỏi thành công!');
        }
      } catch {
        alert('Tệp JSON không hợp lệ.');
      }
    };
    reader.readAsText(file);
  };

  const handleResetQuestions = () => {
    if (confirm('Khôi phục toàn bộ câu hỏi về mặc định của chương trình?')) {
      const def = resetQuestionsToDefault();
      setQuestions(def);
      soundManager.playCorrect();
    }
  };

  const handleDeleteQuestion = (id: string) => {
    if (confirm('Xóa câu hỏi này khỏi hệ thống?')) {
      const filtered = questions.filter(q => q.id !== id);
      setQuestions(filtered);
      saveQuestions(filtered);
      soundManager.playClick();
    }
  };

  const handleClearLogs = () => {
    if (confirm('Xóa toàn bộ lịch sử kết quả của học sinh?')) {
      clearStudentLogs();
      setLogs([]);
      soundManager.playClick();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-amber-500/60 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Top Header */}
        <div className="px-6 py-4 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-950 border border-amber-600/50 text-amber-400">
              {isAuthenticated ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-lg font-bold text-amber-300">Teacher Dashboard (Bảng Giáo Viên)</h2>
              <p className="text-xs text-slate-400">Quản lý câu hỏi, thời gian và xuất kết quả học sinh</p>
            </div>
          </div>
          <button
            id="teacher-close-btn"
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PIN Authentication Screen */}
        {!isAuthenticated ? (
          <div className="p-8 my-auto max-w-md mx-auto w-full text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-950/60 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto text-2xl">
              🔐
            </div>
            <h3 className="text-xl font-bold text-slate-100">Nhập Mã PIN Giáo Viên</h3>
            <p className="text-xs text-slate-400">
              Mã PIN bảo vệ khu vực cấu hình đề bài và bảng điểm học sinh.
            </p>

            <form onSubmit={handleLogin} className="space-y-3 pt-2">
              <input
                type="password"
                placeholder="Nhập PIN (mặc định: STEM2026)"
                value={pinInput}
                onChange={e => setPinInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-center text-lg font-mono text-cyan-300 tracking-widest focus:outline-none focus:border-amber-500"
                autoFocus
              />
              {pinError && <div className="text-xs text-rose-400">{pinError}</div>}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-sm transition-colors shadow-lg shadow-amber-500/20"
              >
                Mở Khóa Bảng Điều Khiển
              </button>
            </form>
          </div>
        ) : (
          <>
            {/* Nav Tabs */}
            <div className="flex border-b border-slate-800 bg-slate-950/60 px-6 pt-2 gap-4 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('settings')}
                className={`pb-2.5 border-b-2 flex items-center gap-1.5 transition-colors ${
                  activeTab === 'settings'
                    ? 'border-amber-400 text-amber-300'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-4 h-4" />
                Cài Đặt Phòng &amp; Thời Gian
              </button>
              <button
                onClick={() => setActiveTab('questions')}
                className={`pb-2.5 border-b-2 flex items-center gap-1.5 transition-colors ${
                  activeTab === 'questions'
                    ? 'border-amber-400 text-amber-300'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Plus className="w-4 h-4" />
                Ngân Hàng Câu Hỏi ({questions.length})
              </button>
              <button
                onClick={() => {
                  setLogs(loadStudentLogs());
                  setActiveTab('logs');
                }}
                className={`pb-2.5 border-b-2 flex items-center gap-1.5 transition-colors ${
                  activeTab === 'logs'
                    ? 'border-amber-400 text-amber-300'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileSpreadsheet className="w-4 h-4" />
                Kết Quả Học Sinh ({logs.length})
              </button>
            </div>

            {/* Tab 1: Settings */}
            {activeTab === 'settings' && (
              <div className="p-6 space-y-6 overflow-y-auto max-h-[68vh]">
                {/* Rooms Toggles */}
                <div>
                  <h4 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    Bật / Tắt Các Phòng Thoát Hiểm
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[1, 2, 3, 4, 5].map(roomId => {
                      const enabled = settings.enabledRooms[roomId] !== false;
                      return (
                        <div
                          key={roomId}
                          onClick={() => handleToggleRoom(roomId)}
                          className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-colors ${
                            enabled
                              ? 'bg-slate-800/80 border-cyan-500/50 text-cyan-200'
                              : 'bg-slate-950/60 border-slate-800 text-slate-500 opacity-60'
                          }`}
                        >
                          <div>
                            <span className="font-bold text-xs">Phòng {roomId}</span>
                            <div className="text-[11px] text-slate-400">
                              {roomId === 1 && 'Science & Chemistry'}
                              {roomId === 2 && 'Physics & Energy'}
                              {roomId === 3 && 'Technology & Coding'}
                              {roomId === 4 && 'English & Laser'}
                              {roomId === 5 && 'Eco-Innovation Vault'}
                            </div>
                          </div>
                          <span
                            className={`text-xs px-2 py-0.5 rounded font-mono ${
                              enabled ? 'bg-emerald-950 text-emerald-400' : 'bg-slate-900 text-slate-500'
                            }`}
                          >
                            {enabled ? 'BẬT' : 'TẮT'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Timer Controls */}
                <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/80 space-y-3">
                  <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    Đồng Hồ Đếm Ngược
                  </h4>
                  <div className="flex flex-wrap items-center gap-4 text-xs">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.timerEnabled}
                        onChange={handleToggleTimer}
                        className="w-4 h-4 accent-amber-500 rounded"
                      />
                      <span>Bật giới hạn thời gian (Countdown Timer)</span>
                    </label>

                    {settings.timerEnabled && (
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400">Thời lượng:</span>
                        <select
                          value={settings.timeLimitMinutes}
                          onChange={e => handleTimeLimitChange(Number(e.target.value))}
                          className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-slate-200 focus:outline-none"
                        >
                          <option value={20}>20 phút</option>
                          <option value={25}>25 phút</option>
                          <option value={30}>30 phút</option>
                          <option value={35}>35 phút (Khuyến nghị)</option>
                          <option value={40}>40 phút</option>
                          <option value={60}>60 phút</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>

                {/* Change Teacher PIN */}
                <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/80 space-y-3">
                  <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-amber-400" />
                    Đổi Mã PIN Giáo Viên
                  </h4>
                  <div className="flex items-center gap-2 max-w-sm">
                    <input
                      type="text"
                      placeholder="Mã PIN mới (tối thiểu 4 ký tự)"
                      value={newPin}
                      onChange={e => setNewPin(e.target.value)}
                      className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500 flex-1 font-mono"
                    />
                    <button
                      onClick={handleChangePin}
                      className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs transition-colors"
                    >
                      Lưu PIN
                    </button>
                  </div>
                  {pinChangeSuccess && (
                    <span className="text-xs text-emerald-400 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Đã cập nhật mã PIN mới thành công!
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Tab 2: Question Bank Manager */}
            {activeTab === 'questions' && (
              <div className="p-6 space-y-4 overflow-y-auto max-h-[68vh]">
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleExportJSON}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-300"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Xuất JSON
                    </button>

                    <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-300 cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      Nhập JSON
                      <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
                    </label>

                    <button
                      onClick={handleResetQuestions}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-rose-300"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Khôi phục gốc
                    </button>
                  </div>
                </div>

                {/* List Questions */}
                <div className="space-y-3">
                  {questions.map((q, idx) => (
                    <div
                      key={q.id}
                      className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/80 text-xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between font-mono">
                        <span className="text-cyan-400 font-bold">
                          #{idx + 1} &bull; {q.id} &bull; Phòng {q.room} ({q.difficulty})
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-amber-400 font-semibold">{q.points} pts</span>
                          <button
                            onClick={() => handleDeleteQuestion(q.id)}
                            className="p-1 rounded text-slate-400 hover:text-rose-400"
                            title="Xóa câu hỏi"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="font-medium text-slate-200">{q.prompt_vi}</div>
                      <div className="text-slate-400 italic">{q.prompt_en}</div>
                      <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-800 flex justify-between">
                        <span>Cố vấn: {q.lead_mentor}</span>
                        <span>Dạng: {q.type}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Student Logs */}
            {activeTab === 'logs' && (
              <div className="p-6 space-y-4 overflow-y-auto max-h-[68vh]">
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => exportLogsToCSV(logs)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/50 text-emerald-300 font-semibold"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Xuất File CSV
                    </button>
                    <button
                      onClick={handleClearLogs}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950 hover:bg-rose-900 border border-rose-500/50 text-rose-300"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Xóa Lịch Sử
                    </button>
                  </div>

                  <input
                    type="text"
                    placeholder="Tìm theo tên học sinh..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1 text-slate-200 text-xs focus:outline-none"
                  />
                </div>

                {/* Logs Table */}
                <div className="rounded-xl border border-slate-800 overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950/80 text-slate-400 font-mono text-[11px] border-b border-slate-800">
                      <tr>
                        <th className="p-3">Học sinh / Đội</th>
                        <th className="p-3">Chế độ</th>
                        <th className="p-3">Cấp độ</th>
                        <th className="p-3">Điểm</th>
                        <th className="p-3">Thời gian</th>
                        <th className="p-3">Số lần sai</th>
                        <th className="p-3">Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-sans">
                      {logs.filter(l => l.name.toLowerCase().includes(searchTerm.toLowerCase())).length ===
                      0 ? (
                        <tr>
                          <td colSpan={7} className="p-6 text-center text-slate-500 italic">
                            Chưa có dữ liệu phiên chơi của học sinh.
                          </td>
                        </tr>
                      ) : (
                        logs
                          .filter(l => l.name.toLowerCase().includes(searchTerm.toLowerCase()))
                          .map(log => (
                            <tr key={log.id} className="hover:bg-slate-800/40">
                              <td className="p-3 font-semibold text-slate-100">{log.name}</td>
                              <td className="p-3 capitalize">{log.mode}</td>
                              <td className="p-3">{log.difficulty}</td>
                              <td className="p-3 font-mono font-bold text-amber-400">
                                {log.score} / 1000
                              </td>
                              <td className="p-3 font-mono text-slate-400">
                                {Math.floor(log.timeSpentSeconds / 60)}m {log.timeSpentSeconds % 60}s
                              </td>
                              <td className="p-3 text-slate-400">{log.mistakesCount}</td>
                              <td className="p-3">
                                <span
                                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                    log.passed
                                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                      : 'bg-rose-950 text-rose-300 border border-rose-800'
                                  }`}
                                >
                                  {log.passed ? 'PASSED' : 'FAILED'}
                                </span>
                              </td>
                            </tr>
                          ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
