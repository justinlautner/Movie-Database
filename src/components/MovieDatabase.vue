<template>
  <div>
    <h1>{{ msg }}</h1>
    <pre id="paragraph"></pre>
    <form onsubmit="return false">
      <label for='textField'></label>
      <input type="text" placeholder="Enter a movie you would like to know more about!" onfocus="this.placeholder=''"
             onfocusout="this.placeholder='Enter a movie you would like to know more about!'" id='textField' v-model="output">
      <input type="button" v-on:click="onEnter" value="Search">
    </form>
  </div>
</template>

<script>
import {getMovie} from "@/api/MovieDBAPI"
export default {
name: "MovieDatabase",
  props: {
    msg: String,
    userText: String,
    results: String,
    infoArray: Array
  },
  data() {
    return {
      output: this.userText,
      info: this.results,
      movieInfo: this.infoArray
    }
  },
  methods: {
    async onEnter() {

      this.movieInfo = await getMovie(this.output)

      document.getElementById("paragraph").textContent = this.movieInfo

      this.output = ''
    }
  }
}
</script>

<style scoped>
input[type=text]{
  color: antiquewhite;
  font-size: larger;
  height: 20px;
  width: 1600px;
  resize: none;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.7);
  text-align: center;
  padding: 30px 0;
  border: none;
  white-space: nowrap;
}
input[type=button]{
  color: antiquewhite;
  font-size: larger;
  height: 60px;
  width: 800px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.7);
}
input:focus{
  outline: none;
  border: none;
}
::placeholder{
  color: antiquewhite;
}
pre{
  background: rgba(0, 0, 0, 0.7);
  color: antiquewhite;
  font-size: larger;
  border-radius: 10px;
  white-space: pre-wrap;
}
div{
  border-radius: 30px;
  background: rgba(0, 0, 0, 0.6);
  bottom: 0;
  position: fixed;
}
</style>