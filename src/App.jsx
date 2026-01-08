import { useEffect, useState } from 'react';
import {
  LayoutDashboard, BookOpen, ShoppingBag, Users, BarChart3, Bell, Search, PlayCircle,
  Sparkles, MessageCircle, Calendar, FileText, Settings, DollarSign, Megaphone,
  Star, CheckCircle2, Clock, ChevronDown, ChevronUp, User, HelpCircle, Gift
} from 'lucide-react';
import { API_URL, getEmbedLink, formatMoney } from './utils/helpers';
import { SidebarItem, Modal } from './components/Common';
import StudentView from './pages/StudentView';
import TeacherView from './pages/TeacherView';
import AdminView from './pages/AdminView';
import LandingPage from './pages/LandingPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('student');
  const [page, setPage] = useState('home');
  const [courses, setCourses] = useState([]);
  const [cart, setCart] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const [stats, setStats] = useState({ revenue: 0, users: 0, courses: 0, transactions: [] });

  // STATE MODAL & DATA
  const [activeModal, setActiveModal] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [lessonList, setLessonList] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [detailTab, setDetailTab] = useState('intro'); // intro | lessons | reviews

  // FORM DATA
  const [formData, setFormData] = useState({ id: null, title: '', price: '', level: 'cap1', teacher_name: '', description: '', video: '', image: '', lessons: [] });
  const [isLoading, setIsLoading] = useState(false);

  // --- API ---
  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/data.php`);
      const data = await res.json();
      setCourses(Array.isArray(data) ? data : []);
      if (role === 'admin') {
        const resStats = await fetch(`${API_URL}/stats.php`);
        setStats(await resStats.json());
      }
    } catch (e) { console.error(e); }
  }; // Đã sửa lỗi thừa dấu } tại đây

  useEffect(() => { if (isLoggedIn) fetchData(); }, [role, isLoggedIn]);

  const fetchLessons = (courseId, cb) => {
    fetch(`${API_URL}/get_lessons.php?id=${courseId}`)
      .then(r => r.json())
      .then(d => {
        const lessons = Array.isArray(d) ? d : (d.lessons || []);
        setLessonList(lessons);
        if (lessons.length > 0) {
          setCurrentLesson(lessons[0]); // Tự động chọn bài đầu tiên
        }
        if (cb) cb(lessons);
      })
      .catch(err => console.error("Lỗi tải bài học:", err));
  };

  // --- HANDLERS ---
  const handleOpenDetail = (course) => {
    setSelectedCourse(course);
    setDetailTab('intro');
    fetchLessons(course.id);
    setActiveModal('detail');
  };

const handleSaveCourse = () => {
    // 1. Validate cơ bản trước khi gửi
    if (!formData.title) {
        alert("Vui lòng nhập tên khóa học!");
        return;
    }

    setIsLoading(true);
    const url = formData.id ? '/update.php' : '/add.php';
    
    // 2. Chuẩn bị dữ liệu gửi đi (Payload)
    const payload = {
        ...formData,
        id: formData.id, // Đảm bảo gửi ID nếu là update
        price: formData.price ? parseInt(formData.price) : 0, // Ép kiểu số cho an toàn
        // Logic tên giảng viên:
        teacher_name: role === 'admin' ? (formData.teacher_name || 'Admin Hệ Thống') : 'Giảng viên (Tôi)',
        video: getEmbedLink(formData.video),
        image: formData.image || 'https://img.freepik.com/free-vector/online-learning-isometric-concept_1284-17947.jpg'
    };

    console.log("Dữ liệu đang gửi đi:", payload); // [DEBUG] Xem log để check dữ liệu

    fetch(`${API_URL}${url}`, { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload) 
    })
    .then(r => r.json())
    .then(d => {
        console.log("Backend trả về:", d); // [DEBUG] Xem backend trả về gì

        if (d.success) {
            // QUAN TRỌNG: Lấy ID khóa học vừa tạo (nếu là add) hoặc ID cũ (nếu là update)
            const cid = formData.id || d.id; 

            if (!cid) {
                alert("Lỗi: Backend không trả về ID khóa học mới. Kiểm tra file add.php!");
                setIsLoading(false);
                return;
            }

            // Gửi mảng lessons để lưu vào database bài giảng
            fetch(`${API_URL}/save_lessons.php`, { 
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ course_id: cid, lessons: formData.lessons }) 
            })
            .then(r => r.text()) // Dùng text() trước để tránh lỗi nếu backend trả về lỗi PHP (HTML)
            .then(responseString => {
                console.log("Save lessons response:", responseString); // [DEBUG]
                
                try {
                   // Thử parse JSON, nếu backend in ra lỗi PHP thì sẽ bắt ở catch
                   const result = JSON.parse(responseString); 
                   // Hoặc nếu backend của bạn không trả về json ở save_lessons thì bỏ qua dòng này
                } catch (e) {
                   console.warn("Save lessons không trả về JSON chuẩn, nhưng vẫn tiếp tục.");
                }

                alert(formData.id ? "✅ Cập nhật thành công!" : "✅ Tạo khóa học mới thành công!");
                setActiveModal(null);
                fetchData(); // Load lại danh sách
            })
            .catch(err => console.error("Lỗi lưu bài học:", err));

        } else {
            alert("Lỗi từ server: " + (d.message || "Không xác định"));
        }
    })
    .catch(err => {
        console.error("Lỗi kết nối API:", err);
        alert("Không thể kết nối đến Server. Vui lòng kiểm tra Console.");
    })
    .finally(() => {
        setIsLoading(false);
    });
};

  const handlePayment = () => {
    const total = cart.reduce((t, c) => t + parseInt(c.price), 0);
    fetch(`${API_URL}/buy.php`, { method: 'POST', body: JSON.stringify({ user_id: 1, total: total }) })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setMyCourses([...myCourses, ...cart]);
          setCart([]);
          fetchData();
          alert("🎉 Thanh toán thành công!");
          setPage('my-learning');
        } else alert("Lỗi: " + data.message);
      });
  };

  const handleDeleteCourse = (course) => {
    if (!confirm(`Bạn có chắc muốn xóa khóa học: "${course.title}"?\nHành động này không thể hoàn tác!`)) return;

    // Gọi API xóa
    fetch(`${API_URL}/delete.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: course.id })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert("✅ Đã xóa khóa học thành công!");
          // Cập nhật lại giao diện ngay lập tức
          setCourses(courses.filter(c => c.id !== course.id));
          fetchData(); // Load lại số liệu thống kê nếu cần
        } else {
          alert("❌ Lỗi: " + data.message);
        }
      })
      .catch(err => console.error("Lỗi xóa:", err));
  };

  if (!isLoggedIn) return <LandingPage onLoginClick={() => setIsLoggedIn(true)} />;

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800">
      {/* SIDEBAR */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col p-5 hidden md:flex z-30 shadow-sm">
        <div className="flex items-center gap-3 mb-10 px-2"><div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg ${role === 'admin' ? 'bg-slate-900' : role === 'teacher' ? 'bg-purple-600' : 'bg-indigo-600'}`}><BookOpen size={24} /></div><h1 className="text-2xl font-black text-slate-900">StudyHub.</h1></div>
        <nav className="flex-1 space-y-2 mt-6 overflow-y-auto custom-scrollbar">
          {role === 'student' && <><div className="text-xs font-black text-slate-400 uppercase tracking-wider px-4 mb-2 mt-4">Học tập</div><SidebarItem id="home" icon={LayoutDashboard} label="Khám phá" active={page === 'home'} onClick={setPage} /><SidebarItem id="ai-planner" icon={Sparkles} label="Lộ trình AI" active={page === 'ai-planner'} onClick={setPage} /><SidebarItem id="my-learning" icon={PlayCircle} label="Góc học tập" active={page === 'my-learning'} onClick={setPage} /><div className="text-xs font-black text-slate-400 uppercase tracking-wider px-4 mb-2 mt-6">Cá nhân</div><SidebarItem id="cart" icon={ShoppingBag} label="Balo của bạn" active={page === 'cart'} onClick={setPage} badge={cart.length} /><SidebarItem id="community" icon={Users} label="Cộng đồng" active={page === 'community'} onClick={setPage} /><SidebarItem id="cert" icon={FileText} label="Chứng chỉ" active={page === 'cert'} onClick={setPage} /></>}
          {role === 'teacher' && <><div className="text-xs font-black text-slate-400 uppercase tracking-wider px-4 mb-2 mt-4">Giảng dạy</div><SidebarItem id="home" icon={LayoutDashboard} label="Tổng quan" active={page === 'home'} onClick={setPage} /><SidebarItem id="schedule" icon={Calendar} label="Lịch dạy" active={page === 'schedule'} onClick={setPage} /><SidebarItem id="qa" icon={MessageCircle} label="Hỏi đáp" active={page === 'qa'} onClick={setPage} /></>}
          {role === 'admin' && <><div className="text-xs font-black text-slate-400 uppercase tracking-wider px-4 mb-2 mt-4">Quản trị</div><SidebarItem id="home" icon={BarChart3} label="Dashboard" active={page === 'home'} onClick={setPage} /><SidebarItem id="finance" icon={DollarSign} label="Tài chính" active={page === 'finance'} onClick={setPage} /><SidebarItem id="users" icon={Users} label="Người dùng" active={page === 'users'} onClick={setPage} /><SidebarItem id="marketing" icon={Megaphone} label="Marketing" active={page === 'marketing'} onClick={setPage} /><SidebarItem id="settings" icon={Settings} label="Cấu hình" active={page === 'settings'} onClick={setPage} /></>}
        </nav>
        <div className="mt-auto pt-6 border-t border-slate-100"><div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl mb-4"><img src={`https://ui-avatars.com/api/?name=${role}&background=random`} className="w-10 h-10 rounded-full" /><div className="flex-1"><p className="text-sm font-bold capitalize">{role}</p><p className="text-[10px] text-slate-500 uppercase font-bold">Online</p></div><button onClick={() => setIsLoggedIn(false)}><Bell size={16} /></button></div><div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-lg">{['student', 'teacher', 'admin'].map(r => (<button key={r} onClick={() => { setRole(r); setPage('home'); }} className={`text-[10px] font-bold uppercase py-1.5 rounded ${role === r ? 'bg-white shadow text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}>{r.substr(0, 3)}</button>))}</div></div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-50/50">
        <header className="h-20 bg-white/80 backdrop-blur border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-20"><div className="flex items-center gap-3 bg-slate-100 px-4 py-2.5 rounded-full w-96"><Search size={18} className="text-slate-400" /><input placeholder="Tìm kiếm..." className="bg-transparent border-none outline-none text-sm w-full" /></div><div className="flex gap-4"><button className="relative p-2.5 bg-white border rounded-full text-slate-600 hover:bg-slate-50"><Bell size={20} /></button></div></header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {role === 'student' && <StudentView
            page={page}
            setPage={setPage}
            courses={courses}
            cart={cart}
            myCourses={myCourses}
            handleAddToCart={(c) => setCart([...cart, c])}
            removeFromCart={(i) => setCart(cart.filter((_, idx) => idx !== i))}
            handlePayment={handlePayment}
            onOpenDetail={handleOpenDetail}
            onOpenPromo={() => setActiveModal('promo')}
            onOpenLearning={(c) => {
              setSelectedCourse(c);
              fetchLessons(c.id);
              setActiveModal('learning');
            }} />}
          {role === 'teacher' && <TeacherView courses={courses} onOpenUpload={() => { setFormData({ id: null, title: '', price: '', level: 'cap1', teacher_name: '', description: '', video: '', image: '', lessons: [] }); setActiveModal('upload'); }} onEditCourse={(c) => { fetchLessons(c.id, (l) => { setFormData({ ...c, lessons: l }); setActiveModal('upload'); }); }} page={page} />}
          {/* App.jsx */}
          {role === 'admin' && (
            <AdminView 
              courses={courses} 
              stats={stats} 
              onDeleteCourse={handleDeleteCourse} 
              page={page} 
              // Tên prop này phải viết chính xác từng chữ cái
              onAddNewCourse={() => {
                setFormData({ 
                  id: null, title: '', price: '', level: 'cap1', 
                  teacher_name: '', description: '', video: '', 
                  image: '', lessons: [] 
                });
                setActiveModal('upload');
              }}
              onEditCourse={(c) => { 
                fetchLessons(c.id, (l) => { 
                  setFormData({ ...c, lessons: l }); 
                  setActiveModal('upload'); 
                }); 
              }}
            />
          )}
        </div>
      </main>

      {/* --- MODAL CHI TIẾT --- */}
      {activeModal === 'detail' && selectedCourse && (
        <Modal title="Chi tiết khóa học" onClose={() => setActiveModal(null)} maxWidth="max-w-5xl">
          <div className="flex flex-col lg:flex-row gap-8 h-full">
            {/* CỘT TRÁI */}
            <div className="w-full lg:w-5/12 space-y-6">
              <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-lg border border-slate-100 relative group">
                {(selectedCourse.id == 4 || selectedCourse.id === '4') && (
                  <div className="absolute top-0 right-0 z-10">
                    <div className="bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-bl-2xl shadow-xl flex items-center gap-2 uppercase tracking-wider">
                      <span className="animate-pulse">🔥</span> BESTSELLER
                    </div>
                  </div>
                )}
                {selectedCourse.video ? (
                  <iframe className="w-full h-full" src={getEmbedLink(selectedCourse.video)} frameBorder="0" allowFullScreen></iframe>
                ) : (
                  <img src={selectedCourse.image} className="w-full h-full object-cover" />
                )}
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h2 className="text-2xl font-black text-slate-900 mb-2">{selectedCourse.title}</h2>
                <p className="text-3xl font-black text-indigo-600 mb-4">{parseInt(selectedCourse.price) === 0 ? 'Miễn phí' : formatMoney(selectedCourse.price)}</p>
                <button
                  onClick={() => { setCart([...cart, selectedCourse]); setActiveModal(null); }}
                  className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-lg shadow-xl hover:bg-indigo-600 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={20} /> Thêm vào giỏ
                </button>
                <div className="mt-6 space-y-3">
                  <div className="flex justify-between text-sm"><span className="text-slate-500">Giảng viên</span><span className="font-bold">{selectedCourse.teacher_name}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-slate-500">Thời lượng</span><span className="font-bold">{selectedCourse.duration || '20 giờ'}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-slate-500">Cấp độ</span><span className="font-bold uppercase">{selectedCourse.level}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-slate-500">Học viên</span><span className="font-bold">1,204</span></div>
                </div>
              </div>
            </div>

            {/* CỘT PHẢI */}
            <div className="flex-1 flex flex-col">
              <div className="flex border-b border-slate-200 mb-6">
                {[{ id: 'intro', l: 'Giới thiệu' }, { id: 'lessons', l: `Nội dung (${lessonList.length})` }, { id: 'reviews', l: 'Đánh giá' }].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setDetailTab(t.id)}
                    className={`px-6 py-3 font-bold text-sm transition-all border-b-2 ${detailTab === t.id ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                  >
                    {t.l}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 h-[400px]">
                {detailTab === 'intro' && (
                  <div className="space-y-4 text-slate-600 leading-relaxed">
                    <p className="font-medium text-lg text-slate-800">Bạn sẽ học được gì?</p>
                    <ul className="grid grid-cols-1 gap-2 mb-4">
                      {['Nắm vững kiến thức nền tảng.', 'Luyện tập với bộ đề thi thực chiến.', 'Giải đáp thắc mắc trực tiếp cùng giáo viên.', 'Chứng chỉ hoàn thành khóa học.'].map((item, i) => (
                        <li key={i} className="flex gap-2 items-start"><CheckCircle2 size={18} className="text-green-500 mt-0.5 shrink-0" /> <span>{item}</span></li>
                      ))}
                    </ul>
                    <p className="font-medium text-lg text-slate-800 mt-6">Mô tả chi tiết</p>
                    <p>{selectedCourse.description || "Khóa học được thiết kế độc quyền bởi đội ngũ giáo viên giàu kinh nghiệm tại StudyHub."}</p>
                  </div>
                )}

                {detailTab === 'lessons' && (
                  <div className="space-y-3">
                    {lessonList.length === 0 && <p className="text-slate-400 italic">Đang cập nhật nội dung...</p>}
                    {lessonList.map((l, i) => (
                      <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center group hover:bg-white hover:shadow-md transition-all cursor-default">
                        <div className="flex gap-3 items-center">
                          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">{i + 1}</div>
                          <div>
                            <p className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">{l.title}</p>
                            <p className="text-xs text-slate-500">{l.type === 'quiz' ? 'Bài kiểm tra' : 'Video bài giảng'} • {l.duration}</p>
                          </div>
                        </div>
                        {l.type === 'video' ? <PlayCircle size={18} className="text-slate-400" /> : <FileText size={18} className="text-slate-400" />}
                      </div>
                    ))}
                  </div>
                )}

                {detailTab === 'reviews' && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 bg-yellow-50 p-6 rounded-2xl">
                      <div className="text-center">
                        <p className="text-4xl font-black text-yellow-500">4.9</p>
                        <div className="flex text-yellow-400 text-xs mt-1"><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /></div>
                      </div>
                      <div className="flex-1 space-y-1">
                        {[5, 4, 3, 2, 1].map(star => (
                          <div key={star} className="flex items-center gap-2 text-xs text-slate-500">
                            <span className="w-2">{star}</span>
                            <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden"><div className="h-full bg-yellow-400" style={{ width: star === 5 ? '80%' : star === 4 ? '15%' : '5%' }}></div></div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="border-b border-slate-100 pb-4">
                          <div className="flex gap-3 items-center mb-2">
                            <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center font-bold text-xs text-slate-600"><User size={14} /></div>
                            <div><p className="font-bold text-sm text-slate-800">Học viên ẩn danh</p><div className="flex text-yellow-400 text-[10px]"><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /></div></div>
                          </div>
                          <p className="text-sm text-slate-600">Khóa học rất hay, thầy dạy dễ hiểu.</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* --- MODAL UPLOAD NÂNG CẤP --- */}
      {activeModal === 'upload' && (
        <Modal 
          title={formData.id ? "Cập nhật nội dung" : (role === 'admin' ? "Hệ thống: Khởi tạo khóa học" : "Soạn khóa học mới")} 
          onClose={() => setActiveModal(null)} 
          maxWidth="max-w-4xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* CỘT TRÁI: THÔNG TIN CHUNG */}
            <div className="space-y-4">
              {/* Chỉ Admin mới thấy ô nhập tên Giảng viên để khởi tạo khóa học */}
              {role === 'admin' && (
                <div className="space-y-2">
                  <label className="text-xs font-black text-indigo-600 uppercase">Phân công Giảng viên</label>
                  <input 
                    placeholder="Nhập tên giảng viên phụ trách..."
                    value={formData.teacher_name} 
                    onChange={e => setFormData({ ...formData, teacher_name: e.target.value })} 
                    className="w-full p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl font-bold outline-none focus:ring-2 ring-indigo-500" 
                  />
                </div>
              )}
      
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Tên khóa học</label>
                <input 
                  value={formData.title} 
                  onChange={e => setFormData({ ...formData, title: e.target.value })} 
                  className="w-full p-3 bg-slate-50 border rounded-xl font-bold outline-none focus:border-slate-400" 
                />
              </div>
      
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Học phí (VNĐ)</label>
                  <input 
                    type="number" 
                    value={formData.price} 
                    onChange={e => setFormData({ ...formData, price: e.target.value })} 
                    className="w-full p-3 bg-slate-50 border rounded-xl font-bold outline-none" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Cấp độ</label>
                  <select 
                    value={formData.level} 
                    onChange={e => setFormData({ ...formData, level: e.target.value })} 
                    className="w-full p-3 bg-slate-50 border rounded-xl outline-none font-bold"
                  >
                    <option value="cap1">Tiểu học (CAP1)</option>
                    <option value="cap2">THCS (CAP2)</option>
                    <option value="cap3">THPT (CAP3)</option>
                  </select>
                </div>
              </div>
      
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Link Video Giới thiệu</label>
                <input 
                  value={formData.video} 
                  onChange={e => setFormData({ ...formData, video: e.target.value })} 
                  placeholder="Youtube link..."
                  className="w-full p-3 bg-slate-50 border rounded-xl outline-none" 
                />
              </div>
            </div>
      
            {/* CỘT PHẢI: QUẢN LÝ DANH SÁCH BÀI GIẢNG (LESSONS) */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <label className="text-xs font-black text-slate-500 uppercase">Cấu trúc bài giảng ({formData.lessons.length})</label>
                <button 
                  onClick={() => setFormData({ ...formData, lessons: [...formData.lessons, { title: '', type: 'video', duration: '15:00' }] })} 
                  className="text-[10px] bg-slate-900 text-white px-3 py-1.5 rounded-lg font-bold hover:bg-indigo-600 transition-colors"
                >
                  + THÊM BÀI MỚI
                </button>
              </div>
      
              <div className="flex-1 overflow-y-auto space-y-3 max-h-[300px] pr-2 custom-scrollbar">
                {formData.lessons.length === 0 && (
                  <div className="text-center py-10 text-slate-400 text-xs italic">Chưa có bài giảng nào được thêm.</div>
                )}
                {formData.lessons.map((l, i) => (
                  <div key={i} className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm space-y-2">
                    <div className="flex gap-2 items-center">
                      <span className="text-[10px] font-black text-slate-400 w-4">{i + 1}</span>
                      <input 
                        placeholder="Tên bài học..."
                        value={l.title} 
                        onChange={e => {
                          const n = [...formData.lessons];
                          n[i].title = e.target.value;
                          setFormData({ ...formData, lessons: n });
                        }} 
                        className="flex-1 text-sm font-bold outline-none" 
                      />
                      <button 
                        className="text-slate-300 hover:text-red-500"
                        onClick={() => {
                          const n = [...formData.lessons];
                          n.splice(i, 1);
                          setFormData({ ...formData, lessons: n });
                        }}
                      >
                        <Search size={14} className="rotate-45" /> {/* Dùng tạm icon Search xoay làm dấu X nếu không import X */}
                      </button>
                    </div>
                    <div className="flex gap-4">
                        <select 
                          value={l.type}
                          onChange={e => {
                              const n = [...formData.lessons];
                              n[i].type = e.target.value;
                              setFormData({ ...formData, lessons: n });
                          }}
                          className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded"
                        >
                            <option value="video">Video</option>
                            <option value="quiz">Quiz</option>
                        </select>
                        <input 
                          placeholder="Thời lượng (vd: 10:00)"
                          value={l.duration}
                          onChange={e => {
                              const n = [...formData.lessons];
                              n[i].duration = e.target.value;
                              setFormData({ ...formData, lessons: n });
                          }}
                          className="text-[10px] font-medium text-slate-500 outline-none w-20"
                        />
                    </div>
                  </div>
                ))}
              </div>
      
              <button 
                onClick={handleSaveCourse} 
                disabled={isLoading || !formData.title} 
                className={`mt-6 w-full py-4 rounded-xl font-black text-sm tracking-widest transition-all ${isLoading ? 'bg-slate-200 text-slate-400' : 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:scale-[1.02]'}`}
              >
                {isLoading ? 'ĐANG XỬ LÝ...' : 'XÁC NHẬN LƯU HỆ THỐNG'}
              </button>
            </div>
          </div>
        </Modal>
      )}
      {/* --- MODAL HỌC TẬP (MÀN HÌNH XEM VIDEO) --- */}
      {activeModal === 'learning' && selectedCourse && (
        <Modal title={`Đang học: ${selectedCourse.title}`} onClose={() => setActiveModal(null)} maxWidth="max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-6 h-[80vh]">

            {/* CỘT TRÁI: Màn hình Video / Quiz */}
            <div className="flex-1 flex flex-col">
              <div className="flex-1 bg-black rounded-xl overflow-hidden shadow-lg relative group border border-slate-800">
                {currentLesson ? (
                  currentLesson.type === 'quiz' ? (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-white p-10 text-center">
                      <HelpCircle size={64} className="text-indigo-600 mb-4" />
                      <h3 className="text-2xl font-bold text-slate-800 mb-2">{currentLesson.title}</h3>
                      <p className="text-slate-500 mb-6">Đây là bài kiểm tra trắc nghiệm. Hãy làm bài cẩn thận nhé!</p>
                      <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700">Bắt đầu làm bài</button>
                    </div>
                  ) : (
                    <iframe
                      className="w-full h-full"
                      src={getEmbedLink(currentLesson.video_url || currentLesson.video)}
                      title="Lesson Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  )
                ) : (
                  <div className="flex items-center justify-center h-full text-white">Chọn một bài học để bắt đầu</div>
                )}
              </div>
              <div className="mt-4 flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200">
                <div>
                  <h3 className="font-bold text-lg text-slate-800">{currentLesson?.title || 'Chưa chọn bài'}</h3>
                  <p className="text-sm text-slate-500">Thời lượng: {currentLesson?.duration}</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 font-bold text-sm text-slate-600">Bài trước</button>
                  <button className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 font-bold text-sm text-white">Bài tiếp theo</button>
                </div>
              </div>
            </div>

            {/* CỘT PHẢI: Danh sách bài học */}
            <div className="w-full lg:w-80 flex flex-col bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-4 border-b border-slate-100 bg-slate-50">
                <h4 className="font-bold text-slate-800">Nội dung khóa học</h4>
                <p className="text-xs text-slate-500 mt-1">{lessonList.length} bài học</p>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
                {lessonList.map((l, i) => (
                  <div
                    key={i}
                    onClick={() => setCurrentLesson(l)}
                    className={`p-3 rounded-lg cursor-pointer transition-all flex gap-3 items-center ${currentLesson?.id === l.id ? 'bg-indigo-50 border border-indigo-100' : 'hover:bg-slate-50 border border-transparent'}`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${currentLesson?.id === l.id ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${currentLesson?.id === l.id ? 'text-indigo-700' : 'text-slate-700'}`}>{l.title}</p>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
                        {l.type === 'video' ? <PlayCircle size={10} /> : <HelpCircle size={10} />}
                        <span>{l.duration}</span>
                      </div>
                    </div>
                    {currentLesson?.id === l.id && <div className="w-2 h-2 rounded-full bg-indigo-600"></div>}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </Modal>
      )}

    </div>
  );
}

export default App;