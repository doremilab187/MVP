import { motion } from 'motion/react';
import { Award, RotateCcw, Home, Sparkles, Star, Music } from 'lucide-react';

interface SuccessMomentProps {
  onReplay: () => void;
  onGoHome: () => void;
}

export default function SuccessMoment({ onReplay, onGoHome }: SuccessMomentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen flex flex-col items-center justify-center p-6 text-center select-none relative"
      style={{
        backgroundColor: '#FFFAF0',
        backgroundImage: 'radial-gradient(circle at 12% 12%, #FFD700 0%, transparent 35%), radial-gradient(circle at 88% 88%, #FF69B4 0%, transparent 35%)'
      }}
    >
      {/* Background Animated Elements */}
      <div className="absolute top-10 left-10 text-5xl animate-bounce duration-700 select-none">🎈</div>
      <div className="absolute top-24 right-16 text-5xl animate-bounce-slow select-none">🎊</div>
      <div className="absolute bottom-20 left-20 text-5xl animate-bounce select-none">✨</div>
      <div className="absolute bottom-12 right-12 text-5xl animate-bounce-slow select-none">🎈</div>

      {/* Main Container Card */}
      <motion.div
        initial={{ y: 35, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 90 }}
        className="bg-white max-w-2xl w-full rounded-[40px] p-8 md:p-12 shadow-2xl border-b-[16px] border-r-[4px] border-l-[4px] border-t-[4px] border-[#FF9F43] relative z-10 flex flex-col items-center space-y-6"
      >
        
        {/* Giant Glowing Trophy Badge */}
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
            className="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-60 scale-125"
          />
          <div className="w-36 h-36 rounded-full bg-gradient-to-br from-[#FECA57] to-[#FF9F43] flex items-center justify-center text-7xl shadow-xl relative border-4 border-white">
            🏆
          </div>
          {/* Sparkles stars overlay */}
          <Star className="w-8 h-8 text-yellow-300 absolute -top-2 -right-2 fill-current animate-ping" />
          <Star className="w-6 h-6 text-yellow-200 absolute -bottom-2 -left-2 fill-current animate-pulse" />
        </div>

        {/* Header Title */}
        <div className="space-y-2">
          <h2 className="text-5xl md:text-6xl font-black text-slate-800 tracking-tight">
            ¡Felicitaciones!
          </h2>
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#1DD1A1]/10 text-[#1DD1A1] text-sm font-black tracking-wide font-mono uppercase border border-[#1DD1A1]/20">
            Aventura Completada con Éxito
          </span>
        </div>

        {/* Narrative Description */}
        <p className="text-base md:text-lg font-bold text-slate-600 max-w-lg leading-relaxed">
          ¡El conejo Adaggio y todos sus amigos están saltando de felicidad! Gracias a su excelente pulso rítmico y reacciones corporales inmediatas, la magia del ritmo se ha salvado en el pueblo de Do Re Mi.
        </p>

        {/* Interactive Classroom Badge Showcase */}
        <div className="bg-[#FFFAF0] border-2 border-orange-100 p-5 rounded-3xl w-full text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <Music className="w-5 h-5 text-indigo-500 animate-bounce" />
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider font-mono">
              Insignia Musical Ganada
            </span>
          </div>
          
          <div className="text-2xl font-black text-slate-700 tracking-tight">
            🎖️ Guardianes del Ritmo Dalcroze
          </div>
          <p className="text-xs font-bold text-slate-500 leading-snug">
            ¡Felicita a tus alumnos del aula! Han demostrado excelente psicomotricidad, compás y coordinación auditiva.
          </p>
        </div>

        {/* Massive 3D Replay triggers */}
        <div className="w-full flex flex-col sm:flex-row gap-6 pt-4">
          
          <motion.button
            id="btn-replay-adventure"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onReplay}
            className="flex-grow bg-[#FF6B6B] text-white py-4 px-6 rounded-[24px] text-xl font-black uppercase tracking-wide border-b-[8px] border-[#D63031] transition-all flex items-center justify-center gap-3 cursor-pointer active:translate-y-[4px] active:border-b-[4px]"
            style={{ boxShadow: '0 6px 0 rgba(0,0,0,0.1)' }}
          >
            <RotateCcw className="w-6 h-6 shrink-0" />
            <span>Repetir Juego</span>
          </motion.button>

          <motion.button
            id="btn-back-to-menu-final"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onGoHome}
            className="flex-grow bg-[#48DBFB] text-white py-4 px-6 rounded-[24px] text-xl font-black uppercase tracking-wide border-b-[8px] border-[#0ABDE3] transition-all flex items-center justify-center gap-3 cursor-pointer active:translate-y-[4px] active:border-b-[4px]"
            style={{ boxShadow: '0 6px 0 rgba(0,0,0,0.1)' }}
          >
            <Home className="w-6 h-6 shrink-0" />
            <span>Menú Principal</span>
          </motion.button>

        </div>

      </motion.div>
    </motion.div>
  );
}
