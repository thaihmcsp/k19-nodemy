const mongoose = require('mongoose')                // gọi mongoose vào để dùng'

mongoose.connect('mongodb://localhost/K20');        // liên kết nodejs với mongoDB

const UserSchema = mongoose.Schema({                // tạo ra cấu trúc bảng data
  username: String,
  password: String,
  active: Boolean,
  age: Number,
  mark: Number,
  role: String,
  token: String,
  avatar: String
}, {collection: 'user'})                            // đặt tên cho bảng data

const UserModel = mongoose.model('user', UserSchema)// tạo ra công cụ để thêm sửa xóa data vào bảng

module.exports = UserModel

