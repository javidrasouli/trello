<template>
  <div class="partion-tasks">
    <div
    v-for="board in boards" :key="board._id"
      class="bg-black h-40 opacity-50 rounded-xl p-5 m-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:shadow-2xl"
    >
      <h1 v-text="board.name" class="text-white text-center text-xl"></h1>
      <h2 class="text-white"><span v-text="board.description.slice(0,30)"></span><span v-if="board.description.length > 30">....</span></h2>
      <div class="flex">
        <h3 class="m-auto cursor-pointer text-white mt-2">
          <i @click="singleBoard(board)" class="fa fa-eye"></i>
        </h3>
        <h3 class="m-auto cursor-pointer text-white mt-2">
          <i @click="EditBoard(board)" class="fa fa-edit"></i>
        </h3>
        <h3 class="m-auto cursor-pointer text-white mt-2">
          <i @click="singleBoard()" class="fa fa-remove"></i>
        </h3>
      </div>
    </div>
    <div
    @click="createBoard = true"
        class=" bg-transparent rounded-xl w-42 h-40 m-2 border-dashed border-4 border-gray-600 bg-gray-400 opacity-25 grid grid-rows-1 grid-cols-1 relative cursor-pointer"
      >
        <span
          class="border-dashed border-2 border-gray-600 absolute addlist-y z-0"
        ></span>
        <span
          class=" border-dashed border-2 border-gray-600 absolute addlist-x z-10"
        ></span>
      </div>
      <transition name="fadeIn">
    <div v-if="createBoard" @click.self="createBoard = !createBoard" class="modal-mask grid grid-rows-1 items-center">
      <create v-if="createBoard" :user = 'user' @close = 'close'/>
    </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { user } from '../Model/auth'
import { Boards } from '../Model/boards'
import BoardModal from './Modal/BoardModal.vue'
export default defineComponent({
  name: 'boards',
  components: {
    create: BoardModal
  },
  data: () => ({
    boards: {},
    createBoard: false,
    user: {}
  }),
  created () {
    this.user = user.value
    this.boards = Boards.value
  },
  methods: {
    singleBoard (board: {}) {
      const openBoard = { board: board, open: true }
      this.$emit('board', openBoard)
    },
    EditBoard (board: {}) {
      this.$emit('edit-board', board)
    },
    close (close: boolean) {
      this.createBoard = close
    }
  }
})
</script>
