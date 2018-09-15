<template>
  <ul id="example-1" >

  <li v-for="role in roles">
    <a :href="role">{{role}}</a>
  </li>
</ul>
</template>

<script>
import {
  AXIOS
} from './api-src'

export default {
  name: 'Login',
  data() {
    return {
      roles: [],
      errors:[]
    }
  },
  methods: {
      getUserRoles() {
      AXIOS.get(`/home`)
        .then(response => {
          this.roles = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  },
  beforeMount(){
    this.getUserRoles()
 }
}
</script>

<style>
body {
    font-size: 28px;
}

ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
    position: fixed;
    top: 0;
    width: 100%;
}

li {
    float: left;
}

li a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
}

li a:hover {
    background-color: #111;
}

.active {
    background-color: #4CAF50;
}
</style>
