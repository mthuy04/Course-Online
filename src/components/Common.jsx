import { X } from 'lucide-react';

export const SidebarItem = ({ id, icon: Icon, label, active, onClick, badge }) => (
  <button 
    onClick={() => onClick(id)}
    className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl transition-all duration-300 group relative font-bold ${
      active 
      ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_10px_20px_-5px_rgba(79,70,229,0.4)] translate-x-1' 
      : 'text-slate-500 hover:bg-slate-100 hover:text-indigo-600'
    }`}
  >
    <Icon size={22} strokeWidth={2.5} className={active ? "animate-pulse" : ""} />
    <span className="text-sm tracking-wide">{label}</span>
    {badge > 0 && (
      <span className="absolute right-3 bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg shadow-rose-200">
        {badge}
      </span>
    )}
  </button>
);

export const Modal = ({ title, onClose, children, maxWidth = "max-w-2xl" }) => (
  <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/70 backdrop-blur-md p-4 animate-fade-in">
    <div className={`bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] w-full ${maxWidth} max-h-[90vh] flex flex-col animate-scale-up overflow-hidden border border-white/20`}>
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 backdrop-blur">
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">{title}</h2>
        <button onClick={onClose} className="p-2 hover:bg-rose-100 hover:text-rose-600 rounded-full text-slate-400 transition-colors">
          <X size={24} strokeWidth={3} />
        </button>
      </div>
      <div className="p-8 overflow-y-auto custom-scrollbar flex-1 bg-white">{children}</div>
    </div>
  </div>
);