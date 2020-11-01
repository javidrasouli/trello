<template>
  <div>
    <nav>
      <ul class="navbar-board">
        <li class="navbar-board-item" @click="created()" >create Board</li>
      </ul>
    </nav>
    <div class="Boards conteiner">
      <div v-for="board in boardslist" :key= "board._id">
          <div class="board">
      <div class="inner">
        <div class="front">
          <h1 v-text="board.name"></h1>
          <h4 v-text="board.description" style="color:#555"></h4>
          <div class="board-icon">
            <h3><i class="fa fa-edit edit-board" @click="openEdit(board)"></i></h3>
            <h3><i class="fa fa-group member-board" @click="OpenMember(board)"></i></h3>
            <h3><i class="fa fa-eye visit-board" @click="OpenBoard(board)"></i></h3>
            <h3><i class="fa fa-close del-board" @click="OpenDeleted(board)"></i></h3>
          </div>
        </div>
      </div>
    </div>
      </div>
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
    member: memberBoard
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
.navbar-board{
  display: flex;
  background-color: #fff;
  margin: 0;
  padding: 0.25rem 1rem;
  & .navbar-board-item{
    list-style-type: none;
    font-weight: 500;
    font-size: 20px;
    cursor: pointer;
    &:hover{
      color: rgb(255, 0, 0);
    }
  }
}
.Boards{
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
}
.board {
  background-color: transparent;
  width: 200px;
  height: 300px;
  border: 1px solid transparent;
  perspective: 1000px;
  margin: 1rem;
}

.front{
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  border-radius: 0.5rem;
  overflow: hidden;
  padding: 1rem;
}
.front {
  background-color: #232469;
  color: #fff;
  background-image:url('../assets/bg-login.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  & h1{
    text-align: center;
    margin-bottom: 0.25rem;
  }
  & h5{
    margin-top: 0;
  }
  display: grid;
  grid-template-columns: 1fr;
  & .board-icon{
    align-self: end;
  }
}

.board-icon{
  display: flex;
  & h3{
    margin:2rem auto;
  }
  & .fa{
    cursor: pointer;
  }
  & .edit-board:hover{
    color: yellow;
  }
  & .member-board:hover{
    color: rgb(3, 2, 0);
  }
  & .del-board:hover{
    color: red;
  }
  & .visit-board:hover{
    color:lime
  }
}
@media screen and (min-width: 750px) {
  .Boards {
    display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  }
}
@media screen and (min-width: 980px) {
  .Boards {
    display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
@media screen and (min-width: 1200px) {
  .Boards {
    display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
}
</style>
