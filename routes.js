const express = require('express');
const router = express.Router();
const connection  = require('./helper/dbConnection');
const customerController  = require('./controllers/customer');

router.get('/', function(req, res){ res.render('home')}) 
  
router.get('/customer/list', customerController.getCustomerList); 
router.get('/customer/add', customerController.createCustomer)
router.post('/customer/add', customerController.saveCustomer)
router.get('/customer/edit/(:id)', customerController.editCustomer)
router.post('/customer/update/:id', customerController.updateCustomer)
router.get('/customer/delete/(:id)', customerController.deleteCustomer)

module.exports = router;