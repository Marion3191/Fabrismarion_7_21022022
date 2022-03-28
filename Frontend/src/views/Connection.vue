<template>
  <div id="connection"> 
    <div class="formulaire_connection">
      <h1>Connection</h1>
			<form v-on:submit.prevent="submitForm" id="form_connect" >
				<div class="form-group">
						<label for="email"> Email</label>
						<input id="email" class="form-control" type="email" v-model="form.email" required />
				</div>
				<div class="form-message">
					<label for="password">Password</label>
					<input id="password" class="form-control" type="password" v-model="form.password" required/>
				</div>
				<button class="button" type="submit">Connecter</button>
			</form>
      <p> Pas encore de compte ? s'inscrire ! </p>
		</div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'ConnectionFormAxios',
    data(){
        return{
            form: {
                name: '',
                email: '',
                password:'',
                urlAvatar:'',
                  }
               }
            },
    methods:{
        submitForm(){
            axios.post('http://localhost:3000/api/auth/login', this.form)
                 .then((res) => {
                    //console.log(res,res.userId, res.token, res.data.token, "teste3");
                    console.log(res);  
                        localStorage.setItem('id_user',JSON.stringify( res.data.userId));
                        localStorage.setItem('token', res.data.token);
                        this.test();
                        this.$router.push('/Posts_page')
                 })
                 .catch((error) => {
                    console.log(error, "teste4")
                 }).finally(() => {
                     //Perform action in always
                 });   
                     },
        test(){
          axios.get(`http://localhost:3000/api/auth/getPseudo/`+this.form.email, this.form)
          .then(res => {
            localStorage.setItem('pseudo',res.data.results[0].pseudo );
            localStorage.setItem('isAdmin',res.data.results[0].isAdmin );
            localStorage.setItem('avatarURL',res.data.results[0].urlAvatar );
          })
          .catch(e => {
            console.log("err:",e);
          });
        },
    }
}
</script>

<style scoped>
#connection {
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

.formulaire_connection{
  width: 30%;
  height: 30rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#form_connect{
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
</style>


