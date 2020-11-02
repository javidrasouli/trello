<template>
  <div class="partionPage">
    <div class="main-page">
      <task />
    </div>
    <div class="nav-page">
      <div class="board B2">
        <h3>Profile</h3>
        <h4>Edit</h4>
        <h4>Delete Accont</h4>
        </div>
      <div class="board B3">
        <h3>Tasks</h3>
        <h4>To do: 5</h4>
        <h4>Done: 3</h4>
        </div>
      <div class="board B4">
        <h3>Boards</h3>
        <h4>Your boards : 3</h4>
        <h4>All boards: 10</h4>
      </div>
      <div class="board B5">
        <h3>Messages</h3>
        <h4>You have 0 new Messages</h4>
        </div>
        <div class="B6"></div>
        <div class="B6 B7"></div>
    </div>
    <div class="overlay" v-if="createdboard" @click.self="createdboard = false">
        <modal v-if="createdboard" @close = 'close'/>
    </div>
    <div class="overlay" v-if="OpenEdit" @click.self="OpenEdit = false">
        <edit v-if="OpenEdit" :edit = 'edit' @close-edit = 'closeEdit'/>
    </div>
    <div class="overlay" v-if="OpenDel" @click.self="OpenDel = false">
        <remove v-if="OpenDel" :deleted = 'deleted' @close-deleted = 'closeDelete'/>
    </div>
    <div class="overlay" v-if="OpenM" @click.self="OpenM = false">
        <member v-if="OpenM" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import TaskList from '../components/Tasks.vue'
import create from './Modal/createBoard.vue'
import EditBoard from './Modal/EditBoard.vue'
import DelBoard from './Modal/delBoard.vue'
import memberBoard from './Modal/memberBoard.vue'
import { Boards, getBoards } from '../Model/boards'
import { BoardList } from '../Model/lists'
import { user } from '../Model/auth'
export default defineComponent({
  name: 'boards',
  components: {
    modal: create,
    edit: EditBoard,
    remove: DelBoard,
    member: memberBoard,
    task: TaskList
  },
  data: () => ({
    createdboard: false,
    OpenEdit: false,
    edit: {},
    deleted: {},
    OpenDel: false,
    OpenM: false,
    boardslist: [],
    user: {}
  }),
  mounted () {
    getBoards().then(() => {
      this.boardslist = Boards.value
    })
    this.user = user.value
  },
  methods: {
    openEdit (board: {}) {
      this.edit = board
      this.OpenEdit = true
    },
    close (close: boolean) {
      this.createdboard = close
    },
    created () {
      this.createdboard = true
    },
    closeEdit (closeEdit: boolean) {
      this.OpenEdit = closeEdit
    },
    OpenDeleted (board: {}) {
      this.OpenDel = true
      this.deleted = board
    },
    closeDelete (closeDelete: boolean) {
      this.OpenDel = closeDelete
    },
    async OpenMember (board: any) {
      await BoardList(board._id)
      this.OpenM = true
    },
    async OpenBoard (board: any) {
      await BoardList(board._id)
      this.$router.push('/board' + '/' + board.name)
    }
  }
})
</script>
<style lang="scss">
.partionPage{
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 3fr 1fr;
  padding: 1rem;
}
.nav-page{
  width: 300px;
  height: 450px;
  padding: 1rem;
  border-radius: 5px;
  border: 1px solid #333;
    background-color: #fff;
  position: relative;
  & .board{
    width: 95%;
    height: 30%;
    border: 1px solid #fff;
    background-color: #333;
    border-radius: 8px;
     position: absolute;
     &:hover{
       z-index: 999;
     }
     & h3{
       color: #f4f4f4;
       margin-left: 0.5rem;
     }
     & h4{
       color: #f4f4f4;
       margin-left: 0.5rem;
       margin-bottom: 0;
       margin-top: 0;
       cursor: pointer;
     }
  }
  & .B2{
    right: 2.5%;
    top: 15%;
    z-index: 1;
  }
  & .B3{
    right: 2.5%;
    top: 30%;
    z-index: 2;
  }
  & .B4{
    right: 2.5%;
    top: 45%;
    z-index: 3;
  }
  & .B5{
    right: 2.5%;
    top: 60%;
    z-index: 4;
  }
  & .B6{
    z-index: 5;
    top: 75%;
    width: 100%;
    height: 30%;
    border: 1px solid #333;
    background-color: #f4f4f4;
    border-radius: 8px;
     position: absolute;
  }
  .B7{
    right: 2.5%;
    border-radius: 0;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    border-right: none;
  }
}
.main-page{
  width: 90%;
  min-height: 100%;
  background-color: #f4f4f4;
  border-radius: 8px;
}
</style>
