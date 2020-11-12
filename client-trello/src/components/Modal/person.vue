<template>
<div class="w-10/12 sm:w-2/3 md:w-1/2 lg:w-1/3 m-auto h-modal bg-teal-300 rounded-xl p-5">
<transition
    name="showtask-profile"
    mode="out-in"
  >
<div v-if="PersonData">
<h1 class="text-2xl border-b" v-text="user.username"></h1>
<h2 class="my-4 text-lg">email: <span v-text="user.email"></span></h2>
<h2 class="text-lg">password: <span v-text="user.pass"></span></h2>
<div class="mt-5 flex">
  <button @click="EditPerson = true, PersonData = false, DeletedPerson = false" class="m-auto border p-2 rounded-xl bg-yellow-300 outline-none focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">Edit</button>
  <button @click="EditPerson = false, PersonData = false, DeletedPerson = true" class="m-auto border p-2 rounded-xl bg-red-700 outline-none focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">Delete</button>
  <button @click="close()" class="m-auto border p-2 rounded-xl bg-green-500 outline-none focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">close</button>
</div>
</div>
<div v-else-if="EditPerson" class="grid grid-rows-1 justify-center">
<input type="text" v-model="usernameEdit" placeholder="username" class="border focus:border-black outline-none focus:outline-none w-64 p-2 rounded-md bg-gray-400 bg-opacity-75 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:-translate-y-1 focus:scale-110">
<input type="email" v-model="emailEdit" placeholder="email" class="border focus:border-black outline-none focus:outline-none w-64 p-2 my-4 rounded-md bg-gray-400 bg-opacity-75 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:-translate-y-1 focus:scale-110">
<input type="text" v-model="passEdit" placeholder="password" class="border focus:border-black outline-none focus:outline-none w-64 p-2 rounded-md bg-gray-400 bg-opacity-75 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:-translate-y-1 focus:scale-110">
<div class="flex">
    <button @click="EditUser()" class="m-auto mt-5 bg-green-700 p-2 rounded-lg text-gray-200 outline-none focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">save</button>
    <button @click="EditPerson = false, PersonData = true, DeletedPerson = false" class="m-auto mt-5 bg-red-700 p-2 rounded-lg text-gray-200 outline-none focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">cancel</button>
</div>
</div>
<div v-else-if="DeletedPerson" class="grid grid-rows-1 justify-center items-center">
  <h1 class="text-xl mt-16">Do you want <span class="text-red-700">Delete</span> <span v-text="user.username"></span>?</h1>
<div class="flex">
    <button @click="deleetedUser()" class="m-auto mt-5 bg-red-700 p-2 rounded-lg text-gray-200 outline-none focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">Delete</button>
    <button @click="EditPerson = false, PersonData = true, DeletedPerson = false" class="m-auto mt-5 bg-green-700 p-2 rounded-lg text-gray-200 outline-none focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">cancel</button>
</div>
</div>
</transition>
<transition name="fadein">
  <div v-if="error" @click.self="error = !error" class="modal-mask grid grid-rows-1 items-center">
  <p v-text="error" v-show="error" class="p-2 mb-4 rounded-md sm:w-4/5 md:w-8/12 lg:w-1/2 text-center justify-self-center bg-red-700 text-gray-100"></p>
</div>
</transition>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { deletedPerson, Editperson, err } from '../../Model/auth'
export default defineComponent({
  name: 'personData',
  props: ['user'],
  data: () => ({
    PersonData: true,
    DeletedPerson: false,
    EditPerson: false,
    usernameEdit: '',
    emailEdit: '',
    passEdit: '',
    error: ''
  }),
  created () {
    const user = this.$props.user
    this.usernameEdit = user.username
    this.emailEdit = user.email
    this.passEdit = user.pass
  },
  methods: {
    EditUser () {
      const user = this.$props.user
      const Edit = { _id: user._id, username: this.usernameEdit, email: this.emailEdit, pass: this.passEdit }
      Editperson(user, Edit).then(() => {
        if (err.value.length > 1) {
          this.error = err.value
        } else {
          this.$emit('close', false)
        }
      })
    },
    deleetedUser () {
      const user = this.$props.user
      deletedPerson(user).then(() => {
        if (err.value.length > 1) {
          this.error = err.value
        } else {
          this.$emit('close', false)
        }
      })
    },
    close () {
      this.$emit('close', false)
    }
  }
})
</script>
