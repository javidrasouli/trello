<template>
   <form action="#" class="form-login" @submit.prevent="login()">
   <div class="row"><img class="login-logo" src="../assets/logo.png" alt="farawin"></div>
   <p v-show="err" v-text="err" class="err"></p>
   <h3 class="welcome">welcome to farawin board</h3>
   <div class="input-group">
     <input v-model="registerUsername" v-atuofocus class="input" type="text" placeholder="username" name="username">
   </div>
   <div class="input-group">
     <input v-model="registerEmail"  class="input" type="email" placeholder="email" name="email">
   </div>
  <div class="input-group">
    <a class="show-hide">
     <input v-model="registerPassword" :type="show ? 'password' : 'text'" placeholder="password" name="password" autocomplete="new-password">
     <i class="fa fa-eye" @click="showpass()"></i>
     </a>
  </div>
  <button class="form-login-btn" type="submit" v-show='disable' @click='disable -=1'>Register</button>
  <h3 v-show="!disable">plase with....</h3>
  <div class="Register-link">
  <router-link to="/Login" >Login</router-link>
  </div>
 </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { erorr, err, register } from '../Model/auth'
export default defineComponent({
  name: 'register',
  data: () => ({
    registerUsername: '',
    registerEmail: '',
    registerPassword: '',
    disable: '1',
    err: '',
    user: [],
    show: true
  }),
  methods: {
    login () {
      if (this.registerUsername.length === 0) {
        this.err = 'username Field is required'
        this.disable += 1
      } else if (this.registerUsername.length <= 3) {
        this.err = 'username must be longer than 3 characters'
        this.disable += 1
      } else if (this.registerEmail.length === 0) {
        this.err = 'email Field is required'
        this.disable += 1
      } else if (this.registerPassword.length === 0) {
        this.err = 'password Field is required'
        this.disable += 1
      } else if (this.registerPassword.length < 8) {
        this.err = 'Password must be longer than 8 characters'
        this.disable += 1
      } else {
        register({ username: this.registerUsername, pass: this.registerPassword, email: this.registerEmail })
          .then(() => {
            if (erorr.value) {
              this.err = err.value
              this.disable += 1
            } else {
              this.$router.push('/profile')
            }
          })
      }
    },
    showpass () {
      this.show = !this.show
    }
  }
})
</script>
