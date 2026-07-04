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
  Compass,
  ArrowRight,
  ExternalLink
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

  const [selectedPhotoYear, setSelectedPhotoYear] = useState<string>('All');
  const [selectedPhotoCategory, setSelectedPhotoCategory] = useState<string>('All');
  const [lightboxPhoto, setLightboxPhoto] = useState<PhotoItem | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const [selectedVideoCategory, setSelectedVideoCategory] = useState<string>('All');
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  const [selectedLetter, setSelectedLetter] = useState<LetterItem | null>(null);

  const [activeArtwork, setActiveArtwork] = useState<ArtworkItem | null>(null);

  const approvedPhotos = photos.filter((p) => p.status === 'approved');
  const approvedVideos = videos.filter((v) => v.status === 'approved');
  const approvedLetters = letters.filter((l) => l.status === 'approved');
  const approvedArtworks = artworks.filter((a) => a.status === 'approved');
  const approvedMusic = music.filter((m) => m.status === 'approved');

  const filteredPhotos = approvedPhotos.filter((p) => {
    const matchYear = selectedPhotoYear === 'All' || p.year === selectedPhotoYear;
    const matchCat = selectedPhotoCategory === 'All' || p.category === selectedPhotoCategory;
    return matchYear && matchCat;
  });

  const filteredVideos = approvedVideos.filter((v) => {
    return selectedVideoCategory === 'All' || v.category === selectedVideoCategory;
  });

  const yearsList = ['All', '2026', '2025', '2024'];
  const photoCategories = ['All', 'Stage', 'Airport', 'Fan Meeting', 'Magazine', 'Concert', 'Other'];
  const videoCategories = ['All', 'Stage Focus', 'Vlog', 'Music Video', 'Interview', 'Show', 'Other'];

  const openPhoto = (photo: PhotoItem) => {
    const idx = filteredPhotos.findIndex(p => p.id === photo.id);
    setLightboxPhoto(photo);
    setLightboxIndex(idx);
  };

  const changePhoto = (dir: number) => {
    if (lightboxIndex === null) return;
    const next = Math.max(0, Math.min(filteredPhotos.length - 1, lightboxIndex + dir));
    setLightboxIndex(next);
    setLightboxPhoto(filteredPhotos[next]);
  };

  const modalTitles = {
    photos: '✨ 圖片相簿 ✨ / STARRY GALLERY',
    videos: '🎬 影片特區 🎬 / CELESTIAL CINEMA',
    letters: '🌟 星星信罐 🌟 / STAR WISH JAR',
    artwork: '🎨 美術展館 🎨 / EUROPEAN MUSEUM',
    music: '🎵 音樂播放器 🎵 / GOLDEN MELODY'
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">

      <motion.div
        className="relative w-full max-w-5xl h-[85vh] bg-[#0c0611] rounded-2xl border border-[#FF799C]/40 flex flex-col overflow-hidden"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
      >

        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-[#FF799C]/20">
          <h2 className="text-[#FFCCDD] font-bold tracking-widest">
            {modalTitles[moduleType]}
          </h2>

          <div className="flex items-center gap-3">
            <button onClick={onOpenSubmissionForm} className="bg-[#FF799C] text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <Plus className="w-3 h-3" /> 投稿
            </button>
            <button onClick={onClose}>
              <X />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">

          {/* PHOTOS */}
          {moduleType === 'photos' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filteredPhotos.map(photo => (
                <div
                  key={photo.id}
                  onClick={() => openPhoto(photo)}
                  className="cursor-pointer bg-black/40 rounded-xl overflow-hidden"
                >
                  <img src={photo.url} className="w-full h-40 object-cover" />
                  <div className="p-2 text-xs text-white">{photo.title}</div>
                </div>
              ))}
            </div>
          )}

        </div>
      </motion.div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightboxPhoto && lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setLightboxPhoto(null);
              setLightboxIndex(null);
            }}
          >
            <button
              className="absolute left-6 text-white text-3xl"
              onClick={(e) => {
                e.stopPropagation();
                changePhoto(-1);
              }}
            >
              ‹
            </button>

            <motion.img
              src={lightboxPhoto.url}
              className="max-h-[80vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
              key={lightboxPhoto.id}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
            />

            <button
              className="absolute right-6 text-white text-3xl"
              onClick={(e) => {
                e.stopPropagation();
                changePhoto(1);
              }}
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}