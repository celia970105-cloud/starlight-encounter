import React, { useState, useRef } from 'react';
import { Upload, X, Check, FileText, Film, Music, Palette, Image as ImageIcon } from 'lucide-react';

interface SubmissionFormProps {
  moduleType: 'photos' | 'videos' | 'letters' | 'artwork' | 'music';
  onSubmit: (data: any) => void;
  onClose: () => void;
}

export default function SubmissionForm({ moduleType, onSubmit, onClose }: SubmissionFormProps) {
  const [contributor, setContributor] = useState('');
  const [title, setTitle] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [year, setYear] = useState('2026');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [letterContent, setLetterContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [artist, setArtist] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Default categories based on module type
  const photoCategories = ['Stage', 'Airport', 'Fan Meeting', 'Magazine', 'Concert', 'Other'];
  const videoCategories = ['Stage Focus', 'Vlog', 'Music Video', 'Interview', 'Show', 'Other'];

  // Handle Drag & Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  // Convert File to Base64/ObjectUrl for local previews and persistence
  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      if (uploadEvent.target?.result) {
        setMediaUrl(uploadEvent.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  // Handle Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let submissionPayload: any = {
      id: 'sub_' + Math.random().toString(36).substr(2, 9),
      contributor: isAnonymous && moduleType === 'letters' ? 'Anonymous' : contributor || '匿名粉絲',
      title: title || `${moduleType.toUpperCase()} Submission`,
      createdAt: new Date().toISOString(),
      status: 'pending' // Pending Admin Review
    };

    if (moduleType === 'photos') {
      submissionPayload = {
        ...submissionPayload,
        url: mediaUrl || 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800',
        year,
        category: category || 'Other'
      };
    } else if (moduleType === 'videos') {
      submissionPayload = {
        ...submissionPayload,
        url: mediaUrl || 'https://www.w3schools.com/html/mov_bbb.mp4',
        category: category || 'Other'
      };
    } else if (moduleType === 'letters') {
      submissionPayload = {
        ...submissionPayload,
        content: letterContent,
        author: isAnonymous ? '匿名粉絲' : contributor || '有心粉絲',
        isAnonymous
      };
    } else if (moduleType === 'artwork') {
      submissionPayload = {
        ...submissionPayload,
        url: mediaUrl || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=800',
        description,
        link: mediaUrl.startsWith('data:') ? '' : mediaUrl // Link if they inputted a URL
      };
    } else if (moduleType === 'music') {
      submissionPayload = {
        ...submissionPayload,
        url: mediaUrl || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        artist: artist || 'JiYu Support'
      };
    }

    onSubmit(submissionPayload);
    setIsSuccess(true);
  };

  const formTitles = {
    photos: '投稿相簿照片 Photo Contribution',
    videos: '投稿自製影片 Video Contribution',
    letters: '投遞星星信件 Write a Star Letter',
    artwork: '投稿應援作品 Art Gallery Submission',
    music: '投稿應援音頻 Music Submission'
  };

  return (
    <div className="bg-gradient-to-br from-[#120a17] to-[#1d0e22] text-white p-6 rounded-2xl border border-[#FF799C]/30 shadow-2xl relative max-h-[85vh] overflow-y-auto custom-scrollbar">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-serif text-xl font-bold text-[#FFCCDD] tracking-wide flex items-center space-x-2">
          {moduleType === 'photos' && <ImageIcon className="w-5 h-5 text-[#FF799C]" />}
          {moduleType === 'videos' && <Film className="w-5 h-5 text-[#FF799C]" />}
          {moduleType === 'letters' && <FileText className="w-5 h-5 text-[#FF799C]" />}
          {moduleType === 'artwork' && <Palette className="w-5 h-5 text-[#FF799C]" />}
          {moduleType === 'music' && <Music className="w-5 h-5 text-[#FF799C]" />}
          <span>{formTitles[moduleType]}</span>
        </h3>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {isSuccess ? (
        <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
          <div className="w-16 h-16 bg-[#FF799C]/20 border border-[#FF799C] text-[#FF799C] rounded-full flex items-center justify-center shadow-lg shadow-[#FF799C]/10 animate-bounce">
            <Check className="w-8 h-8" />
          </div>
          <h4 className="font-serif text-xl font-bold text-white">投稿已成功送出！</h4>
          <p className="text-sm text-gray-300 max-w-sm leading-relaxed">
            感謝您對偶像的用心支持。為維護應援網站品質，您的投稿已進入待審核名單，經管理員確認後將會正式點亮於星空！✨
          </p>
          <button
            onClick={onClose}
            className="mt-4 px-6 py-2 bg-gradient-to-r from-[#FF799C] to-[#FFCCDD] text-white font-medium rounded-full shadow-lg shadow-[#FF799C]/20 hover:opacity-95 transition-opacity"
          >
            關閉視窗 Close
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 text-left text-sm">
          {/* Contributor Nickname */}
          {(!isAnonymous || moduleType !== 'letters') && (
            <div>
              <label className="block text-[#FFCCDD] font-medium mb-1.5">投稿者暱稱 Contributor Name</label>
              <input
                type="text"
                required
                placeholder="例如：小余的星空粉"
                value={contributor}
                onChange={(e) => setContributor(e.target.value)}
                className="w-full bg-black/40 border border-[#FF799C]/20 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#FF799C] transition-colors"
              />
            </div>
          )}

          {/* Module-specific Fields */}
          {moduleType === 'photos' && (
            <>
              <div>
                <label className="block text-[#FFCCDD] font-medium mb-1.5">照片標題 Photo Title</label>
                <input
                  type="text"
                  required
                  placeholder="例如：璀璨星光演唱會單人直拍"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-black/40 border border-[#FF799C]/20 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#FF799C] transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#FFCCDD] font-medium mb-1.5">活動年份 Year</label>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full bg-black/40 border border-[#FF799C]/20 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#FF799C] transition-colors"
                  >
                    <option value="2026">2026 年</option>
                    <option value="2025">2025 年</option>
                    <option value="2024">2024 年</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#FFCCDD] font-medium mb-1.5">照片分類 Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-black/40 border border-[#FF799C]/20 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#FF799C] transition-colors"
                  >
                    <option value="">選擇分類...</option>
                    {photoCategories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Drag & Drop File Upload or URL input */}
              <div>
                <label className="block text-[#FFCCDD] font-medium mb-1.5">上傳照片 Photo Upload</label>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
                    isDragging
                      ? 'border-[#FF799C] bg-[#FF799C]/10'
                      : mediaUrl
                      ? 'border-green-500/50 bg-green-500/5'
                      : 'border-[#FF799C]/20 hover:border-[#FF799C]/60 bg-black/20'
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  {mediaUrl ? (
                    <div className="space-y-2">
                      <img
                        src={mediaUrl}
                        alt="Preview"
                        className="max-h-40 mx-auto rounded-lg object-cover"
                      />
                      <p className="text-xs text-green-400 flex items-center justify-center space-x-1">
                        <Check className="w-4 h-4" /> <span>照片載入成功！</span>
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2 text-gray-300">
                      <Upload className="w-8 h-8 mx-auto text-[#FF799C]/80" />
                      <p className="font-medium">拖曳照片至此或點擊上傳</p>
                      <p className="text-xs text-gray-400">支援 JPG、PNG、WEBP 等格式</p>
                    </div>
                  )}
                </div>
                <div className="mt-3">
                  <span className="text-xs text-gray-400 block mb-1">或輸入外部照片連結 Image URL</span>
                  <input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={mediaUrl.startsWith('data:') ? '' : mediaUrl}
                    onChange={(e) => setMediaUrl(e.target.value)}
                    className="w-full bg-black/40 border border-[#FF799C]/20 rounded-xl px-4 py-2 text-white text-xs focus:outline-none focus:border-[#FF799C]"
                  />
                </div>
              </div>
            </>
          )}

          {moduleType === 'videos' && (
            <>
              <div>
                <label className="block text-[#FFCCDD] font-medium mb-1.5">影片標題 Video Title</label>
                <input
                  type="text"
                  required
                  placeholder="例如：2026舞台極致美學直拍焦點"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-black/40 border border-[#FF799C]/20 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#FF799C] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[#FFCCDD] font-medium mb-1.5">影片分類 Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-black/40 border border-[#FF799C]/20 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#FF799C] transition-colors"
                >
                  <option value="">選擇分類...</option>
                  {videoCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#FFCCDD] font-medium mb-1.5">影片網址或嵌入連結 Video URL / Stream Link</label>
                <input
                  type="url"
                  required
                  placeholder="https://www.w3schools.com/html/mov_bbb.mp4 或 YouTube/Bilibili 連結"
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  className="w-full bg-black/40 border border-[#FF799C]/20 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#FF799C] transition-colors"
                />
                <span className="text-[11px] text-gray-400 mt-1 block leading-normal">
                  支援直接 MP4 影片網址，或 YouTube、Bilibili、Vimeo 影片的分享網址。
                </span>
              </div>
            </>
          )}

          {moduleType === 'letters' && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-[#FFCCDD] font-medium">是否匿名寫信？ Anonymous</span>
                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-black/60 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF799C]"></div>
                </label>
              </div>

              <div>
                <label className="block text-[#FFCCDD] font-medium mb-1.5">信件內容 Heartfelt Letter Content</label>
                <textarea
                  required
                  rows={6}
                  placeholder="在星光罐中寫下對 Zack & Jeremy 最深刻、最溫柔的支持吧..."
                  value={letterContent}
                  onChange={(e) => setLetterContent(e.target.value)}
                  maxLength={500}
                  className="w-full bg-black/40 border border-[#FF799C]/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF799C] transition-colors resize-none leading-relaxed"
                />
                <div className="text-right text-xs text-gray-400 mt-1">
                  {letterContent.length} / 500 字
                </div>
              </div>
            </>
          )}

          {moduleType === 'artwork' && (
            <>
              <div>
                <label className="block text-[#FFCCDD] font-medium mb-1.5">作品名稱 Artwork Title</label>
                <input
                  type="text"
                  required
                  placeholder="例如：水彩手繪粉金皇冠小余"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-black/40 border border-[#FF799C]/20 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#FF799C] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[#FFCCDD] font-medium mb-1.5">作品敘述 Description</label>
                <textarea
                  rows={3}
                  placeholder="簡單敘述你的應援作品設計靈感與祝福..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-black/40 border border-[#FF799C]/20 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#FF799C] transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-[#FFCCDD] font-medium mb-1.5">上傳作品大圖 Image Upload</label>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
                    isDragging
                      ? 'border-[#FF799C] bg-[#FF799C]/10'
                      : mediaUrl
                      ? 'border-green-500/50 bg-green-500/5'
                      : 'border-[#FF799C]/20 hover:border-[#FF799C]/60 bg-black/20'
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  {mediaUrl ? (
                    <div className="space-y-2">
                      <img
                        src={mediaUrl}
                        alt="Preview"
                        className="max-h-40 mx-auto rounded-lg object-cover"
                      />
                      <p className="text-xs text-green-400 flex items-center justify-center space-x-1">
                        <Check className="w-4 h-4" /> <span>作品載入成功！</span>
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2 text-gray-300">
                      <Upload className="w-8 h-8 mx-auto text-[#FF799C]/80" />
                      <p className="font-medium">拖曳作品至此或點擊上傳</p>
                      <p className="text-xs text-gray-400">支援 JPG、PNG、WEBP 格式</p>
                    </div>
                  )}
                </div>
                <div className="mt-3">
                  <span className="text-xs text-gray-400 block mb-1">或輸入外部作品網址 Web Link</span>
                  <input
                    type="url"
                    placeholder="https://example.com/artwork.jpg"
                    value={mediaUrl.startsWith('data:') ? '' : mediaUrl}
                    onChange={(e) => setMediaUrl(e.target.value)}
                    className="w-full bg-black/40 border border-[#FF799C]/20 rounded-xl px-4 py-2 text-white text-xs focus:outline-none focus:border-[#FF799C]"
                  />
                </div>
              </div>
            </>
          )}

          {moduleType === 'music' && (
            <>
              <div>
                <label className="block text-[#FFCCDD] font-medium mb-1.5">歌曲/音頻名稱 Track Title</label>
                <input
                  type="text"
                  required
                  placeholder="例如：星空守護交響應援曲"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-black/40 border border-[#FF799C]/20 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#FF799C] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[#FFCCDD] font-medium mb-1.5">演唱/製作群 Artist / Producer</label>
                <input
                  type="text"
                  required
                  placeholder="例如：極光合唱團"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  className="w-full bg-black/40 border border-[#FF799C]/20 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#FF799C] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[#FFCCDD] font-medium mb-1.5">音頻音樂網址 Audio Link (.mp3)</label>
                <input
                  type="url"
                  required
                  placeholder="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  className="w-full bg-black/40 border border-[#FF799C]/20 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#FF799C] transition-colors"
                />
                <span className="text-[11px] text-gray-400 mt-1 block leading-normal">
                  請提供正確的直接音頻 MP3 網址，以便音樂播放器能夠在線解析播放。
                </span>
              </div>
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#FF799C] to-[#FFCCDD] text-white font-bold tracking-widest rounded-xl hover:opacity-95 shadow-lg shadow-[#FF799C]/10 hover:shadow-[#FF799C]/20 active:scale-[0.98] transition-all"
          >
            確認送出應援 SUBMIT CONTRIBUTION
          </button>
        </form>
      )}
    </div>
  );
}
