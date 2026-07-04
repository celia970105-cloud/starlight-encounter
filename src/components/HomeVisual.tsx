import React from 'react';
import { motion } from 'motion/react';
import { Image, Video, Mail, Palette, Music } from 'lucide-react';

interface HomeVisualProps {
  onSelectModule: (moduleName: 'photos' | 'videos' | 'letters' | 'artwork' | 'music') => void;
  zackText: string;
  jeremyText: string;
  bannerText: string;
}

export default function HomeVisual({
  onSelectModule,
  zackText,
  jeremyText,
  bannerText
}: HomeVisualProps) {

  // 🌌 星座式結構（非對稱 + 有主次）
  const nodes = [
    {
      id: 'music',
      label: '音樂',
      subLabel: 'Melody',
      icon: Music,
      x: '50%',
      y: '78%',
      scale: 1.2,
      glow: true
    },
    {
      id: 'photos',
      label: '相簿',
      subLabel: 'Gallery',
      icon: Image,
      x: '18%',
      y: '28%',
      scale: 1,
    },
    {
      id: 'videos',
      label: '影片',
      subLabel: 'Cinema',
      icon: Video,
      x: '78%',
      y: '22%',
      scale: 1,
    },
    {
      id: 'letters',
      label: '信件',
      subLabel: 'Wish',
      icon: Mail,
      x: '22%',
      y: '72%',
      scale: 0.95,
    },
    {
      id: 'artwork',
      label: '作品',
      subLabel: 'Design',
      icon: Palette,
      x: '82%',
      y: '68%',
      scale: 0.95,
    }
  ];

  return (
    <div className="relative w-full max-w-5xl h-[620px] mx-auto flex items-center justify-center">

      {/* 🌌 背景文字（更淡） */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
        <h1 className="text-[5rem] md:text-[7rem] font-serif tracking-[0.3em] text-white">
          {bannerText}
        </h1>
      </div>

      {/* ✨ 星座連線（更乾淨） */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.12] pointer-events-none">
        <line x1="50%" y1="50%" x2="18%" y2="28%" stroke="#FF799C" />
        <line x1="50%" y1="50%" x2="78%" y2="22%" stroke="#FFCCDD" />
        <line x1="50%" y1="50%" x2="22%" y2="72%" stroke="#FFCCDD" />
        <line x1="50%" y1="50%" x2="82%" y2="68%" stroke="#FF799C" />
      </svg>

      {/* 💖 中央「星核」 */}
      <motion.div
        className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-[#FF799C]/30 to-[#FFCCDD]/10 blur-xl"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* 🌙 中央文字 */}
      <div className="absolute text-center pointer-events-none">
        <h2 className="font-serif text-white text-xl tracking-[0.4em] opacity-80">
          STELLAR CORE
        </h2>
        <p className="text-xs text-[#FF799C] mt-2 tracking-[0.3em] opacity-70">
          {zackText} · {jeremyText}
        </p>
      </div>

      {/* ⭐ 星點系統 */}
      {nodes.map((node, index) => {
        const Icon = node.icon;

        return (
          <motion.button
            key={node.id}
            onClick={() => onSelectModule(node.id as any)}
            className="absolute flex flex-col items-center"
            style={{
              left: node.x,
              top: node.y,
              transform: `translate(-50%, -50%) scale(${node.scale})`
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: node.scale }}
            transition={{ delay: index * 0.15 }}
            whileHover={{ scale: node.scale * 1.15 }}
          >

            {/* 光暈核心 */}
            <div className="relative w-14 h-14 flex items-center justify-center">

              <div className="absolute inset-0 rounded-full bg-white/5 backdrop-blur-md border border-white/10" />

              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition blur-xl bg-[#FF799C]/30" />

              <Icon className="w-5 h-5 text-[#FFCCDD]" />
            </div>

            {/* label */}
            <span className="mt-2 text-[11px] tracking-[0.2em] text-white/80">
              {node.label}
            </span>
            <span className="text-[9px] text-[#FF799C]/70 tracking-[0.3em]">
              {node.subLabel}
            </span>
          </motion.button>
        );
      })}

      {/* 🌌 外圍暗角（電影感） */}
      <div className="absolute inset-0 pointer-events-none bg-radial-gradient" />
    </div>
  );
}