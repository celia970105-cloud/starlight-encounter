import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Plus,
  Play,
  Pause,
  Calendar,
  Tag,
  Heart,
  Volume2,
  VolumeX,
  Compass,
  ArrowRight,
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { PhotoItem, VideoItem, LetterItem, ArtworkItem, MusicItem } from '../types';

interface ModuleModalProps {
  moduleType: 'photos' | 'videos' | 'letters' | 'artwork' | 'music';
  photos: PhotoItem[];
  videos: VideoItem[];
  letters: LetterItem[];
  artworks: ArtworkItem[];
  music: MusicItem[];
  currentTrack: MusicItem | null;
  isPlaying: boolean;
  onSelectTrack: (track: MusicItem) => void;
  onTogglePlay: () => void;
  onOpenSubmissionForm: () => void;
  onClose: () => void;
}

export default function ModuleModal({
  moduleType,
  photos,
  videos,
  letters,
  artworks,
  music,
  currentTrack,
  isPlaying,
  onSelectTrack,
  onTogglePlay,
  onOpenSubmissionForm,
  onClose
}: ModuleModalProps) {
  // Filters & State for Photo Gallery
  const [selectedPhotoYear, setSelectedPhotoYear] = useState<string>('All');
  const [selectedPhotoCategory, setSelectedPhotoCategory] = useState<string>('All');
  const [lightboxPhoto, setLightboxPhoto] = useState<PhotoItem | null>(null);

  // Filters & State for Video Area
  const [selectedVideoCategory, setSelectedVideoCategory] = useState<string>('All');
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  // State for Letters (Wish Star Container)
  const [selectedLetter, setSelectedLetter] = useState<LetterItem | null>(null);

  // State for Museum Art Zoom
  const [activeArtwork, setActiveArtwork] = useState<ArtworkItem | null>(null);

  // Get only approved elements
  const approvedPhotos = photos.filter((p) => p.status === 'approved');
  const approvedVideos = videos.filter((v) => v.status === 'approved');
  const approvedLetters = letters.filter((l) => l.status === 'approved');
  const approvedArtworks = artworks.filter((a) => a.status === 'approved');
  const approvedMusic = music.filter((m) => m.status === 'approved');

  // Photo Filtering
  const filteredPhotos = approvedPhotos.filter((p) => {
    const matchYear = selectedPhotoYear === 'All' || p.year === selectedPhotoYear;
    const matchCat = selectedPhotoCategory === 'All' || p.category === selectedPhotoCategory;
    return matchYear && matchCat;
  });

  // Video Filtering
  const filteredVideos = approvedVideos.filter((v) => {
    return selectedVideoCategory === 'All' || v.category === selectedVideoCategory;
  });

  const yearsList = ['All', '2026', '2025', '2024'];
  const photoCategories = ['All', 'Stage', 'Airport', 'Fan Meeting', 'Magazine', 'Concert', 'Other'];
  const videoCategories = ['All', 'Stage Focus', 'Vlog', 'Music Video', 'Interview', 'Show', 'Other'];

  const modalTitles = {
    photos: '✨ 圖片相簿 ✨ / STARRY GALLERY',
    videos: '🎬 影片特區 🎬 / CELESTIAL CINEMA',
    letters: '🌟 星星信罐 🌟 / STAR WISH JAR',
    artwork: '🎨 美術展館 🎨 / EUROPEAN MUSEUM',
    music: '🎵 音樂播放器 🎵 / GOLDEN MELODY'
  };

  return (
    <div
      id="module-modal-overlay"
      className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="relative w-full max-w-5xl h-[85vh] bg-[#0c0611] rounded-2xl border border-[#FF799C]/40 shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Modal Decorative Glowing Corners */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#FF799C]" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#FF799C]" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#FFCCDD]" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#FFCCDD]" />

        {/* Modal Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-[#FF799C]/20 bg-black/40 relative z-10">
          <div>
            <h2 className="font-serif text-lg md:text-xl font-bold tracking-widest text-[#FFCCDD]">
              {modalTitles[moduleType]}
            </h2>
            <p className="text-[10px] font-mono tracking-widest text-[#FF799C] mt-0.5 uppercase">
              All for Zack & Jeremy • Support Space
            </p>
          </div>
          <div className="flex items-center space-x-3">
            {/* Submit contribution button */}
            <button
              onClick={onOpenSubmissionForm}
              className="flex items-center space-x-1.5 bg-gradient-to-r from-[#FF799C] to-[#FFCCDD] text-black font-bold text-xs px-4 py-2 rounded-full shadow-md shadow-[#FF799C]/20 hover:opacity-95 transition-opacity"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>我要投稿 SUBMIT</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content Stage */}
        <div className="flex-1 overflow-y-auto p-6 relative custom-scrollbar z-10">
          
          {/* 1. PHOTO GALLERY MODULE */}
          {moduleType === 'photos' && (
            <div className="space-y-6">
              {/* Year & Category filter menu */}
              <div className="flex flex-wrap items-center gap-3 bg-black/30 p-3 rounded-xl border border-white/5">
                <div className="flex items-center space-x-2 mr-4">
                  <Calendar className="w-4 h-4 text-[#FF799C]" />
                  <span className="text-xs font-mono text-gray-400">YEARS:</span>
                  <div className="flex space-x-1">
                    {yearsList.map((yr) => (
                      <button
                        key={yr}
                        onClick={() => setSelectedPhotoYear(yr)}
                        className={`px-2.5 py-1 rounded text-xs transition-colors ${
                          selectedPhotoYear === yr
                            ? 'bg-[#FF799C] text-black font-semibold'
                            : 'hover:bg-white/5 text-gray-300'
                        }`}
                      >
                        {yr === 'All' ? '全部' : yr}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Tag className="w-4 h-4 text-[#FF799C]" />
                  <span className="text-xs font-mono text-gray-400">TAGS:</span>
                  <div className="flex flex-wrap gap-1">
                    {photoCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedPhotoCategory(cat)}
                        className={`px-2.5 py-1 rounded text-xs transition-colors ${
                          selectedPhotoCategory === cat
                            ? 'bg-[#FFCCDD] text-black font-semibold'
                            : 'hover:bg-white/5 text-gray-300'
                        }`}
                      >
                        {cat === 'All' ? '全部' : cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Photos grid */}
              {filteredPhotos.length === 0 ? (
                <div className="text-center py-20 text-gray-400 font-serif">
                  此分類下暫無照片，歡迎點擊上方按鈕送出您的第一張投稿照片！✨
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {filteredPhotos.map((photo) => (
                    <motion.div
                      key={photo.id}
                      layoutId={`photo-${photo.id}`}
                      onClick={() => setLightboxPhoto(photo)}
                      whileHover={{ y: -4 }}
                      className="group bg-black/40 border border-white/10 rounded-xl p-2.5 cursor-pointer relative overflow-hidden transition-all duration-300 hover:border-[#FF799C]/50"
                    >
                      <div className="aspect-[4/5] w-full rounded-lg overflow-hidden bg-zinc-900 relative">
                        <img
                          src={photo.url}
                          alt={photo.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                          <span className="text-[10px] font-mono text-[#FF799C] tracking-widest uppercase">
                            {photo.category} • {photo.year}
                          </span>
                          <h4 className="text-sm font-semibold text-white truncate">{photo.title}</h4>
                        </div>
                      </div>
                      <div className="mt-2.5 flex justify-between items-center px-1">
                        <span className="text-[10px] text-gray-400 truncate max-w-[120px]">
                          By {photo.contributor}
                        </span>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#FF799C]/10 text-[#FF799C]">
                          {photo.year}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 2. CINEMA AREA MODULE */}
          {moduleType === 'videos' && (
            <div className="space-y-6">
              {/* Category Filters */}
              <div className="flex flex-wrap items-center gap-3 bg-black/30 p-3 rounded-xl border border-white/5">
                <Tag className="w-4 h-4 text-[#FF799C]" />
                <span className="text-xs font-mono text-gray-400">CATEGORIES:</span>
                <div className="flex flex-wrap gap-1">
                  {videoCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedVideoCategory(cat)}
                      className={`px-2.5 py-1 rounded text-xs transition-colors ${
                        selectedVideoCategory === cat
                          ? 'bg-[#FF799C] text-black font-semibold'
                          : 'hover:bg-white/5 text-gray-300'
                      }`}
                    >
                      {cat === 'All' ? '全部' : cat}
                    </button>
                  ))}
                </div>
              </div>

              {activeVideo ? (
                // Video Player Screen
                <div className="bg-black rounded-2xl border border-[#FF799C]/20 overflow-hidden shadow-2xl space-y-4">
                  <div className="aspect-video w-full relative bg-zinc-950">
                    <video
                      src={activeVideo.url}
                      controls
                      autoPlay
                      className="w-full h-full object-contain"
                    />
                    <button
                      onClick={() => setActiveVideo(null)}
                      className="absolute top-4 right-4 bg-black/70 hover:bg-black p-1.5 rounded-full border border-white/10 text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-4 flex flex-col md:flex-row md:justify-between md:items-center border-t border-white/5">
                    <div>
                      <span className="text-xs font-mono text-[#FF799C] uppercase tracking-wider">
                        {activeVideo.category} Video
                      </span>
                      <h3 className="font-serif text-lg font-bold text-white mt-1">{activeVideo.title}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">Contributor: {activeVideo.contributor}</p>
                    </div>
                    <button
                      onClick={() => setActiveVideo(null)}
                      className="mt-3 md:mt-0 px-4 py-1.5 border border-white/20 hover:border-white/40 text-xs text-white rounded-lg transition-colors"
                    >
                      返回影片列表 Back List
                    </button>
                  </div>
                </div>
              ) : (
                /* Videos Celluloid tape cassettes */
                filteredVideos.length === 0 ? (
                  <div className="text-center py-20 text-gray-400 font-serif">
                    此分類下暫無影片，歡迎點擊上方投遞您的偶像影音創作！✨
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {filteredVideos.map((vid) => (
                      <motion.div
                        key={vid.id}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setActiveVideo(vid)}
                        className="bg-black/40 border border-[#FFCCDD]/20 hover:border-[#FF799C]/50 rounded-2xl overflow-hidden cursor-pointer group relative flex flex-col justify-between"
                      >
                        {/* Film Cassette decorative top */}
                        <div className="h-2 bg-[#FF799C]/30 group-hover:bg-[#FF799C] transition-colors" />
                        
                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                          <div className="flex justify-between items-start">
                            <div className="w-12 h-12 rounded-full border border-[#FF799C]/20 bg-[#FF799C]/5 flex items-center justify-center text-[#FF799C]">
                              <Play className="w-5 h-5 fill-current" />
                            </div>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-300">
                              {vid.category}
                            </span>
                          </div>

                          <div>
                            <h4 className="font-serif text-base font-bold text-white leading-snug group-hover:text-[#FFCCDD] transition-colors">
                              {vid.title}
                            </h4>
                            <p className="text-xs text-gray-400 mt-1">投稿：{vid.contributor}</p>
                          </div>
                        </div>

                        {/* Cassette footer tape reels */}
                        <div className="bg-[#120a17] border-t border-white/5 px-4 py-2 flex justify-between items-center text-[10px] font-mono text-gray-400">
                          <span>LENGTH: STAGE CUT</span>
                          <span className="text-[#FF799C] flex items-center space-x-1">
                            <span>ONLINE PLAY</span> <ArrowRight className="w-3 h-3 ml-0.5" />
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )
              )}
            </div>
          )}

          {/* 3. WISH LETTER JAR MODULE */}
          {moduleType === 'letters' && (
            <div className="space-y-6 h-full flex flex-col justify-between relative">
              {/* Glass Starry Jar simulation */}
              <div className="relative w-full max-w-xl mx-auto border border-white/10 rounded-3xl p-8 bg-gradient-to-b from-white/[0.04] to-transparent shadow-2xl flex flex-col items-center">
                
                {/* Elegant Glass jar outline */}
                <div className="absolute inset-x-12 top-0 h-4 bg-white/10 rounded-b-xl border-x border-b border-white/20" />
                
                <h3 className="font-serif text-sm tracking-[0.25em] text-[#FFCCDD] font-semibold uppercase mb-4 text-center">
                  JIYU WISH STAR CONTAINER
                </h3>

                {approvedLetters.length === 0 ? (
                  <div className="text-center py-20 text-gray-400 font-serif">
                    星星罐此時是空的... 點擊上方「我要投稿」按鈕，放進去您的第一顆愛心星星！🌌
                  </div>
                ) : (
                  /* Floating beautiful clickable stars */
                  <div className="relative w-full h-[320px] bg-black/40 border border-[#FF799C]/10 rounded-2xl overflow-hidden p-4 flex flex-wrap gap-4 items-center justify-center content-center">
                    
                    {approvedLetters.map((letItem, i) => {
                      // Generate random animation values based on index
                      const scale = 0.8 + (i % 3) * 0.15;
                      const glow = i % 2 === 0 ? 'shadow-[#FF799C]/40 border-[#FF799C]' : 'shadow-[#FFCCDD]/40 border-[#FFCCDD]';
                      
                      return (
                        <motion.button
                          key={letItem.id}
                          whileHover={{ scale: 1.2, y: -4 }}
                          animate={{
                            y: [0, -6, 0]
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 3 + (i % 4),
                            ease: 'easeInOut'
                          }}
                          onClick={() => setSelectedLetter(letItem)}
                          className={`relative flex items-center justify-center w-12 h-12 rounded-full border bg-black/50 backdrop-blur-sm cursor-pointer shadow-lg hover:z-20 ${glow}`}
                        >
                          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white">
                            <path
                              d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                              fill={i % 2 === 0 ? '#FF799C' : '#FFCCDD'}
                            />
                          </svg>
                        </motion.button>
                      );
                    })}

                    {/* Glowing floating label */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-widest text-gray-400">
                      🌌 點擊星斗開閱信箋 (CLICK STARS TO READ LETTERS)
                    </div>
                  </div>
                )}
              </div>

              {/* Dynamic open letter parchment popup */}
              <AnimatePresence>
                {selectedLetter && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                  >
                    <div className="bg-[#181121] border border-[#FF799C] rounded-2xl max-w-md w-full p-6 text-center shadow-2xl relative">
                      {/* Decorative elements */}
                      <div className="absolute top-4 right-4">
                        <button
                          onClick={() => setSelectedLetter(null)}
                          className="p-1 rounded-full hover:bg-white/10 text-gray-400 hover:text-white"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="w-12 h-12 bg-[#FF799C]/20 border border-[#FF799C] text-[#FF799C] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#FF799C]/10">
                        <Heart className="w-6 h-6 fill-current" />
                      </div>

                      <span className="text-[10px] font-mono text-[#FF799C] tracking-widest block mb-1">
                        JIYU STAR WISH LETTER
                      </span>
                      <h4 className="font-serif text-xs text-gray-400 font-semibold mb-4 border-b border-white/5 pb-2">
                        寄件：{selectedLetter.isAnonymous ? '匿名粉絲' : selectedLetter.author}
                      </h4>

                      <p className="font-serif text-sm md:text-base leading-relaxed text-gray-100 bg-black/30 p-4 rounded-xl text-left border border-white/5 whitespace-pre-line min-h-[120px]">
                        「 {selectedLetter.content} 」
                      </p>

                      <div className="mt-4 text-right text-[10px] font-mono text-gray-500">
                        投遞：{new Date(selectedLetter.createdAt).toLocaleDateString()}
                      </div>

                      <button
                        onClick={() => setSelectedLetter(null)}
                        className="mt-5 w-full py-2 bg-gradient-to-r from-[#FF799C] to-[#FFCCDD] text-black font-bold text-xs tracking-wider rounded-xl hover:opacity-95"
                      >
                        將信件收回星星罐裡 BACK TO JAR
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* 4. EUROPEAN MUSEUM ART GALLERY MODULE */}
          {moduleType === 'artwork' && (
            <div className="space-y-6">
              {/* Introduction header */}
              <div className="text-center max-w-lg mx-auto py-4">
                <span className="text-[10px] font-mono text-[#FF799C] tracking-widest uppercase">
                  Aurora Fine Arts Gallery
                </span>
                <h3 className="font-serif text-xl font-bold text-white tracking-wide mt-1">
                  歐式古典美學特展
                </h3>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  展示來自世界各地優秀粉絲為 Zack & Jeremy 精心創作的繪畫、剪貼、及設計大作，在古典美術館的長廊中永恆陳列。
                </p>
              </div>

              {approvedArtworks.length === 0 ? (
                <div className="text-center py-20 text-gray-400 font-serif">
                  長廊中目前還沒有陳列展品，歡迎點擊上方按鈕為偶像投稿您的第一件精美藝術品！🎨
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {approvedArtworks.map((art) => (
                    <motion.div
                      key={art.id}
                      whileHover={{ y: -6 }}
                      className="bg-black/40 border border-amber-500/20 rounded-2xl overflow-hidden p-4 relative group cursor-pointer flex flex-col justify-between"
                      onClick={() => setActiveArtwork(art)}
                    >
                      {/* Classical Gilt frame styling */}
                      <div className="absolute inset-0 border-2 border-amber-500/10 rounded-2xl pointer-events-none group-hover:border-amber-500/30 transition-all duration-300" />
                      
                      <div className="space-y-4">
                        {/* Artwork high quality canvas view */}
                        <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
                          <img
                            src={art.url}
                            alt={art.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Museum label plate */}
                        <div className="bg-[#120c15] p-3.5 border border-amber-500/15 rounded-xl text-left space-y-1 relative">
                          <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-amber-500/30 rounded-full" />
                          <h4 className="font-serif text-sm font-bold text-white">{art.title}</h4>
                          <p className="text-[10px] font-mono text-amber-500/80">ARTIST: {art.contributor}</p>
                          <p className="text-xs text-gray-400 leading-relaxed truncate mt-1">
                            {art.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 flex justify-between items-center text-[10px] font-mono text-gray-400 px-1">
                        <span>ROOM 1 - OIL & WATERCOLOR</span>
                        <span className="text-[#FF799C] flex items-center hover:underline">
                          開閱詳情 <ExternalLink className="w-3 h-3 ml-1" />
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Artwork details lightbox */}
              <AnimatePresence>
                {activeArtwork && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
                  >
                    <div className="max-w-4xl w-full h-[85vh] flex flex-col md:flex-row bg-[#110915] border border-amber-500/30 rounded-2xl overflow-hidden shadow-2xl relative">
                      
                      <button
                        onClick={() => setActiveArtwork(null)}
                        className="absolute top-4 right-4 z-10 bg-black/60 p-1.5 rounded-full border border-white/10 text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      {/* Photo stage left */}
                      <div className="flex-1 bg-black flex items-center justify-center p-4">
                        <img
                          src={activeArtwork.url}
                          alt={activeArtwork.title}
                          className="max-h-[75vh] max-w-full object-contain rounded-lg"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Label metadata right */}
                      <div className="w-full md:w-80 p-6 flex flex-col justify-between border-t md:border-t-0 md:border-l border-amber-500/15 bg-black/40 text-left">
                        <div className="space-y-4">
                          <span className="text-[9px] font-mono px-2 py-0.5 border border-[#FF799C]/20 text-[#FF799C] rounded bg-[#FF799C]/5">
                            EXHIBITION CATALOGUE
                          </span>
                          
                          <div>
                            <h3 className="font-serif text-lg font-bold text-white leading-tight">
                              {activeArtwork.title}
                            </h3>
                            <p className="text-xs font-mono text-amber-500/80 mt-1">Artist: {activeArtwork.contributor}</p>
                          </div>

                          <div className="border-t border-white/5 pt-3 space-y-2">
                            <span className="text-xs text-gray-500 font-semibold block">靈感與描述 DESCRIPTION</span>
                            <p className="text-xs md:text-sm text-gray-300 leading-relaxed font-serif whitespace-pre-wrap bg-zinc-950/40 p-3 rounded-lg border border-white/5">
                              {activeArtwork.description || '創作人未提供詳細描述。'}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-white/5">
                          {activeArtwork.link && (
                            <a
                              href={activeArtwork.link}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center justify-center space-x-1.5 w-full py-2 border border-[#FF799C]/20 text-[#FF799C] text-xs font-bold rounded-xl hover:bg-[#FF799C]/5 transition-colors"
                            >
                              <span>訪問外部作品專頁 VISIT LINK</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                          <button
                            onClick={() => setActiveArtwork(null)}
                            className="w-full py-2 bg-gradient-to-r from-[#FF799C] to-[#FFCCDD] text-black font-bold text-xs tracking-widest rounded-xl hover:opacity-95"
                          >
                            返回展館長廊 BACK TO GALLERY
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* 5. VINTAGE GOLD MELODY MUSIC MODULE */}
          {moduleType === 'music' && (
            <div className="space-y-8 h-full flex flex-col justify-between">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
                
                {/* Turntable Vinyl Record View (Left) */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative w-64 h-64 md:w-72 md:h-72 bg-gradient-to-br from-[#120b17] to-[#25152b] rounded-full flex items-center justify-center border border-[#FF799C]/30 shadow-2xl shadow-black">
                    
                    {/* Spinning Golden Rimmed Record Vinyl */}
                    <motion.div
                      animate={isPlaying ? { rotate: 360 } : {}}
                      transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
                      className="w-56 h-56 md:w-64 md:h-64 rounded-full bg-zinc-950 flex items-center justify-center relative border-[12px] border-zinc-900 shadow-inner"
                      style={{
                        backgroundImage: `repeating-radial-gradient(circle, #0c0812, #0c0812 2px, #181121 4px, #0c0812 6px)`
                      }}
                    >
                      {/* Album cover center label */}
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#FF799C] flex flex-col items-center justify-center border-4 border-zinc-850 p-2 text-center text-black shadow-lg">
                        <span className="font-serif text-[8px] md:text-[9px] font-bold tracking-widest uppercase truncate max-w-[70px]">
                          {currentTrack ? currentTrack.title : 'NO TRACK'}
                        </span>
                        <span className="text-[7px] font-mono font-medium truncate max-w-[70px] opacity-75 mt-0.5">
                          {currentTrack ? currentTrack.artist : 'Select Song'}
                        </span>
                        <div className="w-2.5 h-2.5 bg-[#0c0611] rounded-full border border-zinc-800 mt-1" />
                      </div>
                    </motion.div>

                    {/* Turntable needle head arm */}
                    <div
                      className="absolute top-2 right-4 w-12 h-28 pointer-events-none origin-top-right transition-transform duration-500"
                      style={{
                        transform: isPlaying ? 'rotate(5deg)' : 'rotate(-25deg)',
                        zIndex: 20
                      }}
                    >
                      <svg width="48" height="112" viewBox="0 0 48 112" fill="none">
                        {/* Needle base mount */}
                        <circle cx="36" cy="12" r="10" fill="#2d2238" stroke="#FF799C" strokeWidth="1.5" />
                        <line x1="36" y1="12" x2="16" y2="85" stroke="#FFFFFF" strokeWidth="2.5" />
                        <line x1="16" y1="85" x2="20" y2="100" stroke="#FFCCDD" strokeWidth="2" />
                        <circle cx="20" cy="100" r="3" fill="#FF799C" />
                      </svg>
                    </div>
                  </div>

                  {/* Player Buttons */}
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={onTogglePlay}
                      disabled={!currentTrack}
                      className="w-14 h-14 bg-gradient-to-r from-[#FF799C] to-[#FFCCDD] text-black rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#FF799C]/20 disabled:opacity-50"
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6 fill-current" />
                      ) : (
                        <Play className="w-6 h-6 fill-current ml-1" />
                      )}
                    </button>
                    <div>
                      <h4 className="font-serif text-sm font-bold text-white text-left">
                        {currentTrack ? currentTrack.title : '請在右側清單選擇音樂'}
                      </h4>
                      <p className="text-xs text-gray-400 text-left">
                        {currentTrack ? `唱家：${currentTrack.artist} (投稿：${currentTrack.contributor})` : '點擊右側清單播唱特選應援音頻'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Approved Music Track List (Right) */}
                <div className="space-y-4">
                  <div className="bg-black/30 border border-white/5 rounded-2xl p-4 flex flex-col">
                    <span className="text-[10px] font-mono text-[#FF799C] tracking-widest block mb-3 uppercase">
                      STARRY MUSIC PLAYLIST ({approvedMusic.length})
                    </span>

                    {approvedMusic.length === 0 ? (
                      <div className="text-center py-12 text-gray-400 font-serif text-xs">
                        歌單清單目前為空，歡迎投稿您推薦或自製的應援音樂連結！✨
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-[220px] overflow-y-auto custom-scrollbar">
                        {approvedMusic.map((track) => {
                          const isCurrent = currentTrack?.id === track.id;
                          return (
                            <div
                              key={track.id}
                              onClick={() => onSelectTrack(track)}
                              className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                                isCurrent
                                  ? 'bg-[#FF799C]/10 border border-[#FF799C]/30 text-white'
                                  : 'bg-black/20 border border-transparent hover:bg-white/5 text-gray-300'
                              }`}
                            >
                              <div className="flex items-center space-x-3 text-left">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-black/40 text-[#FF799C]">
                                  {isCurrent && isPlaying ? (
                                    <Volume2 className="w-4 h-4 animate-bounce" />
                                  ) : (
                                    <Play className="w-3.5 h-3.5" />
                                  )}
                                </div>
                                <div>
                                  <h5 className="font-serif text-xs font-bold truncate max-w-[150px]">{track.title}</h5>
                                  <p className="text-[10px] text-gray-500 font-mono">Artist: {track.artist}</p>
                                </div>
                              </div>
                              <span className="text-[9px] text-gray-500 font-mono">
                                By {track.contributor}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 leading-normal text-left">
                    音頻播放器支援直接 MP3 鏈接流播，若播放緩慢請確保您的網速暢通，本平台不佔用海外伺服器，已採用本地和合規 CDN 加速載入。
                  </p>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Slogan */}
        <div className="bg-black/60 px-6 py-3 border-t border-[#FF799C]/15 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-gray-500">
          <span>ALL FOR JIYU • STARRY SPACE PLATFORM MVP</span>
          <span className="mt-1 md:mt-0">Design By AMSS</span>
        </div>
      </motion.div>

{/* Lightbox for Photos */}
<AnimatePresence>
  {lightboxPhoto && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl"
      onClick={() => setLightboxPhoto(null)}
    >
      {/* 暗角氛圍層 */}
      <div className="absolute inset-0 bg-gradient-radial from-black/30 via-black/80 to-black" />

      {/* 關閉按鈕 */}
      <button
        onClick={() => setLightboxPhoto(null)}
        className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-black/50 border border-white/10 text-white hover:bg-white/10 transition"
      >
        ✕
      </button>

      {/* 主內容 */}
      <motion.div
        initial={{ scale: 0.92, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 20, opacity: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        className="relative flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 圖片 */}
        <motion.img
          key={lightboxPhoto.id}
          src={lightboxPhoto.url}
          alt={lightboxPhoto.title}
          className="max-h-[75vh] max-w-[92vw] object-contain rounded-xl shadow-2xl border border-white/10"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
        />

        {/* 資訊卡 */}
        <div className="mt-4 w-full max-w-2xl bg-black/60 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 text-center">
          <h3 className="text-white font-serif text-sm md:text-base font-semibold">
            {lightboxPhoto.title}
          </h3>

          <p className="text-xs text-gray-400 mt-1">
            投稿者：{lightboxPhoto.contributor} ｜ {lightboxPhoto.year} · {lightboxPhoto.category}
          </p>

          <p className="text-[10px] text-gray-500 font-mono mt-1">
            {new Date(lightboxPhoto.createdAt).toLocaleString()}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
