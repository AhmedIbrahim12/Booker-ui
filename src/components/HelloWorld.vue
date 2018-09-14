<template>
  <div class="HelloWorld">
      <h1>{{ msg }}</h1>
      <h2>REST service call results</h2>

      <input type="text" v-model="user.firstName" />
      <button @click="callRestService()">CALL Spring Boot REST backend service</button>

      <h4>Backend response: {{ response }}</h4>

  </div>
</template>

<script>
import {AXIOS} from './api-src'

export default {
  name: 'HelloWorld',
  data () {
      return {
        msg: 'HowTo call REST-Services:',
        response: [],
        errors: [],
        user: {
          lastName: '',
          firstName: '',
          id: 0
        }
      }
    },
    methods: {
      // Fetches posts when the component is created.
      callRestService () {
        var params = new URLSearchParams()
        params.append('firstName', this.user.firstName)

        AXIOS.post(`/hello`,params)
          .then(response => {
            // JSON responses are automatically parsed.
            this.response = response.data
            console.log(response.data)
          })
          .catch(e => {
            this.errors.push(e)
          })
      }
    }
}
</script>

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
