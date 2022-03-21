const mysqlconnection = require ('../dataBase/mysql');
const fs = require('fs');


exports.createPost = (req,res, next) => {
  let data = [
    req.body.id_user,
    req.body.post,
    req.body.pseudo,
  ]

  mysqlconnection.query(
    "INSERT INTO `posts` (`id_user`, `message`,`pseudo`) VALUES (?,?,?)", data, (error, results)=>{
      if(error){
        console.log(error);
        res.status(500).json({error});
      }else{
        res.status(200).json({message : "post enregisté"});
      }
  })

};

exports.getAllPost = (req, res) => {
  mysqlconnection.query(
    "SELECT * FROM `posts` WHERE 1", (error, results) => {
      if(error){
        console.log(error);
        res.status(500).json({error});
      }else{
        console.log("results");
        console.log(results);
        res.status(200).json({results});
      }
    }
  )
};

exports.getAllCom = (req, res) => {
  mysqlconnection.query(
    "SELECT * FROM `commentaires` WHERE 1", (error, results) => {
      if(error){
        console.log(error);
        res.status(500).json({error});
      }else{
        console.log("results");
        console.log(results);
        res.status(200).json({results});
      }
    }
  )
};

exports.addCom = (req, res) => {
  let dataCom = [
    req.params.postID,
    req.body.id_user,
    req.body.com,
    req.body.pseudo,
  ]

  mysqlconnection.query(
    "INSERT INTO `commentaires`(`id_post`, `id_user`, `commentaire`,`pseudo`) VALUES (?,?,?,?)",dataCom, (error, results) => {
      if(error){
        res.status(500).json({error});
      }else{
        res.status(200).json({results});
      }
    }
  )
};

exports.deletePost = (req, res) => {
  let dataCom = [
    req.params.postID,
  ]

  var sql_string ="DELETE FROM `posts` WHERE `posts`.`id_post` = ";
  sql_string += dataCom;
  sql_string += ";";
  sql_string += "DELETE FROM `commentaires` WHERE `commentaires`.`id_post` = ";
  sql_string += dataCom;

  console.log(sql_string);
  mysqlconnection.query(
    sql_string , (error, results,fields) => {
      if(error){
        res.status(500).json({error});
      }else{
        res.status(200).json({results});
      }
    }
  )


};

exports.deleteCom = (req, res) => {
  let dataCom = [
    req.params.comID,
  ]
  console.log(req.params.comID)
  mysqlconnection.query(
    "DELETE FROM `commentaires` WHERE `commentaires`.`id_commentaire` = ?",dataCom, (error, results) => {
      if(error){
        res.status(500).json({error});
      }else{
        res.status(200).json({results});
      }
    }
  )
};

exports.updatePost= (req, res) => {
  let updatePost = [
    req.params.message,
    req.params.postID,
  ]
  //UPDATE `posts` SET `message`='plouf' WHERE `id_post`=1
//UPDATE `posts` SET `message`=? WHERE `id_post`=?
  mysqlconnection.query(
    "UPDATE `posts` SET `message`=? WHERE `id_post`=?",updatePost, (error, results) => {
      if(error){
        res.status(500).json({error});
      }else{
        console.log(res);
        res.status(200).json({results});
      }
    }
  )
};
exports.updateCom = (req, res) => {
  let updateCom = [
    req.params.message,
    req.params.comID,
  ]
  console.log("COM_UPDATE",  updateCom);

  //UPDATE `commentaires` SET `commentaire`='NEWKOM' WHERE `id_commentaire`=52
  //UPDATE `commentaires` SET `message`=? WHERE `id_commentaire`=?
  mysqlconnection.query(
    "UPDATE `commentaires` SET `commentaire`=? WHERE `id_commentaire`=?",updateCom, (error, results) => {
      if(error){
        res.status(500).json({error});
      }else{
        res.status(200).json({results});
      }
    }
  )
};