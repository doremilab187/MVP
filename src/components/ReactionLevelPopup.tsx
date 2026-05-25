import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Sparkles, AlertCircle, Play, Pause, RefreshCw } from 'lucide-react';

interface ReactionLevelPopupProps {
  onComplete: () => void;
}

type LightState = 'blue' | 'green';

export default function ReactionLevelPopup({ onComplete }: ReactionLevelPopupProps) {
  const [light, setLight] = useState<LightState>('blue');
  const [autoMode, setAutoMode] = useState<boolean>(true);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Play chimes based on color: High pitch double chime for blue, deep alarming buzz for green
  const playStateChime = (targetState: LightState) => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      if (targetState === 'blue') {
        // High fast double-beep (encouraging motion)
        const t = ctx.currentTime;
        const o1 = ctx.createOscillator();
        const g1 = ctx.createGain();
        o1.frequency.setValueAtTime(660, t);
        g1.gain.setValueAtTime(0.2, t);
        g1.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
        o1.connect(g1);
        g1.connect(ctx.destination);
        o1.start(t);
        o1.stop(t + 0.1);

        const o2 = ctx.createOscillator();
        const g2 = ctx.createGain();
        o2.frequency.setValueAtTime(880, t + 0.12);
        g2.gain.setValueAtTime(0.2, t + 0.12);
        g2.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
        o2.connect(g2);
        g2.connect(ctx.destination);
        o2.start(t + 0.12);
        o2.stop(t + 0.22);
      } else {
        // Low continuous buzz (demanding action cut-off)
        const t = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth'; // Slightly buzzy tone for noticeability
        osc.frequency.setValueAtTime(220, t);
        osc.frequency.linearRampToValueAtTime(140, t + 0.35); // descend frequency
        gain.gain.setValueAtTime(0.25, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.4);
      }
    } catch (e) {
      console.error('Audio chimes failed:', e);
    }
  };

  // Change state helper to include sound
  const changeLight = (targetState: LightState) => {
    setLight(targetState);
    playStateChime(targetState);
  };

  // Auto changing simulation effect (between 3 to 6 seconds)
  useEffect(() => {
    if (!autoMode) return;

    let timeoutId: number;

    const runCycle = () => {
      const nextDelay = Math.floor(Math.random() * 3000) + 3000; // 3 to 6 seconds dynamic
      timeoutId = window.setTimeout(() => {
        const nextLight = light === 'blue' ? 'green' : 'blue';
        changeLight(nextLight);
        runCycle();
      }, nextDelay);
    };

    runCycle();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [light, autoMode]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark blur overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-slate-900/90 backdrop-blur-[6px]"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-white w-full max-w-2xl rounded-[32px] shadow-2xl border-b-[12px] border-r-[4px] border-l-[4px] border-t-[4px] border-[#48DBFB] overflow-hidden z-10 p-6 md:p-8 flex flex-col items-center justify-between"
      >
        <div className="w-full text-center">
          <span className="text-xs font-black text-[#5F27CD] bg-[#5F27CD]/10 px-4 py-1.5 rounded-full font-mono tracking-widest uppercase shadow-xs">
            🗿 RETO DE REACCIÓN • NIVEL 2
          </span>
          <h2 className="text-4xl font-black text-slate-800 tracking-tight mt-4 select-none">
            ¡El Juego de las Estatuas!
          </h2>
          <p className="text-sm font-bold text-slate-500 max-w-lg mx-auto mt-2 leading-relaxed">
            Un juego clásico de Dalcroze. Prepara a los niños para saltar por el aula cuando brille la orden azul, y paralizarse al instante cuando pase a verde.
          </p>
        </div>

        {/* Giant Status Light Display Container */}
        <div className="w-full my-6 flex flex-col items-center">
          
          <AnimatePresence mode="wait">
            {light === 'blue' ? (
              <motion.div
                key="walk-light"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full bg-blue-50 border-4 border-[#48DBFB] p-8 rounded-3xl text-center space-y-4 shadow-lg shadow-blue-100 flex flex-col items-center"
              >
                {/* Visual Glow Core */}
                <div className="w-24 h-24 rounded-full bg-[#1E90FF] flex items-center justify-center text-4xl text-white shadow-2xl shadow-[#1085fe] animate-pulse border-4 border-white">
                  🏃‍♂️
                </div>
                <div>
                  <h3 className="text-5xl font-black text-[#1E90FF] uppercase tracking-wide">
                    ¡A Caminar!
                  </h3>
                  <p className="text-base font-bold text-blue-600 mt-2">
                    ¡Los niños se mueven alegremente por todo el salón!
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="statue-light"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full bg-emerald-50 border-4 border-[#2ED573] p-8 rounded-3xl text-center space-y-4 shadow-lg shadow-emerald-100 flex flex-col items-center"
              >
                {/* Visual Glow Core */}
                <div className="w-24 h-24 rounded-full bg-[#2ED573] flex items-center justify-center text-4xl text-white shadow-2xl shadow-[#27b963] animate-bounce border-4 border-white">
                  🗿
                </div>
                <div>
                  <h3 className="text-5xl font-black text-[#2ED573] uppercase tracking-wide">
                    ¡Estatua!
                  </h3>
                  <p className="text-base font-bold text-emerald-600 mt-2">
                    ¡Congélate como una roca y guárdalo todo en silencio!
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Manual Overrides for Teachers */}
        <div className="w-full bg-[#FFFAF0] border-2 border-slate-100 p-4 rounded-3xl mb-6 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider font-mono">
              Modo de Control Rítmico
            </span>
            
            {/* Toggle Auto/Manual Mode */}
            <button
              onClick={() => setAutoMode(!autoMode)}
              className={`text-xs px-3 py-1.5 rounded-lg font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                autoMode
                  ? 'bg-blue-100 text-blue-700 font-bold border border-blue-300'
                  : 'bg-slate-200 text-slate-600 font-bold'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${autoMode ? 'animate-spin' : ''}`} />
              <span>{autoMode ? 'Ciclado Automático (3-6s)' : 'Control Total Manual'}</span>
            </button>
          </div>

          {/* Trigger action buttons */}
          <div className="grid grid-cols-2 gap-3 mt-1">
            <button
              onClick={() => {
                setAutoMode(false);
                changeLight('blue');
              }}
              className={`py-3 rounded-xl border-3 font-black text-xs md:text-sm cursor-pointer transition-all ${
                light === 'blue'
                  ? 'bg-[#1E90FF] text-white border-blue-400 shadow-md'
                  : 'bg-white text-blue-600 border-blue-100 hover:border-blue-200'
              }`}
            >
              Caminar (Azul) 🏃‍♂️
            </button>
            <button
              onClick={() => {
                setAutoMode(false);
                changeLight('green');
              }}
              className={`py-3 rounded-xl border-3 font-black text-xs md:text-sm cursor-pointer transition-all ${
                light === 'green'
                  ? 'bg-[#2ED573] text-white border-emerald-400 shadow-md'
                  : 'bg-white text-emerald-600 border-emerald-100 hover:border-emerald-200'
              }`}
            >
              Estatua (Verde) 🗿
            </button>
          </div>
        </div>

        {/* Reto Completado Button */}
        <motion.button
          id="btn-complete-level-2"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onComplete}
          className="w-full py-4 bg-[#FF6B6B] text-white rounded-[24px] text-2xl font-black tracking-wide uppercase hover:bg-[#FF6B6B]/90 shadow-[0_8px_0_#D63031] active:translate-y-[4px] active:shadow-[0_4px_0_#D63031] transition-all cursor-pointer text-center border-b-[2px] border-rose-300"
        >
          ¡Reto Completado! 🌟
        </motion.button>

        <p className="mt-4 text-[10px] font-bold text-slate-400 font-mono">
          *Al pulsar este botón desbloquearás los botones de Siguiente y Atrás para continuar.
        </p>

      </motion.div>
    </div>
  );
}
