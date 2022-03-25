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
  /*
  try {
    if (req.file) {
      req.file.toFile(path.resolve(req.file.destination , req.file.filename));
      // Vous pouvez utiliser ces variables pour faire des insertions en base de données ou autre
      let filename = req.file.filename;
    }
    res.send('Upload fini');
  } catch (e) {
    res.status(400).json(e);
  }*/
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