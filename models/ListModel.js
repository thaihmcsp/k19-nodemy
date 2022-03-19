const mongoose = require('./connectDB')                // gọi mongoose vào để dùng'

const ListSchema = mongoose.Schema({
  listName: String,
  userID: {
    type: String,
    ref: 'user'
  }
}, {collection: 'list'})

const ListModel = mongoose.model('list', ListSchema)

module.exports = ListModel

