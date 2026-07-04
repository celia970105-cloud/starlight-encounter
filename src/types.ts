export type SubmissionStatus = 'pending' | 'approved' | 'rejected';

export interface PhotoItem {
  id: string;
  url: string;
  title: string;
  year: string;
  category: string;
  contributor: string;
  status: SubmissionStatus;
  createdAt: string;
}

export interface VideoItem {
  id: string;
  url: string; // Can be a video URL or YouTube/Bilibili embed link
  title: string;
  category: string; // e.g., Stage, Vlog, Interview
  contributor: string;
  status: SubmissionStatus;
  createdAt: string;
}

export interface LetterItem {
  id: string;
  content: string;
  author: string;
  isAnonymous: boolean;
  status: SubmissionStatus;
  createdAt: string;
}

export interface ArtworkItem {
  id: string;
  url: string;
  title: string;
  description: string;
  link?: string; // Optional project/post link
  contributor: string;
  status: SubmissionStatus;
  createdAt: string;
}

export interface MusicItem {
  id: string;
  url: string; // Audio file URL or direct stream link
  title: string;
  artist: string;
  contributor: string;
  status: SubmissionStatus;
  createdAt: string;
}

export interface AdminConfig {
  zackText: string;
  jeremyText: string;
  bannerText: string; // e.g., "ALL FOR JIYU"
  footerText: string; // e.g., "Design By AMSS"
  mainStarTitle: string;
  adminPasswordHash: string;
}

export interface AppState {
  photos: PhotoItem[];
  videos: VideoItem[];
  letters: LetterItem[];
  artworks: ArtworkItem[];
  music: MusicItem[];
  config: AdminConfig;
}
