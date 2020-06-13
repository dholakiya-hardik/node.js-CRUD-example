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
module.exports = {
    query( sql, args )
    {
        return new Promise( ( resolve, reject ) => {
            connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
};