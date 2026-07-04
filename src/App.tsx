import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, Music, Volume2, VolumeX, Sparkles, Settings } from 'lucide-react';
import { AppState, PhotoItem, VideoItem, LetterItem, ArtworkItem, MusicItem } from './types';
import { INITIAL_STATE } from './constants';

// Subcomponents
import CupidIntro from './components/CupidIntro';
import StarryBackground from './components/StarryBackground';
import HomeVisual from './components/HomeVisual';
import ModuleModal from './components/ModuleModal';
import SubmissionForm from './components/SubmissionForm';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [state, setState] = useState<AppState>(INITIAL_STATE);
  
  // Modals & Navigation triggers
  const [activeModule, setActiveModule] = useState<'photos' | 'videos' | 'letters' | 'artwork' | 'music' | null>(null);
  const [showSubmission, setShowSubmission] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  // Global Audio Elements
  const [currentTrack, setCurrentTrack] = useState<MusicItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load state from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('JIYU_SUPPORT_STATE_MVP');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setState(parsed);
        // Default current track to first approved track if exists
        const approvedMusic = parsed.music.filter((m: any) => m.status === 'approved');
        if (approvedMusic.length > 0) {
          setCurrentTrack(approvedMusic[0]);
        }
      } catch (e) {
        console.error('Failed to load local storage state, using defaults.', e);
      }
    } else {
      // Default initial tracks set
      const approvedMusic = INITIAL_STATE.music.filter(m => m.status === 'approved');
      if (approvedMusic.length > 0) {
        setCurrentTrack(approvedMusic[0]);
      }
    }
  }, []);

  // Save state to LocalStorage when changed
  const saveToLocalStorage = (newState: AppState) => {
    setState(newState);
    localStorage.setItem('JIYU_SUPPORT_STATE_MVP', JSON.stringify(newState));
  };

  // Global Audio Handlers
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    if (currentTrack) {
      audioRef.current.src = currentTrack.url;
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.warn('Audio autoplay blocked by browser policy, awaiting interaction.', err);
          setIsPlaying(false);
        });
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [currentTrack]);

  const handleTogglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        alert('音頻播放失敗，可能為瀏覽器阻止了自動播音。請在頁面內點擊重試 🎵');
      });
    }
  };

  const handleSelectTrack = (track: MusicItem) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  // Submission contribution submission handlers
  const handleAddSubmission = (submission: any) => {
    const updatedState = { ...state };
    
    if (activeModule === 'photos') {
      updatedState.photos = [submission, ...state.photos];
    } else if (activeModule === 'videos') {
      updatedState.videos = [submission, ...state.videos];
    } else if (activeModule === 'letters') {
      updatedState.letters = [submission, ...state.letters];
    } else if (activeModule === 'artwork') {
      updatedState.artworks = [submission, ...state.artworks];
    } else if (activeModule === 'music') {
      updatedState.music = [submission, ...state.music];
    }

    saveToLocalStorage(updatedState);
  };

  // Administrative moderation controllers
  const handleApproveItem = (category: 'photos' | 'videos' | 'letters' | 'artwork' | 'music', itemId: string) => {
    const updatedState = { ...state };

    if (category === 'photos') {
      updatedState.photos = state.photos.map(p => p.id === itemId ? { ...p, status: 'approved' as const } : p);
    } else if (category === 'videos') {
      updatedState.videos = state.videos.map(v => v.id === itemId ? { ...v, status: 'approved' as const } : v);
    } else if (category === 'letters') {
      updatedState.letters = state.letters.map(l => l.id === itemId ? { ...l, status: 'approved' as const } : l);
    } else if (category === 'artwork') {
      updatedState.artworks = state.artworks.map(a => a.id === itemId ? { ...a, status: 'approved' as const } : a);
    } else if (category === 'music') {
      updatedState.music = state.music.map(m => m.id === itemId ? { ...m, status: 'approved' as const } : m);
    }

    saveToLocalStorage(updatedState);
  };

  const handleRejectItem = (category: 'photos' | 'videos' | 'letters' | 'artwork' | 'music', itemId: string) => {
    const updatedState = { ...state };

    if (category === 'photos') {
      updatedState.photos = state.photos.map(p => p.id === itemId ? { ...p, status: 'rejected' as const } : p);
    } else if (category === 'videos') {
      updatedState.videos = state.videos.map(v => v.id === itemId ? { ...v, status: 'rejected' as const } : v);
    } else if (category === 'letters') {
      updatedState.letters = state.letters.map(l => l.id === itemId ? { ...l, status: 'rejected' as const } : l);
    } else if (category === 'artwork') {
      updatedState.artworks = state.artworks.map(a => a.id === itemId ? { ...a, status: 'rejected' as const } : a);
    } else if (category === 'music') {
      updatedState.music = state.music.map(m => m.id === itemId ? { ...m, status: 'rejected' as const } : m);
    }

    saveToLocalStorage(updatedState);
  };

  // Edit config values
  const handleUpdateConfig = (newConfig: any) => {
    const updatedState = {
      ...state,
      config: newConfig
    };
    saveToLocalStorage(updatedState);
  };

  // Restore backup state
  const handleImportBackup = (importedState: AppState) => {
    saveToLocalStorage(importedState);
    if (importedState.music.length > 0) {
      const approvedMusic = importedState.music.filter(m => m.status === 'approved');
      if (approvedMusic.length > 0) {
        setCurrentTrack(approvedMusic[0]);
      }
    }
  };

  return (
    <div className="min-h-screen text-white font-sans overflow-x-hidden select-none bg-[#0a060d] relative flex flex-col justify-between">
      
      {/* 1. CUPID SHOOTING INTRO OVERLAY */}
      <AnimatePresence>
        {showIntro && (
          <CupidIntro onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      {/* 2. STARRY BACKPLANE BACKGROUND */}
      <StarryBackground />

      {/* 3. FLOATING HUD HEADER */}
      <header className="w-full max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative z-30">
        {/* Left branding */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#FF799C] to-[#FFCCDD] p-0.5 flex items-center justify-center shadow-lg shadow-[#FF799C]/20">
            <Sparkles className="w-5 h-5 text-black" />
          </div>
          <div>
            <span className="font-serif text-sm font-bold tracking-[0.2em] text-[#FFCCDD]">
              {state.config.bannerText}
            </span>
            <span className="block text-[8px] font-mono tracking-widest text-[#FF799C]/80 uppercase mt-0.5">
              Premium Fan Support
            </span>
          </div>
        </div>

        {/* Right action control panels */}
        <div className="flex items-center space-x-4">
          
          {/* Quick Mini music play status toggle */}
          {currentTrack && (
            <button
              onClick={handleTogglePlay}
              className={`flex items-center space-x-2 bg-black/40 border border-white/10 hover:border-[#FF799C]/30 px-3.5 py-1.5 rounded-full transition-all text-xs font-semibold ${
                isPlaying ? 'text-[#FF799C] shadow-[0_0_10px_rgba(255,121,156,0.15)]' : 'text-gray-400'
              }`}
            >
              <Music className={`w-3.5 h-3.5 ${isPlaying ? 'animate-spin [animation-duration:4s]' : ''}`} />
              <span className="max-w-[80px] md:max-w-[120px] truncate">
                {currentTrack.title}
              </span>
              {isPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>
          )}

          {/* Admin panel entry button */}
          <button
            onClick={() => setShowAdmin(true)}
            className="flex items-center justify-center p-2 rounded-full bg-white/5 hover:bg-[#FF799C]/10 border border-white/10 hover:border-[#FF799C]/30 text-gray-400 hover:text-[#FF799C] transition-all"
            title="後台管理系統"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* 4. MAIN CENTRAL INTERACTIVE STAGE */}
      <main className="flex-1 flex flex-col justify-center relative z-20">
        <HomeVisual
          onSelectModule={(mod) => setActiveModule(mod)}
          zackText={state.config.zackText}
          jeremyText={state.config.jeremyText}
          bannerText={state.config.bannerText}
        />
      </main>

      {/* 5. FLOATING HUD FOOTER */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-2 text-[10px] font-mono text-gray-500 relative z-30">
        <div className="flex items-center space-x-4">
          <span>ALL FOR JIYU • STARRY SUPPORT NETWORK MVP</span>
          <span className="hidden md:inline text-gray-700">|</span>
          <span className="text-[#FF799C]/60 flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF799C] mr-1.5 animate-pulse" />
            ZACK & JEREMY LIVE SUPPORTING
          </span>
        </div>
        <div>
          <span>{state.config.footerText}</span>
        </div>
      </footer>

      {/* 6. IMMERSIVE MODULE VIEW MODAL */}
      <AnimatePresence>
        {activeModule && (
          <ModuleModal
            moduleType={activeModule}
            photos={state.photos}
            videos={state.videos}
            letters={state.letters}
            artworks={state.artworks}
            music={state.music}
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            onSelectTrack={handleSelectTrack}
            onTogglePlay={handleTogglePlay}
            onOpenSubmissionForm={() => setShowSubmission(true)}
            onClose={() => setActiveModule(null)}
          />
        )}
      </AnimatePresence>

      {/* 7. CONTRIBUTION SUBMISSION FORM OVERLAY */}
      <AnimatePresence>
        {showSubmission && activeModule && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-xl w-full"
            >
              <SubmissionForm
                moduleType={activeModule}
                onSubmit={handleAddSubmission}
                onClose={() => setShowSubmission(false)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 8. ADMINISTRATIVE BACKEND OVERLAY */}
      <AnimatePresence>
        {showAdmin && (
          <AdminPanel
            state={state}
            onUpdateConfig={handleUpdateConfig}
            onApproveItem={handleApproveItem}
            onRejectItem={handleRejectItem}
            onImportBackup={handleImportBackup}
            onClose={() => setShowAdmin(false)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
