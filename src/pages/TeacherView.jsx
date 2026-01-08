import { useState, useEffect } from 'react';
import { Plus, Edit, Users, Star, Calendar, MessageCircle, Clock, BookOpen, Video, Search } from 'lucide-react';
import { formatMoney, API_URL } from '../utils/helpers';

const TeacherView = ({ courses, currentUser, onOpenUpload, onEditCourse, page }) => {
  const activeTab = page === 'home' ? 'overview' : page;
  
  // 1. Lọc khóa học của tôi
  const myCourses = courses.filter(c => c.teacher_id == currentUser?.id);
  
  // 2. Tính doanh thu (Cơ chế: Tổng giá trị khóa học * 80%)
  const myRevenue = myCourses.reduce((sum, c) => sum + parseInt(c.price), 0) * 0.8;

  // 3. State cho danh sách học sinh
  const [students, setStudents] = useState([]);

  // Fetch danh sách học sinh khi vào tab Lịch dạy hoặc Tổng quan
  useEffect(() => {
    if (currentUser?.id) {
        fetch(`${API_URL}/get_my_students.php?teacher_id=${currentUser.id}`)
            .then(r => r.json())
            .then(data => setStudents(Array.isArray(data) ? data : []))
            .catch(e => console.error(e));
    }
  }, [currentUser]);

  return (
    <div className="space-y-8 animate-fade-in-up pb-10">
      <div className="flex justify-between items-end">
        <div>
            <h2 className="text-3xl font-black text-slate-800">Cổng Đối Tác 🎓</h2>
            <p className="text-slate-500 font-medium">Xin chào, giảng viên {currentUser?.full_name}!</p>
        </div>
        <button onClick={onOpenUpload} className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-600 transition-all shadow-lg flex items-center gap-2">
            <Plus size={20}/> Tạo khóa học mới
        </button>
      </div>

      {/* --- TAB TỔNG QUAN --- */}
      {activeTab === 'overview' && (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-[32px] shadow-xl flex justify-between items-center">
                    <div><p className="text-indigo-100 font-bold uppercase mb-2">Số dư thực nhận (80%)</p><h3 className="text-5xl font-black">{formatMoney(myRevenue)}</h3></div>
                    <button className="bg-white/20 backdrop-blur px-6 py-3 rounded-xl font-bold hover:bg-white/30 transition-all">Rút tiền</button>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4"><div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><Users size={28}/></div><div><h3 className="text-2xl font-black text-slate-800">{students.length}</h3><p className="text-xs text-slate-500 font-bold uppercase">Học viên</p></div></div>
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4"><div className="p-3 bg-orange-50 text-orange-500 rounded-2xl"><BookOpen size={28}/></div><div><h3 className="text-2xl font-black text-slate-800">{myCourses.length}</h3><p className="text-xs text-slate-500 font-bold uppercase">Khóa học</p></div></div>
            </div>

            {/* DANH SÁCH KHÓA HỌC CỦA TÔI */}
            <div className="mt-8">
                <h3 className="font-bold text-xl text-slate-800 mb-4">Khóa học đang quản lý</h3>
                {myCourses.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                        {myCourses.map(course => (
                            <div key={course.id} className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-4 hover:shadow-md transition-all">
                                <img src={course.image} className="w-24 h-16 object-cover rounded-xl" />
                                <div className="flex-1">
                                    <h4 className="font-bold text-slate-800 text-lg">{course.title}</h4>
                                    <div className="flex gap-4 text-sm text-slate-500 mt-1">
                                        <span className="font-bold text-indigo-600">{formatMoney(course.price)}</span>
                                        <span>• ID: {course.id}</span>
                                        {course.meeting_link && <span className="flex items-center gap-1 text-green-600"><Video size={14}/> Có lớp Live</span>}
                                    </div>
                                </div>
                                <button onClick={() => onEditCourse(course)} className="p-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-indigo-600 hover:text-white transition-all flex items-center gap-2">
                                    <Edit size={18}/> Sửa bài
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-slate-400 italic">Bạn chưa có khóa học nào. Hãy tạo mới!</p>
                )}
            </div>
        </>
      )}

      {/* --- TAB DANH SÁCH LỚP / LỊCH DẠY (ĐÃ FIX LOGIC) --- */}
      {activeTab === 'schedule' && (
         <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2"><Users className="text-indigo-600"/> Danh sách học viên & Lớp học</h3>
            
            {/* 1. Danh sách học viên thực tế */}
            <div className="mb-8">
                <h4 className="text-sm font-black text-slate-400 uppercase mb-4">Học viên mới đăng ký</h4>
                <div className="space-y-3">
                    {students.length > 0 ? students.map((s, i) => (
                        <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center font-bold text-indigo-700">{s.full_name?.charAt(0)}</div>
                                <div><p className="font-bold text-slate-800">{s.full_name}</p><p className="text-xs text-slate-500">Đăng ký: {s.course_name}</p></div>
                            </div>
                            <span className="text-xs font-bold text-slate-400">{s.created_at}</span>
                        </div>
                    )) : <p className="text-slate-400">Chưa có học viên nào đăng ký.</p>}
                </div>
            </div>

            {/* 2. Lối vào lớp học Zoom (Dựa trên khóa học của GV) */}
            <div>
                <h4 className="text-sm font-black text-slate-400 uppercase mb-4">Phòng học trực tuyến</h4>
                <div className="grid grid-cols-1 gap-4">
                    {myCourses.map(c => (
                        <div key={c.id} className="flex justify-between items-center p-5 border border-slate-100 rounded-2xl hover:border-indigo-500 transition-all">
                             <div>
                                <h5 className="font-bold text-slate-800 text-lg">{c.title}</h5>
                                <p className="text-sm text-slate-500">Phòng chờ giảng viên</p>
                             </div>
                             <a 
                                href={c.meeting_link || "https://zoom.us/start/videomeeting"} 
                                target="_blank" 
                                rel="noreferrer"
                                className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 flex items-center gap-2"
                             >
                                <Video size={18}/> Vào lớp ngay
                             </a>
                        </div>
                    ))}
                </div>
            </div>
         </div>
      )}

      {/* TAB HỎI ĐÁP (GIỮ NGUYÊN UI) */}
      {activeTab === 'qa' && (
         <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-6">Hỏi đáp với học viên</h3>
            <div className="text-center py-10 text-slate-400">Chức năng đang cập nhật...</div>
         </div>
      )}
    </div>
  );
};
export default TeacherView;