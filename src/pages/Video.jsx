import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import v1 from '../assets/v1.gif'; // الحالة العادية (الطلب)
import v2 from '../assets/v2.gif'; // حالة الموافقة (الاحتفال)

const DatingPage = () => {
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);
  const [noClicks, setNoClicks] = useState(0);

  // حساب حجم زرار Yes بناءً على الضغطات
  const yesScale = 1 + noClicks * 0.3;
  // حجم زرار No هيصغر مع كل ضغطة
  const noScale = 1 - noClicks * 0.15;

  // نصوص زر No
  const noTexts = ['No', 'Knew you would say yes!', 'Really?!', 'Please? 🥺'];

  const handleNoClick = () => {
    if (noClicks < 4) {
      setNoClicks((prev) => prev + 1);
    }
  };

  // الأشكال اللي هتطير في الاحتفال (أبقيتها بسيطة لتعزيز تأثير v2)
  const celebrationEmojis = ['💙', '✨', '🦋', '🫧', '🎉', '🩵'];

  return (
    <div className="fixed inset-0 h-[100dvh] w-full flex flex-col items-center justify-center bg-zinc-950 overflow-hidden touch-none p-4">
      
      {/* ── Ambient Glow Orbs ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-12%] left-[-8%] w-72 h-72 md:w-96 md:h-96 bg-blue-600 rounded-full blur-[70px] md:blur-[150px] opacity-15" />
        <div className="absolute bottom-[-10%] right-[-8%] w-72 h-72 md:w-96 md:h-96 bg-cyan-700 rounded-full blur-[70px] md:blur-[150px] opacity-15" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-sky-900 rounded-full blur-[80px] md:blur-[160px] opacity-10" />
      </div>

      {/* ── Grid Overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Edge Bars ── */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-cyan-500 via-blue-500 to-sky-500" />
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-500" />

      {/* ── Corner Ornaments ── */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 w-8 h-8 md:w-10 md:h-10 border-t-2 border-l-2 border-blue-500/50" />
      <div className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 md:w-10 md:h-10 border-t-2 border-r-2 border-blue-500/50" />
      <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 w-8 h-8 md:w-10 md:h-10 border-b-2 border-l-2 border-blue-500/50" />
      <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-8 h-8 md:w-10 md:h-10 border-b-2 border-r-2 border-blue-500/50" />

      {/* ── Fairy Lights ── */}
      <div className="absolute top-0 left-0 w-full flex justify-around px-6 pt-3 md:pt-5 z-20 pointer-events-none">
        <div className="absolute top-[14px] md:top-[22px] left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-600 to-transparent" />
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-px h-2 md:h-3 bg-zinc-600" />
            <motion.div
              animate={{ opacity: [0.35, 1, 0.35], scale: [0.92, 1.08, 0.92] }}
              transition={{ duration: 1.8 + i * 0.15, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
              className="relative flex items-center justify-center will-change-transform"
            >
              <div className="absolute w-4 h-4 md:w-5 md:h-5 rounded-full bg-blue-400 blur-md opacity-60" />
              <div className="relative w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-blue-300 shadow-[0_0_8px_#a5f3fc,0_0_20px_#3b82f6]" />
            </motion.div>
          </div>
        ))}
      </div>

      {/* ── Page Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center gap-1 mb-6 md:mb-8 z-10 mt-6 md:mt-0"
      >
        <p className="text-blue-400 text-[10px] md:text-xs font-semibold uppercase tracking-[0.35em]">
          {accepted ? '✦ It is a YES! ✦' : '✦ Important Question ✦'}
        </p>
        
        <motion.h2 
          key={accepted ? "yes-title" : "no-title"}
          initial={accepted ? { scale: 0.8, opacity: 0, y: 20 } : false}
          animate={accepted ? { scale: 1, opacity: 1, y: 0 } : false}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          className="font-serif italic text-3xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-300 to-sky-400 text-center px-4 py-2"
        >
          {accepted ? "Knew you would say yes!💙" : "Will you be my date?"}
        </motion.h2>
        
        <div className="w-12 md:w-16 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mt-2" />
      </motion.div>

      {/* ── Central Card (تم استبدال الإيموجي بالصور) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, type: 'spring', stiffness: 90 }}
        className="relative z-10 w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] group"
      >
        <div className="absolute -inset-[2px] md:-inset-[3px] rounded-xl bg-gradient-to-br from-cyan-500/30 via-blue-500/20 to-sky-500/30 group-hover:from-cyan-500/50 group-hover:via-blue-400/40 group-hover:to-sky-500/50 blur-md transition-all duration-500 -z-10" />

        <div className="relative bg-zinc-900 p-4 md:p-6 border border-zinc-700 group-hover:border-blue-500/60 transition-colors duration-400 rounded-xl shadow-2xl shadow-black/80 flex flex-col items-center justify-center min-h-[320px]">
          
          <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 w-10 h-4 md:w-16 md:h-6 bg-zinc-700/60 border border-zinc-600/40 group-hover:bg-cyan-500/20 group-hover:border-cyan-400/30 transition-all duration-400 rounded-sm z-20" />

          {/* عرض v1 أو v2 بناءً على الحالة */}
          <motion.div
            key={accepted ? "v2" : "v1"}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="w-full aspect-square flex items-center justify-center overflow-hidden rounded-lg"
          >
            <img 
              src={accepted ? v2 : v1} 
              alt="Dating status" 
              className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(59,130,246,0.4)]"
            />
          </motion.div>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2 z-10 pointer-events-none">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-blue-500/50" />
            <span className="text-blue-400 text-[10px] md:text-xs">✦</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-blue-500/50" />
          </div>
        </div>
      </motion.div>

      {/* ── Buttons Section ── */}
      {!accepted && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-6 mt-8 md:mt-12 z-20 h-20"
        >
          <motion.button
            animate={{ scale: yesScale }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            onClick={() => setAccepted(true)}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-3 px-8 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-shadow duration-300 z-30"
          >
            Yes!
          </motion.button>

          <AnimatePresence>
            {noClicks < 4 && (
              <motion.button
                key="no-btn"
                initial={{ scale: 1 }}
                animate={{ scale: noScale }}
                exit={{ scale: 0, opacity: 0 }}
                onClick={handleNoClick}
                className="bg-zinc-800 text-zinc-300 font-bold py-3 px-8 rounded-full border border-zinc-700 hover:bg-zinc-700 transition-colors z-20 whitespace-nowrap"
              >
                {noTexts[noClicks]}
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* ── Celebration Particles & Continue Button ── */}
      {accepted && (
        <>
          <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center">
            {[...Array(20)].map((_, i) => {
              const randomX = (Math.random() - 0.5) * 120;
              const randomY = (Math.random() - 0.5) * 120;
              const rotation = Math.random() * 360;
              const emoji = celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)];
              
              return (
                <motion.div
                  key={`particle-${i}`}
                  initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                  animate={{ 
                    x: [`0vw`, `${randomX}vw`, `${randomX * 1.2}vw`],
                    y: [`0vh`, `${randomY - 20}vh`, `${randomY + 40}vh`],
                    scale: [0, Math.random() * 1.2 + 0.8, 0],
                    rotate: [0, rotation, rotation * 2],
                    opacity: [1, 1, 0]
                  }}
                  transition={{ 
                    duration: Math.random() * 1.5 + 2, 
                    ease: "easeOut",
                    delay: Math.random() * 0.2
                  }}
                  className="absolute text-3xl md:text-5xl"
                  style={{ filter: "drop-shadow(0 0-10px rgba(96, 165, 250, 0.6))" }}
                >
                  {emoji}
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-6 z-30 flex flex-col items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 35px rgba(56, 189, 248, 0.6)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/journey')}
              className="relative group cursor-pointer inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 text-white font-bold py-3.5 px-8 rounded-full shadow-lg shadow-blue-500/40 overflow-hidden"
            >
              <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12" />
              <span className="relative">Start The Mini-Game Journey</span>
              <span className="relative text-lg">🎮✨</span>
            </motion.button>
          </motion.div>
        </>
      )}

    </div>
  );
};

export default DatingPage;