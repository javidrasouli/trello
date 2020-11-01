<template>
  <div class="single-board">
    <nav >
      <ul class="navbar-list">
        <li class="edit-list" :class="{ activeList: lists }" @click="Lists()" v-text="board.name"></li>
        <li class="edit-list" :class="{ activeList: member }" @click="memberlist()">Members</li>
        <li class="edit-list" :class="{ activeList: OpenAdd }" @click="OpenAdd = true">create List</li>
      </ul>
    </nav>
    <section v-if="lists" class="index-page-list conteiner">
      <div v-for="List in listsBoard" :key = 'List._id'>
        <div class="list">
        <div class="header-list"><h3 v-text="List.name"></h3><i class="fa fa-edit edit-list" @click="OpenEditList(List)"></i><i class="fa fa-close del-list" @click="Opendelete(List)"></i></div>
        <div class="tasks">
          <ul class="task-list">
            <div v-for="task in tasks" :key= 'task._id'>
              <div v-if="task.listID == List._id">
                <li @click="OpenTask(task)"><h4 v-text="task.name"></h4></li>
              </div>
            </div>
            <li class="addtask" @click="OpenAddTask(List)">addTask</li>
          </ul>
          </div>
      </div>
      </div>
    </section>
    <section v-if="member">
      <member/>
    </section>
    <div class="overlay" v-if="OpenT" @click.self="OpenT = false">
        <edit v-if="OpenT" :editTask = 'editTask' @close-task = 'closeTask' />
    </div>
    <div class="overlay" v-if="Opendel" @click.self="Opendel = false">
        <delete v-if="Opendel" :list = 'list' @close-deleted = 'closeDelete'/>
    </div>
    <div class="overlay" v-if="OpenEL" @click.self="OpenEL = false">
        <list v-if="OpenEL" :list = 'list' />
    </div>
    <div class="overlay" v-if="OpenAdd" @click.self="OpenAdd = false">
        <add v-if="OpenAdd" :board = 'board' @close-list = 'closeList'/>
    </div>
    <div class="overlay" v-if="OpenAtask" @click.self="OpenAtask = false">
        <add-task v-if="OpenAtask" :AddTask = 'AddTask' @close = 'close' />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import editTask from '../components/Modal/EditTask.vue'
import addTask from '../components/Modal/addTask.vue'
import delList from '../components/Modal/delList.vue'
import editList from '../components/Modal/EditList.vue'
import memberList from '../components/memberBoard.vue'
import addList from '../components/Modal/createList.vue'
import { getMemberTask, Lists } from '../Model/lists'
export default defineComponent({
  name: 'lists',
  components: {
    edit: editTask,
    delete: delList,
    list: editList,
    member: memberList,
    add: addList,
    addTask: addTask
  },
  data: () => ({
    OpenAtask: false,
    OpenT: false,
    Opendel: false,
    OpenEL: false,
    lists: 1,
    member: 0,
    OpenAdd: false,
    board: {},
    listsBoard: {},
    list: {},
    tasks: {},
    editTask: {},
    AddTask: {}
  }),
  created () {
    this.board = Lists.value.Board
    this.listsBoard = Lists.value.lists
    this.tasks = Lists.value.task
  },
  methods: {
    Lists () {
      this.lists = 1
      this.member = 0
    },
    memberlist () {
      this.lists = 0
      this.member = 1
    },
    OpenEditList (list: {}) {
      this.list = list
      this.OpenEL = true
    },
    Opendelete (list: {}) {
      this.list = list
      this.Opendel = true
    },
    closeDelete (closeDelete: boolean) {
      this.Opendel = closeDelete
    },
    OpenTask (task: any) {
      getMemberTask({ id: task.userID }).then(() => {
        this.editTask = task
        this.OpenT = true
      })
    },
    OpenAddTask (list: {}) {
      this.AddTask = list
      this.OpenAtask = true
    },
    close (close: boolean) {
      this.OpenAtask = close
    },
    closeTask (close: boolean) {
      this.OpenT = close
    },
    closeList (close: boolean) {
      this.OpenAdd = close
    }
  }
})
</script>
<style lang="scss">
.navbar-list{
  display: flex;
  margin: 0;
  padding: 0.5rem;
  background-color: #fff;
  font-size: 17px;
  & li{
    list-style-type: none;
    margin: 0 auto;
    &.edit-list{
      cursor: pointer;
    &:hover{
      color: rgb(0, 253, 169);
    }
    }
  }
}
.index-page-list{
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
}
.list{
  margin:1rem 0.5rem;
  border: 1px solid #f4f4f4;
  background-color: #fff;
  border-radius: 8px;
  & .header-list{
    border-bottom: 1px solid #f4f4f4;
    padding:0.5rem 1rem;
    display: flex;
    align-items: center;
    & .fa{
      margin: 0 auto;
      font-size: 20px;
      cursor: pointer;
    }
    & .edit-list{
      color: rgb(123, 255, 0);
    }
    & .del-list{
      color: red;
    }
    & h3{
      margin: 0;
    }
  }
  & .tasks{
    padding:0.5rem 1rem;
    & h4{
      margin: 0;
    }
    & .task-list{
      margin: 0;
      padding: 0;
      & li{
        list-style-type: none;
        display: flex;
        align-items: center;
        cursor: pointer;
        margin: 1rem 0;
        &:hover{
          color: rgb(255, 0, 0);
        }
      }
      & .addtask{
        color: gray;
        margin-bottom: 0;
        &:hover{
          color: mediumturquoise;
        }
      }
    }
  }
}
.activeList{
  color: rgb(123, 255, 0);
}
@media screen and (min-width: 750px) {
  .index-page-list {
    display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  }
}
@media screen and (min-width: 980px) {
  .index-page-list {
    display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
@media screen and (min-width: 1200px) {
  .index-page-list {
    display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
}
</style>
