const mongoose = require('mongoose')                // gọi mongoose vào để dùng'

mongoose.connect('mongodb+srv://nodemy:nodemy1234@cluster0.10m5w.mongodb.net/K20?retryWrites=true&w=majority');

module.exports = mongoose