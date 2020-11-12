<template>
  <div class="grid grid-rows-1 grid-cols-1 lg:grid-cols-2">
    <div>
      <form @submit.prevent="Adduser()" class="grid grid-cols-1 grid-rows-1 w-3/4 lg:w-1/2 my-5 m-auto">
        <input
          type="text"
          placeholder="username"
          v-model= "usernameAdd"
          class=" mr-1 bg-teal-400 p-2 rounded-lg outline-none h-10 self-center placeholder-gray-700 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:-translate-y-1 focus:scale-110"
        />
        <input
          type="email"
          placeholder="email"
          v-model= "emailAdd"
          class=" mr-1 my-2 bg-teal-400 p-2 rounded-lg outline-none h-10 self-center placeholder-gray-700 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:-translate-y-1 focus:scale-110"
        />
        <input
          type="text"
          placeholder="password"
          v-model="passAdd"
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
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user._id">
            <td @click="showPersonData(user)" class="border cursor-pointer border-gray-400 px-4 py-2" v-text="user.username"></td>
            <td class="border border-gray-400 px-4 py-2" v-text="user.email"></td>
          </tr>
        </tbody>
      </table>
    </div>
    <transition name="fadeIn">
    <div v-if="showPerson" @click.self="showPerson = !showPerson" class="modal-mask grid grid-rows-1 items-center">
      <person-data v-if="showPerson" :user = 'user' @close = 'close'/>
    </div>
    <div v-else-if="error" @click.self="error = !error" class="modal-mask grid grid-rows-1 items-center">
      <p v-text="error" v-show="error" class="p-2 mb-4 rounded-md sm:w-4/5 md:w-8/12 lg:w-1/2 text-center justify-self-center bg-red-700 text-gray-100"></p>
    </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { AddPerson, err, getUsersSite, members } from '../Model/auth'
import person from './Modal/person.vue'
export default defineComponent({
  name: 'members',
  components: {
    personData: person
  },
  data: () => ({
    showPerson: false,
    users: {},
    usernameAdd: '',
    passAdd: '',
    emailAdd: '',
    user: {},
    error: ''
  }),
  created () {
    getUsersSite().then(() => {
      this.users = members.value
    })
  },
  methods: {
    Adduser () {
      const user = { username: this.usernameAdd, email: this.emailAdd, pass: this.passAdd }
      AddPerson(user).then(() => {
        if (err.value.length > 1) {
          this.error = err.value
        } else {
          this.usernameAdd = ''
          this.emailAdd = ''
          this.passAdd = ''
        }
      })
    },
    showPersonData (user: {}) {
      this.user = user
      this.showPerson = true
    },
    close (close: boolean) {
      this.showPerson = close
    }
  }
})
</script>
