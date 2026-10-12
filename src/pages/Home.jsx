import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();

  return (
    // استخدام fixed و touch-none لمنع السكرول تماماً
    <div className="fixed inset-0 h-[100dvh] w-full flex flex-col items-center justify-center bg-zinc-950 overflow-hidden touch-none">

      {/* ── Ambient Glow Orbs ── */}
      {/* تقليل الـ blur على الموبايل لحل مشكلة التهنيج */}
      <div className="absolute top-[-15%] left-[-5%] w-96 h-96 bg-blue-600 rounded-full blur-[100px] md:blur-[140px] opacity-20 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-80 h-80 bg-cyan-500 rounded-full blur-[90px] md:blur-[120px] opacity-15 pointer-events-none" />
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-indigo-900 rounded-full blur-[100px] md:blur-[160px] opacity-10 pointer-events-none" />

      {/* ── Decorative Grid Overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Top Edge Bar ── */}
      <div className="absolute top-0 left-0 w-full flex items-center gap-0">
        <div className="h-[3px] flex-1 bg-gradient-to-r from-transparent via-blue-500 to-cyan-500" />
        <div className="h-[3px] w-8 bg-blue-400" />
      </div>

      {/* ── Corner Ornaments ── */}
      <div className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-blue-500/60 rounded-tl-sm" />
      <div className="absolute top-6 right-6 w-10 h-10 border-t-2 border-r-2 border-blue-500/60 rounded-tr-sm" />
      <div className="absolute bottom-6 left-6 w-10 h-10 border-b-2 border-l-2 border-blue-500/60 rounded-bl-sm" />
      <div className="absolute bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 border-blue-500/60 rounded-br-sm" />

      {/* ── Floating Particles ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* تقليل العدد لـ 15 للموبايل وإضافة will-change-transform للأداء */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: [0, 0.7, 0],
              y: [0, -(30 + Math.random() * 50)],
              x: [(Math.random() - 0.5) * 20],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 6,
              ease: 'easeOut',
            }}
            className="absolute rounded-full will-change-transform"
            style={{
              top: `${20 + Math.random() * 70}%`,
              left: `${5 + Math.random() * 90}%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              // ألوان متناسقة: أزرق، سماوي، نيلي فاتح
              background: i % 3 === 0 ? '#60a5fa' : i % 3 === 1 ? '#22d3ee' : '#818cf8',
            }}
          />
        ))}
      </div>

      {/* ── Main Content Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center text-center px-6 py-8 md:py-16 mx-4 max-w-lg w-full"
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-16 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mb-6 md:mb-8"
        />

        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.05em' }}
          animate={{ opacity: 1, letterSpacing: '0.3em' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-blue-400 text-[10px] md:text-xs font-semibold uppercase tracking-[0.3em] mb-4 md:mb-5"
        >
          ✦ Something Special Is Waiting ✦
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-serif text-white text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-2 md:mb-3 tracking-tight"
        >
          A Gift
          <br />
          <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400">
          just for You 
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4, type: 'spring' }}
          className="mt-3 mb-4 md:mt-5 md:mb-6 text-2xl md:text-3xl select-none"
        >
          👑
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-2 md:gap-3 mb-5 md:mb-7"
        >
          <div className="h-px w-10 md:w-14 bg-gradient-to-r from-transparent to-zinc-600" />
          <span className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-blue-500" />
          <span className="w-[3px] md:w-1 h-[3px] md:h-1 rounded-full bg-cyan-400 opacity-60" />
          <span className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-blue-500" />
          <div className="h-px w-10 md:w-14 bg-gradient-to-l from-transparent to-zinc-600" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }} 
          className="text-zinc-400 text-xs md:text-sm font-light leading-relaxed max-w-xs mb-8 md:mb-12 italic"
        >
          "Today is a day as beautiful as you are. I've prepared a little digital
          surprise to celebrate your special moment."
        </motion.p>
        
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{
            scale: 1.04,
            // تعديل لون الـ shadow في الهوفر للأزرق
            boxShadow: '0 0 40px rgba(59, 130, 246, 0.45)',
          }}
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate('/BirthdayCake')}
          className="relative group inline-flex cursor-pointer items-center gap-2 md:gap-3 bg-blue-500 hover:bg-blue-400 text-white px-8 md:px-12 py-3 md:py-4 rounded-full font-semibold text-sm md:text-base tracking-wide transition-all duration-300 shadow-lg shadow-blue-500/30 overflow-hidden"
        >
          <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
          <span className="relative">Open Your Surprise</span>
          <span className="relative text-lg">🎁</span>
        </motion.button>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="w-16 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mt-8 md:mt-12"
        />
      </motion.div>

      {/* ── Bottom Edge Bar ── */}
      <div className="absolute bottom-0 left-0 w-full flex items-center">
        <div className="h-[3px] flex-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-transparent" />
        <div className="h-[3px] w-8 bg-blue-400" />
      </div>

      {/* ── Side Roman Numerals ── */}
      <div className="absolute left-5 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 select-none pointer-events-none hidden md:flex">
        <div className="h-20 w-px bg-gradient-to-b from-transparent via-zinc-700 to-transparent" />
        <p className="text-zinc-700 text-xs tracking-[0.3em] font-light" style={{ writingMode: 'vertical-rl' }}>
          BIRTHDAY • CELEBRATION
        </p>
        <div className="h-20 w-px bg-gradient-to-b from-transparent via-zinc-700 to-transparent" />
      </div>

      <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 select-none pointer-events-none hidden md:flex">
        <div className="h-20 w-px bg-gradient-to-b from-transparent via-zinc-700 to-transparent" />
        <p className="text-zinc-700 text-xs tracking-[0.3em] font-light" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          WITH LOVE • FOR YOU
        </p>
        <div className="h-20 w-px bg-gradient-to-b from-transparent via-zinc-700 to-transparent" />
      </div>
    </div>
  );
};

export default Home;