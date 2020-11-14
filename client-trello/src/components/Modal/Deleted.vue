<template>
<div class="w-10/12 sm:w-2/3 md:w-1/2 lg:w-1/3 m-auto bg-red-500 bg-opacity-75 rounded-xl p-5">
<transition
    name="showtask-profile"
    mode="out-in"
  >
  <div v-if="Deleted">
    <input v-model="passwordUser" type="text" class="w-full p-2 rounded-md" placeholder="please enter your password">
    <div class=" flex">
       <button @click="deleteAccount()" class="m-auto mt-5 bg-red-700 p-2 rounded-lg text-gray-200 outline-none focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">Delete</button>
    <button @click="close()" type="button" class="m-auto mt-5 bg-green-700 p-2 rounded-lg text-gray-200 outline-none focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">cancel</button>
    </div>
  </div>
<div v-else>
  <h1 class="text-center text-xl">Are you sure delete your account ?</h1>
<div class="mt-5 flex">
  <button @click="Deleted = true"  class="m-auto mt-5 bg-red-700 p-2 rounded-lg text-gray-200 outline-none focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">yes</button>
  <button @click="close()" type="button" class="m-auto mt-5 bg-green-700 p-2 rounded-lg text-gray-200 outline-none focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">cancel</button>
</div>
</div>
</transition>
</div>
</template>
<style lang="scss">
</style>
<script lang="ts">
import { defineComponent } from 'vue'
import { getuser, user, err, deletedPerson } from '../../Model/auth'
export default defineComponent({
  name: 'deleteAccount',
  data: () => ({
    Deleted: false,
    passwordUser: '',
    error: ''
  }),
  async created () {
    await getuser()
  },
  methods: {
    deleteAccount () {
      const person = user.value
      if (person.pass === this.passwordUser) {
        deletedPerson(user.value).then(() => {
          if (err.value.length > 1) {
            this.error = err.value
          } else {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshtoken')
            this.$router.push('/register')
          }
        })
      }
    },
    close () {
      this.$emit('close', false)
    }
  }
})
</script>
