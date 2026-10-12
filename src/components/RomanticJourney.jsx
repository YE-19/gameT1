import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';

// Import existing assets for image/video fallbacks if needed
import photo1 from '../assets/p1.jpg';
import photo2 from '../assets/photo2.jpeg';
import v1 from '../assets/v1.gif';
import v2 from '../assets/v2.gif';
import ve1 from '../assets/ve1.mp4';
import wo from '../assets/wo.png';
import ji from '../assets/ji.png';

/**
 * Romantic Journey Mini-Game Component
 * Warm, Joyful Aesthetic Palette:
 * - Ivory / Cream & Beige (#FAF6F0)
 * - Warm Sunset Amber & Orange (#F97316, #F59E0B)
 * - Deep Espresso & Caramel Mocha (#3D291C, #78350F)
 * - Soft Rose & Peach Accents (#FB7185)
 */

// ── Maze Layout Definition (6x6 Grid, 0 = Walkable Path, 1 = Wall) ──
const MAZE_GRID = [
  [0, 0, 0, 1, 0, 0],
  [1, 1, 0, 1, 0, 1],
  [0, 0, 0, 0, 0, 1],
  [0, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 0],
  [1, 1, 0, 0, 0, 0],
];

const GRID_SIZE = 6;
const START_POS = { r: 0, c: 0 };
const GOAL_POS = { r: 5, c: 5 };

// ── Hidden Stars Coordinates (Percentages for responsive positioning) ──
const HIDDEN_STARS_DATA = [
  { id: 1, top: '22%', left: '12%', hint: 'Top-Left Corner area' },
  { id: 2, top: '78%', right: '14%', hint: 'Bottom-Right Corner area' },
  { id: 3, top: '38%', right: '24%', hint: 'Mid-Right area' },
];

