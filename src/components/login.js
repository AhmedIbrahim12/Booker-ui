import {AXIOS} from './api-src'

export default {
  name: 'Login',
  data () {
      return {
        response: [],
        errors: [],
        user: {
          password: '',
          firstName: '',
          id: 0
        }
      }
    },
    methods: {
      // Fetches posts when the component is created.
      callLoginService () {
        var params = new URLSearchParams()
        params.append('firstName', this.user.firstName)
        params.append('password', this.user.password)

        AXIOS.post(`/login`,params)
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
