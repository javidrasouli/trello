<template>
<div class="min-h-full">
  <div class="grid grid-rows-1 justify-items-center">
    <img src="../assets/pic/farawin-nav.png" width="150" alt="" class="my-8">
  </div>
  <div class="grid grid-rows-1 justify-items-center md:h-full">
    <form class="mt-6 md:mt-0 w-1/2 sm:w-2/5 md:w-1/3 lg:w-1/4">
      <input type="text" placeholder="username" class="bolck w-full p-3 bg-transparent border rounded-3xl outline-none  focus:shadow-outline focus:border-blue-300">
      <input type="password" placeholder="password" class="block my-6 w-full p-3 bg-transparent border rounded-3xl outline-none  focus:shadow-outline focus:border-blue-300">
      <button type="submit" class="block my-6 w-full p-3 bg-red-700 border text-white bg-opacity-75 rounded-3xl focus:outline-none focus:disabled">Log in</button>
    </form>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'login',
  data: () => ({
  }),
  methods: {
  }
})
</script>
