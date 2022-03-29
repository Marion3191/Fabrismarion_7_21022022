<template>
  <div id="Inscription_page">
    <div class="formulaire_inscription">
      <h1>Inscription</h1>
			<form v-on:submit.prevent="submitForm" id="form_inscription">
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
				<button class="button" type="submit">Inscription</button>
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
                    this.$router.push('/#')
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
  background-image: url(../assets/icon-above-font.svg);
  background-repeat: no-repeat;
  background-position: 50% 50% ;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #0e0d0d;
  width: 100%;
  height: 50rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.formulaire_inscription{
    width: 30%;
  height: 30rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#form_inscription{
   width: 70%;
  height: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

input{
  border-radius: 1rem;
  width: 15rem;
  height: 2rem;
}

label{
  font-size: 1.2rem;
  font-weight: 600;
  padding: 1rem;
}

.button{
  width: 10rem;
  align-self: center;
  border-radius: 1rem;
}


@media screen and (max-width: 768px){
#Inscription_page {
  width: 100%;
}


.formulaire_inscription{
  width: 100%;
}
}
</style>

