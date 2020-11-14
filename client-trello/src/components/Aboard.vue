<template>
  <div>
    <div class="h-full bg-gray-400 rounded-xl p-4">
      <div class="flex items-center mb-2">
        <h1 class="text-xl" v-text="board.name"></h1>
        <h3 @click="showListsBoard()" class="m-auto cursor-pointer mt-2 text-xl">
          <i class="fa fa-list-ul"></i>
        </h3>
        <h3 @click="showEditsBoard()" class="m-auto cursor-pointer mt-2 text-xl">
          <i class="fa fa-edit"></i>
        </h3>
        <h3 @click="showchatBoard()" class="m-auto cursor-pointer mt-2 text-xl">
          <i class="fa fa-envelope-o"></i>
        </h3>
        <h3 @click="showpersonsBoard()" class="m-auto cursor-pointer mt-2 text-xl">
          <i class="fa fa-group"></i>
        </h3>
        <h3 class="m-auto cursor-pointer mt-2 text-xl">
          <i class="fa fa-remove"></i>
        </h3>
      </div>
      <div class="grid grid-rows-1">
        <h2 v-text="board.description"></h2>
      </div>
    </div>
    <div class="mt-3">
       <transition
    name="showtask-profile"
    mode="out-in"
  >
      <list v-if="showLists" :lists = 'lists' :tasks = 'tasks' />
      <edit-board v-else-if="showEditBoard" :board = 'board' />
      <message v-else-if="showMessage"/>
      <team v-else-if="showTeam"/>
       </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ListsBoard from './Lists.vue'
import EditBoard from './EditBoard.vue'
import Messages from './Messages.vue'
import group from './boardTeam.vue'
import { Lists } from '../Model/lists'
export default defineComponent({
  name: 'board',
  props: ['edit'],
  components: {
    list: ListsBoard,
    editBoard: EditBoard,
    message: Messages,
    Team: group
  },
  data: () => ({
    showLists: true,
    showEditBoard: false,
    showMessage: false,
    showTeam: false,
    board: {},
    lists: {},
    tasks: {}
  }),
  created () {
    const Board = Lists.value
    this.board = Board.Board
    this.lists = Board.lists
    this.tasks = Board.task
    if (this.$props.edit === true) {
      this.showTeam = false
      this.showMessage = false
      this.showLists = false
      this.showEditBoard = true
    }
  },
  methods: {
    showListsBoard () {
      this.showTeam = false
      this.showMessage = false
      this.showEditBoard = false
      this.showLists = true
    },
    showEditsBoard () {
      this.showTeam = false
      this.showMessage = false
      this.showLists = false
      this.showEditBoard = true
    },
    showchatBoard () {
      this.showTeam = false
      this.showLists = false
      this.showEditBoard = false
      this.showMessage = true
    },
    showpersonsBoard () {
      this.showLists = false
      this.showEditBoard = false
      this.showMessage = false
      this.showTeam = true
    }
  }
})
</script>
