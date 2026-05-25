import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Sparkles, BookOpen, UserCheck, Music, Disc, Tv, Volume2 } from 'lucide-react';

interface MenuScreenProps {
  onStartStory: () => void;
  onOpenTotems: () => void;
  onOpenTutorial: () => void;
}

export default function MenuScreen({
  onStartStory,
  onOpenTotems,
  onOpenTutorial,
}: MenuScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bouncingLogoRef = useRef<HTMLDivElement>(null);
  
  // Track currently selected/hovered item to show the retro active selector triangle cursor next to it
  const [activeItem, setActiveItem] = useState<number>(0);

  // High performance custom bouncing screensaver (screensaver) logo using direct refs to avoid React re-renders
  useEffect(() => {
    let x = Math.random() * 100 + 40;
    let y = Math.random() * 100 + 40;
    // Speed adjustments
    let dx = 1.2 + Math.random() * 0.4;
    let dy = 0.9 + Math.random() * 0.4;

    let animId: number;
    const neonColors = [
      '#FF6B6B', // Coral Red
      '#48DBFB', // Sky Blue
      '#FF9F43', // Warm Amber
      '#1DD1A1', // Mint Green
      '#FECA57', // Sunflower Yellow
      '#5F27CD', // Electric Purple
      '#FF4757', // Vibrant Crimson
      '#1E90FF', // Dodge Blue
      '#2ED573', // Grass Green
    ];

    const update = () => {
      const container = containerRef.current;
      const logo = bouncingLogoRef.current;
      if (!container || !logo) {
        animId = requestAnimationFrame(update);
        return;
      }

      const cWidth = container.clientWidth;
      const cHeight = container.clientHeight;
      const lWidth = logo.clientWidth;
      const lHeight = logo.clientHeight;

      x += dx;
      y += dy;

      let bounced = false;

      // Handle horizontal boundary collisions
      if (x <= 4) {
        x = 4;
        dx = -dx;
        bounced = true;
      } else if (x >= cWidth - lWidth - 4) {
        x = cWidth - lWidth - 4;
        dx = -dx;
        bounced = true;
      }

      // Handle vertical boundary collisions
      if (y <= 4) {
        y = 4;
        dy = -dy;
        bounced = true;
      } else if (y >= cHeight - lHeight - 4) {
        y = cHeight - lHeight - 4;
        dy = -dy;
        bounced = true;
      }

      // Change background color of bouncing icon pill when it hits boundaries
      if (bounced) {
        const element = logo.querySelector('.bouncing-pill-bg');
        const textElement = logo.querySelector('.bouncing-pill-text');
        if (element) {
          const newColor = neonColors[Math.floor(Math.random() * neonColors.length)];
          (element as HTMLElement).style.backgroundColor = newColor;
          (element as HTMLElement).style.boxShadow = `0 0 20px ${newColor}80`;
        }
        if (textElement) {
          // Shuffle text colors subtly
          (textElement as HTMLElement).style.borderColor = 'white';
        }
      }

      logo.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div 
      className="min-h-screen bg-[#0F0C20] flex flex-col items-center justify-center p-4 md:p-6 select-none overflow-hidden relative"
      style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
    >
      
      {/* RETO/CRT SCANLINE GRID & VINTAGE GLOW */}
      <div className="absolute inset-0 pointer-events-none z-20 opacity-12 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]"></div>
      <div className="absolute inset-0 pointer-events-none z-20 bg-radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.4)_100%)"></div>

      {/* Main CRT Television Outer Display Frame */}
      <div 
        ref={containerRef}
        className="w-full max-w-5xl rounded-[36px] bg-[#12132D] border-x-[16px] border-b-[24px] border-t-[16px] border-[#292B4F] shadow-[0_25px_60px_rgba(0,0,0,0.8)] p-6 md:p-12 relative flex flex-col justify-between overflow-hidden aspect-[4/3] md:aspect-[16/10] min-h-[580px] border-solid"
        style={{
          boxShadow: 'inset 0 0 80px rgba(0,0,0,0.6), 0 20px 40px rgba(0,0,0,0.5)',
        }}
      >
        {/* Subtle Ambient Laser Light Beams in CRT background */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#FF6B6B] to-transparent anim-scanline opacity-40 z-0"></div>

        {/* TRUE BOUNCING DVD SCREENSAVER MINI LOGO (Moves freely inside container) */}
        <div 
          ref={bouncingLogoRef} 
          className="absolute top-0 left-0 z-10 pointer-events-none transition-shadow duration-300 transform-gpu"
          style={{ willChange: 'transform' }}
        >
          <div className="bouncing-pill-bg flex flex-col items-center justify-center px-4 py-2 bg-[#FF6B6B] rounded-full border-2 border-white shadow-lg transition-colors duration-200">
            <div className="bouncing-pill-text flex items-center gap-1">
              <Disc className="w-5 h-5 text-white animate-spin-slow" />
              <span className="text-white text-[10px] md:text-xs font-black tracking-widest font-mono uppercase">
                DO RE MI LAB
              </span>
            </div>
            <span className="text-white/80 text-[7px] font-bold font-mono tracking-wider -mt-0.5 leading-none">
              ★ DVD-VIDEO ★
            </span>
          </div>
        </div>

        {/* Vintage OSD / Top status HUD */}
        <div className="w-full flex items-center justify-between pointer-events-none z-10 border-b border-white/5 pb-4 select-none">
          <div className="flex items-center gap-2 text-[#2ED573] font-mono text-[11px] md:text-xs font-black tracking-widest">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2ED573] animate-pulse"></span>
            <span>● EN REPRODUCCIÓN</span>
          </div>
          <div className="text-slate-400 font-mono text-[11px] md:text-xs font-bold text-right flex items-center gap-1.5 bg-slate-800/40 px-3 py-1 rounded-md border border-slate-700/30">
            <Tv className="w-3.5 h-3.5 text-[#48DBFB]" />
            <span>DISC INPUT: HDMI 1 : 1085p</span>
          </div>
        </div>

        {/* Main Content Layout: Split horizontally inside the 16:10 video screen */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 my-auto z-10 items-center">
          
          {/* Left Column: Huge Elegant Title Card / Soundtrack Preview */}
          <div className="md:col-span-5 flex flex-col text-left space-y-4 md:pr-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 w-fit">
              <Music className="w-4 h-4 text-[#FF6B6B]" />
              <span className="text-[10px] font-black text-[#FF9F43] tracking-widest uppercase font-mono">
                AULA INTERACTIVA • DALCROZE
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-none text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
              DO RE MI<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] via-[#FF9F43] to-[#48DBFB]">
                LABORATORIO
              </span>
            </h1>

            <p className="text-sm font-semibold text-slate-300 leading-relaxed max-w-sm">
              Menú interactivo de selección de clase. Selecciona un menú con los controles o cursor del monitor interactivo.
            </p>

            {/* Simulated DVD track settings */}
            <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400 font-mono uppercase">
              <span className="bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700/50 flex items-center gap-1 text-slate-300">
                <Volume2 className="w-3 h-3 text-[#1DD1A1]" /> AUDIO: ESPAÑOL ESTÉREO
              </span>
              <span className="bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700/50 text-slate-300">
                16:9 ANAMÓRFICO
              </span>
            </div>
          </div>

          {/* Right Column: DVD Interactive Option Stack */}
          <div className="md:col-span-7 flex flex-col gap-3">
            
            {/* OPTION 1: PLAY MOVIE (Story Adventure) */}
            <div 
              onMouseEnter={() => setActiveItem(0)}
              className="relative"
            >
              <button
                id="btn-start-story"
                onClick={onStartStory}
                className={`w-full text-left p-5 md:p-6 rounded-2xl flex items-center justify-between gap-4 border-2 transition-all transition-duration-200 cursor-pointer overflow-hidden ${
                  activeItem === 0 
                  ? 'bg-gradient-to-r from-[#FF6B6B] to-[#FF4757] text-white border-white shadow-[0_0_25px_rgba(255,107,107,0.4)] scale-[1.02]' 
                  : 'bg-[#181938] text-slate-300 border-slate-800/50 hover:bg-[#1C1D3F] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* DVD Selection pointer pointer */}
                  <AnimatePresence mode="wait">
                    {activeItem === 0 && (
                      <motion.div 
                        initial={{ scale: 0, x: -10 }}
                        animate={{ scale: 1, x: 0 }}
                        exit={{ scale: 0 }}
                        className="text-white text-2xl font-bold font-mono shrink-0"
                      >
                        ▶
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-inner shrink-0 ${activeItem === 0 ? 'bg-white text-[#FF6B6B]' : 'bg-[#12132D] text-slate-400'}`}>
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-wide leading-none">
                      INICIAR HISTORIA
                    </h3>
                    <p className={`text-xs mt-1.5 font-semibold ${activeItem === 0 ? 'text-rose-100' : 'text-slate-400'}`}>
                      Aventura rítmica con el Conejo Adaggio 🐇
                    </p>
                  </div>
                </div>
                <Disc className={`w-6 h-6 text-yellow-300 shrink-0 ${activeItem === 0 ? 'animate-spin-slow' : 'opacity-40'}`} />
              </button>
            </div>

            {/* OPTION 2: EXTRAS (Tótems Characters) */}
            <div 
              onMouseEnter={() => setActiveItem(1)}
              className="relative"
            >
              <button
                id="btn-view-totems"
                onClick={onOpenTotems}
                className={`w-full text-left p-4 md:p-5 rounded-2xl flex items-center justify-between gap-4 border-2 transition-all transition-duration-200 cursor-pointer overflow-hidden ${
                  activeItem === 1 
                  ? 'bg-gradient-to-r from-[#48DBFB] to-[#0ABDE3] text-white border-white shadow-[0_0_25px_rgba(72,219,251,0.4)] scale-[1.02]' 
                  : 'bg-[#181938] text-slate-300 border-slate-800/50 hover:bg-[#1C1D3F] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-4">
                  <AnimatePresence mode="wait">
                    {activeItem === 1 && (
                      <motion.div 
                        initial={{ scale: 0, x: -10 }}
                        animate={{ scale: 1, x: 0 }}
                        exit={{ scale: 0 }}
                        className="text-white text-2xl font-bold font-mono shrink-0"
                      >
                        ▶
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shadow-inner shrink-0 ${activeItem === 1 ? 'bg-white text-[#48DBFB]' : 'bg-[#12132D] text-slate-400'}`}>
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-black uppercase tracking-wide leading-none">
                      VER TÓTEMS (EXTRAS)
                    </h3>
                    <p className={`text-xs mt-1 font-semibold ${activeItem === 1 ? 'text-sky-100' : 'text-slate-400'}`}>
                      Personajes interactivos de ritmo y control 🦊🐢
                    </p>
                  </div>
                </div>
                <Disc className={`w-5 h-5 text-sky-200 shrink-0 ${activeItem === 1 ? 'animate-spin-slow' : 'opacity-40'}`} />
              </button>
            </div>

            {/* OPTION 3: SETTINGS (Guía / Manual) */}
            <div 
              onMouseEnter={() => setActiveItem(2)}
              className="relative"
            >
              <button
                id="btn-view-tutorial"
                onClick={onOpenTutorial}
                className={`w-full text-left p-4 md:p-5 rounded-2xl flex items-center justify-between gap-4 border-2 transition-all transition-duration-200 cursor-pointer overflow-hidden ${
                  activeItem === 2 
                  ? 'bg-gradient-to-r from-[#FF9F43] to-[#E67E22] text-white border-white shadow-[0_0_25px_rgba(255,159,67,0.4)] scale-[1.02]' 
                  : 'bg-[#181938] text-slate-300 border-slate-800/50 hover:bg-[#1C1D3F] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-4">
                  <AnimatePresence mode="wait">
                    {activeItem === 2 && (
                      <motion.div 
                        initial={{ scale: 0, x: -10 }}
                        animate={{ scale: 1, x: 0 }}
                        exit={{ scale: 0 }}
                        className="text-white text-2xl font-bold font-mono shrink-0"
                      >
                        ▶
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shadow-inner shrink-0 ${activeItem === 2 ? 'bg-white text-[#FF9F43]' : 'bg-[#12132D] text-slate-400'}`}>
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-black uppercase tracking-wide leading-none">
                      GUÍA DEL PRECEPTOR / PASOS
                    </h3>
                    <p className={`text-xs mt-1 font-semibold ${activeItem === 2 ? 'text-amber-100' : 'text-slate-400'}`}>
                      Soporte en aula en 3 simples pasos 📺
                    </p>
                  </div>
                </div>
                <Disc className={`w-5 h-5 text-amber-200 shrink-0 ${activeItem === 2 ? 'animate-spin-slow' : 'opacity-40'}`} />
              </button>
            </div>

          </div>
        </div>

        {/* DVD Control Ribbon / Footer */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between border-t border-white/5 pt-4 text-slate-500 text-[10px] font-bold font-mono tracking-widest select-none z-10 uppercase mt-auto">
          <div className="flex items-center gap-4">
            <span>© FUNDACIÓN MONTE TABOR</span>
            <span className="hidden md:inline text-slate-700">|</span>
            <span>DOLBY REGISTRADO</span>
          </div>
          <div className="flex gap-4 mt-2 md:mt-0 text-[#FF9F43]">
            <span>[▲/▼] NAVEGAR</span>
            <span>[OK/ENTER] SELECCIONAR</span>
          </div>
        </div>

      </div>

      {/* Decorative Bottom Row Character Totems preview */}
      <div className="w-full max-w-lg flex justify-between px-8 z-10 py-3 mt-4 selection:bg-rose-200 pointer-events-none opacity-80 decoration-none">
        <div className="w-12 h-12 rounded-full bg-[#FF6B6B] border-2 border-slate-700 shadow-md flex items-center justify-center text-xl animate-bounce-slow">🐇</div>
        <div className="w-12 h-12 rounded-full bg-[#1DD1A1] border-2 border-slate-700 shadow-md flex items-center justify-center text-xl">🐢</div>
        <div className="w-12 h-12 rounded-full bg-[#FECA57] border-2 border-slate-700 shadow-md flex items-center justify-center text-xl animate-bounce-slow" style={{ animationDelay: '0.4s' }}>🐦</div>
        <div className="w-12 h-12 rounded-full bg-[#54A0FF] border-2 border-slate-700 shadow-md flex items-center justify-center text-xl">🐻</div>
        <div className="w-12 h-12 rounded-full bg-[#5F27CD] border-2 border-slate-700 shadow-md flex items-center justify-center text-xl animate-bounce-slow" style={{ animationDelay: '0.8s' }}>🦊</div>
      </div>

    </div>
  );
}

