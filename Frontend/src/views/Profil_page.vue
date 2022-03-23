<template>
    <div id="Profil_page">
        <h1>Bienvenue {{form.pseudo}}</h1>
        <div class="contenair_profil">
            
            <div class="photo_profil">Ton avatar<input type="file" id="img_post" name="img_post" accept="image/png, image/jpeg"></div>
                <form class="contenair_form">
                   <div class="cont_profil">
                    <label for="text" class="profil_pseudo">Pseudo
                        <input type="text" class="input_pseudo">
                    </label>
                    <label for="email" class="profil_email">Email
                        <input type="email" class="input_email">
                    </label>
                    <label for="password" class="profil_password">password
                        <input type="password" class="input_password" disabled>
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
  
  name: 'ProfilFormAxios',
    data(){
            return{
                form: {
                    pseudo: localStorage.getItem('pseudo'),
                    email: '',
                },
            }
        },

    
        methods:{
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
        
        },
    }
}


</script>

<style scoped>


#Profil_page {
   background-image: url(../assets/icon-left-font.svg);
  
}

.contenair_profil{
    background-color: rgb(250, 168, 168);
    width: 100%;
    height: 40rem;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
     border: 2px solid rgb(240, 135, 135);
     border-radius: 1rem;
}

.photo_profil{
    width: 8rem;
    height: 8rem;
    border-radius:5rem ;
   border: 2px solid rgb(240, 135, 135);

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

.profil_password{
     font-size: 1.2rem;
     font-weight: 600;
   height: 3rem; 
}

.input_password{
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
*{outline: solid 1px rgb(72, 255, 0);}

.button_delete{
    font-size: 1.2rem;
    width: 35%;
    height: 2rem;
    align-self: center;
}

</style>