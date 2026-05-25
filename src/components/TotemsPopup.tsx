import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trophy, Music, ShieldAlert } from 'lucide-react';
import { totemsList } from '../data';
import { Totem } from '../types';

interface TotemsPopupProps {
  onClose: () => void;
}

export default function TotemsPopup({ onClose }: TotemsPopupProps) {
  const [selectedTotem, setSelectedTotem] = useState<Totem>(totemsList[0]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Translucent blur background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-[6px] cursor-pointer"
      />

      {/* Main Popup Content Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative bg-white w-full max-w-4xl rounded-[32px] shadow-2xl border-b-[12px] border-r-[4px] border-l-[4px] border-t-[4px] border-[#48DBFB] overflow-hidden z-10 flex flex-col md:flex-row h-[90vh] md:h-auto max-h-[640px]"
      >
        
        {/* Left Side: Characters Selector Grid */}
        <div className="w-full md:w-1/2 p-6 flex flex-col bg-[#FFFAF0] border-r-2 border-slate-100 justify-between">
          <div>
            <span className="text-xs font-black text-[#FF6B6B] uppercase tracking-widest font-mono bg-[#FF6B6B]/10 px-3 py-1 rounded-full">
              PERSONAJES RÍTMICOS
            </span>
            <h2 className="text-3xl font-black text-slate-800 mt-2">
              Amigos de Do Re Mi
            </h2>
            <p className="text-sm font-medium text-slate-500 mt-1 mb-6">
              Haz clic en cada tótem para conocer su velocidad y cómo movernos en clase.
            </p>

            {/* Grid of Emojis */}
            <div className="grid grid-cols-2 gap-4">
              {totemsList.map((totem) => {
                const isSelected = selectedTotem.id === totem.id;
                return (
                  <motion.button
                    key={totem.id}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setSelectedTotem(totem)}
                    className={`p-4 rounded-3xl border-3 flex flex-col items-center gap-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#FF9F43]/15 border-[#FF9F43] shadow-md'
                        : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                    }`}
                  >
                    <span className="text-5xl select-none filter duration-200 drop-shadow-xs group-hover:scale-110">
                      {totem.avatar}
                    </span>
                    <span className="text-lg font-black text-slate-700">
                      {totem.name.split(' ')[1]}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Return to Menu Button */}
          <motion.button
            id="totems-close-btn-bottom"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onClose}
            className="mt-6 w-full py-4 bg-[#FF6B6B] text-white rounded-[24px] text-xl font-black tracking-wide uppercase hover:bg-[#FF6B6B]/90 shadow-[0_6px_0_#D63031] active:translate-y-[3px] active:shadow-[0_3px_0_#D63031] transition-all cursor-pointer text-center border-b border-rose-300"
          >
            Regresar al Menú
          </motion.button>
        </div>

        {/* Right Side: Detailed Character view with energetic backgrounds */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between relative bg-linear-to-b from-white to-slate-50 overflow-hidden">
          
          {/* Close corner X button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 rounded-full cursor-pointer transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTotem.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col h-full justify-between"
            >
              {/* Card Header Illustration Frame */}
              <div className="flex flex-col items-center text-center mt-4">
                <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${selectedTotem.color} flex items-center justify-center text-7xl shadow-lg border-4 border-white mb-4 animate-bounce-slow`}>
                  <span className="select-none filter drop-shadow-md">{selectedTotem.avatar}</span>
                </div>
                
                <h3 className="text-3xl font-black text-slate-800 tracking-tight">
                  {selectedTotem.name}
                </h3>
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold font-mono uppercase mt-1">
                  {selectedTotem.role}
                </span>
              </div>

              {/* Card Body Information */}
              <div className="bg-white/80 border border-slate-100 p-4 rounded-2xl mt-4 space-y-3">
                <p className="text-sm font-medium text-slate-600 leading-relaxed text-center">
                  "{selectedTotem.description}"
                </p>
                
                <div className="border-t border-dashed border-slate-200 pt-3">
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs font-mono uppercase">
                    <Trophy className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Habilidad Corporal</span>
                  </div>
                  <p className="text-xs font-bold text-slate-700 mt-1">
                    {selectedTotem.skill}
                  </p>
                </div>
              </div>

              {/* Classroom Advice for teachers */}
              <div className="mt-4 bg-amber-50 border border-amber-100 p-3 rounded-xl flex items-start gap-2.5">
                <Music className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs font-medium text-amber-800 leading-snug">
                  <strong>Tip del profesor:</strong> Pide a los niños que imiten este personaje libremente antes de pasar a su reto interactivo.
                </p>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>

      </motion.div>
    </div>
  );
}
