### ỨNG DỤNG QUẢN LÝ LÀNG NGHỀ

#### CÁC CÔNG NGHỆ LIÊN QUAN

- MongoDB cho cơ sở dữ liệu
- ReactJs, React native cho frontend
- Nodejs, Express cho backend

#### CÁCH SỬ DỤNG

Lấy dự án về máy vật lý

`Git clone https://github.com/thcuong1999/luan_van_tca.git`

Cài đặt các module cho ứng dụng chạy trên web

`cd frontend`

`npm i`

Cài đặt các module cho ứng dụng chạy trên di động

`cd mobile`

`npm i`

#### Các lệnh để khởi chạy ứng dụng

Khởi động máy chủ

`cd api`

`npm start`

Khởi động ứng dụng trên web

`cd frontend`

`npm start`

Khởi động ứng dụng trên di động

`cd mobile`

`npm start`

# Cú pháp export toàn bộ database ra một thư mục (Gồm một số file)

mongodump -d database_name -o output_directory

Ví dụ:
Export toàn bộ cơ sở dữ liệu myfirstdb ra thư mục C:/test
mongodump -d myfirstdb -o C:/test

# Cú pháp import toàn bộ một database ở dạng đơn giản nhất.

mongorestore -d database_name path_to_database

Ví dụ:
Import cơ sở dữ liệu từ thư mục export trước đó vào cơ sở dữ liệu: mydb2
mongorestore -d mydb2 C:\test\myfirstdb

#### Chú ý :

Các dữ liệu import và export sẽ được lưu vào folder database-backup

Nhớ tắt tất cả dịch vụ chạy trên cổng đã sử dụng

- App server là 5000
- App web là 3000
- App mobile là 19002

Nhớ thay đổi lại link kết nối đến database trong file .env của thư mục api

Trong api > database > config.js, kiểm tra code kết nối database có đúng với trong file .env

Trong mobile > src > api > axiosClient.js, lấy địa chỉ Ipv4 của máy vật lý thay vào baseURL
