import { motion } from 'motion/react';
import { X, Play, Music, ArrowRight, HelpCircle } from 'lucide-react';
import { tutorialSteps } from '../data';

interface TutorialPopupProps {
  onClose: () => void;
}

export default function TutorialPopup({ onClose }: TutorialPopupProps) {
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
        className="relative bg-white w-full max-w-3xl rounded-[32px] shadow-2xl border-b-[12px] border-r-[4px] border-l-[4px] border-t-[4px] border-[#FF9F43] overflow-hidden z-10 p-6 md:p-8 flex flex-col justify-between"
      >
        {/* Close corner X button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 rounded-full cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          {/* Title Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-amber-100 rounded-2xl text-[#FF9F43]">
              <HelpCircle className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-black text-[#FF9F43] uppercase tracking-widest font-mono">
                Guía Rápida de Uso
              </span>
              <h2 className="text-3xl font-black text-slate-800">
                ¿Cómo usar Do Re Mi Lab?
              </h2>
            </div>
          </div>

          <p className="text-sm font-semibold text-slate-500 mb-8 leading-relaxed">
            Estimado profesor: esta plataforma está optimizada para televisores y pizarras del aula. Te permite manejar la sesión y mantener la atención de los niños de principio a fin de forma infalible.
          </p>

          {/* Stepper Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {tutorialSteps.map((item, idx) => (
              <div 
                key={item.step}
                className="relative bg-[#FFFAF0] border-2 border-orange-100 p-5 rounded-3xl flex flex-col justify-between h-full hover:shadow-xs transition-shadow"
              >
                {/* Step badge */}
                <span className="absolute top-4 right-4 text-3xl font-black text-orange-200/55 select-none font-mono">
                  #0{item.step}
                </span>

                <div className="space-y-2 mt-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF9F43] text-white text-xs font-black font-mono">
                    Paso {item.step}
                  </div>
                  <h3 className="text-lg font-black text-slate-800 pt-1">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button: Return to Menu */}
        <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-bold text-slate-400">
            *Optimizado para un manejo manual de ritmo corporal con Dalcroze.
          </p>
          <motion.button
            id="tutorial-close-btn"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onClose}
            className="w-full sm:w-auto px-8 py-4 bg-[#FF9F43] text-white rounded-[24px] text-lg font-black tracking-wide uppercase hover:bg-[#FF9F43]/90 shadow-[0_6px_0_#E67E22] active:translate-y-[2px] active:shadow-[0_2px_0_#E67E22] transition-all cursor-pointer text-center border-b border-orange-300"
          >
            Regresar al Menú
          </motion.button>
        </div>

      </motion.div>
    </div>
  );
}
