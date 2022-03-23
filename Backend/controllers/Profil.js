const mysqlconnection = require ('../dataBase/mysql');
const fs = require('fs');

exports.modifyProfil = (req,res) => {
  mysqlconnection.query(
    "SQL REQ", (error, results)=>{
      if(error){
        console.log(error);
        res.status(500).json({error});
      }else{
        res.status(200).json({message : "Profil Modifié"});
      }
  })
};

exports.delete = (req,res) => {
  var usrID = req.params.usrID;
  console.log(usrID);
  mysqlconnection.query(
    "DELETE FROM `users` WHERE `id_user` =?",usrID, (error, results)=>{
      if(error){
        console.log(error);
        res.status(500).json({error});
      }else{
        res.status(200).json({message : "Profil deleted"});
      }
  })
};