const router = require('express').Router()
const {checkLogin, checkUser, checkRole} = require('../checkLogin')
const ListModel = require('../models/ListModel')
const TodoModel = require('../models/TodoModel')

router.post('/', checkLogin,  async function(req,res){
  try {
    const checkList = await ListModel.findOne({userID: req.id, listName: req.body.listName})
    if(!checkList){
      await ListModel.create({userID: req.id, listName: req.body.listName})
      const listData = await ListModel.find({userID: req.id})
      res.status(200).render('pages/listPage/listData', {listData})
    }else{
      res.status(400).json({mess: 'list da co'})
    }
  } catch (error) {
    res.status(500).json({mess: 'loi server', error})
  }
})

router.delete('/:id', checkLogin, async function(req,res){
  try {
    await TodoModel.deleteMany({listID:req.params.id})
    await ListModel.deleteOne({_id:req.params.id})
    const listData = await ListModel.find({userID: req.id})
    res.status(200).render('pages/listPage/listData', {listData})
  } catch (error) {
    res.status(500).json({mess: 'loi server', error})
  }
})

router.get('/:id', async function(req,res){
  try {
    const listTodo = await TodoModel.find({listID: req.params.id})
    res.render('pages/todoPage/todo', {listTodo, status: ['todo', 'doing', 'done']})
  } catch (error) {
    res.status(500).json({mess: 'loi server', error})
  }
})
module.exports = router