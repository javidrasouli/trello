<template>
  <div class="w-full lg:w-3/4 mx-auto min-h-full">
    <div class="page-chat min-h-full">
      <div class="min-h-full grid grid-rows-1">
        <div>
        <div v-for="pm in messages" :key="pm._id">
      <h1 v-text="pm.person" class="text-xl ml-1"></h1>
      <div
      v-text="pm.message"
        class="ml-10 p-2 mt-0 bg-orange-300 rounded-r-lg rounded-b-lg"
      ></div>
    </div>
        </div>
    <div class="self-end">
      <form @submit.prevent="sendMessage()" class="flex items-end">
        <input
          v-model="message"
          type="text"
          class="write h-10 bg-gray-500 rounded-xl mt-5 p-3 outline-none"
        />
        <button
          class=" ml-3 bg-gradient-to-r hover:from-teal-400 hover:to-blue-500 hover:text-gray-300 h-10 rounded-lg p-2 text-lg bg-transparent border border-blue-500"
        >
          send
        </button>
      </form>
    </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getEmail, messageBoard, send } from '../Model/email'
export default defineComponent({
  name: 'message',
  props: ['board'],
  data: () => ({
    message: '',
    messages: {}
  }),
  created () {
    const board = this.$props.board
    getEmail(board._id).then(() => {
      this.messages = messageBoard.value
      debugger
    })
  },
  methods: {
    sendMessage () {
      const pm = { message: this.message, boardID: this.$props.board._id }
      send(pm).then(() => {
        this.message = ''
      })
    }
  }
})
</script>

<style lang="scss">
.d-l {
  direction: rtl;
}
.write {
  width: 90%;
}
</style>
