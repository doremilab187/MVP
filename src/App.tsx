import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Play, Pause, RotateCcw, Home, Sparkles, Volume2, VolumeX, Lock, Unlock } from 'lucide-react';

import { ScreenState, Totem, MomentDetails } from './types';
import { adventureMoments } from './data';
import MenuScreen from './components/MenuScreen';
import TotemsPopup from './components/TotemsPopup';
import TutorialPopup from './components/TutorialPopup';
import PulseLevelPopup from './components/PulseLevelPopup';
import ReactionLevelPopup from './components/ReactionLevelPopup';
import SuccessMoment from './components/SuccessMoment';

export default function App() {
  // Screens / Global navigation states
  const [activeScreen, setActiveScreen] = useState<ScreenState>('menu');
  const [showTotems, setShowTotems] = useState<boolean>(false);
  const [showTutorial, setShowTutorial] = useState<boolean>(false);

  // Adventure States
  const [currentMomentIdx, setCurrentMomentIdx] = useState<number>(0);
  const [popupActive, setPopupActive] = useState<boolean>(false);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(true); // Holds blocker lock
  const [videoPlay, setVideoPlay] = useState<boolean>(true);
  const [muted, setMuted] = useState<boolean>(true); // Autoplay compatible muted default

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const currentMoment = adventureMoments[currentMomentIdx];

  // Sync Pause/Play of Video based on popup active states
  useEffect(() => {
    if (activeScreen !== 'adventure') return;

    if (videoRef.current) {
      if (videoPlay && !popupActive) {
        videoRef.current.play().catch((err) => {
          console.warn('Video autoplay policy prevent direct playback:', err);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [videoPlay, popupActive, activeScreen, currentMomentIdx]);

  // Handle Starting the Adventure
  const handleStartAdventure = () => {
    setCurrentMomentIdx(0);
    setPopupActive(false);
    setIsUnlocked(true);
    setVideoPlay(true);
    setActiveScreen('adventure');
  };

  // Handle clicking on "Regresar al menú" or exiting
  const handleGoHome = () => {
    setPopupActive(false);
    setActiveScreen('menu');
    setCurrentMomentIdx(0);
  };

  // Handle clicking "Siguiente"
  const handleNext = () => {
    // Cannot advance if locked by a Level Pop-up challenge
    if (!isUnlocked) return;

    const nextIdx = currentMomentIdx + 1;
    if (nextIdx < adventureMoments.length) {
      const nextMoment = adventureMoments[nextIdx];
      
      setCurrentMomentIdx(nextIdx);
      
      // Check if this new moment triggers an auto-pause popup challenge
      if (nextMoment.hasPopup) {
        setPopupActive(true);
        setIsUnlocked(false); // Lock navigation until completed
        setVideoPlay(false);
      } else {
        setPopupActive(false);
        setIsUnlocked(true);
        setVideoPlay(true);
      }
    }
  };

  // Handle clicking "Atrás"
  const handlePrev = () => {
    // Cannot retreat if locked by a active Level Pop-up challenge
    if (!isUnlocked) return;

    if (currentMomentIdx > 0) {
      const prevIdx = currentMomentIdx - 1;
      const prevMoment = adventureMoments[prevIdx];
      
      setCurrentMomentIdx(prevIdx);
      
      // If we jump back to a moment that technically has a popup, let's keep it completed or re-engage based on preference
      // Here, jumping back defaults to unlocked/viewable to avoid frustrated loops
      setPopupActive(false);
      setIsUnlocked(true);
      setVideoPlay(true);
    }
  };

  // Handle Level Popup Challenge Completed (closes pop up and unlocks controls)
  const handleLevelChallengeCompleted = () => {
    setPopupActive(false);
    setIsUnlocked(true);
    setVideoPlay(true);
  };

  return (
    <div className="bg-slate-900 min-h-screen text-slate-800 font-sans selection:bg-orange-200 antialiased overflow-x-hidden">
      
      {/* 1. Main Menu View */}
      {activeScreen === 'menu' && (
        <MenuScreen
          onStartStory={handleStartAdventure}
          onOpenTotems={() => setShowTotems(true)}
          onOpenTutorial={() => setShowTutorial(true)}
        />
      )}

      {/* 2. Interactive Audiovisual Full Screen view */}
      {activeScreen === 'adventure' && currentMomentIdx < adventureMoments.length - 1 && (
        <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden">
          
          {/* Full-Screen background HTML5 loop Video */}
          <div className="absolute inset-0 bg-slate-950 z-0">
            <video
              ref={videoRef}
              key={currentMoment.videoUrl} // Triggers reload when URL shifts
              src={currentMoment.videoUrl}
              autoPlay
              loop
              muted={muted}
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-screen select-none pointer-events-none"
            />
            {/* Visual Backup Animated gradient overlay if video fails or is loading */}
            <div className={`absolute inset-0 bg-gradient-to-tr ${
              currentMomentIdx % 2 === 0 ? 'from-indigo-900/40 to-slate-950/80' : 'from-emerald-950/40 to-slate-950/80'
            } backdrop-blur-xs mix-blend-multiply z-1`} />
          </div>

          {/* Interactive TOP bar: Status indicators, Home, Sound Toggle */}
          <div className="z-10 p-4 md:p-6 flex items-center justify-between w-full bg-linear-to-b from-slate-950/80 to-transparent">
            
            {/* Left corner: Logo and Step count */}
            <div className="flex items-center gap-3">
              <motion.button
                id="adventure-btn-back-menu"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGoHome}
                className="p-3 bg-white/25 hover:bg-white/40 border border-white/20 text-white rounded-2xl flex items-center gap-2 cursor-pointer transition-all font-bold"
              >
                <Home className="w-5 h-5" />
                <span className="text-sm font-black uppercase tracking-wider hidden sm:inline">Menú</span>
              </motion.button>

              <div className="px-3.5 py-1.5 rounded-full bg-[#FF9F43] text-white text-xs font-black tracking-widest font-mono uppercase shadow-md flex items-center gap-1.5 border border-orange-400">
                <span>PARTE {currentMomentIdx + 1} DE {adventureMoments.length - 1}</span>
              </div>
            </div>

            {/* Middle: Title of the current scene */}
            <div className="hidden lg:block text-center max-w-md">
              <span className="text-white font-black text-xl tracking-wide select-none filter drop-shadow-md">
                {currentMoment.title}
              </span>
            </div>

            {/* Right corner: Locks/Controls */}
            <div className="flex items-center gap-2">
              {/* Unlocked status badge */}
              <div className={`px-4 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5 font-mono uppercase shadow-md ${
                isUnlocked 
                  ? 'bg-[#1DD1A1] text-white border border-[#1DD1A1]/30' 
                  : 'bg-[#FF6B6B] text-white border border-[#FF6B6B]/30 animate-pulse'
              }`}>
                {isUnlocked ? (
                  <>
                    <Unlock className="w-4 h-4" />
                    <span className="hidden md:inline">Control Libre</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 animate-bounce" />
                    <span>Bloqueado (Resolver Reto!)</span>
                  </>
                )}
              </div>

              {/* Sound element toggle */}
              <button
                onClick={() => setMuted(!muted)}
                className="p-3 bg-white/25 hover:bg-white/40 border border-white/20 text-white rounded-2xl cursor-pointer transition-all"
                title={muted ? 'Activar sonido del video' : 'Clausurar sonido del video'}
              >
                {muted ? <VolumeX className="w-5 h-5 text-orange-300" /> : <Volume2 className="w-5 h-5 text-emerald-300" />}
              </button>
            </div>

          </div>

          {/* MIDDLE AREA: Animated Narrative Prompt / Captains Guide */}
          <div className="z-10 mx-auto max-w-4xl px-6 py-4 flex flex-col justify-center items-center h-full text-center my-auto">
            
            {/* Narrative cardboard */}
            <motion.div
              key={currentMomentIdx}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-white/95 border-b-[10px] border-r-4 border-l-4 border-t-4 border-[#FF9F43] p-6 md:p-8 rounded-[36px] text-center space-y-4 max-w-2xl shadow-2xl relative text-slate-800"
            >
              {/* Pulsing indicator if unlocked */}
              {isUnlocked && (
                <div className="absolute -top-4.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#1DD1A1] text-white text-[11px] font-black tracking-widest font-mono uppercase animate-pulse rounded-full shadow-md">
                  ¡Sigue la Historia! 🎬
                </div>
              )}

              <h3 className="text-[#FF6B6B] text-2xl md:text-3xl font-black uppercase tracking-wide">
                {currentMoment.title}
              </h3>
              
              <p className="text-slate-700 text-base md:text-lg font-bold leading-relaxed">
                "{currentMoment.caption}"
              </p>

              {/* Manual pause/play trigger overlay */}
              <div className="flex justify-center items-center gap-2 pt-2">
                <button
                  onClick={() => setVideoPlay(!videoPlay)}
                  className="px-4 py-1.5 rounded-xl bg-orange-100 hover:bg-orange-200 text-[#FF9F43] text-xs font-bold font-mono transition-all flex items-center gap-1.5 cursor-pointer border border-orange-200"
                >
                  {videoPlay ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>Simula Pausa</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Simula Play</span>
                    </>
                  )}
                </button>
              </div>

            </motion.div>

          </div>

          {/* BOTTOM NAVIGATION: Giant, translucent buttons */}
          <div className="z-10 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 bg-linear-to-t from-slate-950/95 via-slate-950/70 to-transparent pt-12">
            
            {/* Guide for teachers */}
            <p className="text-slate-300 text-xs font-semibold max-w-sm text-center sm:text-left">
              *Presiona <strong>Siguiente</strong> para avanzar el cuento o lanzar el juego rítmico automático.
            </p>

            {/* Giant Translucent Buttons row */}
            <div className="flex items-center gap-4 w-full sm:w-auto h-24">
              
              {/* Back Button */}
              <motion.button
                id="adventure-btn-prev"
                whileHover={isUnlocked ? { scale: 1.05 } : {}}
                whileTap={isUnlocked ? { scale: 0.95 } : {}}
                onClick={handlePrev}
                disabled={!isUnlocked}
                className={`flex-1 sm:flex-initial h-full px-8 rounded-[24px] flex items-center justify-center gap-2 transition-all select-none border-t-2 border-r-2 border-l-2 text-white ${
                  isUnlocked
                    ? 'bg-[#48DBFB] border-sky-300 border-b-[8px] border-b-[#0ABDE3] active:translate-y-[4px] active:border-b-[4px] cursor-pointer text-2xl font-black'
                    : 'bg-slate-700/40 border-slate-600/30 opacity-30 cursor-not-allowed text-lg font-medium'
                }`}
              >
                <ArrowLeft className="w-7 h-7" />
                <span>⬅️ Atrás</span>
              </motion.button>

              {/* Next Button */}
              <motion.button
                id="adventure-btn-next"
                whileHover={isUnlocked ? { scale: 1.05 } : {}}
                whileTap={isUnlocked ? { scale: 0.95 } : {}}
                onClick={handleNext}
                disabled={!isUnlocked}
                className={`flex-1 sm:flex-initial h-full px-12 rounded-[24px] flex items-center justify-center gap-2 transition-all select-none border-t-2 border-r-2 border-l-2 text-white ${
                  isUnlocked
                    ? 'bg-[#FF6B6B] border-rose-300 border-b-[8px] border-b-[#D63031] active:translate-y-[4px] active:border-b-[4px] cursor-pointer text-2xl font-black shadow-lg shadow-rose-500/20'
                    : 'bg-slate-700/40 border-slate-600/30 opacity-30 cursor-not-allowed text-lg'
                }`}
              >
                <span>Siguiente ➡️</span>
                <ArrowRight className="w-7 h-7" />
              </motion.button>

            </div>

          </div>

          {/* ACTIVE LEVEL POPUP TRIGGERING */}
          <AnimatePresence>
            {popupActive && currentMoment.popupType === 'pulse' && (
              <PulseLevelPopup onComplete={handleLevelChallengeCompleted} />
            )}

            {popupActive && currentMoment.popupType === 'reaction' && (
              <ReactionLevelPopup onComplete={handleLevelChallengeCompleted} />
            )}
          </AnimatePresence>

        </div>
      )}

      {/* 3. Final Success Moment / Celebration screen */}
      {activeScreen === 'adventure' && currentMomentIdx === adventureMoments.length - 1 && (
        <SuccessMoment
          onReplay={handleStartAdventure}
          onGoHome={handleGoHome}
        />
      )}

      {/* 4. MODALS/POPOVERS COEXISTENCE */}
      <AnimatePresence>
        {showTotems && (
          <TotemsPopup onClose={() => setShowTotems(false)} />
        )}

        {showTutorial && (
          <TutorialPopup onClose={() => setShowTutorial(false)} />
        )}
      </AnimatePresence>

    </div>
  );
}
