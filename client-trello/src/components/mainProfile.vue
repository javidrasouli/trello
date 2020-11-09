<template>
  <div class="partionPage">
    <div class="main-page shadow-lg overflow-auto p-1 md:p-5">
      <transition
    name="showtask-profile"
    mode="out-in"
  >
        <board-page v-if="boardShow"/>
        <task v-else-if="taskShow"/>
        <board v-else-if="listShow"/>
      <person v-else-if="showPerson"/>
      <member v-else-if="showMembers"/>
      </transition>
    </div>
    <div class="nav-page shadow-xl">
      <div
        class="board B1 z-0 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:shadow-2xl"
      >
        <h3 class="text-white m-5">Members</h3>
        <h4
        @click="showMembersSite()"
          class="mx-3 text-md text-gray-100 cursor-pointer hover:text-green-400"
        >
          All members
        </h4>
      </div>
      <div
        class="board B2 z-10 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:shadow-2xl"
      >
        <h3 class="text-white m-5">Profile</h3>
        <h4
        @click="editShow()"
          class="mx-3 text-md text-gray-100 cursor-pointer hover:text-green-400"
        >
          Edit
        </h4>
        <h4
          class="mx-3 text-gray-100 text-md cursor-pointer hover:text-red-700"
        >
          Delete Accont
        </h4>
      </div>
      <div
        class="board B3 z-20 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:shadow-2xl"
      >
        <h3 class="text-white m-5">Tasks</h3>
        <h4
        @click="showTaksTodo()"
          class="mx-3 text-md text-gray-100 cursor-pointer hover:text-green-400"
        >
          To do: 5
        </h4>
        <h4
        @click="showTaksDone()"
          class="mx-3 text-md text-gray-100 cursor-pointer hover:text-green-400"
        >
          Done: 3
        </h4>
      </div>
      <div
        class="board B4 z-30 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:shadow-2xl"
      >
        <h3 class="text-white m-5">Boards</h3>
        <h4
        @click="showYourBoards()"
          class="mx-3 text-md text-gray-100 cursor-pointer hover:text-green-400"
        >
          Your boards : 3
        </h4>
        <h4
        @click="showAllBoards()"
          class="mx-3 text-md text-gray-100 cursor-pointer hover:text-green-400"
        >
          All boards: 10
        </h4>
      </div>
      <div
        class="board B5 z-40 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:shadow-2xl"
      >
        <h3 class="text-white m-5">Messages</h3>
        <h4
          class="mx-3 text-md text-gray-100 cursor-pointer hover:text-green-400"
        >
          You have 0 new Messages
        </h4>
      </div>
      <div class="B6 z-50"></div>
      <div class="B6 B7 z-50"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Task from './Tasks.vue'
import Boards from './Boards.vue'
import Board from './Aboard.vue'
import personPage from './personPage.vue'
import members from './members.vue'
export default defineComponent({
  name: 'mainProfile',
  components: {
    task: Task,
    boardPage: Boards,
    board: Board,
    person: personPage,
    member: members
  },
  data: () => ({
    taskShow: true,
    boardShow: false,
    listShow: false,
    showPerson: false,
    showMembers: false
  }),
  methods: {
    editShow () {
      this.taskShow = false
      this.boardShow = false
      this.listShow = false
      this.showMembers = false
      this.showPerson = true
    },
    showTaksTodo () {
      this.boardShow = false
      this.listShow = false
      this.showPerson = false
      this.showMembers = false
      this.taskShow = true
    },
    showTaksDone () {
      this.boardShow = false
      this.listShow = false
      this.showPerson = false
      this.showMembers = false
      this.taskShow = true
    },
    showYourBoards () {
      this.listShow = false
      this.showPerson = false
      this.taskShow = false
      this.showMembers = false
      this.boardShow = true
    },
    showAllBoards () {
      this.listShow = false
      this.showPerson = false
      this.taskShow = false
      this.showMembers = false
      this.boardShow = true
    },
    showMembersSite () {
      this.listShow = false
      this.showPerson = false
      this.taskShow = false
      this.boardShow = false
      this.showMembers = true
    }
  }
})
</script>
<style lang="scss">
.partionPage {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 3fr 1fr;
  padding: 1rem;
}
.nav-page {
  width: 300px;
  height: 450px;
  padding: 1rem;
  border-radius: 5px;
  background-color: #fff;
  position: relative;
  & .board {
    width: 95%;
    height: 30%;
    border: 1px solid #fff;
    background-color: #333;
    border-radius: 8px;
    position: absolute;
    &:hover {
      z-index: 999;
    }
  }
  & .B1 {
    right: 2.5%;
    top: 4%;
  }
  & .B2 {
    right: 2.5%;
    top: 15%;
  }
  & .B3 {
    right: 2.5%;
    top: 30%;
  }
  & .B4 {
    right: 2.5%;
    top: 45%;
  }
  & .B5 {
    right: 2.5%;
    top: 60%;
  }
  & .B6 {
    top: 75%;
    width: 100%;
    height: 30%;
    border: 1px solid #333;
    background-color: #f4f4f4;
    border-radius: 8px;
    position: absolute;
  }
  .B7 {
    right: 2.5%;
    border-radius: 0;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    border-right: none;
  }
}
.main-page {
  width: 95%;
  height: 530px;
  background-color: #f4f4f4;
  border-radius: 8px;
}
@media screen and (max-width: 750px) {
  .partionPage {
    display: grid;
  grid-template-rows: 1fr;
  grid-template-columns:1fr;
  padding: 1rem;
  }
  .nav-page{
    display: none;
  }
  .main-page{
    width: 100%;
  }
}
.showtask-profile-enter-active, .showtask-profile-leave-active {
  transition: opacity .5s
}

.showtask-profile-enter-from, .showtask-profile-leave-to {
  opacity: 0
}

</style>
