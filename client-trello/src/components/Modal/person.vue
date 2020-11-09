<template>
<div class="w-10/12 sm:w-2/3 md:w-1/2 lg:w-1/3 m-auto h-modal bg-teal-300 rounded-xl p-5">
<transition
    name="showtask-profile"
    mode="out-in"
  >
<div v-if="!EditPerson">
<h1 class="text-2xl border-b">javid rasouli</h1>
<h2 class="my-4 text-lg">email: javid99.rasouli@gmail.com</h2>
<h2 class="text-lg">password: javid1383</h2>
<div class="mt-5 flex">
  <button @click="EditPerson = true" class="m-auto border p-2 rounded-xl bg-yellow-300 outline-none focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">Edit</button>
  <button class="m-auto border p-2 rounded-xl bg-red-700 outline-none focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">Delete</button>
  <button class="m-auto border p-2 rounded-xl bg-green-500 outline-none focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">close</button>
</div>
</div>
<div v-else class="grid grid-rows-1 justify-center">
<input type="text" placeholder="username" class="border focus:border-black outline-none focus:outline-none w-64 p-2 rounded-md bg-gray-400 bg-opacity-75 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:-translate-y-1 focus:scale-110">
<input type="email" placeholder="email" class="border focus:border-black outline-none focus:outline-none w-64 p-2 my-4 rounded-md bg-gray-400 bg-opacity-75 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:-translate-y-1 focus:scale-110">
<input type="text" placeholder="password" class="border focus:border-black outline-none focus:outline-none w-64 p-2 rounded-md bg-gray-400 bg-opacity-75 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:-translate-y-1 focus:scale-110">
<div class="flex">
    <button class="m-auto mt-5 bg-green-700 p-2 rounded-lg text-gray-200 outline-none focus:outline-none">save</button>
    <button @click="EditPerson = false" class="m-auto mt-5 bg-red-700 p-2 rounded-lg text-gray-200 outline-none focus:outline-none">cansel</button>
</div>
</div>
</transition>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'personData',
  data: () => ({
    EditPerson: false
  })
})
</script>
