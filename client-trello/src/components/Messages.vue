<template>
  <div class="w-full lg:w-3/4 mx-auto">
    <div class="page-chat">
      <div class="main-chat">
        <div>
      <h1 class="text-xl ml-1" >javid</h1>
      <div
        class="ml-10 w-40 h-10 mt-0 bg-orange-300 rounded-r-lg rounded-b-lg"
      ></div>
    </div>
    <div class="d-l">
      <h1 class="text-xl mr-1" >mali</h1>
      <div
        class="mr-10 w-40 h-10 mt-0 bg-orange-300 rounded-l-lg rounded-b-lg"
      ></div>
    </div>
    <div>
      <form class="flex items-end">
        <input
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
export default defineComponent({
  name: 'message',
  props: ['board'],
  data: () => ({
    message: ''
  }),
  created () {
    const board = this.$props.board
    const message = { message: this.message, boardID: board._id }
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