export const RomanticJourney = ({ onComplete }) => {
  const navigate = useNavigate();

  // ── Main State Progression ──
  const [currentStep, setCurrentStep] = useState(1);

  // ── Step 2: Maze Game State ──
  const [playerPos, setPlayerPos] = useState(START_POS);
  const [mazeCompleted, setMazeCompleted] = useState(false);
  const [visitedCells, setVisitedCells] = useState(['0-0']);
  const [blockedCell, setBlockedCell] = useState(null);
  const [isPlayerBlocked, setIsPlayerBlocked] = useState(false);

  // ── Step 3: Quiz State ──
  const [quizError, setQuizError] = useState(false);
  const [wrongAnswerId, setWrongAnswerId] = useState(null);

  // ── Step 4: Character Surprise Modal State ──
  const [showSurpriseModal, setShowSurpriseModal] = useState(false);

  // ── Step 6: Hidden Stars State ──
  const [foundStarIds, setFoundStarIds] = useState([]);
  const [lastFoundStar, setLastFoundStar] = useState(null);

  // Trigger joyful warm celebration confetti
  const triggerConfetti = useCallback((particleCount = 100) => {
    confetti({
      particleCount,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#f97316', '#fb7185', '#fbbf24', '#fef3c7', '#d97706', '#ea580c'],
    });
  }, []);

  // ── Helper to move through steps smoothly ──
  const goToStep = (stepNumber) => {
    setCurrentStep(stepNumber);
  };

  // ── Step 2: Maze Movement Logic with Wall Hit Feedback ──
  const movePlayer = useCallback((dr, dc) => {
    if (mazeCompleted) return;

    setPlayerPos((prev) => {
      const newR = prev.r + dr;
      const newC = prev.c + dc;

      // Check boundaries
      if (newR < 0 || newR >= GRID_SIZE || newC < 0 || newC >= GRID_SIZE) {
        setIsPlayerBlocked(true);
        setTimeout(() => setIsPlayerBlocked(false), 400);
        return prev;
      }

      // Check walls - Trigger red flash on the blocked wall and player
      if (MAZE_GRID[newR][newC] === 1) {
        setBlockedCell({ r: newR, c: newC });
        setIsPlayerBlocked(true);
        setTimeout(() => {
          setBlockedCell(null);
          setIsPlayerBlocked(false);
        }, 450);
        return prev;
      }

      const key = `${newR}-${newC}`;
      setVisitedCells((visited) => (visited.includes(key) ? visited : [...visited, key]));

      // Check win condition
      if (newR === GOAL_POS.r && newC === GOAL_POS.c) {
        setMazeCompleted(true);
        triggerConfetti(60);
        setTimeout(() => {
          goToStep(3);
        }, 1200);
      }

      return { r: newR, c: newC };
    });
  }, [mazeCompleted, triggerConfetti]);

  // Keyboard navigation for maze
  useEffect(() => {
    if (currentStep !== 2) return;

    const handleKeyDown = (e) => {
      if (['ArrowUp', 'KeyW'].includes(e.code)) {
        e.preventDefault();
        movePlayer(-1, 0);
      } else if (['ArrowDown', 'KeyS'].includes(e.code)) {
        e.preventDefault();
        movePlayer(1, 0);
      } else if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        e.preventDefault();
        movePlayer(0, -1);
      } else if (['ArrowRight', 'KeyD'].includes(e.code)) {
        e.preventDefault();
        movePlayer(0, 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, movePlayer]);

  // ── Step 3: Quiz Selection Logic ──
  const handleQuizChoice = (choiceId, isCorrect) => {
    if (isCorrect) {
      setQuizError(false);
      setWrongAnswerId(null);
      triggerConfetti(40);
      setTimeout(() => {
        goToStep(4);
      }, 400);
    } else {
      setWrongAnswerId(choiceId);
      setQuizError(true);
      // Auto-clear shake after animation
      setTimeout(() => {
        setWrongAnswerId(null);
      }, 600);
    }
  };

  // ── Step 6: Star Click Logic ──
  const handleStarClick = (starId) => {
    if (foundStarIds.includes(starId)) return;

    const updated = [...foundStarIds, starId];
    setFoundStarIds(updated);
    setLastFoundStar(starId);

    // Mini sparkle
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.5 },
      colors: ['#f59e0b', '#fbbf24', '#f97316', '#fb7185'],
    });

    if (updated.length === 3) {
      triggerConfetti(120);
      setTimeout(() => {
        goToStep(7);
      }, 1000);
    }
  };

  // ── Step 7: Ending Confetti Burst (Single celebratory burst) ──
  useEffect(() => {
    if (currentStep === 7) {
      triggerConfetti(150);
    }
  }, [currentStep, triggerConfetti]);

  // Restart Journey
  const handleRestart = () => {
    setPlayerPos(START_POS);
    setMazeCompleted(false);
    setVisitedCells(['0-0']);
    setQuizError(false);
    setWrongAnswerId(null);
    setShowSurpriseModal(false);
    setFoundStarIds([]);
    setLastFoundStar(null);
    setCurrentStep(1);
  };

  return (
    <div
      className="fixed inset-0 h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden select-none font-sans text-stone-800"
      style={{
        background:
          'radial-gradient(circle at 12% 12%, rgba(253, 230, 138, 0.45) 0%, transparent 45%), radial-gradient(circle at 88% 88%, rgba(254, 215, 170, 0.45) 0%, transparent 45%), radial-gradient(circle at 85% 15%, rgba(254, 205, 211, 0.35) 0%, transparent 40%), radial-gradient(circle at 50% 50%, rgba(254, 243, 199, 0.35) 0%, transparent 55%), #FAF6F0',
      }}
    >

      {/* ── Soft Romantic Dotted Stardust Pattern ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.22]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1.5px 1.5px, rgba(180, 83, 9, 0.35) 1.5px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* ── Top & Bottom Glowing Sunset Edge Bars ── */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 z-30 shadow-[0_2px_10px_rgba(249,115,22,0.3)]" />
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-rose-400 via-orange-400 to-amber-400 z-30 shadow-[0_-2px_10px_rgba(249,115,22,0.3)]" />

      {/* ── Elegant Corner Accents ── */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 w-8 h-8 md:w-10 md:h-10 border-t-2 border-l-2 border-amber-500/40 rounded-tl-lg pointer-events-none z-20" />
      <div className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 md:w-10 md:h-10 border-t-2 border-r-2 border-amber-500/40 rounded-tr-lg pointer-events-none z-20" />
      <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 w-8 h-8 md:w-10 md:h-10 border-b-2 border-l-2 border-amber-500/40 rounded-bl-lg pointer-events-none z-20" />
      <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-8 h-8 md:w-10 md:h-10 border-b-2 border-r-2 border-amber-500/40 rounded-br-lg pointer-events-none z-20" />

      {/* ── Ultra-Lightweight GPU Floating Romantic Hearts & Sparkles ── */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {[
          { left: '10%', delay: 0, duration: 8, emoji: '💖', size: 'text-sm' },
          { left: '25%', delay: 2.5, duration: 9, emoji: '✨', size: 'text-xs' },
          { left: '75%', delay: 1.2, duration: 8.5, emoji: '💕', size: 'text-sm' },
          { left: '90%', delay: 3.5, duration: 9.5, emoji: '✨', size: 'text-xs' },
        ].map((item, i) => (
          <motion.div
            key={`floating-heart-${i}`}
            initial={{ y: '105vh', opacity: 0 }}
            animate={{
              y: '-10vh',
              opacity: [0, 0.7, 0.7, 0],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              delay: item.delay,
              ease: 'linear',
            }}
            className={`absolute ${item.size} select-none will-change-transform`}
            style={{ left: item.left }}
          >
            {item.emoji}
          </motion.div>
        ))}
      </div>

      {/* ── Top Progress Dots ── */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 md:gap-2 px-4 py-1.5 rounded-full bg-white/85 border border-amber-200/80 backdrop-blur-md shadow-sm">
        {[1, 2, 3, 4, 5, 6, 7].map((stepNum) => (
          <div
            key={`step-dot-${stepNum}`}
            className={`transition-all duration-300 rounded-full ${
              currentStep === stepNum
                ? 'w-6 h-2 bg-gradient-to-r from-amber-500 to-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]'
                : currentStep > stepNum
                ? 'w-2 h-2 bg-amber-500/80'
                : 'w-2 h-2 bg-amber-200/70'
            }`}
          />
        ))}
      </div>

      {/* ── Main Container for Phase Transitions ── */}
      <div className="relative z-20 w-full max-w-xl px-4 flex flex-col items-center justify-center min-h-[480px]">
        <AnimatePresence mode="wait">

          {/* ═════════════════════════════════════════════════════════
              STEP 1: THE INTRO
              ═════════════════════════════════════════════════════════ */}
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -20 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex flex-col items-center text-center max-w-md w-full"
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="w-16 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent mb-6"
              />

              <motion.span
                initial={{ opacity: 0, letterSpacing: '0.1em' }}
                animate={{ opacity: 1, letterSpacing: '0.3em' }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-amber-800 text-xs font-bold uppercase tracking-[0.3em] mb-3"
              >
                ✦ A LITTLE ADVENTURE AWAITS ✦
              </motion.span>

              {/* Heading: "For Ayah ⭑⭑" */}
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="font-serif text-4xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#2C1D11] via-[#78350F] to-[#C2410C] font-bold mb-3 tracking-tight"
              >
                For Ayah ⭑⭑
              </motion.h1>

              {/* Subheading: "Hi Ayah, myy babyyy<3" */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-[#78350F] text-lg sm:text-xl font-medium italic mb-8"
              >
                Hi Ayah, myy babyyy&lt;3 💖🦇
              </motion.p>

              {/* Cute Floating Badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                className="text-3xl mb-8 select-none"
              >
                🎁✨
              </motion.div>

              {/* Required Button: "DON’T CLICK" with playful bounce / pulse */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  opacity: { delay: 0.5, duration: 0.4 },
                  scale: { repeat: Infinity, duration: 1.8, ease: 'easeInOut' },
                }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: '0 0 35px rgba(249, 115, 22, 0.45)',
                  rotate: [0, -2, 2, 0],
                }}
                whileTap={{ scale: 0.92 }}
                onClick={() => goToStep(2)}
                className="relative group cursor-pointer inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500 hover:from-orange-600 hover:to-rose-600 text-white px-9 py-4 rounded-full font-bold text-base md:text-lg tracking-wider transition-all duration-300 shadow-xl shadow-orange-500/25 overflow-hidden"
              >
                {/* Shimmer line */}
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
                <span className="relative">DON’T CLICK</span>
                <span className="relative text-xl group-hover:scale-125 transition-transform">⚠️</span>
              </motion.button>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.8 }}
                className="mt-6 text-stone-500 text-xs italic"
              >
                (You know you want to click it anyway 😉)
              </motion.div>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="w-16 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent mt-8"
              />
            </motion.div>
          )}

          {/* ═════════════════════════════════════════════════════════
              STEP 2: THE MAZE (MINI-GAME)
              ═════════════════════════════════════════════════════════ */}
          {currentStep === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center w-full max-w-md"
            >
              {/* Header */}
              <div className="flex flex-col items-center text-center mb-3">
                <span className="text-amber-800 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]">
                  ✦ MINI MISSION ✦
                </span>
                <h2 className="font-serif italic text-2xl md:text-3xl font-bold flex items-center justify-center gap-2">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2C1D11] via-[#78350F] to-[#C2410C]">
                    Guide the Teddy to the Heart!
                  </span>
                  <span className="not-italic select-none">🧸💖</span>
                </h2>
                <p className="text-stone-600 text-xs mt-1">
                  Use arrow keys or tap the buttons below
                </p>
              </div>

              {/* Maze Board */}
              <div className="relative p-3 bg-white/95 border-2 border-amber-200/90 rounded-3xl shadow-xl shadow-amber-900/10 backdrop-blur-md">
                <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
                  {MAZE_GRID.map((row, rIdx) =>
                    row.map((cell, cIdx) => {
                      const isPlayer = playerPos.r === rIdx && playerPos.c === cIdx;
                      const isGoal = GOAL_POS.r === rIdx && GOAL_POS.c === cIdx;
                      const isWall = cell === 1;
                      const isVisited = visitedCells.includes(`${rIdx}-${cIdx}`);
                      const isBlockedWall = isWall && blockedCell && blockedCell.r === rIdx && blockedCell.c === cIdx;

                      return (
                        <div
                          key={`cell-${rIdx}-${cIdx}`}
                          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center relative transition-all duration-200 ${
                            isBlockedWall
                              ? 'bg-rose-500/40 border-2 border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.7)] scale-105 z-20'
                              : isWall
                              ? 'bg-[#3D291C] border border-[#2B1B10] shadow-inner'
                              : isPlayer
                              ? isPlayerBlocked
                                ? 'bg-rose-500/30 border-2 border-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.5)]'
                                : 'bg-orange-500/20 border-2 border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.4)]'
                              : isGoal
                              ? 'bg-rose-100/80 border border-rose-300'
                              : isVisited
                              ? 'bg-amber-50/90 border border-amber-200/60'
                              : 'bg-[#FDFBF7] border border-amber-100/80'
                          }`}
                        >
                          {/* Wall Texture or Red Blocked Indicator */}
                          {isWall && (
                            isBlockedWall ? (
                              <span className="text-rose-400 text-xs font-bold select-none pointer-events-none">✕</span>
                            ) : (
                              <div className="w-2.5 h-2.5 rounded-sm bg-amber-900/40 border border-amber-800/40 pointer-events-none" />
                            )
                          )}

                          {/* Trail Footprints */}
                          {!isWall && isVisited && !isPlayer && !isGoal && (
                            <span className="text-amber-500/50 text-[10px] select-none pointer-events-none">✦</span>
                          )}

                          {/* Player Character */}
                          {isPlayer && (
                            <motion.div
                              layoutId="player-avatar"
                              initial={{ scale: 0.85 }}
                              animate={
                                isPlayerBlocked
                                  ? { x: [-3, 3, -2, 2, 0], scale: [1, 0.92, 1] }
                                  : { scale: 1, x: 0 }
                              }
                              transition={{ duration: 0.3 }}
                              className="text-2xl sm:text-3xl select-none z-10 filter drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]"
                            >
                              🧸
                            </motion.div>
                          )}

                          {/* Goal Star / Heart */}
                          {isGoal && !isPlayer && (
                            <motion.div
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                              className="text-2xl sm:text-3xl select-none text-pink-500 filter drop-shadow-[0_0_8px_rgba(244,114,182,0.6)]"
                            >
                              💖
                            </motion.div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Victory Banner Overlay */}
                <AnimatePresence>
                  {mazeCompleted && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-[#FAF6F0]/95 rounded-3xl flex flex-col items-center justify-center p-4 z-30 backdrop-blur-sm border-2 border-amber-300"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="text-4xl mb-2"
                      >
                        🎉💖✨
                      </motion.div>
                      <h3 className="font-serif italic text-xl text-[#78350F] font-bold">
                        You Made It!
                      </h3>
                      <p className="text-stone-600 text-xs mt-1">
                        Unlocking next step...
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* On-Screen D-Pad / Directional Controls */}
              <div className="flex flex-col items-center gap-1.5 mt-4">
                <button
                  onClick={() => movePlayer(-1, 0)}
                  disabled={mazeCompleted}
                  className="w-12 h-11 rounded-xl bg-[#3D291C] hover:bg-orange-600 active:bg-orange-700 border border-[#2B1B10] active:scale-95 text-amber-50 hover:text-white flex items-center justify-center shadow-md transition-all duration-150 disabled:opacity-50 cursor-pointer"
                  aria-label="Move Up"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                  </svg>
                </button>
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => movePlayer(0, -1)}
                    disabled={mazeCompleted}
                    className="w-12 h-11 rounded-xl bg-[#3D291C] hover:bg-orange-600 active:bg-orange-700 border border-[#2B1B10] active:scale-95 text-amber-50 hover:text-white flex items-center justify-center shadow-md transition-all duration-150 disabled:opacity-50 cursor-pointer"
                    aria-label="Move Left"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </button>
                  <button
                    onClick={() => movePlayer(1, 0)}
                    disabled={mazeCompleted}
                    className="w-12 h-11 rounded-xl bg-[#3D291C] hover:bg-orange-600 active:bg-orange-700 border border-[#2B1B10] active:scale-95 text-amber-50 hover:text-white flex items-center justify-center shadow-md transition-all duration-150 disabled:opacity-50 cursor-pointer"
                    aria-label="Move Down"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                  <button
                    onClick={() => movePlayer(0, 1)}
                    disabled={mazeCompleted}
                    className="w-12 h-11 rounded-xl bg-[#3D291C] hover:bg-orange-600 active:bg-orange-700 border border-[#2B1B10] active:scale-95 text-amber-50 hover:text-white flex items-center justify-center shadow-md transition-all duration-150 disabled:opacity-50 cursor-pointer"
                    aria-label="Move Right"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ═════════════════════════════════════════════════════════
              STEP 3: THE CHALLENGE (QUIZ)
              ═════════════════════════════════════════════════════════ */}
          {currentStep === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center max-w-md w-full"
            >
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent mb-4" />

              <span className="text-amber-800 text-xs font-bold uppercase tracking-[0.3em] mb-2">
                ✦ QUESTION TIME ✦
              </span>

              {/* Required Question */}
              <h2 className="font-serif italic text-2xl sm:text-3xl md:text-4xl font-bold mb-6 flex items-center justify-center gap-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2C1D11] via-[#78350F] to-[#C2410C]">
                  Which one do you think I chose for you?
                </span>
                <span className="not-italic select-none">🤔</span>
              </h2>

              {/* Choice Buttons */}
              <div className="flex flex-col gap-3.5 w-full max-w-sm">
                {[
                  { id: 'opt1', label: '1) A secret message 💌', correct: false },
                  { id: 'opt2', label: '2) A surprise 🎁', correct: true },
                  { id: 'opt3', label: '3) Something very weird 🤪', correct: false },
                ].map((choice) => {
                  const isWrong = wrongAnswerId === choice.id;

                  return (
                    <motion.button
                      key={choice.id}
                      animate={
                        isWrong
                          ? {
                              x: [-8, 8, -6, 6, -3, 3, 0],
                              borderColor: '#f43f5e',
                            }
                          : {}
                      }
                      transition={{ duration: 0.5 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleQuizChoice(choice.id, choice.correct)}
                      className={`relative group cursor-pointer w-full py-4 px-6 rounded-2xl border text-left font-semibold text-sm sm:text-base transition-all duration-300 overflow-hidden shadow-md ${
                        isWrong
                          ? 'bg-rose-50 border-rose-400 text-rose-800 shadow-rose-900/10'
                          : 'bg-white/95 hover:bg-amber-50/90 border-amber-200/90 hover:border-orange-400 text-[#3A281A] hover:text-[#2C1D11] shadow-amber-900/5'
                      }`}
                    >
                      <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-amber-200/30 to-transparent skew-x-12" />
                      <div className="relative flex items-center justify-between">
                        <span>{choice.label}</span>
                        <span className="text-amber-500 group-hover:text-orange-600 transition-colors">
                          ➔
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Required Error Message with Shake Feedback */}
              <div className="h-10 mt-4 flex items-center justify-center">
                <AnimatePresence>
                  {quizError && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-rose-600 font-bold text-sm flex items-center gap-1.5"
                    >
                      <span>⚠️</span> Really? Try again. 😜
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="w-12 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent mt-2" />
            </motion.div>
          )}

          {/* ═════════════════════════════════════════════════════════
              STEP 4: IMAGE & CHARACTER SURPRISE
              ═════════════════════════════════════════════════════════ */}
          {currentStep === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center max-w-md w-full"
            >
              {/* Image Frame Card - Display full photo without cropping */}
              <div className="relative group p-2.5 bg-white border-2 border-amber-200/90 rounded-3xl shadow-xl shadow-amber-900/10 max-w-[300px] sm:max-w-[360px] md:max-w-[390px] w-full">
                <div className="w-full max-h-[46vh] sm:max-h-[50vh] rounded-2xl overflow-hidden bg-amber-50/50 relative flex items-center justify-center">
                  {/* Required <img> element with full view */}
                  <img
                    src={photo1 || photo2}
                    alt="Romantic couple moment"
                    className="w-full max-h-[46vh] sm:max-h-[50vh] object-contain rounded-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              </div>

              {/* Required Text Under Image with proper emoji separation */}
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-serif italic text-2xl sm:text-3xl font-bold mt-4 mb-2 flex items-center justify-center gap-2"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2C1D11] via-[#78350F] to-[#C2410C]">
                  Aww i miss youu &lt;3
                </span>
                <span className="not-italic text-2xl select-none">🥺💖</span>
              </motion.h3>

              <p className="text-stone-600 text-xs mb-6">
                There’s another special guest waiting to say hello...
              </p>

              {/* "Surprise" Button */}
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(249, 115, 22, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSurpriseModal(true)}
                className="relative group cursor-pointer inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-3.5 rounded-full font-bold text-base shadow-xl shadow-orange-500/25 overflow-hidden"
              >
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                <span className="relative">Surprise</span>
                <span className="relative text-lg">🦇🐾</span>
              </motion.button>

              {/* Pop-up / Slide-in Character Surprise Modal (Batman & Catwoman) */}
              <AnimatePresence>
                {showSurpriseModal && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4"
                  >
                    <motion.div
                      initial={{ scale: 0.5, y: 50, opacity: 0 }}
                      animate={{ scale: 1, y: 0, opacity: 1 }}
                      exit={{ scale: 0.7, y: 40, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 180, damping: 18 }}
                      className="relative bg-[#FFFDF9] border-2 border-amber-300 rounded-3xl p-6 md:p-8 max-w-sm w-full text-center shadow-2xl shadow-amber-900/20 flex flex-col items-center"
                    >
                      {/* Ambient Glow */}
                      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-stone-400/20 via-amber-400/20 to-rose-400/20 blur-md -z-10" />

                      {/* Animated Character Graphic */}
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                        className="flex items-center justify-center gap-2 mb-3 filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.15)]"
                      >
                        <motion.img
                          src={wo}
                          alt="Batman & Catwoman"
                          animate={{ rotate: [-8, -2, -8] }}
                          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                          className="w-20 h-24 sm:w-24 sm:h-28 object-contain select-none"
                        />
                        <span className="text-2xl text-rose-500">🖤</span>
                        <motion.img
                          src={ji}
                          alt="Batman & Cat"
                          animate={{ rotate: [8, 2, 8] }}
                          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut', delay: 0.2 }}
                          className="w-16 h-20 sm:w-20 sm:h-24 object-contain select-none"
                        />
                      </motion.div>

                      <div className="w-10 h-px bg-amber-400 mb-3" />

                      <h4 className="font-serif italic text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#2C1D11] via-[#78350F] to-[#C2410C] font-bold mb-2">
                        My Partner in Crime! 🦇🖤
                      </h4>

                      <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-3.5 mb-5 text-sm text-stone-700 leading-relaxed font-medium">
                        "You stole my heart, Ayah... Even in Gotham's darkest night, you're my brightest star. The Batman to your Catwoman, forever & always! 🦇🐾🖤"
                      </div>

                      {/* Acknowledgement Button to Move to Step 5 */}
                      <button
                        onClick={() => {
                          setShowSurpriseModal(false);
                          goToStep(5);
                        }}
                        className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm tracking-wide shadow-lg shadow-orange-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                      >
                        Aww Continue 🥰 ➔
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ═════════════════════════════════════════════════════════
              STEP 5: THE VIDEO
              ═════════════════════════════════════════════════════════ */}
          {currentStep === 5 && (
            <motion.div
              key="step-5"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center max-w-lg w-full"
            >
              {/* Required Text Above Video */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-4"
              >
                <h2 className="font-serif italic text-3xl sm:text-4xl font-bold mb-1 flex items-center justify-center gap-2">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2C1D11] via-[#78350F] to-[#C2410C]">
                    Literally us.
                  </span>
                  <span className="not-italic select-none">🎬🦇</span>
                </h2>
                <p className="text-amber-900 text-xs sm:text-sm font-bold tracking-wide">
                  you're the catwoman to my batman. 🦇🖤🐾
                </p>
              </motion.div>

              {/* Video Wrapper with tilted characters wo (left) and ji (right) */}
              <div className="relative flex items-center justify-center w-full max-w-[340px] sm:max-w-[400px] md:max-w-[440px] mb-5">
                {/* Left Character: Batman & Catwoman (wo.png) - Tilted at Top Left */}
                <motion.div
                  initial={{ opacity: 0, y: -20, rotate: -20 }}
                  animate={{
                    opacity: 1,
                    y: [0, -6, 0],
                    rotate: [-15, -8, -15],
                  }}
                  transition={{
                    opacity: { duration: 0.6 },
                    y: { repeat: Infinity, duration: 2.6, ease: 'easeInOut' },
                    rotate: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
                  }}
                  className="absolute -left-6 sm:-left-12 md:-left-14 -top-8 sm:-top-12 md:-top-14 z-20 w-20 sm:w-24 md:w-28 pointer-events-none filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)]"
                >
                  <img
                    src={wo}
                    alt="Batman & Catwoman"
                    className="w-full h-auto object-contain select-none"
                  />
                </motion.div>

                {/* Video Element Container */}
                <div className="relative group p-2.5 bg-white border-2 border-amber-200/90 rounded-3xl shadow-xl shadow-amber-900/10 w-full z-10">
                  <div className="w-full max-h-[46vh] sm:max-h-[50vh] rounded-2xl overflow-hidden bg-black relative flex items-center justify-center">
                    <video
                      src={ve1}
                      controls
                      playsInline
                      autoPlay
                      loop
                      muted
                      poster={photo2 || photo1}
                      className="w-full max-h-[46vh] sm:max-h-[50vh] object-contain"
                    >
                      <source src={ve1} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    {/* Subtle decorative glow line */}
                    <div className="absolute inset-0 border border-amber-400/20 rounded-2xl pointer-events-none" />
                  </div>
                </div>

                {/* Right Character: Batman & Cat (ji.png) - Tilted at Top Right */}
                <motion.div
                  initial={{ opacity: 0, y: -20, rotate: 20 }}
                  animate={{
                    opacity: 1,
                    y: [0, -6, 0],
                    rotate: [15, 8, 15],
                  }}
                  transition={{
                    opacity: { duration: 0.6 },
                    y: { repeat: Infinity, duration: 2.8, ease: 'easeInOut', delay: 0.2 },
                    rotate: { repeat: Infinity, duration: 3.2, ease: 'easeInOut' },
                  }}
                  className="absolute -right-6 sm:-right-12 md:-right-14 -top-8 sm:-top-12 md:-top-14 z-20 w-20 sm:w-24 md:w-28 pointer-events-none filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)]"
                >
                  <img
                    src={ji}
                    alt="Batman & Cat"
                    className="w-full h-auto object-contain select-none"
                  />
                </motion.div>
              </div>

              {/* Required Interaction Button Below Video: "WAIT…." */}
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(249, 115, 22, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => goToStep(6)}
                className="relative group cursor-pointer inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:to-orange-600 text-white px-9 py-3.5 rounded-full font-bold text-base tracking-wide shadow-xl shadow-orange-500/25 overflow-hidden"
              >
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                <span className="relative">WAIT….</span>
                <span className="relative text-lg">⏳✨</span>
              </motion.button>
            </motion.div>
          )}

          {/* ═════════════════════════════════════════════════════════
              STEP 6: HIDDEN STARS (FINAL TASK)
              ═════════════════════════════════════════════════════════ */}
          {currentStep === 6 && (
            <motion.div
              key="step-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="relative w-full h-[380px] sm:h-[420px] flex flex-col items-center justify-between"
            >
              {/* Header / Instructions */}
              <div className="text-center z-20">
                <span className="text-amber-800 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]">
                  ✦ FINAL CHALLENGE ✦
                </span>
                {/* Required Text */}
                <h2 className="font-serif italic text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#2C1D11] via-[#78350F] to-[#C2410C] font-bold mt-1">
                  Find the 3 hidden stars to finish! 🔍✨
                </h2>
                {/* Required Counter: 0/3 */}
                <div className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border-2 border-amber-300 shadow-md">
                  <span className="text-amber-900 text-sm font-bold tracking-wider">
                    Stars Found: {foundStarIds.length}/3
                  </span>
                  <div className="flex gap-1 text-base">
                    {[1, 2, 3].map((num) => (
                      <span
                        key={`hud-star-${num}`}
                        className={`transition-all duration-300 ${
                          foundStarIds.length >= num
                            ? 'text-amber-500 scale-110 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]'
                            : 'text-stone-300 scale-90'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3 Subtly Hidden Stars positioned at coordinates across the screen */}
              {HIDDEN_STARS_DATA.map((star) => {
                const isFound = foundStarIds.includes(star.id);

                return (
                  <motion.button
                    key={`hidden-star-${star.id}`}
                    onClick={() => handleStarClick(star.id)}
                    style={{
                      position: 'absolute',
                      top: star.top,
                      left: star.left,
                      right: star.right,
                    }}
                    initial={{ scale: 0.8 }}
                    animate={{
                      opacity: isFound ? 1 : [0.35, 0.65, 0.35],
                      scale: isFound ? [1, 1.25, 1] : [0.95, 1.05, 0.95],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.5 + star.id * 0.4,
                      ease: 'easeInOut',
                    }}
                    whileHover={{
                      opacity: 1,
                      scale: 1.4,
                      filter: 'drop-shadow(0 0 12px rgba(245, 158, 11, 0.9))',
                    }}
                    className={`cursor-pointer z-30 p-2 rounded-full transition-all duration-300 ${
                      isFound
                        ? 'text-amber-500 text-3xl pointer-events-none drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]'
                        : 'text-amber-600/50 hover:text-amber-600 text-2xl'
                    }`}
                    aria-label={`Hidden Star ${star.id}`}
                  >
                    ★
                  </motion.button>
                );
              })}

              <div className="text-stone-500 text-xs italic z-10 text-center font-medium">
                (Look closely around the soft corners and warm spots ✨)
              </div>
            </motion.div>
          )}

          {/* ═════════════════════════════════════════════════════════
              STEP 7: THE ENDING
              ═════════════════════════════════════════════════════════ */}
          {currentStep === 7 && (
            <motion.div
              key="step-7"
              initial={{ opacity: 0, scale: 0.75, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="flex flex-col items-center text-center max-w-md w-full"
            >
              {/* Glowing Crown / Heart Accent */}
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                className="text-5xl sm:text-6xl mb-5 filter drop-shadow-[0_4px_15px_rgba(249,115,22,0.4)]"
              >
                👑💖✨
              </motion.div>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="w-20 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent mb-5"
              />

              {/* Required Text with soft fade-in and scale-up animation */}
              <motion.h2
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-serif italic text-3xl sm:text-4xl md:text-5xl font-bold leading-snug mb-4 flex items-center justify-center gap-2 flex-wrap"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2C1D11] via-[#78350F] to-[#C2410C]">
                  okay NOW we’re done Ayah honeyy &lt;3
                </span>
                <span className="not-italic select-none">👑💖🦇</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-[#78350F] text-sm sm:text-base font-medium max-w-xs leading-relaxed mb-8 italic"
              >
                "Thank you for completing this journey with me, Ayah. You make every ordinary day feel magical."
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap items-center justify-center gap-3.5"
              >
                <button
                  onClick={handleRestart}
                  className="cursor-pointer px-7 py-3 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 flex items-center gap-2 shadow-lg shadow-orange-500/25"
                >
                  <span>Start Over</span>
                  <span>🔄</span>
                </button>
              </motion.div>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.9 }}
                className="w-20 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent mt-8"
              />
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
};

export default RomanticJourney;
