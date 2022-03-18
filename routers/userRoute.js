const express = require('express')
const router = express.Router()
const UserModel = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const multer = require('multer')
const path = require('path')
const { fsync } = require('fs')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

router.put('/:id/profile', upload.fields([{ name: 'avatar', maxCount: 5 }, { name: 'cmt', maxCount: 5 }]), async function (req, res, next) {
  try {
    // await UserModel.updateOne({_id: req.params.id}, {avatar: req.file.path})
    console.log(23, req.body);
    console.log(24, req.files);
    res.json('ok')
  } catch (error) {
    console.log(error);
    res.status(500).json({mess:'loi server'})
  }
})


router.get('/', function(req,res){
  UserModel.find()
  .then(function(data){
    res.json(data)
  })
  .catch(function(err){
    console.log(err);
  })
})

router.post('/login', async function(req,res){
  try {
    const user = await UserModel.findOne({username: req.body.username})
    if(user){
      const checkPass = await bcrypt.compare(req.body.password, user.password)
      if(checkPass){
        const token = jwt.sign({id: user._id}, 'thai')
        await UserModel.updateOne({_id:user._id}, {token: token})
        res.cookie('user', token, {expires: new Date( Date.now() + 7*24*60*60*1000) })
        res.status(200).json({mess: 'thanh cong'})
      }else{
        res.status(400).json({mess:'sai password'})
      }
    }else{
      res.status(400).json({mess:'sai username'})
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
})

router.put('/logout', function(req,res){
  let token = req.cookies.user
  UserModel.updateOne({token: token},{
    token:''
  })
  .then(function(data){
    res.status(200).json({mess:'logout ok'})
  }).catch(function(err){
    res.status(500).json(err)
  })
})

router.post('/create', function(req,res){
  UserModel.findOne({username:req.body.username})
  .then(function(data){
    if(data){
      res.status(400).json({mess: 'user da ton tai'})
    }else{
      bcrypt.hash(req.body.password, 10 )
      .then(function(hash){
        UserModel.create({username:req.body.username, password: hash})
        .then( async function(data){
          // res.json(data);
          try {
            const listData = await UserModel.find()
            res.render('components/listUser', { list: listData})
          } catch (error) {
            res.json(error)
          }
        })
      })
    }
  })
  .catch(function(err){
    res.status(500).json(err);
  })
  
})

router.get('/list', function(req,res){
  UserModel.find()
  .skip((req.query.page - 1) * req.query.limit)
  .limit(req.query.limit)
  .then(function(data){
    res.json(data);
  }).catch(function(err){
    res.json(err);
  })
})

router.get('/:id', function(req,res){
  UserModel.findOne({_id: req.params.id})
  .then(function(data){
    if(data){
      res.json(data)
    }else{
      res.json('user khong ton tai')
    }
  })
  .catch(function(err){
    console.log(err);
  })
})

router.delete('/:id', async function(req,res){
  try {
    await UserModel.deleteOne({_id: req.params.id})
    const listData = await UserModel.find()
    res.render('components/listUser', {list : listData })
    // res.status(200).json({mess:'thanh cong'})
  } catch (error) {
    res.status(500).json(err);

  }
})
module.exports = router