<template>
  <div class="Login">
      <h2>Login</h2>

      <input type="text" v-model="user.firstName" />
      <input type="password" v-model="user.password" />
      <button @click="callLoginService()">Login</button>
      <h4>Backend response: {{ response }}</h4>
  </div>
</template>

<script type="text/javascript" src="login.js"></script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
