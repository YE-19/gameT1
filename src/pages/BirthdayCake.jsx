import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';

// ── Decorative Garland Component ──
const Garland = () => (
  <div className="absolute top-0 left-0 w-full flex justify-around pointer-events-none overflow-hidden h-32 z-20">
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ y: -50, rotate: -10 }}
        animate={{ y: 0, rotate: i % 2 === 0 ? 10 : -10 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          delay: i * 0.1,
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 2,
        }}
        className={`w-6 h-10 shadow-md will-change-transform ${
          i % 3 === 0
            ? 'bg-blue-500 shadow-blue-900'
            : i % 3 === 1
            ? 'bg-cyan-600 shadow-cyan-900'
            : 'bg-indigo-500 shadow-indigo-900'
        }`}
        style={{ clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)' }}
      />
    ))}
    {/* Garland string */}
    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500 opacity-60" />
  </div>
);

const BlueBirthdayCake = () => {
  const [isLit, setIsLit] = useState(true);
  const navigate = useNavigate();

  const handleSurprise = () => {
    setIsLit(false);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#60a5fa', '#ffffff', '#fbbf24', '#22d3ee'],
    });
  };

  return (
    <div className="fixed inset-0 h-[100dvh] w-full flex flex-col items-center justify-center bg-zinc-950 overflow-hidden touch-none font-sans">

      {/* ── Ambient Glow Orbs ── */}
      <div className="absolute top-[-10%] left-[-8%] w-80 h-80 bg-blue-600 rounded-full blur-[70px] md:blur-[140px] opacity-15 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-8%] w-96 h-96 bg-cyan-700 rounded-full blur-[80px] md:blur-[160px] opacity-15 pointer-events-none" />

      {/* Candle warm glow — only visible when lit */}
      <AnimatePresence>
        {isLit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute top-[18%] left-1/2 -translate-x-1/2 w-48 h-48 md:w-64 md:h-64 bg-amber-400 rounded-full blur-[50px] md:blur-[100px] opacity-20 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* ── Grid overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Corner Ornaments ── */}
      <div className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-blue-500/50 rounded-tl-sm" />
      <div className="absolute top-6 right-6 w-10 h-10 border-t-2 border-r-2 border-blue-500/50 rounded-tr-sm" />
      <div className="absolute bottom-6 left-6 w-10 h-10 border-b-2 border-l-2 border-blue-500/50 rounded-bl-sm" />
      <div className="absolute bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 border-blue-500/50 rounded-br-sm" />

      {/* ── Top Edge Bar ── */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500" />

      {/* ── Floating Particles ── */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: [0, -(40 + Math.random() * 60)], opacity: [0, 0.6, 0] }}
            transition={{
              duration: 5 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 7,
              ease: 'easeOut',
            }}
            className="absolute rounded-full will-change-transform"
            style={{
              top: `${30 + Math.random() * 60}%`,
              left: `${5 + Math.random() * 90}%`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              background: i % 2 === 0 ? '#60a5fa' : '#22d3ee', // Blue-400 & Cyan-400
            }}
          />
        ))}
      </div>

      <Garland />

      {/* ── Bottom Edge Bar ── */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 z-10" />

      {/* ── Main Layout (Cake Wrapper) ── */}
      <div className="relative z-10 flex flex-col items-center mt-10 md:mt-20 px-4 scale-[0.85] sm:scale-100 transform origin-bottom">

        {/* ── Candle ── */}
        <div className="relative flex flex-col items-center mb-[-4px] z-50">
          {/* Flame */}
          <AnimatePresence>
            {isLit && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: [1, 1.15, 1],
                  y: [0, -4, 0],
                  rotateZ: [0, 3, -3, 0],
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  scale: { repeat: Infinity, duration: 0.7 },
                  y: { repeat: Infinity, duration: 0.7 },
                  rotateZ: { repeat: Infinity, duration: 1.2 },
                }}
                className="absolute -top-12 flex flex-col items-center will-change-transform"
              >
                <div className="absolute w-8 h-8 rounded-full bg-amber-400 blur-md opacity-60" />
                <div
                  className="relative w-5 h-9 z-10"
                  style={{
                    background: 'radial-gradient(ellipse at 50% 80%, #fff 5%, #fde68a 30%, #f59e0b 65%, #ea580c 100%)',
                    borderRadius: '50% 50% 30% 30% / 60% 60% 40% 40%',
                    clipPath: 'ellipse(50% 100% at 50% 100%)',
                  }}
                />
                <div className="absolute bottom-1 w-2 h-3 bg-white rounded-full blur-[1px] opacity-80" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Candle Stick */}
          <div className="w-4 h-14 rounded-t-sm overflow-hidden flex flex-col shadow-lg shadow-blue-900/40">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className={`flex-1 ${i % 2 === 0 ? 'bg-blue-500' : 'bg-zinc-800'}`}
              />
            ))}
          </div>
          {/* Wax drip */}
          <div className="w-5 h-2 bg-blue-400 rounded-full -mt-1 blur-[1px] opacity-70" />
        </div>

        {/* ── Tier 1 — Top ── */}
        <div className="w-40 h-16 bg-zinc-800 rounded-t-2xl shadow-inner relative z-30 border border-zinc-700">
          <div className="absolute -bottom-2 flex w-full justify-around px-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-7 h-6 bg-blue-500 rounded-full -mt-1 shadow-sm shadow-blue-900" />
            ))}
          </div>
          <div className="flex justify-center items-center h-full gap-4 pt-1">
            <span className="text-blue-400 text-xs">★</span>
            <span className="text-cyan-400 text-xs">★</span>
            <span className="text-blue-400 text-xs">★</span>
          </div>
        </div>

        {/* ── Tier 2 — Middle ── */}
        <div className="w-56 h-20 bg-blue-900 rounded-t-3xl shadow-inner -mt-2 relative z-20 border-b-4 border-blue-800">
          <div className="absolute -bottom-3 flex w-full justify-around px-1">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-7 h-7 bg-blue-500 rounded-full shadow-sm shadow-blue-900" />
            ))}
          </div>
          <div className="flex justify-center items-center h-full gap-5 opacity-50">
            <span className="text-blue-300 text-lg">✦</span>
            <span className="text-cyan-300 text-lg">✦</span>
            <span className="text-blue-300 text-lg">✦</span>
          </div>
        </div>

        {/* ── Tier 3 — Base ── */}
        <div className="w-72 h-28 bg-zinc-900 rounded-t-[2.5rem] shadow-2xl -mt-2 relative z-10 border border-zinc-700 border-b-8 border-b-blue-800">
          <div className="absolute bottom-5 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-60" />
          <div className="absolute inset-0 flex items-center justify-around px-8 opacity-10">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-blue-400 rounded-full" />
            ))}
          </div>
          <div className="absolute left-0 top-2 bottom-2 w-1 bg-gradient-to-b from-transparent via-blue-500 to-transparent opacity-30 rounded-full" />
          <div className="absolute right-0 top-2 bottom-2 w-1 bg-gradient-to-b from-transparent via-blue-500 to-transparent opacity-30 rounded-full" />
        </div>

        {/* ── Base Plate ── */}
        <div className="w-80 h-4 bg-zinc-800 rounded-full -mt-1 shadow-2xl shadow-black border border-zinc-700 relative">
          <div className="absolute inset-x-4 top-1 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
        </div>

        {/* ── Table Surface Line ── */}
        <div className="w-96 h-[2px] bg-gradient-to-r from-transparent via-zinc-700 to-transparent mt-1" />
      </div>

      {/* ── Text & Controls ── */}
      <div className="mt-8 md:mt-12 text-center z-20 flex flex-col items-center px-4">

        <div className="w-12 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mb-4 md:mb-5" />

        <motion.h2
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="text-xl md:text-3xl font-serif italic mb-6 md:mb-8 drop-shadow-sm"
        >
          {isLit ? (
            <span className="text-zinc-100">
              Make a wish,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Ayah
              </span>{' '}
              👑
            </span>
          ) : (
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400">
              Happy Birthday, Queen Ayah! 🎂
            </span>
          )}
        </motion.h2>

        {/* Main Action Button */}
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: isLit
              ? '0 0 36px rgba(59, 130, 246, 0.5)' // Blue-500 RGBA
              : '0 0 36px rgba(251, 191, 36, 0.4)',
          }}
          whileTap={{ scale: 0.95 }}
          onClick={isLit ? handleSurprise : () => setIsLit(true)}
          className={`relative cursor-pointer group inline-flex items-center gap-2 px-10 py-3 md:px-14 md:py-4 rounded-full font-semibold text-base md:text-lg text-white transition-all shadow-xl overflow-hidden ${
            isLit
              ? 'bg-blue-500 hover:bg-blue-400 shadow-blue-900/60'
              : 'bg-amber-500 hover:bg-amber-400 shadow-amber-900/60'
          }`}
        >
          <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
          <span className="relative">
            {isLit ? 'Blow the Candle 🎈' : 'Light it Again ✨'}
          </span>
        </motion.button>

        {/* Secret Letter Button */}
        <AnimatePresence>
          {!isLit && (
            <motion.button
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onClick={() => navigate('/letter')}
              className="relative mt-6 cursor-pointer md:mt-7 group flex flex-col items-center gap-1"
            >
              <span className="absolute inset-0 rounded-full bg-blue-500 blur-md opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              <span className="relative text-blue-400 group-hover:text-blue-300 text-xs md:text-sm font-medium tracking-widest uppercase transition-colors duration-300">
                You have a secret letter
              </span>
              <span className="relative flex items-center gap-2 text-zinc-400 group-hover:text-zinc-300 text-[10px] md:text-xs transition-colors">
                <span className="h-px w-6 md:w-8 bg-gradient-to-r from-transparent to-blue-500/50" />
                Click to read ✉️
                <span className="h-px w-6 md:w-8 bg-gradient-to-l from-transparent to-blue-500/50" />
              </span>
            </motion.button>
          )}
        </AnimatePresence>

        <div className="w-12 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mt-6 md:mt-8" />
      </div>
    </div>
  );
};

export default BlueBirthdayCake;