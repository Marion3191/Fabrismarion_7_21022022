<template>
    <div id="Profil_page">
        <h1>Bienvenue {{form.pseudo}}</h1>
        <div class="contenair_profil">
            <div class="photo_profil">Ton avatar
                <img class="avatar" :src='form.avatarURL'/>
                <form  v-on:submit.prevent="sendPics">
                <input type="file" id="image" name="image" accept="image/png, image/jpeg">
                <button class="button_upload" >envoyer</button>
                </form>
            </div>
                <form class="contenair_form">
                    <div class="cont_profil">
                        <label for="text" class="profil_pseudo">Pseudo
                            <input type="text" class="input_pseudo">
                        </label>
                        <label for="email" class="profil_email">Email
                            <input type="email" class="input_email">
                        </label>
                        <div class="boutton">
                            <button class="button_save">Enregister</button>
                            <form  v-on:submit.prevent="deleteProfil">
                                <button class="button_delete">Supprimer</button>
                            </form>
                        </div>
                    </div>
               </form>
            </div>
    </div>
</template>

<script>

import axios from 'axios';

export default {
  //
  name: 'ProfilFormAxios',
    data(){
            return{
                form: {
                    pseudo: localStorage.getItem('pseudo'),
                    email: '',
                    avatarURL:localStorage.getItem('avatarURL'),
                    alt_text:''
                },
            }
        },

    
        methods:{
        sendPics(){
      // Récupération de l'image
        let img = document.getElementById('image').files[0];
        var usrID = localStorage.getItem('id_user');
      // Création d'un formData obligatoire pour envoi de l'image
        var formData = new FormData();
        formData.append('image', img);
        formData.append('alt_text', this.alt_text);
        // Envoi des données sur l'url du serveur (mettez la votre) en POST en envoyant le formData contenant notre image et notre texte
        axios.post('http://localhost:3000/api/profil/upload/'+usrID, formData)
          .then((resp) => {
            console.log(resp)
          })
          .catch((err) => {
            console.log(err.response)
          })
    },

        deleteProfil(){
              var usrID = localStorage.getItem('id_user');
            console.log(usrID);
            axios.get(`http://localhost:3000/api/Profil/Delete/`+usrID)
            .then(response => {
              console.log(response);
            })
            .catch(e => {
                console.log("err:",e);
            });
        },
        mounted(){
        
        },
        created(){
            var usrID = localStorage.getItem('id_user');
             axios.get('http://localhost:3000/api/profil/upload/'+usrID)
            .then(response => {
              console.log(response.data);
                this.avatarURL = response.data;
            })
            .catch(e => {
                console.log("err:",e);
            });
        },
    }
}


</script>

<style scoped>
#Profil_page {
background-image: url(../assets/icon-left-font.svg);
background-repeat: no-repeat;
 width: 100%;
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
}

.avatar {
    max-width:50px;
    height:auto;
}

.contenair_profil{
    width: 25%;
    height: 40rem;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    border: 3px solid rgb(247, 6, 6);
    background-color: rgb(252, 195, 195);
    border-radius: 1rem;
}

.photo_profil{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 10rem;
    height: 10rem;
    border-radius:5rem ;
   border: 2px solid rgb(247, 6, 6);

}

.contenair_form{
    display: flex;
    justify-content: center;
    height: 28rem;
    width: 100%;
}

.cont_profil{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 30rem;
}

.profil_pseudo{
    font-size: 1.2rem;
     font-weight: 600;
    height: 3rem;
}

.input_pseudo{
    width: 15rem;
    height: 2.6rem;
    margin-left: 2rem;
}

.profil_email{
     font-size: 1.2rem;
     font-weight: 600;
   height: 3rem; 
}

.input_email{
    width: 15rem;
     height: 2.6rem;
    margin-left: 2rem;
}

.boutton{
    height: 6rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.button_save{
    font-size: 1.2rem;
    width: 35%;
    height: 2rem;
    align-self: center;
}


.button_delete{
    font-size: 1.2rem;
    width: 35%;
    height: 2rem;
    align-self: center;
}
</style>