<template>
  <div class="grid grid-rows-1 grid-cols-1 lg:grid-cols-2">
    <div>
      <form class="grid grid-cols-1 grid-rows-1 w-3/4 lg:w-1/2 my-5 m-auto">
        <input
          type="text"
          placeholder="username"
          class=" mr-1 bg-teal-400 p-2 rounded-lg outline-none h-10 self-center placeholder-gray-700 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:-translate-y-1 focus:scale-110"
        />
        <input
          type="email"
          placeholder="email"
          class=" mr-1 my-2 bg-teal-400 p-2 rounded-lg outline-none h-10 self-center placeholder-gray-700 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:-translate-y-1 focus:scale-110"
        />
        <input
          type="password"
          placeholder="password"
          class=" mr-1 mb-2 bg-teal-400 p-2 rounded-lg outline-none h-10 self-center placeholder-gray-700 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:-translate-y-1 focus:scale-110"
        />
        <button
          class=" bg-gradient-to-r hover:from-teal-400 focus:outline-none outline-none hover:to-blue-500 h-10 self-center hover:text-gray-300 rounded-lg p-2 bg-transparent border border-blue-500"
        >
          Add
        </button>
      </form>
    </div>
    <div>
      <table class="border-separate border-2 border-gray-500 m-auto w-full">
        <thead>
          <tr>
            <th class="border border-gray-400 px-4 py-2 text-gray-800">
              username
            </th>
            <th class="border border-gray-400 px-4 py-2 text-gray-800">email</th>
            <th class="border border-gray-400 px-4 py-2 text-gray-800">password</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td @click="showPerson = true" class="border cursor-pointer border-gray-400 px-4 py-2">javid</td>
            <td class="border border-gray-400 px-4 py-2">javid99.rasouli@gmail.com</td>
            <td class="border border-gray-400 px-4 py-2">javid1383</td>
          </tr>
          <tr>
            <td class="border border-gray-400 px-4 py-2">Ohio</td>
            <td class="border border-gray-400 px-4 py-2">Columbus</td>
          </tr>
          <tr>
            <td class="border border-gray-400 px-4 py-2">Michigan</td>
            <td class="border border-gray-400 px-4 py-2">Detroit</td>
          </tr>
        </tbody>
      </table>
    </div>
    <transition name="fadeIn">
    <div v-if="showPerson" @click.self="showPerson = !showPerson" class="modal-mask grid grid-rows-1 items-center">
      <person-data v-if="showPerson"/>
    </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import person from './Modal/person.vue'
export default defineComponent({
  name: 'members',
  components: {
    personData: person
  },
  data: () => ({
    showPerson: false
  })
})
</script>
