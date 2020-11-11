<template>
  <div class="min-h-full">
    <div class="grid grid-rows-1 justify-items-center">
      <img
        src="../assets/pic/farawin-nav.png"
        width="150"
        alt=""
        class="my-0 md:my-8"
      />
    </div>
    <div class="grid grid-rows-1 justify-items-center md:h-full">
      <form @submit.prevent="Login()" class="mt-6 md:mt-0 w-1/2 sm:w-2/5 md:w-1/3 lg:w-1/4">
        <p v-text="error" v-show="error" class="p-2 mb-4 rounded-md bg-red-700 text-gray-100"></p>
        <input
          v-model= "LoginUsername"
          type="text"
          placeholder="username"
          v-atuofocus
          autocomplete="username"
          name="username"
          class="bolck text-purple-300 w-full p-3 bg-transparent border rounded-3xl outline-none focus:shadow-outline focus:border-blue-300 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:-translate-y-1 focus:scale-110"
        />
        <input
          v-model= "LoginPassword"
          type="password"
          placeholder="password"
          autocomplete="currentpassword"
          name="currentpassword"
          class="block text-purple-300 my-6 w-full p-3 bg-transparent border rounded-3xl outline-none focus:shadow-outline focus:border-blue-300 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:-translate-y-1 focus:scale-110"
        />
        <button
          type="submit"
          class="block my-6 w-full p-3 bg-yellow-700 text-white bg-opacity-75 rounded-3xl focus:outline-none focus:disabled transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
        >
          Log in
        </button>
      </form>
      <router-link to="/Register" class="text-center text-orange-500 text-opacity-75">create accunt</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { login, success, err } from '../Model/auth'
export default defineComponent({
  name: 'login',
  data: () => ({
    LoginUsername: '',
    LoginPassword: '',
    error: ''
  }),
  methods: {
    Login () {
      const user = { username: this.LoginUsername, pass: this.LoginPassword }
      login(user).then(() => {
        if (success.value === false) {
          this.error = err.value
        } else {
          this.$router.push('/profile')
        }
      })
    }
  }
})
</script>
