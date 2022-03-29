const bcrypt = require('bcrypt');
const mysqlconnection = require ('../dataBase/mysql');
const jwt = require('jsonwebtoken');



exports.signup = (req, res) => {

  bcrypt
  .hash(req.body.password, 10)
  .then(hash => {
    const user = {
      pseudo: req.body.pseudo,
      email: req.body.email,
      password: hash,
    };
    console.log("user"); 
    console.log(user); 

    mysqlconnection.query(
      'INSERT INTO `users` SET ?' ,user, (error, results)=>{
        if(error){
          console.log(error);
          res.json({error});
        }else{
          console.log("results");
          console.log(results);
          res.json({message : "utilisateur enregisté"});
        }
      }
    )
    
    })

    .catch(error => res.status(404).json( error));
};

  exports.login = (req, res) => {
    const email =  req.body.email;
  
    mysqlconnection.query(
      'SELECT * FROM `users` WHERE email = ?' ,email, (error, results) =>{
        if(error){
          console.log(error);
          res.status(500).json({error});
        }else{
          console.log("results");
          console.log(results);

          if(results == 0){
            res.status(404).json({error: "utilisateur inexistant"});
          }

          bcrypt
          .compare(req.body.password, results[0].password)
          .then((controlPaswword) => {
            console.log("cntrolpassword");
            console.log(controlPaswword);

            if(!controlPaswword){
              return res.status(401).json({error: 'le mot de passe est incorrect'})
            }


            console.log("password");
            console.log(results[0].password);

          

            const token = jwt.sign(
              {userId: results[0].id_user},
              
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
            console.log(token);

            res.status(200).json({
              userId: results[0].id_user,
              token
            })
          })
          .catch(error => res.status(500).json({ error }));
      
        }
      }
    )
    };

    
    exports.getPseudo = (req, res) => {
      mysqlconnection.query(
        //SELECT `id_user`, `pseudo`, `email`, `password`, `isAdmin`, `urlAvatar` FROM `users` WHERE `email`=?
        //SELECT `pseudo`, `isAdmin`,'urlAvatar' FROM `users` WHERE `email`=?
        "SELECT `pseudo`,`isAdmin`, `urlAvatar` FROM `users` WHERE `email`=?",req.params.email, (error, results) => {
          if(error){
            console.log(error);
            res.status(500).json({error});
          }else{
            console.log("results:");
            console.log(results);
            res.status(200).json({results});
          }
        }
      )
    };


   