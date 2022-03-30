const mysql = require('mysql');
require('dotenv').config();

//connexion a mysql
const mysqlconnection = mysql.createConnection({
  host:'localhost',
  database: 'reseau_social',
  user: 'root',
  password: '',
  multipleStatements: true
});
  
  mysqlconnection.connect((err) => {
    if(err){
      console.log(`error connecting: ${err}`);
    }else{
      console.log("connecté à la base de donnée reseau social")
      console.log(`connected as id ${mysqlconnection.threadId}`);

    }
  });
 
  module.exports = mysqlconnection;