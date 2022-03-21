<template>
  <div id="app">
    <nav>
      <router-link to="/">connection</router-link> |
      <router-link to="/inscription_page">Inscription</router-link> |
       <router-link to="/Posts_page">Posts</router-link> |
       <router-link to="/Profil_page">Profil</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
