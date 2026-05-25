import { motion } from 'motion/react';
import { Play, Sparkles, BookOpen, UserCheck, Music } from 'lucide-react';

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
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-between p-6 overflow-hidden relative selection:bg-rose-200"
      style={{
        backgroundColor: '#FFFAF0',
        backgroundImage: 'radial-gradient(circle at 10% 15%, #FFD700 0%, transparent 35%), radial-gradient(circle at 90% 85%, #FF69B4 0%, transparent 35%)',
        fontFamily: "'Helvetica Neue', Arial, sans-serif"
      }}
    >
      
      {/* Decorative Musical Notes (Vibrant Palette style) */}
      <motion.div 
        animate={{ y: [0, -10, 0], rotate: [-15, -12, -15] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute top-[8%] left-[10%] text-6xl font-black text-[#FF4757]/20 select-none pointer-events-none"
      >
        ♪
      </motion.div>
      <motion.div 
        animate={{ y: [0, 8, 0], rotate: [20, 25, 20] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
        className="absolute top-[72%] left-[5%] text-6xl font-black text-[#2ED573]/25 select-none pointer-events-none"
      >
        ♫
      </motion.div>
      <motion.div 
        animate={{ y: [0, -12, 0], rotate: [10, 7, 10] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-[12%] right-[8%] text-6xl font-black text-[#1E90FF]/20 select-none pointer-events-none"
      >
        ♬
      </motion.div>
      <motion.div 
        animate={{ y: [0, 10, 0], rotate: [-25, -20, -25] }}
        transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 1.5 }}
        className="absolute bottom-[12%] right-[10%] text-6xl font-black text-[#FF9F43]/25 select-none pointer-events-none"
      >
        ♩
      </motion.div>

      {/* Header Container */}
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="w-full max-w-lg text-center mt-6 z-10"
      >
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/90 border-2 border-amber-300 shadow-sm mb-5">
          <Music className="w-5 h-5 text-[#FF4757] animate-bounce" />
          <span className="text-xs font-black text-slate-700 tracking-wider uppercase font-mono">
            Aula Interactiva • Dalcroze
          </span>
        </div>
        
        {/* Dynamic Colorful Title */}
        <h1 className="text-7xl md:text-8xl font-black tracking-tight select-none flex justify-center items-center gap-1">
          <span className="text-[#FF4757] drop-shadow-[0_2px_0_rgba(0,0,0,0.1)]">DO</span>
          <span className="text-[#2ED573] drop-shadow-[0_2px_0_rgba(0,0,0,0.1)]">RE</span>
          <span className="text-[#1E90FF] drop-shadow-[0_2px_0_rgba(0,0,0,0.1)]">MI</span>
          <span className="text-[#2D3436] font-extrabold ml-4">LAB</span>
        </h1>
        
        <p className="mt-3 text-lg md:text-xl font-bold text-slate-600">
          ¡Aprende el ritmo jugando en el espacio de clase! 🪘
        </p>
      </motion.div>

      {/* Main Big TV Buttons Container (Vibrant giant stack) */}
      <div className="w-full max-w-xl flex flex-col gap-8 my-auto z-10 px-4">
        
        {/* Button 1: Start Adventure (GIANT 3D CORAL BUTTON) */}
        <motion.button
          id="btn-start-story"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStartStory}
          className="group w-full bg-[#FF6B6B] text-white rounded-[40px] p-6 md:p-8 flex items-center justify-between gap-4 border-b-[12px] border-[#D63031] transition-all cursor-pointer active:translate-y-[4px] active:border-b-[8px] select-none"
          style={{ boxShadow: '0 12px 0 rgba(0,0,0,0.15)' }}
        >
          <div className="flex items-center gap-5 text-left">
            <div className="w-18 h-18 rounded-3xl bg-white text-[#FF6B6B] flex items-center justify-center text-5xl shadow-inner group-hover:rotate-6 transition-transform">
              <Play className="w-10 h-10 fill-current ml-1" />
            </div>
            <div>
              <span className="block text-3xl md:text-4xl font-black tracking-wide uppercase">
                Iniciar Historia
              </span>
              <span className="block text-sm font-semibold text-rose-100 opacity-90 mt-1">
                Aventura rítmica con el conejo Adaggio 🐇
              </span>
            </div>
          </div>
          <Sparkles className="w-8 h-8 text-yellow-300 animate-spin-slow hidden md:block" />
        </motion.button>

        {/* Button 2: Look at Totems (GIANT 3D SKY-BLUE BUTTON) */}
        <motion.button
          id="btn-view-totems"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onOpenTotems}
          className="group w-full bg-[#48DBFB] text-white rounded-[40px] p-5 md:p-6 flex items-center gap-4 border-b-[12px] border-[#0ABDE3] transition-all cursor-pointer active:translate-y-[4px] active:border-b-[8px] select-none"
          style={{ boxShadow: '0 12px 0 rgba(0,0,0,0.15)' }}
        >
          <div className="w-14 h-14 rounded-2xl bg-white text-[#48DBFB] flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform">
            <UserCheck className="w-7 h-7" />
          </div>
          <div className="text-left">
            <span className="block text-2xl md:text-3xl font-black uppercase tracking-wide">
              Ver Tótems
            </span>
            <span className="block text-xs md:text-sm font-medium text-sky-100 opacity-95">
              Conoce a los personajes amigos del ritmo y movimiento 🦊🐢
            </span>
          </div>
        </motion.button>

        {/* Button 3: Tutorial (GIANT 3D ORANGE BUTTON) */}
        <motion.button
          id="btn-view-tutorial"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onOpenTutorial}
          className="group w-full bg-[#FF9F43] text-white rounded-[40px] p-5 md:p-6 flex items-center gap-4 border-b-[12px] border-[#E67E22] transition-all cursor-pointer active:translate-y-[4px] active:border-b-[8px] select-none"
          style={{ boxShadow: '0 12px 0 rgba(0,0,0,0.15)' }}
        >
          <div className="w-14 h-14 rounded-2xl bg-white text-[#FF9F43] flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform">
            <BookOpen className="w-7 h-7" />
          </div>
          <div className="text-left">
            <span className="block text-2xl md:text-3xl font-black uppercase tracking-wide">
              Guía / Tutorial
            </span>
            <span className="block text-xs md:text-sm font-medium text-amber-100">
              Manejo rápido en 3 pasos simples para el profesor en clase 📺
            </span>
          </div>
        </motion.button>

      </div>

      {/* Decorative Totem Preview Circular Avatar Bottom Row */}
      <div className="w-full max-w-lg flex justify-between px-8 z-10 py-2 select-none">
        <div className="w-14 h-14 rounded-full bg-[#FF6B6B] border-4 border-white shadow-lg flex items-center justify-center text-2xl animate-bounce-slow">🐇</div>
        <div className="w-14 h-14 rounded-full bg-[#1DD1A1] border-4 border-white shadow-lg flex items-center justify-center text-2xl">🐢</div>
        <div className="w-14 h-14 rounded-full bg-[#FECA57] border-4 border-white shadow-lg flex items-center justify-center text-2xl animate-bounce-slow" style={{ animationDelay: '0.4s' }}>🐦</div>
        <div className="w-14 h-14 rounded-full bg-[#54A0FF] border-4 border-white shadow-lg flex items-center justify-center text-2xl">🐻</div>
        <div className="w-14 h-14 rounded-full bg-[#5F27CD] border-4 border-white shadow-lg flex items-center justify-center text-2xl animate-bounce-slow" style={{ animationDelay: '0.8s' }}>🦊</div>
      </div>

      {/* Footer Branding */}
      <div className="w-full text-center mt-4 text-xs font-bold text-slate-500 select-none z-10 flex flex-col md:flex-row items-center justify-center gap-2">
        <span>Fundación Monte Tabor</span>
        <span className="hidden md:inline">•</span>
        <span>Laboratorio de Música Infantil</span>
      </div>

    </div>
  );
}
