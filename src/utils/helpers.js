// src/utils/helpers.js

export const API_URL = 'http://localhost:8080/Course-Online/api'; // <--- Kiểm tra kỹ Port 8080 hay 80

export const getEmbedLink = (url) => {
  if (!url) return '';

  // 1. Nếu link đã là dạng nhúng (embed) -> Giữ nguyên
  if (url.includes('/embed/')) return url;

  // 2. Nếu link dạng thường (youtube.com/watch?v=ID) -> Chuyển đổi
  if (url.includes('v=')) {
      return `https://www.youtube.com/embed/${url.split('v=')[1].split('&')[0]}`;
  }

  // 3. Nếu link dạng rút gọn (youtu.be/ID) -> Chuyển đổi
  if (url.includes('youtu.be/')) {
      return `https://www.youtube.com/embed/${url.split('youtu.be/')[1].split('?')[0]}`;
  }

  return url;
};

export const formatMoney = (amount) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};