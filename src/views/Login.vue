<template>
  <main class="form-signin text-center">
    <!-- <form method="POST" v-on:submit.prevent="login"> -->
    <form @submit.prevent="login">
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

      <div class="form-floating">
        <input
          type="email"
          class="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          v-model="email"
        />
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating">
        <input
          type="password"
          class="form-control"
          id="floatingPassword"
          placeholder="Password"
          v-model="password"
        />
        <label for="floatingPassword">Password</label>
      </div>

      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" /> Remember me
        </label>
      </div>
      <button class="w-100 btn btn-lg btn-primary" type="submit" v-on:click="login">
        Sign in
      </button>
      <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
    </form>
  </main>
</template>

<script>
import axios from 'axios'
import Cookies from 'js-cookie'
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      token: ''
    }
  },
  methods: {
    login () {
      return axios.post('https://backenddonasitv.binbaz.or.id/api/login', {
        email: this.email,
        password: this.password
      }).then((result) => {
        console.log(result.data)
        this.token = result.data.token
        Cookies.set('token', this.token)
        this.$router.push('/')
      }).catch((error) => {
        alert(error.response.status)
      })
    }
  }
}
</script>

<style>

/* body {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
} */

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}
</style>
