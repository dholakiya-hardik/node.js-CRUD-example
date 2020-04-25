const mysql=require('mysql');
const config =require("../config/config")
const connection=mysql.createConnection(config.MYSQL);
connection.connect(function(error){
   if(!!error){
     console.log(error);
   }else{
     console.log('Connected!:)');
   }
 });  
module.exports = connection; 