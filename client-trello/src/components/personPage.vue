<template>
    <div>
        <div class="m-3 lg:grid lg:grid-rows-1 lg:grid-cols-2">
            <form @submit.prevent="EditProfile()" class="w-full md:w-2/3">
                <input v-model="usernamePerson" type="text" placeholder="username" class="w-full bg-transparent border-2 border-dashed border-gray-700 p-1 outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:-translate-y-1 focus:scale-110">
                <input v-model="emailPerson" type="email" placeholder="email" class="w-full my-2 bg-transparent border-2 border-dashed border-gray-700 p-1 outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:-translate-y-1 focus:scale-110">
                <input v-model="oldPassword" type="text" placeholder="old Password" class="w-full bg-transparent border-2 border-dashed border-gray-700 p-1 outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:-translate-y-1 focus:scale-110">
                <input v-model="NewPassword" type="text" placeholder="New Password" class="w-full bg-transparent border-2 border-dashed border-gray-700 p-1 outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:-translate-y-1 focus:scale-110">
                <button class="w-full my-2 p-2 border border-green-400 rounded-md hover:bg-green-500 hover:text-gray-300">Edit</button>
                <h1 @click="deletedAccount = true" class="text-center mt-3 text-red-600 text-lg none-nav cursor-pointer">Delete Account</h1>
            </form>
            <div class="hidden lg:block bg-orange-300 rounded-lg p-4">
                <h1 class="text-xl" v-text="usernamePerson"></h1>
                <h2 class="text-blue-400"><span class="text-green-500">email:</span><span v-text="emailPerson"></span></h2>
                <h2 class="text-purple-700"><span class="text-red-600">your Boards:</span> <span v-text="Info.board"></span></h2>
                <h2 class="text-purple-700"><span class="text-red-600">your Tasks:</span> <span v-text="Info.task"></span></h2>
                <h2 class="text-purple-700"><span class="text-red-600">your Teams:</span> <span v-text="Info.team"></span></h2>
            </div>
        </div>
        <transition name="fadeIn">
    <div v-if="deletedAccount" @click.self="deletedAccount = !deletedAccount" class="modal-mask grid grid-rows-1 items-center">
      <deleted-acc v-if="deletedAccount" @close = 'close'/>
    </div>
    <div v-else-if="modal" @click.self="modal = !modal" class="modal-mask grid grid-rows-1 items-center">
      <p v-text="error" v-show="error" class="p-2 mb-4 rounded-md sm:w-4/5 md:w-8/12 lg:w-1/2 text-center justify-self-center bg-red-700 text-gray-100"></p>
      <p v-text="success" v-show="success" class="p-2 mb-4 rounded-md sm:w-4/5 md:w-8/12 lg:w-1/2 text-center justify-self-center bg-green-700 text-gray-100"></p>
   </div>
    </transition>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getuser, user, err, EditProfile, userInfo, Info } from '../Model/auth'
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
    oldPassword: '',
    NewPassword: '',
    error: '',
    success: '',
    modal: false,
    Info: {}
  }),
  created () {
    getuser().then(() => {
      const person = user.value
      this.usernamePerson = person.username
      this.emailPerson = person.email
      userInfo().then(() => {
        this.Info = Info.value
      })
    })
  },
  methods: {
    close (close: boolean) {
      this.deletedAccount = close
    },
    EditProfile () {
      const profile = user.value
      if (profile.pass === this.oldPassword) {
        let New
        if (this.NewPassword.length > 1) {
          New = { _id: profile._id, username: this.usernamePerson, email: this.emailPerson, pass: this.NewPassword, role: profile.role }
        } else {
          New = { _id: profile._id, username: this.usernamePerson, email: this.emailPerson, pass: this.oldPassword, role: profile.role }
        }
        EditProfile(New).then(() => {
          if (err.value.length > 1) {
            this.modal = true
            this.error = err.value
            debugger
          } else {
            this.modal = true
            this.success = 'your profile updated'
            this.oldPassword = ''
            this.NewPassword = ''
          }
        })
      } else {
        this.modal = true
        this.error = 'your password is wrong'
      }
    }
  }
})
</script>
