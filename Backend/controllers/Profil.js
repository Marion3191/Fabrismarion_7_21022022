const mysqlconnection = require ('../dataBase/mysql');
const fs = require('fs');



exports.uploadPics = (req, res) => {
  let dataCom = [
    imageUrl= `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    req.params.usrID,
  ]

  mysqlconnection.query(
    "UPDATE `users` SET `urlAvatar`=? WHERE `id_user`=?",dataCom, (error, results)=>{
      if(error){
        console.log(error);
        res.status(500).json({error});
      }else{
        res.status(200).json({message : "Profil Modifié"});
      }
  })
 
};

exports.getPicsUrl = (req, res) => {
  let usrID = req.params.usrID;

  mysqlconnection.query(
    "SELECT `urlAvatar` FROM `users` WHERE `id_user`=?",usrID, (error, results)=>{
      if(error){
        console.log(error);
        res.status(500).json({error});
      }else{
        res.status(200).json({message : "Profil Modifié"});
      }
  })
};

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
  let dataCom = [
    req.params.usrID,
  ]

  var sql_string ="DELETE FROM `posts` WHERE `posts`.`id_user` = ";
  sql_string += dataCom;
  sql_string += ";";
  sql_string += "DELETE FROM `users` WHERE `id_user` =";
  sql_string += dataCom;
  sql_string += ";";
  sql_string += "DELETE FROM `commentaires` WHERE `commentaires`.`id_user` = ";
  sql_string += dataCom;

  console.log(sql_string);
  mysqlconnection.query(
    sql_string, (error, results)=>{
      if(error){
        console.log(error);
        res.status(500).json({error});
      }else{
        res.status(200).json({message : "Profil deleted"});
      }
  })
};