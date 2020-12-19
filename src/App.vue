<template>
  <div id="app">
<!--    <img alt="Movie Logo" src="./assets/logo.png" width="150" height="250">-->
    <MovieDatabase msg="Justin Lautner's Movie Database"/>
  </div>
</template>



<script>
import MovieDatabase from './components/MovieDatabase.vue'

export default {
  name: 'App',
  components: {
    MovieDatabase
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial-Narrow, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: antiquewhite;
  outline-color: black;
  margin-top: 60px;
}
body {
  background-color: #3a2c3d;
  background-image: url('~@/assets/background.jpg');
  background-size: cover;
}
</style>
