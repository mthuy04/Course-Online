import { useState, useEffect } from 'react';
import { Plus, Edit, Users, Star, Calendar, MessageCircle, Clock, BookOpen, Video, Search, MessageSquare, User, CheckCircle2 } from 'lucide-react';
import { formatMoney, API_URL } from '../utils/helpers';

const TeacherView = ({ courses, currentUser, onOpenUpload, onEditCourse, page }) => {
  const activeTab = page === 'home' ? 'overview' : page;
  
  // 1. Lọc khóa học của tôi
  const myCourses = courses.filter(c => c.teacher_id == currentUser?.id);
  
  // 2. Tính doanh thu (Cơ chế: Tổng giá trị khóa học * 80%)
  const myRevenue = myCourses.reduce((sum, c) => sum + parseInt(c.price), 0) * 0.8;

  // 3. State cho danh sách học sinh
  const [students, setStudents] = useState([]);

  // Fetch danh sách học sinh
  useEffect(() => {
    if (currentUser?.id) {
        fetch(`${API_URL}/get_my_students.php?teacher_id=${currentUser.id}`)
            .then(r => r.json())
            .then(data => setStudents(Array.isArray(data) ? data : []))
            .catch(e => console.error(e));
    }
  }, [currentUser]);

  // --- LOGIC HỎI ĐÁP (QA) ---
  const [questions, setQuestions] = useState([
    { id: 1, student: 'Nguyễn Văn An', avatar: 'https://i.pravatar.cc/150?img=11', course: 'Toán 12 - Ôn thi THPTQG', content: 'Thầy ơi, cho em hỏi ở phút 15:30 bài Cực trị, tại sao đạo hàm lại đổi dấu ạ?', time: '2 giờ trước', status: 'pending', reply: '' },
    { id: 2, student: 'Trần Thị Bích', avatar: 'https://i.pravatar.cc/150?img=5', course: 'Hóa Học 12: Este - Lipit', content: 'Phản ứng xà phòng hóa có cần đun nóng không cô?', time: '5 giờ trước', status: 'replied', reply: 'Chào em, phản ứng này cần đun nhẹ để xảy ra nhanh hơn nhé!' },
    { id: 3, student: 'Lê Tuấn', avatar: 'https://i.pravatar.cc/150?img=3', course: 'Vật Lý 12: Điện Xoay Chiều', content: 'Thầy giải thích lại giúp em đoạn giản đồ vector được không ạ? Em chưa hiểu lắm.', time: '1 ngày trước', status: 'pending', reply: '' },
  ]);
  const [replyText, setReplyText] = useState('');
  const [activeQ, setActiveQ] = useState(null);

  const handleReply = (qId) => {
    if (!replyText.trim()) return;
    const updatedQuestions = questions.map(q => q.id === qId ? { ...q, status: 'replied', reply: replyText } : q);
    setQuestions(updatedQuestions);
    setReplyText('');
    setActiveQ(null);
    alert("Đã gửi câu trả lời thành công!");
  };

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

      {/* --- TAB LỊCH DẠY --- */}
      {activeTab === 'schedule' && (
         <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2"><Users className="text-indigo-600"/> Danh sách học viên & Lớp học</h3>
            
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

            <div>
                <h4 className="text-sm font-black text-slate-400 uppercase mb-4">Phòng học trực tuyến</h4>
                <div className="grid grid-cols-1 gap-4">
                    {myCourses.map(c => (
                        <div key={c.id} className="flex justify-between items-center p-5 border border-slate-100 rounded-2xl hover:border-indigo-500 transition-all">
                             <div><h5 className="font-bold text-slate-800 text-lg">{c.title}</h5><p className="text-sm text-slate-500">Phòng chờ giảng viên</p></div>
                             <a href={c.meeting_link || "https://zoom.us/start/videomeeting"} target="_blank" rel="noreferrer" className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 flex items-center gap-2"><Video size={18}/> Vào lớp ngay</a>
                        </div>
                    ))}
                </div>
            </div>
         </div>
      )}

      {/* --- TAB HỎI ĐÁP (QA) - ĐÃ CÓ CHỨC NĂNG --- */}
      {activeTab === 'qa' && (
         <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2"><MessageCircle className="text-indigo-600"/> Hỏi đáp với học viên</h2>
                <div className="bg-white border p-1 rounded-lg flex gap-1"><button className="px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-md font-bold text-sm">Tất cả</button><button className="px-4 py-1.5 text-slate-500 hover:bg-slate-50 rounded-md font-bold text-sm">Chưa trả lời</button></div>
            </div>

            <div className="space-y-6">
                {questions.map((q) => (
                    <div key={q.id} className={`bg-white p-6 rounded-[24px] border transition-all ${q.status === 'pending' ? 'border-indigo-200 shadow-md ring-1 ring-indigo-100' : 'border-slate-100 shadow-sm'}`}>
                        <div className="flex gap-4 mb-4">
                            <img src={q.avatar} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <div><h4 className="font-bold text-slate-900">{q.student}</h4><p className="text-xs text-slate-500 font-medium flex items-center gap-1"><BookOpen size={12}/> {q.course} • <Clock size={12}/> {q.time}</p></div>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${q.status === 'pending' ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>{q.status === 'pending' ? 'Chưa trả lời' : 'Đã xong'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-2xl mb-4 text-slate-700 font-medium border border-slate-100">"{q.content}"</div>
                        {q.status === 'replied' ? (
                            <div className="flex gap-4 pl-4 border-l-2 border-emerald-200"><div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0"><User size={16}/></div><div><p className="text-xs font-bold text-slate-500 uppercase mb-1">Câu trả lời của bạn</p><p className="text-slate-800">{q.reply}</p></div></div>
                        ) : (
                            <div>
                                {activeQ === q.id ? (
                                    <div className="animate-fade-in">
                                        <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Nhập câu trả lời..." className="w-full p-4 bg-white border-2 border-indigo-100 rounded-xl focus:border-indigo-500 outline-none transition-all font-medium text-slate-700 h-32 resize-none" autoFocus></textarea>
                                        <div className="flex justify-end gap-2 mt-3"><button onClick={() => setActiveQ(null)} className="px-4 py-2 text-slate-500 font-bold hover:bg-slate-100 rounded-lg">Hủy</button><button onClick={() => handleReply(q.id)} className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-700 transition-all flex items-center gap-2"><MessageSquare size={18}/> Gửi phản hồi</button></div>
                                    </div>
                                ) : (
                                    <button onClick={() => { setActiveQ(q.id); setReplyText(''); }} className="text-indigo-600 font-bold text-sm hover:underline flex items-center gap-1"><MessageSquare size={16}/> Viết câu trả lời</button>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
         </div>
      )}
    </div>
  );
};
export default TeacherView;