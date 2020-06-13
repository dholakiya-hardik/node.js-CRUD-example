const express = require('express');
const router = express.Router();
// const userController  = require('./controllers/mysql.user');
const userController  = require('./controllers/mongoose.user');

router.get('/', function(req, res){ res.render('home')}) 
  
router.get('/user/list', userController.getUserList); 
router.get('/user/add', userController.createUser)
router.post('/user/add', userController.saveUser)
router.get('/user/edit/(:id)', userController.editUser)
router.post('/user/update/:id', userController.updateUser)
router.get('/user/delete/(:id)', userController.deleteUser)

module.exports = router;