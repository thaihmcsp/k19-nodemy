const router = require('express').Router()
const TodoModel = require('../models/TodoModel')
const {checkLogin, checkUser, checkRole} = require('../checkLogin')

router.get('/', function(req,res){
  TodoModel.find()
  .then(function(data){
    res.json({data})
  })
  .catch(function(err){
    res.json({mess:'that bai', err})
  })
})

router.post('/', checkLogin ,async function(req,res){
  try {
    let arr = req.headers.referer.split('/')
    let length = arr.length
    await TodoModel.create({
      userID: req.id ,
      listID: arr[length-1],
      status: req.body.status,
      name: req.body.name,
      deadline: new Date(req.body.deadline)
    })
    res.json({status: 200, mess:'ok'})
  } catch (error) {
    res.status(500).json({error})
  }
})



module.exports = router