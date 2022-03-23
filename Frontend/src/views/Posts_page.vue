<template>

  <div id="Post_page">
    <form class="form_post" v-on:submit.prevent="submitForm">
      <div class="post">
      <label for="post" class="input_title">Post</label>
					<input class="input_post" type="text" placeholder="ton message" v-model="form.post" required/>
          <div class="input_send">
            <input type="file" id="img_post" name="img_post" accept="image/png, image/jpeg">
            <button class="btn_sendPost">envoyer</button>
          </div>
      </div>   
    </form>


    <div id="container_posts" >
      <div v-for="post in posts" :key="post" class="posts">
        <div v-for="item in post" :key="item" class="message">
          <h5>Le {{item.timestamp}} par {{item.pseudo}}</h5>
          <div v-if="item.id_user == form.id_user || form.isAdmin == 1">
            <textarea class="view_post" v-model="item.message"  type="text"  required />
            <form  v-on:submit.prevent="deletePost(item.id_post,this.value)">
              <button class="btn_supPost">Supprimer</button>
            </form>
            <form  v-on:submit.prevent="updatePost(item.id_post,item.message)">
              <button class="btn_supPost">Update</button>
            </form>
          </div>
          <div v-else>
            <textarea readonly class="view_post" v-bind:value="item.message" type="text"  required />
          </div>



          <div id="demo">
            <button v-on:click="form.show = !form.show">Commentaires</button>
            <transition name="fade">
              <div v-if="form.show">

              <div v-for="com in coms" :key="com" class="com_message">
                <div v-for="obj in com" :key="obj" class="com_text">
                <div v-if="obj.id_post === item.id_post" >  
                  <div class="timestamp">
                      <div class="title_com">
                        Le {{obj.timestamp}} par {{obj.pseudo}}
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

                    
          <div class="container_commentaires" >
            <form  v-on:submit.prevent="submitCom(item.id_post)">
              <input class="input_com" type="text" v-model="form.com" required/>
              <button class="btn_sendPost">Commenter</button>
            </form>
          </div>
        </div>
        
        </div>                      
      </div>
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
              show: false,
            },
            posts: [],
            coms: [],
        }
    },


    methods:{
        submitForm(){
            axios.post('http://localhost:3000/api/Posts', this.form)
                 .then((res) => {
                    console.log(res);
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
     created() {
        axios.get(`http://localhost:3000/api/Posts`)
        /*, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
}*/
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
    }
}

</script>

<style scoped>
#Post_page {
  background-image: url(../assets/icon.svg);
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #0c0c0c;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.5rem;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.form_post{
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
 .input_com_container{
   display: flex;
   flex-direction: row;
   width: 100%;
  height: 4rem;
 }
.timestamp{
  flex-direction: column;
  display: flex ;
  
   margin-bottom: 1rem;
}
.com_message{
  border: 2px solid rgb(245, 77, 77);
}
.title_com{
  text-align: left;
  align-self: left;
  
  margin-bottom: 1rem;
}
 .input_com{
      width: 90%;
  height: 4rem;
  margin-right: 1rem;
  align-self: center;
}
 .edit_com{
  width: 90%;
  height: 4rem;
  margin-left: 1rem;
  margin-right: 1rem;
 
  border-radius: 1rem;
  background-color: rgb(216, 191, 191);
}


.post{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 70%;
  height: 12rem;
  margin-top: 6rem;
  border-radius: 1rem;
  border: 2px solid rgb(240, 135, 135);
  background-color: #ffd1d1; 
}

.input_post{
  height: 7rem;
  width: 90%;
  align-self: center;
  border-radius: 1rem;
}

.btn_sendPost{
  width: 5rem;
  height: 2rem;
}
.btn_supDel{
  width: 5rem;
  height: 2rem;
}
.btn_supPost{
  width: 5rem;
  height: 2rem;
}

#container_posts{
  width: 100%;
  display: flex;
  justify-content:center ;
  
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
  border: 5px solid rgb(245, 77, 77);
  border-radius: 1rem;
  margin-top: 2rem;
}

.supprimer_post{
  width: 8rem;

}



.view_post{
  width: 95%;
  height: 6rem;
  resize: vertical;
  margin-right: 1rem;
  align-self: center;
}

.container_commentaires{
  border: 2px solid rgb(240, 135, 135);
}

.btn_expand{
  border: transparent;
  align-self: center;
  width: 30%;
  height: 2rem;
}

</style>