export const API_URL = 'http://127.0.0.1:8888/web-ban-khoa-hoc/api';

export const formatMoney = (amount) => 
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

export const getEmbedLink = (url) => {
  if (!url) return "https://www.youtube.com/embed/jfKfPfyJRdk";
  const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
  return (match && match[2].length === 11) 
    ? `https://www.youtube.com/embed/${match[2]}?autoplay=0&rel=0` 
    : url;
};