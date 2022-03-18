const mongoose = require('mongoose')                // gọi mongoose vào để dùng'

mongoose.connect('mongodb://localhost/K20');

const ListSchema = mongoose.Schema({
  listName: String,
  userID: {
    type: String,
    ref: 'user'
  }
}, {collection: 'list'})

const ListModel = mongoose.model('list', ListSchema)

module.exports = ListModel