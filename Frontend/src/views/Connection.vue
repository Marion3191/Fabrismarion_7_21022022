<template>
  <div id="connection">
      <h1>Connection</h1>
    <div class="formulaire_connection">
							<form v-on:submit.prevent="submitForm" id="form_connect" >
							<div class="form-group">
								<label for="email"> Email</label>
								<input id="email" class="form-control" type="email" v-model="form.email" required />
							</div>
							<div class="form-message">
								<label for="password">Password</label>
								<input id="password" class="form-control" type="password" v-model="form.password" required/>
							</div>
							<button class="button" type="submit">Envoyer</button>
							</form>
						</div>
      <hr>
      <hr>
      <p> Pas encore de compte ? s'inscrire ! </p>
  </div>
</template>

<script>
// @ is an alias to /src

import axios from 'axios';

export default {
  name: 'ConnectionFormAxios',
    data(){
        return{
            form: {
                name: '',
                email: '',
                password:''
            }
        }
    },
    methods:{
        submitForm(){
            axios.post('http://localhost:3000/api/auth/login', this.form)
                 .then((res) => {
                    console.log(res,res.userId, res.token, res.data.token, "teste3");//redirection a cette endroi
                    //localstorage    
                        localStorage.setItem('id_user',JSON.stringify( res.data.userId));
                        localStorage.setItem('token', res.data.token);
                 })
                 .catch((error) => {
                    console.log(error, "teste4")
                 }).finally(() => {
                     //Perform action in always
                 });
        }
    }
}

</script>

<style scoped>
#connection {
  background-image: url(../assets/icon-left-font.svg);
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #0e0d0d;
  display: flex;
  flex-direction: column;
  align-content: center;
  text-align: center;
  font-size: 1.5rem;
  padding-bottom: 2rem;
  height: 100rem;
}
h1{
  color: rgb(0, 0, 0);
}
input{
  border-radius: 1rem;
  width:15rem;
  height: 1.6rem;
}
a{
  font-size: 1.2rem;
  font-weight: 600;
  color: rgb(10, 10, 10);
}
label{
  font-weight: 600;
}
#email{
  margin-left: 4rem;
  margin-bottom: 1rem;
}
#password{
  margin-left: 1rem;
  margin-bottom: 1rem;
}

</style>


