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
      <form
      @submit.prevent="register()"
      class="mt-2 md:mt-6 w-1/2 sm:w-2/5 md:w-1/3 lg:w-1/4">
        <p v-text="error" v-show="error" class="p-2 mb-4 rounded-md bg-red-700 text-gray-100"></p>
        <input
          type="text"
          placeholder="username"
          v-atuofocus
          autocomplete="username"
          name="username"
          v-model= "username"
          class="bolck text-purple-300 w-full p-3 bg-transparent border rounded-3xl outline-none focus:shadow-outline focus:border-blue-300 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:-translate-y-1 focus:scale-110"
        />
        <input
          type="email"
          autocomplete="email"
          name="email"
          placeholder="email"
          v-model = "email"
          class="bolck text-purple-300 w-full mt-2 md:mt-6 p-3 bg-transparent border rounded-3xl outline-none focus:shadow-outline focus:border-blue-300 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:-translate-y-1 focus:scale-110"
        />
        <input
          :type= "!showpass ? 'password' : 'text' "
          autocomplete="newpassword"
          name="newpassword"
          placeholder="password"
          v-model= "password"
          class="block text-purple-300 my-2 md:my-6 w-full p-3 bg-transparent border rounded-3xl outline-none focus:shadow-outline focus:border-blue-300 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:-translate-y-1 focus:scale-110"
        />
        <button
          type="submit"
          class="block my-6 w-full p-3 bg-yellow-700 text-white bg-opacity-75 rounded-3xl focus:outline-none focus:disabled transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:-translate-y-1 focus:scale-110"
        >
          Log in
        </button>
        <div class="flex">
          <label class="m-auto">
          <input v-model="remmeber" type="checkbox" class="p-1 rounded-sm">
          <span class="text-gray-200 ml-1">remmeber me</span>
        </label>
        <label class="m-auto">
          <input @click="showpass = !showpass" type="checkbox" class="p-1 rounded-sm">
          <span class="text-gray-200 ml-1">show password</span>
        </label>
        </div>
      </form>
      <router-link to="/Login" class="text-center text-orange-500 text-opacity-75">you have a accunt</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { err, register, success } from '../Model/auth'
export default defineComponent({
  name: 'login',
  data: () => ({
    username: '',
    email: '',
    password: '',
    error: '',
    showpass: false,
    remmeber: false
  }),
  methods: {
    register () {
      const remmeber = this.remmeber
      const user = { username: this.username, email: this.email, pass: this.password }
      register(user, remmeber).then(() => {
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
