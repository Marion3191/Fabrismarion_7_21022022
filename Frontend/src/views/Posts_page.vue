<template>
<!--pour poster un message  -->
  <div id="Post_page" v-if="form.isLogged == 1">
    <form class="form_post" v-on:submit.prevent="submitForm">
      <div class="post">
        <label for="post" class="input_title">Poste ton message</label>
				<input class="input_post" id="postText" type="text" placeholder="ton message" v-model="form.post" required/>
        <div>
          <input type="file" id="image" name="image" accept="image/png, image/jpeg" v-change="form.post">
          <button>envoyer</button>
        </div>
      </div>   
    </form>

<!--affichage des posts -->
    <div id="container_posts" >
      <div v-for="post in posts" :key="post" class="posts">
        <div v-for="item in post" :key="item" class="message">
          <div class ="usrProfile">
            <p> {{item.pseudo}} {{ item.dateformat}}
            </p>
          </div>
          <div class="container-button" >
            <img class="avatar" :src='item.imageURL'/>
            <textarea class="view_post" v-model="item.message"  type="text"  required />
            <div v-if="item.id_user == form.id_user || form.isAdmin == 1">
            <form  v-on:submit.prevent="deletePost(item.id_post)">
              <button class="btn_supPost">Supprimer</button>
            </form>
            <form  v-on:submit.prevent="updatePost(item.id_post,item.message)">
              <button class="btn_supPost">Update</button>
            </form>
            </div>
            </div>
           
          
          <!--pour poster un message  --> 
          <div class="container_commentaires" >
            <form class="commentaire" v-on:submit.prevent="submitCom(item.id_post)">
              <input class="input_com" type="text" v-model="form.com" required/>
              <button class="btn_sendcom">Commenter</button>
            </form>
          </div>

<!--affichage des commentaires -->
          <div id="commentaire-poster">
            <button v-on:click="form.show = !form.show" class="btn-com">Commentaires</button>
            <transition name="fade">
              <div v-if="form.show">
                <div v-for="com in coms" :key="com" class="com_message">
                  <div v-for="obj in com" :key="obj" class="com_text">
                    <div v-if="obj.id_post === item.id_post" >  
                      <div class="timestamp">
                        <div class="title_com">
                          Le {{obj.dateformat}} par {{obj.pseudo}}
                        </div>
                        <div class="input_com_container">
                          <textarea class="edit_com" v-model="obj.commentaire" type="text"  required/>
                          <div v-if="obj.id_user == form.id_user || form.isAdmin == 1">
                            <form  v-on:submit.prevent="deleteCom(obj.id_commentaire)">
                              <button class="btn_supDel">supprimer</button>
                            </form>
                            <form  v-on:submit.prevent="updateCom(obj.id_commentaire,obj.commentaire)">
                              <button class="btn_supDel">update</button>
                            </form>
                          </div>
                        </div>
                     </div>
                    </div>
                 </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>                      
     </div>
  </div>
  <div v-else>
    Veuillez retrouner a la page de connection
  </div>
</template>

<script>




import axios from 'axios';

