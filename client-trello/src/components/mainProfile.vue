<template>
<div>
<ul class="navbar-profile none-nav py-0 bg-gray-800">
        <li @click="editShow()" class="cursor-pointer hover:text-green-300">Profile</li>
        <li v-if="user.role === 'admin'" @click="showMembersSite()" class="cursor-pointer hover:text-green-300">Members</li>
        <li @click="showTaksTodo()" class="cursor-pointer hover:text-green-300">Tasks</li>
        <li @click="showAllBoards(true)" class="cursor-pointer hover:text-green-300">Boards</li>
        <li class="cursor-pointer hover:text-green-300">Message</li>
      </ul>
  <div class="partionPage">
    <div class="main-page shadow-lg overflow-y-auto p-1 md:p-5">
      <transition
    name="showtask-profile"
    mode="out-in"
  >
        <board-page v-if="boardShow" @board = 'board' @edit-board = 'EditBoard' :addBoard = 'addBoard' />
        <task v-else-if="taskShow" :Todo = 'Todo' :Done = 'Done' />
        <board v-else-if="listShow" :edit = 'edit' @close-aboard = 'changePage' />
      <person v-else-if="showPerson"/>
      <member v-else-if="showMembers"/>
      <email v-else-if="showEmails" :listEmails = 'listEmails' />
      </transition>
    </div>
    <div class="nav-page shadow-xl">
      <div
        v-if="user.role === 'admin'"
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
          @click="deletedAccount = true"
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
          To do
        </h4>
        <h4
        @click="showTaksDone()"
          class="mx-3 text-md text-gray-100 cursor-pointer hover:text-green-400"
        >
          Done
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
          Your boards
        </h4>
        <h4
        @click="showAllBoards(false)"
          class="mx-3 text-md text-gray-100 cursor-pointer hover:text-green-400"
        >
          All boards
        </h4>
      </div>
      <div
        class="board B5 z-40 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:shadow-2xl"
      >
      <span v-if="Email" class="animate-ping absolute inline-flex h-12 w-3/4 rounded-full bg-purple-400 opacity-75"></span>
        <h3 class="text-white m-5">Messages</h3>
        <div>
          <h4
          @click="openEmail()"
          v-if="Email"
          class="mx-3 text-md text-gray-100 cursor-pointer hover:text-green-400"
        >
          You have a new Messages
        </h4>
        <h4
          @click="openEmail()"
          v-else
          class="mx-3 text-md text-gray-100 cursor-pointer hover:text-green-400"
        >
          your message
        </h4>
        </div>
      </div>
      <div class="B6 z-50"></div>
      <div class="B6 B7 z-50"></div>
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
import deleted from './Modal/Deleted.vue'
import Task from './Tasks.vue'
import Boards from './Boards.vue'
import Board from './Aboard.vue'
import personPage from './personPage.vue'
import members from './members.vue'
import emailPage from './Email.vue'
import { getuser } from '../Model/auth'
import { getAllBoards, getBoards } from '../Model/boards'
import { BoardList, getTasks } from '../Model/lists'
import { getAllEmail, listMessage } from '../Model/email'
export default defineComponent({
  name: 'mainProfile',
  props: ['user'],
  components: {
    deletedAcc: deleted,
    task: Task,
    boardPage: Boards,
    board: Board,
    person: personPage,
    member: members,
    email: emailPage
  },
  data: () => ({
    taskShow: true,
    boardShow: false,
    listShow: false,
    showPerson: false,
    showMembers: false,
    edit: false,
    deletedAccount: false,
    Todo: true,
    Done: false,
    addBoard: false,
    Email: false,
    showEmails: false,
    listEmails: {}
  }),
  created () {
    getAllEmail().then(() => {
      const pms = listMessage.value.PM
      const sees = listMessage.value.see
      for (const pm of pms) {
        for (const see of sees) {
          if (pm.boardID === see.boardID) {
            if (pm.count > see.count) {
              this.Email = true
            }
          }
        }
      }
    })
  },
  methods: {
    editShow () {
      this.taskShow = false
      this.boardShow = false
      this.listShow = false
      this.showMembers = false
      this.showEmails = false
      this.showPerson = true
    },
    showTaksTodo () {
      getTasks(true).then(() => {
        this.boardShow = false
        this.listShow = false
        this.showPerson = false
        this.showMembers = false
        this.showEmails = false
        this.Todo = true
        this.Done = false
        this.taskShow = true
      })
    },
    showTaksDone () {
      getTasks(false).then(() => {
        this.boardShow = false
        this.listShow = false
        this.showPerson = false
        this.showMembers = false
        this.showEmails = false
        this.Todo = false
        this.Done = true
        this.taskShow = true
      })
    },
    showYourBoards () {
      getBoards().then(() => {
        this.listShow = false
        this.showPerson = false
        this.taskShow = false
        this.showMembers = false
        this.showEmails = false
        this.addBoard = true
        this.boardShow = true
        this.edit = false
      })
    },
    showAllBoards (showAdd: boolean) {
      getAllBoards().then(() => {
        this.listShow = false
        this.showPerson = false
        this.taskShow = false
        this.showMembers = false
        this.showEmails = false
        this.addBoard = showAdd
        this.boardShow = true
        this.edit = false
      })
    },
    showMembersSite () {
      this.listShow = false
      this.showPerson = false
      this.taskShow = false
      this.boardShow = false
      this.showEmails = false
      this.showMembers = true
    },
    board (board: any) {
      BoardList(board.board._id).then(() => {
        this.showPerson = false
        this.taskShow = false
        this.boardShow = false
        this.showMembers = false
        this.showEmails = false
        this.listShow = board.open
      })
    },
    EditBoard (board: any) {
      BoardList(board._id).then(() => {
        this.edit = true
        this.showPerson = false
        this.taskShow = false
        this.boardShow = false
        this.showMembers = false
        this.showEmails = false
        this.listShow = true
      })
    },
    changePage (change: boolean) {
      if (change === true) {
        getuser().then(() => {
          getBoards().then(() => {
            this.listShow = false
            this.showPerson = false
            this.taskShow = false
            this.showMembers = false
            this.showEmails = false
            this.boardShow = true
            this.edit = false
          })
        })
      }
    },
    close (close: boolean) {
      this.deletedAccount = close
    },
    openEmail () {
      this.listShow = false
      this.showPerson = false
      this.taskShow = false
      this.showMembers = false
      this.boardShow = false
      this.edit = false
      this.listEmails = listMessage.value.PM
      this.showEmails = true
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
