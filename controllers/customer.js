var connection  = require('../helper/dbConnection');


module.exports = {
/* GET home page. */
getCustomerList(req, res, next) {
    console.log("in index page")
   connection.query('SELECT * FROM customers ORDER BY id desc',function(err,rows)     {
      if(err){
       req.flash('error', err); 
       res.render('customers',{page_title:"Customers - Node.js",data:''});   
      }else{
          
          res.render('customers',{page_title:"Customers - Node.js",data:rows});
      }
                          
       });
      
  },
// SHOW ADD USER FORM
 createCustomer(req, res, next){    
  // render to views/user/add.ejs
  res.render('customers/customerForm', {
      title: 'Add New Customers',
      id:'',
      name: '',
      email: ''        
  })
},
// ADD NEW USER POST ACTION
saveCustomer(req, res, next){
    console.log("req.body",req.body)         
      var user = {
          name: req.body.name.trim(),
          email: req.body.email.trim()
      }
       
   connection.query('INSERT INTO customers SET ?', user, function(err, result) {
              //if(err) throw err
              if (err) {
                  req.flash('error', err)
                   
                  // render to views/user/add.ejs
                  res.render('customers/customerForm', {
                      title: 'Add New Customer',
                      name: user.name,
                      email: user.email                    
                  })
              } else {                
                  req.flash('success', 'Data added successfully!');
                  res.redirect('/customer/list');
              }
          })
},

// SHOW EDIT USER FORM
editCustomer(req, res, next){

connection.query('SELECT * FROM customers WHERE id = ' + req.params.id, function(err, rows, fields) {
          if(err) throw err
           
          // if user not found
          if (rows.length <= 0) {
              req.flash('error', 'Customers not found with id = ' + req.params.id)
              res.redirect('/customer')
          }
          else { // if user found
              // render to views/user/edit.ejs template file
              res.render('customers/customerForm', {
                  title: 'Edit Customer', 
                  //data: rows[0],
                  id: rows[0].id,
                  name: rows[0].name,
                  email: rows[0].email                    
              })
          }            
      })

},

// EDIT USER POST ACTION
updateCustomer(req, res, next) {

      var user = {
          name: req.body.name.trim(),
          email: req.body.email.trim()
      }
       
connection.query('UPDATE customers SET ? WHERE id = ' + req.params.id, user, function(err, result) {
              //if(err) throw err
              if (err) {
                  req.flash('error', err)
                   
                  // render to views/user/add.ejs
                  res.render('customers/customerForm', {
                      title: 'Edit Customer',
                      id: req.params.id,
                      name: req.body.name,
                      email: req.body.email
                  })
              } else {
                  req.flash('success', 'Data updated successfully!');
                  res.redirect('/customer/list');
              }
          })
       
},
     
// DELETE USER
deleteCustomer(req, res, next) {
  var user = { id: req.params.id }
   
connection.query('DELETE FROM customers WHERE id = ' + req.params.id, user, function(err, result) {
          //if(err) throw err
          if (err) {
              req.flash('error', err)
              // redirect to users list page
              res.redirect('/customers')
          } else {
              req.flash('success', 'Customer deleted successfully! id = ' + req.params.id)
              // redirect to users list page
              res.redirect('/customers')
          }
      })
 }
}
