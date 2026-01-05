// src/components/CourseCard.jsx
import { Star, Users } from 'lucide-react';
import { formatMoney } from '../utils/helpers';

const CourseCard = ({ course, onAction, actionLabel, secondaryAction }) => (
  <div className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
    <div className="relative h-48 overflow-hidden">
      <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-slate-700 shadow-sm">{course.level}</div>
    </div>
    <div className="p-5 flex flex-col flex-1">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-indigo-500 bg-indigo-50 px-2 py-1 rounded-md">{course.duration || 'Flexible'}</span>
        <div className="flex items-center gap-1 text-amber-400 text-xs font-bold"><Star size={12} fill="currentColor" /> 4.9</div>
      </div>
      <h3 className="font-bold text-slate-800 text-lg mb-1 line-clamp-2 flex-1 group-hover:text-indigo-600 transition-colors">{course.title}</h3>
      <p className="text-xs text-slate-500 mb-4 flex items-center gap-1"><Users size={14} /> {course.teacher_name}</p>
      <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
        <div className="flex flex-col">
          <span className="text-lg font-bold text-slate-900">{parseInt(course.price) === 0 ? 'Miễn phí' : formatMoney(course.price)}</span>
        </div>
        <div className="flex gap-2">
           {secondaryAction}
           <button onClick={() => onAction(course)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center gap-2">{actionLabel}</button>
        </div>
      </div>
    </div>
  </div>
);
export default CourseCard;