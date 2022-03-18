const router = require('express').Router()
const path = require('path')
const {checkLogin, checkUser, checkRole} = require('../checkLogin')
const UserModel = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const ListModel = require('../models/ListModel')

router.get('/test', async function(req,res){
  try {
    const listData = await UserModel.find()
    // console.log(listData);
    res.render('test', { list: listData})
  } catch (error) {
    res.status(500).json({mess:'loi server'})
  }
})

router.get('/home', function(req,res){ // gửi 1 thông điệp về đường dẫn /home
  res.sendFile(path.join(__dirname, ('../views/home.html')))
})

router.get('/signup', function(req, res){
  res.sendFile(path.join(__dirname,'../views/signup.html'))
})

router.get('/job', checkLogin, function(req,res){
  res.sendFile(path.join(__dirname, '../views/todo.html'))
})

// router.get('/list', checkLogin, function(req,res){
//   res.sendFile(path.join(__dirname, '../views/list.html'))
// })

router.get('/signin', checkUser ,function(req,res){
  res.sendFile(path.join(__dirname,'../views/signin.html'))
})

router.get('/admin', checkRole ,function(req,res){
  res.sendFile(path.join(__dirname, '../views/admin.html'))
})
router.get('/profile', function(req,res){
  res.sendFile(path.join(__dirname, '../views/profile.html'))
})

router.get('/test1', function(req,res){
  setTimeout(function(){
    res.json('da het 3s')
  }, 3000)
})

router.get('/test2', function(req,res){
  setTimeout(function(){
    res.json('da het 4s')
  }, 4000)
})

router.get('/daskboard', function(req,res){
  res.render('daskboard/daskboard')
})

router.get('/daskboard/user', function(req,res){
  res.render('daskboard/daskboardUser')
})

router.get('/list', checkLogin ,async function(req,res){
  try {
    const listData = await ListModel.find({userID: req.id})
    res.render('pages/listPage/list', {listData})
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router