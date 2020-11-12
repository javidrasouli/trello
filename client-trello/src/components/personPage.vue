<template>
    <div>
        <div class="m-3 lg:grid lg:grid-rows-1 lg:grid-cols-2">
            <form class="w-full md:w-2/3">
                <input v-model="usernamePerson" type="text" placeholder="username" class="w-full bg-transparent border-2 border-dashed border-gray-700 p-1 outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:-translate-y-1 focus:scale-110">
                <input v-model="emailPerson" type="email" placeholder="email" class="w-full my-2 bg-transparent border-2 border-dashed border-gray-700 p-1 outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:-translate-y-1 focus:scale-110">
                <input v-model="passwordPerson" type="text" placeholder="password" class="w-full bg-transparent border-2 border-dashed border-gray-700 p-1 outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:-translate-y-1 focus:scale-110">
                <button class="w-full my-2 p-2 border border-green-400 rounded-md hover:bg-green-500 hover:text-gray-300">Edit</button>
                <h1 @click="deletedAccount = true" class="text-center mt-3 text-red-600 text-lg none-nav cursor-pointer">Delete Account</h1>
            </form>
            <div class="hidden lg:block bg-orange-300 rounded-lg p-4">
                <h1 class="text-xl" v-text="usernamePerson"></h1>
                <h2 class="text-blue-400"><span class="text-green-500">email:</span><span v-text="emailPerson"></span></h2>
                <h2 class="text-purple-700"><span class="text-red-600">pasword:</span><span v-text="passwordPerson"></span></h2>
            </div>
        </div>
        <transition name="fadeIn">
    <div v-if="deletedAccount" @click.self="deletedAccount = !deletedAccount" class="modal-mask grid grid-rows-1 items-center">
      <deleted-acc v-if="deletedAccount" @close = 'close'/>
    </div>
    </transition>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getuser, user } from '../Model/auth'
import deleted from './Modal/Deleted.vue'
export default defineComponent({
  name: 'person',
  components: {
    deletedAcc: deleted
  },
  data: () => ({
    deletedAccount: false,
    usernamePerson: '',
    emailPerson: '',
    passwordPerson: '',
    error: '',
    user: {}
  }),
  async created () {
    await getuser()
    const person = user.value
    this.user = person
    this.usernamePerson = person.username
    this.emailPerson = person.email
    this.passwordPerson = person.pass
  },
  methods: {
    close (close: boolean) {
      this.deletedAccount = close
    }
  }
})
</script>
