const mongoose = require('mongoose')                // gọi mongoose vào để dùng'

mongoose.connect('mongodb://localhost/K20');

const TodoSchema = mongoose.Schema({
  status: String,
  name: String,
  deadline: Date,
  userID: {
    type: String,
    ref: 'user'
  },
  listID: {
    type: String,
    ref: 'list'
  }
},{collection: 'todo'})

const TodoModel = mongoose.model('todo', TodoSchema)

module.exports = TodoModel