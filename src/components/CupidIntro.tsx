import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';

interface CupidIntroProps {
  onComplete: () => void;
}

export default function CupidIntro({ onComplete }: CupidIntroProps) {
  const [isShooting, setIsShooting] = useState(false);
  const [isHit, setIsHit] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // 1. Pulling the bow (0.5s)
    const timer1 = setTimeout(() => {
      setIsShooting(true);
    }, 600);

    // 2. Arrow hits the heart (1.4s)
    const timer2 = setTimeout(() => {
      setIsHit(true);
    }, 1400);

    // 3. Start fade out (2.6s)
    const timer3 = setTimeout(() => {
      setIsFadingOut(true);
    }, 2600);

    // 4. Complete and unmount (3.3s)
    const timer4 = setTimeout(() => {
      onComplete();
    }, 3300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFadingOut && (
        <motion.div
          id="cupid-intro-container"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#0c0a0f] via-[#1a121d] to-[#0d0912] overflow-hidden"
        >
          {/* Constellation background accents */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,121,156,0.08)_0%,transparent_70%)] pointer-events-none" />
          
          <div className="relative w-96 h-96 flex items-center justify-center">
            {/* Elegant European Ornament Frame */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.25 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="absolute w-80 h-80 border border-[#FF799C]/30 rounded-full"
            />
            <motion.div
              initial={{ scale: 0.7, opacity: 0, rotate: -45 }}
              animate={{ scale: 1, opacity: 0.15, rotate: 0 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="absolute w-72 h-72 border border-[#FFCCDD]/20 rounded-full border-dashed"
            />

            {/* Cupid (Left side) */}
            <motion.div
              id="cupid-angel"
              initial={{ x: -100, y: 50, opacity: 0, rotate: -10 }}
              animate={{ x: -70, y: 10, opacity: 1, rotate: 5 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute left-4 z-20"
            >
              <svg
                width="140"
                height="140"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-[0_0_15px_rgba(255,121,156,0.3)]"
              >
                {/* Cupid Silhouette / Line art style */}
                <path
                  d="M50 110C40 90 45 70 65 60C85 50 100 65 110 80C120 70 140 60 155 75C170 90 160 110 145 125C130 140 105 160 90 170"
                  stroke="#FFCCDD"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* Angel Wings */}
                <motion.path
                  d="M45 75C15 65 20 20 55 35C40 15 70 5 80 25C70 5 95 -5 100 15"
                  stroke="#FF799C"
                  strokeWidth="2"
                  strokeLinecap="round"
                  animate={{ rotate: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                />
                {/* Cupid Bow */}
                <path
                  d="M125 115C135 100 135 75 125 60"
                  stroke="#FF799C"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <path
                  d="M125 115C118 100 118 75 125 60"
                  stroke="#FFCCDD"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                {/* String */}
                <motion.path
                  d={isShooting ? "M125 115L125 60" : "M125 115L110 87.5L125 60"}
                  stroke="#FFFFFF"
                  strokeWidth="1"
                  animate={{ d: isShooting ? "M125 115L125 60" : "M125 115L102 87.5L125 60" }}
                  transition={{ duration: 0.5 }}
                />
              </svg>
            </motion.div>

            {/* Cupid Arrow */}
            <AnimatePresence>
              {!isHit && (
                <motion.div
                  id="cupid-arrow"
                  initial={{ x: -20, y: 15, opacity: 0, rotate: 12 }}
                  animate={isShooting ? { x: 120, y: 10, opacity: 1 } : { x: -30, y: 15, opacity: 0.9 }}
                  transition={isShooting ? { duration: 0.35, ease: 'easeIn' } : { duration: 0.1 }}
                  className="absolute left-20 z-10"
                >
                  <svg width="100" height="20" viewBox="0 0 100 20" fill="none">
                    <line x1="0" y1="10" x2="90" y2="10" stroke="#FFFFFF" strokeWidth="2" />
                    {/* Feather back */}
                    <path d="M0 5L15 10L0 15" fill="#FF799C" />
                    {/* Arrow head */}
                    <path d="M85 4L95 10L85 16" fill="#FF799C" />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Target Heart (Right side) */}
            <motion.div
              id="target-heart"
              initial={{ x: 100, y: -20, opacity: 0, scale: 0.8 }}
              animate={{ x: 80, y: 10, opacity: 1, scale: 1.1 }}
              transition={{ duration: 1.0, ease: 'easeOut' }}
              className="absolute right-6 z-20"
            >
              <div className="relative">
                {/* Outer halo */}
                <motion.div
                  animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  className="absolute inset-[-16px] bg-[#FF799C]/20 rounded-full blur-md"
                />

                <motion.div
                  animate={isHit ? {
                    scale: [1.1, 1.6, 0],
                    rotate: [0, 45, 180],
                    filter: 'drop-shadow(0 0 25px #FF799C)'
                  } : {
                    y: [0, -8, 0],
                  }}
                  transition={isHit ? { duration: 0.8, ease: 'easeOut' } : {
                    repeat: Infinity,
                    duration: 3,
                    ease: 'easeInOut'
                  }}
                  className="p-4 bg-gradient-to-r from-[#FF799C] to-[#FFCCDD] rounded-full text-white shadow-lg shadow-[#FF799C]/30"
                >
                  <Heart className="w-12 h-12 fill-white text-white drop-shadow-md" />
                </motion.div>

                {/* Heart Sparks upon hit */}
                {isHit && (
                  <>
                    {[...Array(12)].map((_, i) => {
                      const angle = (i * 360) / 12;
                      const rad = (angle * Math.PI) / 180;
                      const xDist = Math.cos(rad) * 140;
                      const yDist = Math.sin(rad) * 140;
                      return (
                        <motion.div
                          key={i}
                          initial={{ x: 40, y: 40, opacity: 1, scale: 1 }}
                          animate={{ x: 40 + xDist, y: 40 + yDist, opacity: 0, scale: 0.2 }}
                          transition={{ duration: 0.9, ease: 'easeOut' }}
                          className="absolute w-3 h-3 bg-[#FFCCDD] rounded-full blur-[1px]"
                          style={{
                            boxShadow: '0 0 10px #FF799C, 0 0 20px #FFCCDD'
                          }}
                        />
                      );
                    })}
                  </>
                )}
              </div>
            </motion.div>
          </div>

          {/* Slogan & Support names under Cupid */}
          <div className="absolute bottom-16 flex flex-col items-center space-y-2 text-center pointer-events-none">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 0.8 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-serif text-2xl tracking-[0.3em] text-[#FFCCDD] font-semibold"
            >
              ALL FOR JIYU
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex items-center space-x-6 text-xs font-mono tracking-widest text-[#FF799C]"
            >
              <span>ZACK</span>
              <span>•</span>
              <span>JEREMY</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
