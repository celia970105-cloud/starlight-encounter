import React from 'react';
import { motion } from 'motion/react';
import { Image, Video, Mail, Palette, Music, Home } from 'lucide-react';

interface HomeVisualProps {
  onSelectModule: (moduleName: 'photos' | 'videos' | 'letters' | 'artwork' | 'music') => void;
  zackText: string;
  jeremyText: string;
  bannerText: string;
}

export default function HomeVisual({ onSelectModule, zackText, jeremyText, bannerText }: HomeVisualProps) {
  // Constellation Star Nodes layout config
  const nodes = [
    {
      id: 'photos',
      label: '圖片相簿',
      subLabel: 'Gallery',
      icon: Image,
      x: '15%',
      y: '22%',
      delay: 0.1,
      glowColor: 'shadow-[#FF799C]/50 border-[#FF799C]',
    },
    {
      id: 'videos',
      label: '影片特區',
      subLabel: 'Cinema',
      icon: Video,
      x: '80%',
      y: '25%',
      delay: 0.3,
      glowColor: 'shadow-[#FFCCDD]/50 border-[#FFCCDD]',
    },
    {
      id: 'letters',
      label: '星星信罐',
      subLabel: 'Wish Jar',
      icon: Mail,
      x: '12%',
      y: '65%',
      delay: 0.5,
      glowColor: 'shadow-[#FFCCDD]/50 border-[#FFCCDD]',
    },
    {
      id: 'artwork',
      label: '美術展館',
      subLabel: 'Museum',
      icon: Palette,
      x: '82%',
      y: '62%',
      delay: 0.7,
      glowColor: 'shadow-[#FF799C]/50 border-[#FF799C]',
    },
    {
      id: 'music',
      label: '音樂播器',
      subLabel: 'Melody',
      icon: Music,
      x: '50%',
      y: '85%',
      delay: 0.9,
      glowColor: 'shadow-[#FFFFFF]/50 border-white',
    },
  ];

  return (
    <div id="home-interactive-stage" className="relative w-full max-w-4xl h-[560px] md:h-[650px] mx-auto flex items-center justify-center select-none px-4">
      
      {/* BACKGROUND ECLIPSE GRID & CONSTELLATION LINES */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50%" cy="50%" r="200" fill="none" stroke="#FF799C" strokeWidth="1" strokeDasharray="3,6" />
        <circle cx="50%" cy="50%" r="280" fill="none" stroke="#FFCCDD" strokeWidth="0.8" />
        {/* Connecting lines from central star to outer nodes */}
        <line x1="50%" y1="36%" x2="15%" y2="22%" stroke="#FF799C" strokeWidth="1" strokeDasharray="4" />
        <line x1="50%" y1="36%" x2="80%" y2="25%" stroke="#FFCCDD" strokeWidth="1" strokeDasharray="4" />
        <line x1="50%" y1="36%" x2="12%" y2="65%" stroke="#FFCCDD" strokeWidth="1" strokeDasharray="4" />
        <line x1="50%" y1="36%" x2="82%" y2="62%" stroke="#FF799C" strokeWidth="1" strokeDasharray="4" />
        <line x1="50%" y1="36%" x2="50%" y2="85%" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="4" />
      </svg>

      {/* STYLISH BACKDROP GRAPHIC TEXTS (ZACK / JEREMY / ALL FOR JIYU) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center justify-center pointer-events-none opacity-10">
        <h3 className="font-serif text-[10vw] md:text-[6.5rem] tracking-[0.25em] text-white leading-none font-bold">
          {bannerText}
        </h3>
        <div className="flex space-x-16 mt-4 font-mono text-xl tracking-[0.5em] text-[#FF799C]">
          <span>{zackText}</span>
          <span>{jeremyText}</span>
        </div>
      </div>

      {/* CENTRAL 3D GLASS LITTLE GIRL + GLOWING TOUCH-STAR */}
      <div className="relative w-72 h-80 md:w-80 md:h-96 flex flex-col items-center justify-center z-10 pointer-events-none">
        
        {/* The Reaching Crystal Star (Touchable in interactive radius) */}
        <motion.div
          id="main-glowing-star"
          animate={{
            y: [0, -10, 0],
            scale: [1, 1.12, 1],
            filter: [
              'drop-shadow(0 0 15px rgba(255,204,221,0.6))',
              'drop-shadow(0 0 35px rgba(255,121,156,0.9))',
              'drop-shadow(0 0 15px rgba(255,204,221,0.6))',
            ]
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: 'easeInOut'
          }}
          className="absolute top-[20%] w-12 h-12 flex items-center justify-center cursor-pointer pointer-events-auto"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-white drop-shadow-md">
            <path
              d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
              fill="url(#star-gold-gradient)"
            />
            <defs>
              <linearGradient id="star-gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#FFCCDD" />
                <stop offset="100%" stopColor="#FF799C" />
              </linearGradient>
            </defs>
          </svg>
          {/* Subtle orbiting sparkles */}
          <div className="absolute w-20 h-20 border border-[#FF799C]/30 rounded-full animate-spin [animation-duration:8s] border-dashed" />
        </motion.div>

        {/* 3D Glassmorphic Crystal Girl illustration using inline vector paths */}
        <motion.div
          animate={{
            y: [0, 6, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: 'easeInOut'
          }}
          className="w-full h-full flex items-center justify-center mt-6"
        >
          <svg
            width="220"
            height="220"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_8px_30px_rgba(255,121,156,0.25)]"
          >
            {/* Glassmorphic/Crystal Halo backdrop */}
            <circle cx="100" cy="110" r="50" fill="url(#crystal-halo)" opacity="0.3" />

            {/* Hair and Head Outline with elegant curves */}
            <path
              d="M100 50C75 50 65 72 65 88C65 104 74 112 100 112C126 112 135 104 135 88C135 72 125 50 100 50Z"
              fill="url(#crystal-glass-1)"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeOpacity="0.8"
            />

            {/* Reaching arm pointing to the upper star */}
            <path
              d="M100 118C92 110 90 92 100 68"
              stroke="url(#crystal-edge)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeOpacity="0.9"
            />
            {/* Soft pink star shine reflection on hand */}
            <circle cx="100" cy="68" r="4" fill="#FFCCDD" />

            {/* Little Dress/Body */}
            <path
              d="M100 112L75 160H125L100 112Z"
              fill="url(#crystal-glass-2)"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeOpacity="0.7"
            />

            {/* Soft angelic glass wings */}
            <path
              d="M75 120C50 110 45 135 68 145"
              stroke="#FFCCDD"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="url(#crystal-wing)"
              opacity="0.6"
            />
            <path
              d="M125 120C150 110 155 135 132 145"
              stroke="#FFCCDD"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="url(#crystal-wing)"
              opacity="0.6"
            />

            {/* Crystal Gradients Definitions */}
            <defs>
              <linearGradient id="crystal-glass-1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.75)" />
                <stop offset="40%" stopColor="rgba(255, 204, 221, 0.45)" />
                <stop offset="100%" stopColor="rgba(255, 121, 156, 0.2)" />
              </linearGradient>
              <linearGradient id="crystal-glass-2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255, 204, 221, 0.7)" />
                <stop offset="50%" stopColor="rgba(255, 121, 156, 0.3)" />
                <stop offset="100%" stopColor="rgba(25, 13, 30, 0.5)" />
              </linearGradient>
              <linearGradient id="crystal-wing" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
                <stop offset="100%" stopColor="rgba(255, 121, 156, 0.1)" />
              </linearGradient>
              <radialGradient id="crystal-halo" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FF799C" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
              <linearGradient id="crystal-edge" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#FFCCDD" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* PET DOME HOME (at her feet) */}
        <motion.div
          id="crystal-pet-home"
          animate={{
            y: [0, 4, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 4.2,
            ease: 'easeInOut'
          }}
          className="absolute bottom-[-10px] flex flex-col items-center justify-center pointer-events-auto cursor-pointer"
          onClick={() => alert('星星寵物小屋預計於第二階段開啟！敬請期待 ✨')}
        >
          {/* Glowing pedestal for the house */}
          <div className="absolute w-24 h-4 bg-pink-500/10 rounded-full blur-md" />

          {/* SVG representation of a high-fidelity glass dome pet nest */}
          <svg
            width="80"
            height="70"
            viewBox="0 0 100 85"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_15px_rgba(255,204,221,0.5)] transition-transform hover:scale-110 duration-300"
          >
            {/* Crystal Base */}
            <path
              d="M10 70C30 80 70 80 90 70C95 68 95 65 80 62C50 56 50 56 20 62C5 65 5 68 10 70Z"
              fill="rgba(255,255,255,0.2)"
              stroke="#FF799C"
              strokeWidth="1.5"
            />
            {/* Glass Dome */}
            <path
              d="M15 65C10 40 30 10 50 10C70 10 90 40 85 65"
              fill="url(#dome-gradient)"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              strokeOpacity="0.7"
            />
            {/* Heart Shaped Entrance */}
            <path
              d="M50 42C47 38 42 38 42 43C42 48 50 53 50 53C50 53 58 48 58 43C58 38 53 38 50 42Z"
              fill="#FF799C"
              opacity="0.8"
            />
            {/* Little Sleeping star inside */}
            <circle cx="50" cy="35" r="3" fill="#FFFFFF" className="animate-pulse" />

            <defs>
              <linearGradient id="dome-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                <stop offset="100%" stopColor="rgba(255,121,156,0.05)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Label indicating Nest */}
          <span className="text-[10px] font-mono tracking-widest text-[#FF799C] mt-1 bg-black/40 px-2 py-0.5 rounded-full border border-[#FF799C]/20">
            PET HOME
          </span>
        </motion.div>
      </div>

      {/* CONSTELLATION NODE BUTTONS (THE 5 STARS) */}
      {nodes.map((node) => {
        const IconComponent = node.icon;
        return (
          <motion.button
            key={node.id}
            id={`star-node-${node.id}`}
            onClick={() => onSelectModule(node.id as any)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: node.delay, type: 'spring', stiffness: 80 }}
            whileHover={{ scale: 1.15, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="absolute z-20 flex flex-col items-center group cursor-pointer focus:outline-none"
            style={{ left: node.x, top: node.y }}
          >
            {/* The Star background aura */}
            <div className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16">
              {/* Outer Pulsing Glow */}
              <div className={`absolute inset-0 rounded-full bg-black/40 border border-white/20 backdrop-blur-md shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:border-[#FF799C]/60 group-hover:${node.glowColor}`} />

              {/* Sparkling star vectors rotating behind */}
              <div className="absolute inset-[-4px] rounded-full border border-dashed border-[#FFCCDD]/20 group-hover:border-[#FF799C]/40 animate-spin [animation-duration:12s]" />

              {/* Icon inside */}
              <IconComponent className="relative w-5 h-5 md:w-6 md:h-6 text-[#FFCCDD] transition-colors duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_8px_#FF799C]" />
            </div>

            {/* Star Labels */}
            <span className="mt-2 text-xs font-semibold tracking-wider text-[#FFCCDD] group-hover:text-white transition-colors duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] bg-black/60 px-3 py-1 rounded-full border border-white/10">
              {node.label}
            </span>
            <span className="text-[9px] font-mono tracking-widest text-[#FF799C]/80 group-hover:text-[#FF799C] transition-colors duration-300 font-medium">
              {node.subLabel}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
