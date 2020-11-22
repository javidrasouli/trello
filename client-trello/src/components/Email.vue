<template>
  <div class="w-full email-page mx-auto min-h-full">
    <div class="page-chat min-h-full">
      <div class="min-h-full grid grid-rows-1">
        <div>
        <div v-if="board" v-text="board" class="w-full h-10 p-2 text-gray-300 bg-gray-700 rounded-lg"></div>
        <div v-for="pm in boardMessage" :key="pm._id">
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
    <div class="listBoard">
        <div v-for="board in listEmails" :key="board.id">
        <h1 @click="showMassege(board)" v-text="board.board" class="bg-gray-700 p-2 m-2 cursor-pointer rounded-md text-lg text-gray-300"></h1>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getEmail, messageBoard, send } from '../Model/email'
export default defineComponent({
  name: 'message',
  props: ['listEmails'],
  data: () => ({
    message: '',
    boardMessage: {},
    board: '',
    boardID: ''
  }),
  methods: {
    showMassege (board: any) {
      getEmail(board.boardID).then(() => {
        this.board = board.board
        this.boardID = board.boardID
        this.boardMessage = messageBoard.value
      })
    },
    sendMessage () {
      const pm = { message: this.message, boardID: this.boardID }
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
.email-page{
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
}
@media screen and (min-width: 500px) {
.email-page{
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns:2fr 1fr;
}
}
@media screen and (min-width: 1000px) {
.email-page{
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns:3fr 1fr;
}
}
</style>
