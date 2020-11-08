<template>
  <div>
    <div class="h-full bg-gray-400 rounded-xl p-4">
      <div class="flex items-center mb-2">
        <h1 class="text-xl">test 1</h1>
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
        <h2>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas suscipit
          dicta eveniet, omnis enim fuga ipsum unde, quia reprehenderit dolores
          iure sapiente libero aperiam autem pariatur ut laudantium et! Ut.
        </h2>
      </div>
    </div>
    <div class="mt-3">
      <list v-if="showLists" />
      <edit-board v-if="showEditBoard" />
      <message v-if="showMessage"/>
      <team v-if="showTeam"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Lists from './Lists.vue'
import EditBoard from './EditBoard.vue'
import Messages from './Messages.vue'
import group from './boardTeam.vue'
export default defineComponent({
  name: 'board',
  components: {
    list: Lists,
    editBoard: EditBoard,
    message: Messages,
    Team: group
  },
  data: () => ({
    showLists: true,
    showEditBoard: false,
    showMessage: false,
    showTeam: false
  }),
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
