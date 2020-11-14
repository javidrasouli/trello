<template>
<div class="w-10/12 sm:w-2/3 md:w-1/2 lg:w-1/3 m-auto bg-gray-700 bg-opacity-75 rounded-xl p-5">
<form @submit.prevent="create()">
    <p v-text="error" v-show="error" class="p-2 mb-4 rounded-md w-full text-center justify-self-center bg-red-700 text-gray-100"></p>
    <input type="text" v-model="boardName" placeholder="Board name" class="w-full border p-2 my-2 rounded-lg focus:bg-gray-400 focus:outline-none">
    <textarea rows="6" v-model="boardDescription" placeholder="Board description" class="w-full border p-2 my-2 rounded-lg focus:bg-gray-400 focus:outline-none"></textarea>
    <div class="flex">
  <button class="m-auto bg-green-700 p-2 rounded-lg text-gray-200 outline-none focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">create</button>
  <button @click="close()" type="button" class="m-auto bg-red-700 p-2 rounded-lg text-gray-200 outline-none focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">cancel</button>
</div>
</form>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { errorBoard, insertBoard } from '../../Model/boards'
export default defineComponent({
  name: 'createBoard',
  props: ['user'],
  data: () => ({
    boardName: '',
    boardDescription: '',
    error: ''
  }),
  methods: {
    create () {
      const user = this.$props.user
      const newBoard = { name: this.boardName, description: this.boardDescription, userID: user._id }
      insertBoard(newBoard).then(() => {
        if (errorBoard.value.length > 1) {
          this.error = errorBoard.value
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
