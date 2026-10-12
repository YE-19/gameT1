import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import photo1 from '../assets/p1.jpg';
import photo2 from '../assets/photo2.jpeg';
import photo3 from '../assets/photo3.jpeg';
import photo4 from '../assets/photo4.jpeg';

const Memories = () => {
  const [selected, setSelected] = useState(null);

  const photos = [
    {
      id: 1,
      url: photo1,
      message: "Every time I look at this photo, I remember exactly how happy we were in that moment. You have a smile that could light up the darkest room — and you did, that day.",
      date: "A day worth remembering 🌸",
    },
    {
      id: 2,
      url: photo2,
      message: "This one is my favorite. You weren't even trying to look beautiful, and yet here you are — effortlessly stunning. That's just who you are.",
      date: "Caught in a perfect moment ✨",
    },
    {
      id: 3,
      url: photo3,
      message: "I keep coming back to this photo whenever I need a reminder of the kind of joy you bring into my life. Pure, genuine, and real. Just like you.",
      date: "Joy looks good on you 💖",
    },
    {
      id: 4,
      url: photo4,
      message: "Years from now, when I look back at the best chapters of my life — you'll be in every single one. Thank you for being you. Happy Birthday, beautiful.",
      date: "Forever in my heart 👑",
    },
  ];


  const navigate = useNavigate();

  return (
    // منع السكرول نهائياً وتثبيت الشاشة
    <div className="fixed inset-0 h-[100dvh] w-full flex flex-col items-center justify-center bg-zinc-950 overflow-hidden touch-none">

      {/* ── Ambient Glow Orbs ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* تقليل الـ Blur على الموبايل */}
        <div className="absolute top-[-12%] left-[-8%] w-72 h-72 md:w-96 md:h-96 bg-blue-600 rounded-full blur-[70px] md:blur-[150px] opacity-15" />
        <div className="absolute bottom-[-10%] right-[-8%] w-72 h-72 md:w-96 md:h-96 bg-cyan-700 rounded-full blur-[70px] md:blur-[150px] opacity-15" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-indigo-900 rounded-full blur-[80px] md:blur-[180px] opacity-10" />
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
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500" />
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500" />

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
              <div className="relative w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-blue-300 shadow-[0_0_8px_#93c5fd,0_0_20px_#3b82f6]" />
            </motion.div>
          </div>
        ))}
      </div>

      {/* ── Page Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center gap-1 mb-4 md:mb-5 z-10 mt-6 md:mt-0"
      >
        <p className="text-blue-400 text-[10px] md:text-xs font-semibold uppercase tracking-[0.35em]">
          ✦ Our Gallery of Happiness ✦
        </p>
        <h2 className="font-serif italic text-xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400">
          Captured Moments
        </h2>
        <div className="w-12 md:w-16 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mt-1" />
        <p className="text-zinc-600 text-[10px] md:text-xs tracking-widest mt-1">tap a photo to reveal its story</p>
      </motion.div>

      {/* ── 2×2 Photo Grid ── */}
      {/* تصغير الأبعاد والمسافات للموبايل عشان تلم الشاشة من غير سكرول */}
      <div className="grid grid-cols-2 gap-3 md:gap-4 z-10 px-4 w-full max-w-[340px] md:max-w-lg">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.2, type: 'spring', stiffness: 90 }}
            whileHover={{ scale: 1.05, zIndex: 50 }}
            onClick={() => setSelected(photo)}
            className="relative cursor-pointer group"
          >
            <div className="absolute -inset-[2px] md:-inset-[3px] rounded-lg bg-gradient-to-br from-blue-500/0 via-cyan-500/0 to-indigo-500/0 group-hover:from-blue-500/50 group-hover:via-cyan-400/30 group-hover:to-indigo-500/50 blur-sm transition-all duration-500" />

            <div className="relative bg-zinc-900 p-1.5 pb-6 md:p-2 md:pb-8 border border-zinc-700 group-hover:border-blue-500/60 transition-colors duration-400 rounded-lg shadow-2xl shadow-black/60">

              <div className="absolute -top-2 md:-top-3 left-1/2 -translate-x-1/2 w-8 h-4 md:w-12 md:h-6 bg-zinc-700/60 border border-zinc-600/40 group-hover:bg-blue-500/20 group-hover:border-blue-400/30 transition-all duration-400 rounded-sm z-10" />

              {/* ارتفاع الصورة متظبط عشان ميعملش Scroll */}
              <div className="w-full h-28 sm:h-32 md:h-48 overflow-hidden rounded-sm bg-zinc-800 relative">
                <div className="absolute inset-0 z-10 bg-gradient-to-tr from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/10 group-hover:to-cyan-500/10 transition-all duration-500" />
                <img
                  src={photo.url}
                  alt={`Memory ${photo.id}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="absolute bottom-1 md:bottom-2 left-2 right-2 md:left-3 md:right-3 flex items-center justify-center gap-1">
                <div className="h-px flex-1 bg-zinc-700 group-hover:bg-blue-500/40 transition-colors duration-400" />
                <span className="text-zinc-600 group-hover:text-blue-400 text-[10px] md:text-xs transition-colors duration-400">✦</span>
                <div className="h-px flex-1 bg-zinc-700 group-hover:bg-blue-500/40 transition-colors duration-400" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Closing Quote ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="flex flex-col items-center gap-1.5 md:gap-2 mt-4 md:mt-5 z-10"
      >
        <div className="flex items-center gap-3">
          <div className="h-px w-8 md:w-10 bg-gradient-to-r from-transparent to-blue-500/50" />
          <span className="text-blue-500/50 text-[10px] md:text-xs">✦</span>
          <div className="h-px w-8 md:w-10 bg-gradient-to-l from-transparent to-blue-500/50" />
        </div>
        <p className="font-serif italic text-sm md:text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400">
          "One of the best memories we've ever shared..."
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="pt-4 md:pt-6 flex justify-center pb-2"
      >
        <button
          onClick={() => navigate('/vid')}
          className="relative group cursor-pointer inline-flex items-center gap-2 md:gap-3 bg-blue-500 hover:bg-blue-400 text-white px-8 py-3 md:px-10 md:py-4 rounded-full font-semibold text-sm md:text-base tracking-wide transition-all duration-300 shadow-lg shadow-blue-900/50 overflow-hidden"
          style={{ boxShadow: '0 0 0 0 rgba(59,130,246,0.4)' }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 28px rgba(59,130,246,0.45)'}
          onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 0 0 rgba(59,130,246,0.4)'}
        >
          <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
          <span className="relative">See your last surprise</span>
          <span className="relative text-base md:text-lg transition-transform group-hover:translate-x-1 duration-300">→</span>
        </button>
      </motion.div>

{/* ════════════════════════════════
          LIGHTBOX MODAL
          ════════════════════════════════ */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 touch-auto"
          >
            <motion.div
              key="lightbox-card"
              initial={{ opacity: 0, scale: 0.88, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 24 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              onClick={e => e.stopPropagation()}
              // كبرنا العرض هنا لـ max-w-xl أو max-w-2xl عشان ياخد مساحة أكبر
              className="relative w-full max-w-2xl max-h-[95dvh] flex flex-col rounded-2xl overflow-hidden shadow-2xl shadow-black/80"
            >
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-blue-500/40 via-cyan-500/20 to-indigo-500/40 blur-sm" />

              <div className="relative bg-zinc-900 border border-zinc-700/80 rounded-2xl overflow-y-auto custom-scrollbar flex flex-col">
                <div className="w-full h-[3px] bg-gradient-to-r from-cyan-500 via-blue-400 to-indigo-500 shrink-0" />

                {/* كبرنا الارتفاع جداً واستخدمنا vh عشان ياخد نسبة من طول الشاشة */}
                <div className="w-full h-[45vh] sm:h-[55vh] md:h-[65vh] overflow-hidden relative shrink-0 bg-black flex items-center justify-center">
                  <img
                    src={selected.url}
                    alt={`Memory ${selected.id}`}
                    // غيرنا cover لـ contain عشان الصورة تظهر بالكامل من غير قص
                    className="w-full h-full object-contain"
                  />
                  {/* شادو خفيف من تحت عشان يدمج الصورة مع الكلام اللي تحتها */}
                  <div className="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-t from-zinc-900 to-transparent pointer-events-none" />
                </div>

                <div className="px-5 md:px-7 pb-6 md:pb-8 pt-3 md:pt-4 flex-1 flex flex-col items-center bg-zinc-900">
                  <p className="text-blue-400 text-[10px] md:text-sm uppercase tracking-[0.3em] mb-3 md:mb-4 text-center font-semibold">
                    {selected.date}
                  </p>

                  <p className="font-serif italic text-zinc-300 text-sm md:text-base leading-relaxed text-center px-2">
                  </p>

                  <div className="mt-4 md:mt-6 flex justify-center w-full">
                    <button
                      onClick={() => setSelected(null)}
                      className="relative group inline-flex items-center gap-2 px-8 py-2.5 md:px-10 md:py-3 rounded-full bg-zinc-800 hover:bg-blue-500 border border-zinc-700 hover:border-blue-400 text-zinc-400 hover:text-white text-xs md:text-sm font-medium tracking-wide transition-all duration-300 overflow-hidden"
                    >
                      <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                      <span className="relative">Close Memory</span>
                      <span className="relative text-sm md:text-base">✕</span>
                    </button>
                  </div>
                </div>

                <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent shrink-0" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Memories;