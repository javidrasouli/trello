<template>
   <form action="#" class="form-login" @submit.prevent="login()">
   <div class="row"><img class="login-logo" src="../assets/logo.png" alt="farawin"></div>
   <p v-show="err" v-text="err" class="err"></p>
   <h3 class="welcome">welcome to farawin board</h3>
   <div class="input-group">
     <input v-model="username" v-atuofocus class="input" type="text" placeholder="username" name="username">
   </div>
  <div class="input-group">
    <a class="show-hide">
     <input v-model="password" :type="show ? 'password' : 'text'" placeholder="password" name="password" autocomplete="current-password">
     <i class="fa fa-eye show" @click="showpass()"></i>
    </a>
  </div>
  <button class="form-login-btn" type="submit" v-show='disable' @click='disable -=1'>Login</button>
  <h3 v-show="!disable">plase with....</h3>
  <div class="Register-link">
  <router-link to="/Register" >Register</router-link>
  </div>
 </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { erorr, err, GetUser, user } from '../Model/auth'
import { post } from '../utils/http'

export default defineComponent({
  name: 'login',
  data: () => ({
    username: '',
    password: '',
    disable: '1',
    err: '',
    show: true
  }),
  methods: {
    login () {
      if (this.username.length === 0) {
        this.err = 'username Field is required'
        this.disable += 1
      } else if (this.username.length <= 3) {
        this.err = 'username must be longer than 3 characters'
        this.disable += 1
      } else if (this.password.length === 0) {
        this.err = 'password Field is required'
        this.disable += 1
      } else if (this.password.length < 8) {
        this.err = 'Password must be longer than 8 characters'
        this.disable += 1
      } else {
        GetUser({ username: this.username, pass: this.password })
          .then(() => {
            if (erorr.value) {
              this.err = JSON.stringify(err.value)
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

<style lang="scss">
.form-login{
  max-width: 600px;
  background-color: #f4f4f4;
  margin: auto;
  margin-top: 1rem;
  border-radius: 8px;
 padding: 2rem 5rem;
 padding-top: 0;
}
.welcome{
  text-align: center;
}
.input-group{
 margin-bottom: 1rem;
}
.input{
  width: 100%;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  background-color: #e5e2e2af;
  outline: 0;
  &:focus{
    background-color: #a8e0f7af;
  }
}
.form-login-btn{
  width: 100%;
  padding: 0.75rem 0;
  border:none;
  background-color: turquoise;
  color: #f4f4f4;
  border-radius: 8px;
  cursor: pointer;
  &:hover{
    background-color:rgba(64, 224, 208, 0.596);
    color: #333;
  }
  &:focus{
    outline: 0;
    background-color: rgba(64, 224, 208, 0.596);
    color: #333;
  }
}
.Register-link{
  display: grid;
  grid-template-rows: 1fr;
  justify-content: center;
  margin-top: 1rem;
  a{
    color: #333;
    text-decoration: none;
    &:hover{
      color:  turquoise;
    }
    &:focus{
      outline: 0;
      color:  turquoise;

    }
  }
  }
  .err{
    background-color: #FF2D2D;
    color: #ffff;
    width: 100%;
    padding: 0.5rem;
    border-radius: 8px;
  }
  .login-logo{
    justify-self: center;
    width: 100px;
  }
  .show-hide{
    display: flex;
    align-items: center;
    border: 0;
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
    background-color:  #e5e2e2af;
    border-radius: 7px;
    & input{
      background-color: transparent;
      width: 100%;
      border: none;
      padding: 0.75rem;
      border-radius: 8px;
      outline: 0;
    }
   &:focus-within{
       background-color:#a8e0f7af;
    }
    i{
      font-size: 16px;
      margin: 0 10px;
      cursor: pointer;
    }
    &.bginput{
      background-color:#a8e0f7af;
    }
  }
</style>
