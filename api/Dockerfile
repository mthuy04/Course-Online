# Sử dụng PHP phiên bản mới nhất kèm Apache
FROM php:8.2-apache

# Cài đặt extension để kết nối Database (quan trọng nhất)
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli

# Copy toàn bộ code vào server
COPY . /var/www/html/

# Mở cổng 80 (Mặc định của Render)
EXPOSE 80