<template>
  <div id="Inscription_page">
    <h1>Inscription</h1>
 <div class="formulaire">
							<form v-on:submit.prevent="submitForm">
							<div class="form-group">
								<label class="title" for="pseudo">Pseudo</label>
								<input type="text" class="form-control" id="pseudo" placeholder="Pseudo" v-model="form.pseudo">
							</div>
							<div class="form-group">
								<label class="title" for="email"> Email</label>
								<input id="email" class="form-control" type="email" v-model="form.email" required >
							</div>
							<div class="form-group">
								<label class="title"  for="password">Password</label>
								<input id="password" class="form-control" type="password" v-model="form.password" required/>
							</div>
								<button onclick="window.location.href = 'http://localhost:8080/Inscription_page#/Posts_page';" class="button" type="submit">Envoyer</button>
							</form>
						</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'InscriptionFormAxios',
    data(){
        return{
            form: {
                pseudo: '',
                email: '',
                password: ''
               
            }
        }
    },
    methods:{
        submitForm(){
            axios.post('http://localhost:3000/api/auth/signup', this.form)
                 .then((res) => {
                    console.log(res);
                 })
                 .catch((error) => {
                  console.log(error);
                 }).finally(() => {
                     //Perform action in always
                 });
        }
    }
}
</script>
<style scoped>

#Inscription_page {
  background-image: url(../assets/icon-left-font.svg);
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #070606;
  display: flex;
  flex-direction: column;
  justify-content: start;
  text-align: center;
  font-size: 1.5rem;  
  padding-bottom: 2rem;
  height: 100rem;
}
h1{
  color: rgb(7, 7, 7);
}
input{
  border-radius: 1rem;
  width:15rem;
  height: 1.6rem;
  border-color: rgb(8, 8, 8);
}
#email{
  margin-left: 1.5rem;
  margin-top: 1rem;
}

#password{
  margin-top: 1rem;
  margin-right: 1.5rem;
}
.title{
  font-weight: 600;
margin-right: 1rem;
}

.button{
  margin-top: 1.5rem;
  margin-left: 5rem;
}
</style>

