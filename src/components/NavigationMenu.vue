<template>
  <ul id="navigationMenu">
    <li v-for="role in roles" :key="role">
      <b-link  :to="{ path: '/'+role}" router-tag="li" replace>{{role}}</b-link>
    </li>
  </ul>
</template>

<script>
import { AXIOS } from "./api-src";

export default {
  name: "NavigationMenu",
  data() {
    return {
      roles: [],
      errors: []
    };
  },
  methods: {
    getUserRoles() {
      AXIOS.get(`/getUserRoles`)
        .then(response => {
          this.roles = response.data;
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  },
  beforeMount() {
    this.getUserRoles();
  }
};
</script>

<style>
body {
  font-size: 20px;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
  top: 0;
  width: 100%;
  height: 20%;
}

li {
  float: left;
}

li {
  display: block;
  color: white;
  text-align: center;
  padding: 8px 12px;
  text-decoration: none;
}

li:hover {
  background-color: #4caf50;
  cursor: pointer;
}

.router-link-active {
  background-color: #4caf50;
}
</style>
