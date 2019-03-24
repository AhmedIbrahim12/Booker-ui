<template>
  <b-container class="bv-example-row">
    <b-row>
      <H2 style="padding: 7px 25px;">Login with your account or create a new one</H2>
    </b-row>
    <b-row>
      <b-col>
        <form id="signUpForm">
          <input type="text" v-model="signUpData.firstName" placeholder="Username" required>
          <input type="email" v-model="signUpData.email" placeholder="Email" required>
          <input type="password" v-model="signUpData.password" placeholder="Password" required>
          <input type="submit" @click="callSignUpService()" value="Sign Up">
        </form>
      </b-col>

      <b-col>
        <form id="loginForm">
          <input type="text" v-model="loginData.firstName" placeholder="Username" required>
          <input type="password" v-model="loginData.password" placeholder="Password" required>
          <input type="submit" @click="callLoginService()" value="Login">
        </form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { AXIOS } from "./api-src";

export default {
  name: "Login",
  data() {
    return {
      response: [],
      errors: [],
      loginData: {
        password: "",
        firstName: ""
      },
      signUpData: {
        password: "",
        firstName: "",
        email: ""
      }
    };
  },
  methods: {
    callLoginService() {
      var params = new URLSearchParams();
      params.append("username", this.loginData.firstName);
      params.append("password", this.loginData.password);

      AXIOS.post(`/login`, params)
        .then(response => {
          this.response = response.data;
          if (this.response.userName != null) {
            this.$router.replace("/Home");
          }
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    callSignUpService() {}
  }
};
</script>

<style>
body {
  font-family: Arial, Helvetica, sans-serif;
}

* {
  box-sizing: border-box;
}

/* style the container */
.container {
  position: relative;
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px 0 30px 0;
}

/* style inputs and link buttons */
input,
.btn {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 4px;
  margin: 5px 0;
  opacity: 0.85;
  display: inline-block;
  font-size: 17px;
  line-height: 20px;
  text-decoration: none;
  /* remove underline from anchors */
}

input:hover,
.btn:hover {
  opacity: 1;
}

/* style the submit button */
input[type="submit"] {
  background-color: #4caf50;
  color: white;
  cursor: pointer;
}

input[type="submit"]:hover {
  background-color: #45a049;
}

/* Two-column layout */
.col {
  float: left;
  width: 50%;
  margin: auto;
  padding: 0 50px;
  margin-top: 6px;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

/* Responsive layout - when the screen is less than 650px wide, make the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 650px) {
  .col {
    width: 100%;
    margin-top: 0;
  }
}
</style>
