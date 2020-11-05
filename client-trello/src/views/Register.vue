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
      <form class="mt-2 md:mt-6 md:mt-0 w-1/2 sm:w-2/5 md:w-1/3 lg:w-1/4">
        <input
          type="text"
          placeholder="username"
          v-atuofocus
          autocomplete="username"
          name="username"
          class="bolck text-purple-300 w-full p-3 bg-transparent border rounded-3xl outline-none focus:shadow-outline focus:border-blue-300 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:-translate-y-1 focus:scale-110"
        />
        <input
          type="email"
          autocomplete="email"
          name="email"
          placeholder="email"
          class="bolck text-purple-300 w-full mt-2 md:mt-6 p-3 bg-transparent border rounded-3xl outline-none focus:shadow-outline focus:border-blue-300 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:-translate-y-1 focus:scale-110"
        />
        <input
          type="password"
          autocomplete="newpassword"
          name="newpassword"
          placeholder="password"
          class="block text-purple-300 my-2 md:my-6 w-full p-3 bg-transparent border rounded-3xl outline-none focus:shadow-outline focus:border-blue-300 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:-translate-y-1 focus:scale-110"
        />
        <button
          type="submit"
          class="block my-6 w-full p-3 bg-yellow-700 text-white bg-opacity-75 rounded-3xl focus:outline-none focus:disabled transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:-translate-y-1 focus:scale-110"
        >
          Log in
        </button>
      </form>
      <router-link to="/Login" class="text-center text-orange-500 text-opacity-75">you have a accunt</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'login',
  data: () => ({}),
  methods: {}
})
</script>
