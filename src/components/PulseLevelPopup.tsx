import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Music, Volume2, VolumeX, Flame } from 'lucide-react';

interface PulseLevelPopupProps {
  onComplete: () => void;
}

const TEMPOS = [
  { label: '🐢 Adagio (Relajado)', bpm: 60, color: 'bg-emerald-500' },
  { label: '🐇 Moderato (Andando)', bpm: 90, color: 'bg-amber-500' },
  { label: '🐦 Allegro (Rápido)', bpm: 120, color: 'bg-rose-500' },
];

export default function PulseLevelPopup({ onComplete }: PulseLevelPopupProps) {
  const [bpm, setBpm] = useState<number>(90); // 90 bpm default
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [pulseScale, setPulseScale] = useState<number>(1);
  const audioContextRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);

  // High-fidelity web audio beep helper
  const playBeep = () => {
    if (!audioEnabled) return;
    try {
      if (!audioContextRef.current) {
        // Safe lazy initialization on first use to satisfy browser policies
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle'; // Smooth child-friendly sound instead of harsh square wave
      osc.frequency.setValueAtTime(bpm > 100 ? 520 : 440, ctx.currentTime); // Pitch increases on faster tempos
      
      // Decay envelope to make it soft
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.15);

      // Trigger scale pulse visual
      setPulseScale(1.4);
      setTimeout(() => setPulseScale(1.0), 100);
    } catch (e) {
      console.error('Audio metronome failed:', e);
    }
  };

  // Metronome interval effect
  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    if (isPlaying) {
      const intervalMs = (60 / bpm) * 1000;
      // Start initial flash
      playBeep();
      timerRef.current = window.setInterval(() => {
        playBeep();
      }, intervalMs);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [bpm, isPlaying, audioEnabled]);

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
        className="relative bg-white w-full max-w-2xl rounded-[32px] shadow-2xl border-b-[12px] border-r-[4px] border-l-[4px] border-t-[4px] border-[#FF9F43] overflow-hidden z-10 p-6 md:p-8 flex flex-col items-center justify-between"
      >
        <div className="w-full text-center">
          <span className="text-xs font-black text-white bg-[#FF9F43] px-4 py-1.5 rounded-full font-mono tracking-widest uppercase shadow-md">
            🎸 RETO INTERACTIVO • NIVEL 1
          </span>
          <h2 className="text-4xl font-black text-slate-800 tracking-tight mt-4 select-none">
            ¡Sigue el Pulso de Adaggio!
          </h2>
          <p className="text-sm font-bold text-slate-500 max-w-lg mx-auto mt-2 leading-relaxed">
            Pide a todos los niños pararse del asiento. Deben dar una palmada alegre o un paso de marchar cada vez que el círculo mágico parpadee con el sonido.
          </p>
        </div>

        {/* Pulsing visual element container */}
        <div className="my-8 relative flex flex-col items-center justify-center w-full h-[220px]">
          
          {/* Main Pulsing Metronome Circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{
                scale: pulseScale,
                opacity: pulseScale > 1.1 ? 0.4 : 0.8,
              }}
              className={`absolute w-36 h-36 rounded-full blur-xl filter brightness-110 ${
                bpm === 60 ? 'bg-emerald-400' : bpm === 90 ? 'bg-amber-400' : 'bg-rose-400'
              }`}
            />
            <motion.div
              animate={{ scale: pulseScale }}
              className={`w-36 h-36 rounded-full flex flex-col items-center justify-center text-white border-8 border-white/90 shadow-xl transition-colors duration-300 ${
                bpm === 60 ? 'bg-emerald-500 shadow-emerald-200' : bpm === 90 ? 'bg-[#FF9F43] shadow-amber-200' : 'bg-[#FF6B6B] shadow-rose-200'
              }`}
            >
              <Music className={`w-10 h-10 ${isPlaying ? 'animate-bounce' : ''}`} />
              <span className="text-3xl font-black font-mono tracking-tighter mt-1 select-none">
                {bpm}
              </span>
              <span className="text-[10px] font-black tracking-widest uppercase font-mono select-none">
                BPM
              </span>
            </motion.div>
          </div>

          {/* Indicator Light Bar */}
          <div className="absolute bottom-0 flex items-center gap-1.5 p-2 rounded-full bg-slate-100 max-w-[120px] justify-center">
            <div className={`w-3.5 h-3.5 rounded-full transition-all duration-100 ${pulseScale > 1.1 ? 'bg-[#FF9F43]' : 'bg-slate-300'}`} />
            <span className="text-[10px] font-bold text-slate-600 font-mono">PULSO SINC</span>
          </div>

        </div>

        {/* Metronome Controls */}
        <div className="w-full space-y-5 bg-[#FFFAF0] border-2 border-orange-100 p-5 rounded-3xl mb-6">
          
          {/* Tempo triggers */}
          <div>
            <span className="block text-center text-xs font-black text-slate-500 uppercase tracking-wider font-mono mb-3">
              Velocidad del Pulso (Acompañamiento)
            </span>
            <div className="grid grid-cols-3 gap-2">
              {TEMPOS.map((item) => {
                const isSelected = bpm === item.bpm;
                return (
                  <button
                    key={item.bpm}
                    onClick={() => setBpm(item.bpm)}
                    className={`py-2 px-3 rounded-xl border-2 font-black text-xs md:text-sm tracking-wide transition-all cursor-pointer ${
                      isSelected
                        ? `bg-slate-800 text-white border-slate-800 shadow-md`
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-orange-200/40 pt-4 gap-4">
            
            {/* Play/Pause Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2 py-2 px-4 bg-white hover:bg-slate-100 border-2 border-slate-200 rounded-xl font-bold text-sm text-slate-700 cursor-pointer select-none"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Pausar</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Activar</span>
                </>
              )}
            </button>

            {/* Sound Toggle Button */}
            <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              className={`flex items-center gap-2 py-2 px-4 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                audioEnabled
                  ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                  : 'bg-slate-200 text-slate-500'
              }`}
            >
              {audioEnabled ? (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span>Sonido ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span>Silencio</span>
                </>
              )}
            </button>

          </div>
        </div>

        {/* Reto Completado Button */}
        <motion.button
          id="btn-complete-level-1"
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
