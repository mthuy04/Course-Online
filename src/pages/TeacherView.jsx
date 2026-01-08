import { useState } from 'react';
import { Plus, Edit, Video, Users, Star, Wallet, Calendar, MessageCircle, FileText, CheckCircle, Clock, BookOpen } from 'lucide-react';
import { formatMoney } from '../utils/helpers';

// Thêm prop currentUser để biết ai đang đăng nhập
const TeacherView = ({ courses, currentUser, onOpenUpload, onEditCourse, page }) => {
  const activeTab = page === 'home' ? 'overview' : page;

  // 1. LOGIC LỌC KHÓA HỌC: Chỉ lấy khóa của giáo viên này (dựa vào teacher_id)
  // Lưu ý: Đảm bảo currentUser.id và course.teacher_id cùng kiểu dữ liệu (số hoặc chuỗi)
  const myCourses = courses.filter(c => c.teacher_id == currentUser?.id);

  // 2. LOGIC DOANH THU: Chỉ tính tiền từ khóa của mình (Chiết khấu 80%)
  const myRevenue = myCourses.reduce((sum, c) => sum + parseInt(c.price), 0) * 0.8;

  // 3. Tính toán số liệu cơ bản (Tạm thời tính từ myCourses)
  const totalStudents = myCourses.length * 120; // Giả lập mỗi khóa có 120 học viên (hoặc lấy từ DB sau này)

  return (
    <div className="space-y-8 animate-fade-in-up pb-10">
      <div className="flex justify-between items-end">
        <div>
            <h2 className="text-3xl font-black text-slate-800">Cổng Đối Tác 🎓</h2>
            <p className="text-slate-500 font-medium">Chào mừng trở lại, {currentUser?.full_name}!</p>
        </div>
        {/* Nút đăng khóa học mới */}
        <button onClick={onOpenUpload} className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-600 transition-all shadow-lg flex items-center gap-2">
            <Plus size={20}/> Tạo khóa học mới
        </button>
      </div>

      {activeTab === 'overview' && (
        <>
            {/* THỐNG KÊ */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-[32px] shadow-xl flex justify-between items-center">
                    <div><p className="text-indigo-100 font-bold uppercase mb-2">Số dư thực nhận (80%)</p><h3 className="text-5xl font-black">{formatMoney(myRevenue)}</h3></div>
                    <button className="bg-white/20 backdrop-blur px-6 py-3 rounded-xl font-bold hover:bg-white/30 transition-all">Rút tiền ngay</button>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4"><div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><Users size={28}/></div><div><h3 className="text-2xl font-black text-slate-800">{totalStudents}</h3><p className="text-xs text-slate-500 font-bold uppercase">Học viên tích lũy</p></div></div>
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4"><div className="p-3 bg-orange-50 text-orange-500 rounded-2xl"><BookOpen size={28}/></div><div><h3 className="text-2xl font-black text-slate-800">{myCourses.length}</h3><p className="text-xs text-slate-500 font-bold uppercase">Khóa học đang dạy</p></div></div>
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4"><div className="p-3 bg-rose-50 text-rose-500 rounded-2xl"><MessageCircle size={28}/></div><div><h3 className="text-2xl font-black text-slate-800">12</h3><p className="text-xs text-slate-500 font-bold uppercase">Câu hỏi chưa trả lời</p></div></div>
            </div>

            {/* DANH SÁCH KHÓA HỌC CỦA TÔI (MỚI THÊM) */}
            <div className="mt-8">
                <h3 className="font-bold text-xl text-slate-800 mb-4">Khóa học của bạn</h3>
                {myCourses.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                        {myCourses.map(course => (
                            <div key={course.id} className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-4 hover:shadow-md transition-all">
                                <img src={course.image} className="w-24 h-16 object-cover rounded-xl" />
                                <div className="flex-1">
                                    <h4 className="font-bold text-slate-800 text-lg">{course.title}</h4>
                                    <p className="text-sm text-slate-500 font-bold">{formatMoney(course.price)} • <span className="uppercase text-indigo-600">{course.level}</span></p>
                                </div>
                                <button onClick={() => onEditCourse(course)} className="p-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-indigo-600 hover:text-white transition-all flex items-center gap-2">
                                    <Edit size={18}/> Sửa nội dung
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 bg-white rounded-3xl border border-dashed border-slate-300">
                        <p className="text-slate-400 mb-4">Bạn chưa đăng khóa học nào.</p>
                        <button onClick={onOpenUpload} className="text-indigo-600 font-bold hover:underline">Tạo khóa học đầu tiên ngay</button>
                    </div>
                )}
            </div>
        </>
      )}

      {/* LICH DAY (GIỮ NGUYÊN HOẶC CHỜ NÂNG CẤP DB) */}
      {activeTab === 'schedule' && (
         <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2"><Calendar className="text-indigo-600"/> Lịch livestream / Dạy trực tuyến</h3>
            <div className="space-y-4">
               {[1,2,3].map(i => (
                  <div key={i} className="flex items-center p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                     <div className="flex-col flex items-center justify-center w-20 h-20 bg-indigo-50 rounded-2xl font-bold text-slate-700 mr-6"><span>T2</span><span className="text-2xl text-indigo-600">2{i}</span></div>
                     <div className="flex-1">
                        <div className="flex gap-2 mb-1"><span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded font-bold">Sắp diễn ra</span><span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded font-bold">Zoom</span></div>
                        <h4 className="font-bold text-slate-800 text-lg">Giải đề thi thử THPTQG đợt {i} - Chuyên đề Hàm số</h4>
                        <p className="text-sm text-slate-500 font-medium flex items-center gap-2 mt-1"><Clock size={16}/> 20:00 - 21:30</p>
                     </div>
                     <button className="px-6 py-3 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700">Vào lớp ngay</button>
                  </div>
               ))}
            </div>
         </div>
      )}

      {/* HOI DAP (GIỮ NGUYÊN) */}
      {activeTab === 'qa' && (
         <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-6">Hỏi đáp với học viên</h3>
            <div className="space-y-6">
               {[1,2].map(i => (
                  <div key={i} className="p-6 border border-slate-100 rounded-3xl hover:bg-slate-50 transition-all">
                     <div className="flex gap-4 mb-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">SV</div>
                        <div><p className="font-bold text-slate-800">Nguyễn Văn Em</p><p className="text-xs text-slate-400 font-bold">2 giờ trước • Bài: Khảo sát hàm số</p></div>
                     </div>
                     <p className="text-slate-700 ml-14 mb-4 leading-relaxed font-medium">Thầy ơi cho em hỏi câu 5 trong bài tập về nhà, tại sao đạo hàm chỗ này lại ra âm được ạ? Em tính mãi vẫn ra dương.</p>
                     <div className="ml-14 flex gap-3"><input className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-200 outline-none" placeholder="Viết câu trả lời..." /><button className="px-6 py-3 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800">Gửi</button></div>
                  </div>
               ))}
            </div>
         </div>
      )}
    </div>
  );
};
export default TeacherView;