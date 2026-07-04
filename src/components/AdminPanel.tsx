import React, { useState } from 'react';
import {
  X,
  Lock,
  Edit3,
  CheckCircle,
  XCircle,
  Users,
  Database,
  FileText,
  Trash2,
  Download,
  Upload,
  RefreshCw
} from 'lucide-react';
import { AppState, PhotoItem, VideoItem, LetterItem, ArtworkItem, MusicItem } from '../types';

interface AdminPanelProps {
  state: AppState;
  onUpdateConfig: (newConfig: any) => void;
  onApproveItem: (category: 'photos' | 'videos' | 'letters' | 'artwork' | 'music', itemId: string) => void;
  onRejectItem: (category: 'photos' | 'videos' | 'letters' | 'artwork' | 'music', itemId: string) => void;
  onImportBackup: (importedState: AppState) => void;
  onClose: () => void;
}

export default function AdminPanel({
  state,
  onUpdateConfig,
  onApproveItem,
  onRejectItem,
  onImportBackup,
  onClose
}: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Active sub-tab in Admin panel
  const [activeTab, setActiveTab] = useState<'submissions' | 'slogans' | 'members' | 'backup'>('submissions');

  // Input bindings for slogans editing
  const [zackText, setZackText] = useState(state.config.zackText);
  const [jeremyText, setJeremyText] = useState(state.config.jeremyText);
  const [bannerText, setBannerText] = useState(state.config.bannerText);
  const [footerText, setFooterText] = useState(state.config.footerText);
  const [mainStarTitle, setMainStarTitle] = useState(state.config.mainStarTitle);

  // VIP Members Mock Directory for MVP (Stage 2 roadmap preview)
  const [members, setMembers] = useState([
    { uid: 'm_1', name: 'celia970105', email: 'celia970105@gmail.com', role: '超級管理員 Super Admin', points: 1250, status: 'Active' },
    { uid: 'm_2', name: 'JiYu_Fairy', email: 'jiyu_fairy@support.club', role: '核心投稿官 Core Contributor', points: 420, status: 'Active' },
    { uid: 'm_3', name: 'Sweet_Zack', email: 'zack_fan@net.com', role: '榮譽會員 Honor VIP', points: 290, status: 'Active' },
    { uid: 'm_4', name: 'WeChat_User_39', email: 'wc_39@qq.com', role: '普通會員 Fan', points: 30, status: 'Active' }
  ]);

  // Auth password verify handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin') {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('密碼錯誤，請再輸入一次！(預設密碼為: admin)');
    }
  };

  // Submit slogans changes
  const handleSaveSlogans = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateConfig({
      zackText,
      jeremyText,
      bannerText,
      footerText,
      mainStarTitle,
      adminPasswordHash: state.config.adminPasswordHash
    });
    alert('首頁與應援文案素材修改成功！✨');
  };

  // Export state database to local JSON file
  const handleExportBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `AllForJiyu_Backup_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON backup
  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsedData = JSON.parse(event.target?.result as string);
        if (parsedData.config && parsedData.photos && parsedData.letters) {
          onImportBackup(parsedData);
          alert('備份數據成功載入與回復！🔄');
          setZackText(parsedData.config.zackText);
          setJeremyText(parsedData.config.jeremyText);
          setBannerText(parsedData.config.bannerText);
          setFooterText(parsedData.config.footerText);
          setMainStarTitle(parsedData.config.mainStarTitle);
        } else {
          alert('載入失敗：JSON 結構不符合格式規章。');
        }
      } catch (err) {
        alert('解析備份檔案出錯，請確認格式。');
      }
    };
    reader.readAsText(file);
  };

  // Gather all submissions across the 5 categories
  const allPendingItems: { cat: 'photos' | 'videos' | 'letters' | 'artwork' | 'music'; item: any }[] = [];
  state.photos.forEach(item => { if (item.status === 'pending') allPendingItems.push({ cat: 'photos', item }); });
  state.videos.forEach(item => { if (item.status === 'pending') allPendingItems.push({ cat: 'videos', item }); });
  state.letters.forEach(item => { if (item.status === 'pending') allPendingItems.push({ cat: 'letters', item }); });
  state.artworks.forEach(item => { if (item.status === 'pending') allPendingItems.push({ cat: 'artwork', item }); });
  state.music.forEach(item => { if (item.status === 'pending') allPendingItems.push({ cat: 'music', item }); });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl h-[85vh] bg-[#09050d] rounded-2xl border border-[#FF799C]/50 shadow-2xl flex flex-col overflow-hidden text-white">
        
        {/* Header decoration */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#FF799C] via-white to-[#FFCCDD]" />

        {/* Modal Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-white/5 bg-black/40 relative">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-[#FF799C]/10 border border-[#FF799C]/30 text-[#FF799C]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold tracking-wide text-[#FFCCDD]">
                STAR CLUB ADMIN PANEL
              </h2>
              <p className="text-[10px] font-mono tracking-widest text-[#FF799C]">
                後台管理系統 • 審核與配置中心
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* LOGIN SCREEN IF NOT AUTHENTICATED */}
        {!isAuthenticated ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="max-w-md w-full bg-black/40 p-8 rounded-2xl border border-white/5 shadow-lg space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#FF799C]/10 border border-[#FF799C]/40 flex items-center justify-center mx-auto text-[#FF799C] shadow-lg shadow-[#FF799C]/5 animate-pulse">
                <Lock className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-lg font-bold">請輸入管理員通行密碼</h4>
                <p className="text-xs text-gray-400">
                  應援管理員密碼驗證 (為方便演示，預設密碼為 <code className="bg-white/10 px-1.5 py-0.5 rounded text-[#FFCCDD]">admin</code>)
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="password"
                  required
                  placeholder="請輸入密碼 Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/50 border border-[#FF799C]/30 rounded-xl px-4 py-3 text-center text-white tracking-widest text-lg focus:outline-none focus:border-[#FF799C] transition-colors"
                />
                {errorMsg && (
                  <p className="text-xs text-red-400 font-medium bg-red-400/5 py-1.5 px-3 rounded-lg border border-red-400/15">
                    {errorMsg}
                  </p>
                )}
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-[#FF799C] to-[#FFCCDD] text-black font-bold tracking-widest rounded-xl hover:opacity-95 shadow-md shadow-[#FF799C]/10"
                >
                  解鎖登入 VERIFY PASSWORD
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* REAL MANAGEMENT AREA */
          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar Controls */}
            <div className="w-48 bg-black/40 border-r border-white/5 p-4 flex flex-col space-y-2">
              <button
                onClick={() => setActiveTab('submissions')}
                className={`w-full py-2.5 px-3 rounded-xl text-left text-xs font-semibold flex items-center space-x-2 transition-colors ${
                  activeTab === 'submissions'
                    ? 'bg-[#FF799C] text-black'
                    : 'hover:bg-white/5 text-gray-300'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>審核投稿 ({allPendingItems.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('slogans')}
                className={`w-full py-2.5 px-3 rounded-xl text-left text-xs font-semibold flex items-center space-x-2 transition-colors ${
                  activeTab === 'slogans'
                    ? 'bg-[#FF799C] text-black'
                    : 'hover:bg-white/5 text-gray-300'
                }`}
              >
                <Edit3 className="w-4 h-4" />
                <span>修改應援素材</span>
              </button>

              <button
                onClick={() => setActiveTab('members')}
                className={`w-full py-2.5 px-3 rounded-xl text-left text-xs font-semibold flex items-center space-x-2 transition-colors ${
                  activeTab === 'members'
                    ? 'bg-[#FF799C] text-black'
                    : 'hover:bg-white/5 text-gray-300'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>粉絲會員管理</span>
              </button>

              <button
                onClick={() => setActiveTab('backup')}
                className={`w-full py-2.5 px-3 rounded-xl text-left text-xs font-semibold flex items-center space-x-2 transition-colors ${
                  activeTab === 'backup'
                    ? 'bg-[#FF799C] text-black'
                    : 'hover:bg-white/5 text-gray-300'
                }`}
              >
                <Database className="w-4 h-4" />
                <span>數據與備份</span>
              </button>
            </div>

            {/* Dashboard Content screen */}
            <div className="flex-1 p-6 overflow-y-auto custom-scrollbar bg-black/10">
              
              {/* TAB 1: REVIEW SUBMISSIONS */}
              {activeTab === 'submissions' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-white/5">
                    <h3 className="font-serif text-base font-bold text-[#FFCCDD]">
                      投稿項目待審核 ({allPendingItems.length})
                    </h3>
                    <p className="text-[11px] text-gray-400">
                      所有用戶在前端提交的素材，需在此處手動點擊「核准」才會對外公布。
                    </p>
                  </div>

                  {allPendingItems.length === 0 ? (
                    <div className="text-center py-24 text-gray-400 font-serif">
                      🎉 所有的投稿皆已審查完成，暫無待處理事項！
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {allPendingItems.map(({ cat, item }) => (
                        <div
                          key={item.id}
                          className="bg-black/30 border border-white/5 p-4 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-white/10 transition-colors"
                        >
                          <div className="space-y-1.5 flex-1 text-left">
                            <div className="flex items-center space-x-2">
                              <span className="text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-[#FF799C]/20 text-[#FF799C] uppercase">
                                {cat}
                              </span>
                              <span className="text-xs text-gray-400 font-mono">
                                ID: {item.id} • {new Date(item.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <h4 className="font-serif text-sm font-bold text-white">
                              {item.title || '（無標題）'}
                            </h4>
                            <p className="text-xs text-gray-300 leading-relaxed font-serif">
                              {cat === 'letters' ? `「 ${item.content} 」` : `連結/路徑: ${item.url}`}
                            </p>
                            <p className="text-[11px] text-gray-500">
                              投稿人: <strong className="text-gray-300">{item.contributor || item.author}</strong>
                              {item.category && ` | 分類: ${item.category}`}
                              {item.year && ` | 年份: ${item.year}`}
                            </p>
                          </div>

                          <div className="flex items-center space-x-2 shrink-0">
                            {/* Approve button */}
                            <button
                              onClick={() => onApproveItem(cat, item.id)}
                              className="px-3.5 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20 text-xs font-bold flex items-center space-x-1 transition-colors"
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>核准</span>
                            </button>
                            {/* Reject button */}
                            <button
                              onClick={() => onRejectItem(cat, item.id)}
                              className="px-3.5 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 text-xs font-bold flex items-center space-x-1 transition-colors"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span>駁回</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: MODIFY SLOGANS */}
              {activeTab === 'slogans' && (
                <form onSubmit={handleSaveSlogans} className="space-y-6 text-left">
                  <div className="flex justify-between items-center pb-4 border-b border-white/5">
                    <h3 className="font-serif text-base font-bold text-[#FFCCDD]">
                      修改首頁文案與裝飾文字
                    </h3>
                    <p className="text-[11px] text-gray-400">修改完成後，首頁視覺背景會即時套用配置</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#FFCCDD]">左上主打文案 (Zack Name)</label>
                      <input
                        type="text"
                        required
                        value={zackText}
                        onChange={(e) => setZackText(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-[#FF799C]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#FFCCDD]">右上主打文案 (Jeremy Name)</label>
                      <input
                        type="text"
                        required
                        value={jeremyText}
                        onChange={(e) => setJeremyText(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-[#FF799C]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#FFCCDD]">背景巨大標誌 Banner Slogan</label>
                    <input
                      type="text"
                      required
                      value={bannerText}
                      onChange={(e) => setBannerText(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-[#FF799C]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#FFCCDD]">主觸碰星星提示文字 Star Action Title</label>
                    <input
                      type="text"
                      required
                      value={mainStarTitle}
                      onChange={(e) => setMainStarTitle(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-[#FF799C]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#FFCCDD]">頁尾版權/設計簽名 Footer Text</label>
                    <input
                      type="text"
                      required
                      value={footerText}
                      onChange={(e) => setFooterText(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-[#FF799C]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-gradient-to-r from-[#FF799C] to-[#FFCCDD] text-black font-bold text-xs tracking-widest rounded-xl hover:opacity-95 transition-opacity"
                  >
                    儲存應援修改文案 SAVE CHANGES
                  </button>
                </form>
              )}

              {/* TAB 3: MEMBER MANAGEMENT */}
              {activeTab === 'members' && (
                <div className="space-y-6 text-left">
                  <div className="flex justify-between items-center pb-4 border-b border-white/5">
                    <h3 className="font-serif text-base font-bold text-[#FFCCDD]">
                      應援星級成員目錄 ({members.length})
                    </h3>
                    <p className="text-[11px] text-gray-400">管理註冊粉絲及貢獻榜星光點數（第二階段預覽）</p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/10 text-gray-400">
                          <th className="py-2.5 px-2">暱稱 Username</th>
                          <th className="py-2.5 px-2">信箱 Email</th>
                          <th className="py-2.5 px-2">應援身分 Role</th>
                          <th className="py-2.5 px-2">貢獻點數 Points</th>
                          <th className="py-2.5 px-2">狀態 Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {members.map((member) => (
                          <tr key={member.uid} className="hover:bg-white/5">
                            <td className="py-3 px-2 font-semibold text-white">{member.name}</td>
                            <td className="py-3 px-2 font-mono text-gray-400">{member.email}</td>
                            <td className="py-3 px-2 text-[#FF799C]">{member.role}</td>
                            <td className="py-3 px-2 font-mono text-amber-400 font-bold">{member.points} ⭐</td>
                            <td className="py-3 px-2">
                              <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 font-medium text-[10px]">
                                {member.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 4: DATABASE EXPORT/IMPORT BACKUP */}
              {activeTab === 'backup' && (
                <div className="space-y-6 text-left">
                  <div className="flex justify-between items-center pb-4 border-b border-white/5">
                    <h3 className="font-serif text-base font-bold text-[#FFCCDD]">
                      應援專案備份與回復系統
                    </h3>
                    <p className="text-[11px] text-gray-400">保證平台數據在流動及維修時永久不遺失。</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-black/30 border border-white/5 p-5 rounded-2xl space-y-4">
                      <div className="w-10 h-10 rounded-full bg-[#FF799C]/10 border border-[#FF799C]/20 flex items-center justify-center text-[#FF799C]">
                        <Download className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-serif text-sm font-bold">備份至本地 (Export JSON)</h4>
                        <p className="text-xs text-gray-400 leading-relaxed">
                          將當前所有的照片、影片、星星罐信件、展覽館、音樂及文案設定包裝成單一 JSON 檔案下載至您的電腦存檔。
                        </p>
                      </div>
                      <button
                        onClick={handleExportBackup}
                        className="w-full py-2 bg-gradient-to-r from-[#FF799C] to-[#FFCCDD] text-black font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5"
                      >
                        <Download className="w-4 h-4" />
                        <span>匯出專案備份檔</span>
                      </button>
                    </div>

                    <div className="bg-black/30 border border-white/5 p-5 rounded-2xl space-y-4">
                      <div className="w-10 h-10 rounded-full bg-[#FFCCDD]/10 border border-[#FFCCDD]/20 flex items-center justify-center text-[#FFCCDD]">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-serif text-sm font-bold">自本地回復 (Import JSON)</h4>
                        <p className="text-xs text-gray-400 leading-relaxed">
                          上傳先前下載的 Jiyu 備份 JSON 檔案，系統將會立即將所有數據及後台狀態完全還原。
                        </p>
                      </div>
                      <label className="w-full py-2 border border-[#FFCCDD]/30 text-[#FFCCDD] hover:bg-[#FFCCDD]/5 font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5 cursor-pointer text-center">
                        <Upload className="w-4 h-4" />
                        <span>匯入並還原專案</span>
                        <input
                          type="file"
                          accept=".json"
                          onChange={handleImportBackup}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* Footer */}
        <div className="bg-black/60 px-6 py-3 border-t border-white/5 text-[10px] text-gray-500 font-mono text-center">
          <span>All for Zack & Jeremy Star Portal MVP v1.0 • Built with Passion</span>
        </div>

      </div>
    </div>
  );
}