export default {
  
  name: 'PostFormAxios',
    data(){

        return{
            form: {
              id_user: localStorage.getItem("id_user"),
              pseudo: localStorage.getItem("pseudo"),
              isAdmin: localStorage.getItem("isAdmin"),
              avatarURL: localStorage.getItem("avatarURL"),
              isLogged: localStorage.getItem("isLogged"),
              imageURL: new FormData(),
              show: false,
            },
            posts: [],
            coms: [],
            altText:'',
        }
    },


    methods:{
      lodpost(){
                axios.get(`http://localhost:3000/api/Posts`)
            .then(response => {
              console.log(response.data);
                this.posts = response.data;
            })
            .catch(e => {
                console.log("err:",e);
            });
        axios.get(`http://localhost:3000/api/Posts/com`)
            .then(response => {
              console.log(response.data);
                this.coms = response.data;
            })
            .catch(e => {
                console.log("err:",e);
            });
    
      },
        submitForm(){
          let img = document.getElementById('image').files[0];
          var formData = new FormData();
          formData.append('image', img);
          formData.append('alt_text', this.alt_text);
          formData.append('id_user', this.id_user);
          formData.append('pseudo', this.pseudo);
          formData.append('post', this.form.post);
            axios.post('http://localhost:3000/api/Posts', formData)
                 .then((res) => {
                    console.log(res);
                    this.lodpost()
                 })
                 .catch((error) => {
                    console.log(error)
                 }).finally(() => {
                     //Perform action in always
                 });
        },

        submitCom(postID){
            axios.post('http://localhost:3000/api/Posts/com'+postID, this.form)
                 .then((res) => {
                    console.log(+res);
                    this.lodpost()
                 })
                 .catch((error) => {
                    console.log(error)
                 }).finally(() => {
                     //Perform action in always
                 });
        },
        deletePost(postID){
            axios.post('http://localhost:3000/api/Posts/delete/'+postID, this.form)
                 .then((res) => {
                    console.log(res);
                 })
                 .catch((error) => {
                    console.log(error)
                 }).finally(() => {
                     //Perform action in always
                 });
        },
        updatePost(postID,message){
          var params = postID;
            params += "&";
            params += message;

            axios.post('http://localhost:3000/api/Posts/update/'+params, this.form)
                 .then((res) => {
                    console.log(res);
                 })
                 .catch((error) => {
                    console.log(error)
                 }).finally(() => {
                     //Perform action in always
                 });
        },
        deleteCom(comID){
            axios.post('http://localhost:3000/api/Posts/com/delete/'+comID, this.form)
                 .then((res) => {
                    console.log(res);
                 })
                 .catch((error) => {
                    console.log(error)
                 }).finally(() => {
                     //Perform action in always
                 });
        },
        updateCom(comID,message){
            var params = comID;
            params += "&";
            params += message;
            axios.post('http://localhost:3000/api/Posts/com/update/'+params, this.form)
                 .then((res) => {
                    console.log(res);
                 })
                 .catch((error) => {
                    console.log(error)
                 }).finally(() => {
                     //Perform action in always
                 });
        }
    },
      mounted() {
        if (localStorage.id_user && localStorage.pseudo && localStorage.isAdmin) {
          this.id_user = localStorage.id_user;
          this.pseudo = localStorage.pseudo;
          this.isAdmin = localStorage.isAdmin;
        }
      },
     created() {this.lodpost()
console.log(this.$dayjs().format('YYYY-MM-DD HH:mm:ss'))

}
}

</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

#Post_page {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #0c0c0c;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.5rem;
 
}

.form_post{
  width: 100%;
  display: flex;
  justify-content: center;
}

.post{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 70%;
  height: 12rem;
  margin-top: 6rem;
  border-radius: 1rem;
  border: 2px solid rgb(250, 41, 41);
  background-color: #fad6d6; 
}

.input_post{
  height: 7rem;
  width: 90%;
  align-self: center;
  border-radius: 1rem;
}


.avatar{
  object-fit: cover;
width: 90%;
}

#container_posts{
  width: 100%;
  display: flex;
  justify-content:center ;
  border-color: red;
}

.posts{
  width: 70%;
  align-self: center;
  margin-top: 3rem;
}

.message{
  background-color: rgb(243, 203, 203);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 3px solid rgb(252, 3, 3);
  border-radius: 1rem;
  margin-top: 2rem;
}


.usrProfile {
text-align: left;
}

.container-button{
display: flex;
flex-wrap: wrap;
justify-content: center;
}

.view_post{
  width: 90%;
  height: 6rem;
  border: none;
}

.btn_supPost{
  width: 5rem;
  height: 2rem;
  margin: 1rem;
}

.container_commentaires{
display: flex;
justify-content: space-around;
border-top: 2px solid red;
}

.commentaire{
  width: 100%;
  border: none;
  margin-top: 1rem;
}

.input_com{
  width: 50%;
  height: 4rem;
  border: none;
}

.btn_sendcom{
  width: 5rem;
  height: 2rem;
  margin: 1rem;
}

#commentaire-poster{
  width: 100%;
display: flex;
flex-direction: column;
justify-content: space-around;
margin: 1rem;
}

.btn-com{
  width: 10rem;
  align-self: center;
  border-radius: 0.5rem;
}

.com_message{
  border: none;
}

.timestamp{
  flex-direction: column;
  display: flex ;
  margin: 1rem;
}

.title_com{
  text-align: left;
  align-self: left;
}

 .input_com_container{
   display: flex;
   flex-direction: row;
   width: 100%;
  height: 4rem;
 }

 .edit_com{
  width: 90%;
  height: 4rem;
  margin-left: 1rem;
  margin-right: 1rem;
  border-radius: 1rem;
  background-color: rgb(248, 214, 214);
}

.btn_supDel{
  width: 5rem;
  height: 2rem;
}




</style>