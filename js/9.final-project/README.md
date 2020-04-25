# Mordern JavaScript

## 1. Npm, Babel, Webpack

- Npm - node package manage: để quản lý các package trong đó có Babel và Webpack.
- Babel: package hỗ trợ việc chuyển đổi ES6 (hoặc các phiên bản cao hơn) về ES5.
- Webpack: đóng gói file javascript từ source code thành distribution đến client.

## 2. Cách cài đặt npm, babel, webpack

1. Khởi tạo package.json

```
npm init
```

2. Cài đặt các dependencies

- Cài đặt development tool dependenceies:

```
npm install [package name] --save-dev
```

- Cài đặt library denpendencies:

```
npm install [package name] --save
```

- Cài đặt global:

```
npm install [package name] -g
```

3. Thiết lập cho webpack

Tạo file "webpack.config.js": 4 thành phần chính của webpack bao gồm entry, output, loaders và plugins.

- Entry: vị trí file js sẽ chạy đầu tiên (index.js).
- Output: vị trí của file kết quả bundle.js. **BẮT BUỘC** dưới dạng đường dẫn tuyệt đối (absolute path).
- Loaders:
  - webpack-dev-server: tự động cập nhật các thay đổi từ index.js ở src đến dist mà không cần phải lưu bundle.js xuống đĩa.
- Plugins:
  - HtmlWebpackPlugin: Tự động load các file html từ src lên dist và include bundle.js vào file html.